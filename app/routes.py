import os
import uuid
import app
import app.Algorithm as alg
import app.Dataset as dts
from app.exts import data 
from app.models import User, Algorithm, Dataset
from flask import request, jsonify, make_response
from flask_restx import Api, Resource, fields
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

JWTManager(app.app)
api = Api(app.app, doc="/docs")

signup_model=api.model(
    'SignUp',
    {
        'username': fields.String(),
        'email': fields.String(),
        'password': fields.String()
    }
)

algorithm_model=api.model(
    'Algorithm',
    {
        'id': fields.Integer(),
        'name': fields.String(),
        'user_id': fields.Integer(),
        'file_path': fields.String()
    }
)

dataset_model=api.model(
    'Dataset',
    {
        'id': fields.Integer(),
        'name': fields.String(),
        'user_id': fields.Integer(),
        'file_path': fields.String()
    }
)


@api.route("/run/<int:dataset_id>/<int:algorithm_id>")
class RunResource(Resource):
    #@jwt_required()
    def get(self, dataset_id, algorithm_id):
        algorithm = Algorithm.query.get_or_404(algorithm_id)
        dataset = Dataset.query.get_or_404(dataset_id)
        algorithms = alg.load_algorithms_from_module(algorithm.file_path)
        dataset = dts.load_dataset(dataset.file_path)
        pred = algorithms[0].run(dataset.data, {})
        return make_response(jsonify(list(map(int, list(pred)))), 200)


@api.route("/algorithms")
class AlgorithmResource(Resource):
    @api.marshal_with(algorithm_model)
    #@jwt_required()
    def get(self):
        pass
    @api.marshal_with(algorithm_model)
    #@jwt_required()
    def post(self):
        algorithms = []
        for (_, file) in request.files.items():
            algorithms_dir = "./app/algorithms" 
            filename = f"{str(uuid.uuid4())}.py"
            algorithm_path = os.path.join(algorithms_dir, filename)
            file.save(algorithm_path)
            new_algorithm = Algorithm(
                name="algorithm",
                file_path=algorithm_path,
                user_id=1
            )
            new_algorithm.save()
            algorithms.append(new_algorithm)
        return algorithms


@api.route("/algorithms/<int:id>")
class AlgorithmByIdResource(Resource):
    @api.marshal_with(algorithm_model)
    #@jwt_required()
    def get(self, id):
        algorithm = Algorithm.query.get_or_404(id)
        return algorithm

    @api.marshal_with(algorithm_model)
    #@jwt_required()
    def put(self, id):
        algorithm_to_update = Algorithm.query.get_or_404(id)
        data = request.get_json()
        algorithm_to_update.update(data.get("name"))
        return algorithm_to_update
    
    @api.marshal_with(algorithm_model)
    #@jwt_required()
    def delete(self, id):
        algorithm_to_delete = Algorithm.query.get_or_404(id)
        algorithm_to_delete.delete()
        return algorithm_to_delete  


@api.route("/datasets")
class DatasetResource(Resource):
    @api.marshal_with(dataset_model)
    #@jwt_required()
    def get(self):
        pass
    @api.marshal_with(dataset_model)
    #@jwt_required()
    def post(self):
        datasets = []
        for (_, file) in request.files.items():
            datasets_dir = "./app/datasets" 
            filename = f"{str(uuid.uuid4())}.csv"
            dataset_path = os.path.join(datasets_dir, filename)
            file.save(dataset_path)
            new_dataset = Dataset(
                name="dataset",
                file_path=dataset_path,
                user_id=1
            )
            new_dataset.save()
            datasets.append(new_dataset)
        return datasets


@api.route("/datasets/<int:id>")
class DatasetByIdResource(Resource):
    @api.marshal_with(dataset_model)
    #@jwt_required()
    def get(self, id):
        dataset = Dataset.query.get_or_404(id)
        return dataset

    @api.marshal_with(dataset_model)
    #@jwt_required()
    def put(self, id):
        dataset_to_update = Dataset.query.get_or_404(id)
        data = request.get_json()
        dataset_to_update.update(data.get("name"))
        return dataset_to_update
    
    @api.marshal_with(dataset_model)
    #@jwt_required()
    def delete(self, id):
        dataset_to_delete = Dataset.query.get_or_404(id)
        dataset_to_delete.delete()
        return dataset_to_delete  


@api.route("/signup")
class sign_up(Resource):
    @api.expect(signup_model)
    def post(self):
        data = request.get_json()
        username=data.get('username')
        db_user=User.query.filter_by(username=username).first()

        if db_user is not None:
            return make_response(jsonify({'message': 'User already exists'}), 409)
        
        new_user = User(
            username=username,
            email=data.get('email'),
            password=generate_password_hash(data.get('password'))
        )
        new_user.save()
        return make_response(jsonify({'message': 'User created successfully'}), 201)


@api.route("/login")
class login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        db_user = User.query.filter_by(username=username).first()
        if db_user and check_password_hash(db_user.password, password):
            access_token = create_access_token(identity=db_user.username)
            refresh_token = create_refresh_token(identity=db_user.username)
            return jsonify({
                'access_token': access_token,
                'refresh_token': refresh_token
            })


@api.route("/refresh")
class RefreshResource(Resource):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        new_access_token = create_access_token(identity=current_user)
        return make_response(jsonify({"access_token": new_access_token}), 200)