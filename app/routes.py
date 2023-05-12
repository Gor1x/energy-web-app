import os
import uuid
import app.Algorithm as alg
import app.Dataset as dts
from app.models import User, Algorithm, Dataset
from flask import request, jsonify, make_response, send_from_directory
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash


running_ns = Namespace("run", description="Run")
algorithm_ns = Namespace("algorithms", description="Algorithm")
dataset_ns = Namespace("datasets", description="Dataset")
auth_ns = Namespace("auth", description="Auth")


signup_model=auth_ns.model(
    'SignUp',
    {
        'username': fields.String(),
        'email': fields.String(),
        'password': fields.String()
    }
)

algorithm_model=algorithm_ns.model(
    'Algorithm',
    {
        'id': fields.Integer(),
        'name': fields.String(),
        'user_id': fields.Integer(),
        'file_path': fields.String()
    }
)

dataset_model=dataset_ns.model(
    'Dataset',
    {
        'id': fields.Integer(),
        'name': fields.String(),
        'user_id': fields.Integer(),
        'file_path': fields.String()
    }
)

def normalize_path(path):
    return os.path.normpath(path).replace("\\", os.sep).replace("/", os.sep)

@running_ns.route("/<int:dataset_id>/<int:algorithm_id>")
class RunResource(Resource):
    @jwt_required()
    def get(self, dataset_id, algorithm_id):
        user_id=User.query.filter_by(username=get_jwt_identity()).first().id
        algorithm = Algorithm.query.get_or_404(algorithm_id)
        dataset = Dataset.query.get_or_404(dataset_id)
        if algorithm.user_id == user_id and dataset.user_id == user_id:
            algorithms = alg.load_algorithms_from_module(algorithm.file_path)
            dataset = dts.load_dataset(dataset.file_path)
            pred = algorithms[0].run(dataset.data, {})
            return make_response(jsonify(list(map(int, list(pred)))), 200)


@algorithm_ns.route("/")
class AlgorithmResource(Resource):
    @algorithm_ns.marshal_with(algorithm_model)
    @jwt_required()
    def get(self):
        user_id=User.query.filter_by(username=get_jwt_identity()).first().id
        algorithms=Algorithm.query.filter_by(user_id=user_id).all()
        return algorithms
    
    @algorithm_ns.marshal_with(algorithm_model)
    @jwt_required()
    def post(self):
        algorithms = []
        user_id=User.query.filter_by(username=get_jwt_identity()).first().id
        for (_, file) in request.files.items():
            algorithms_dir = "./app/algorithms" 
            filename = f"{str(uuid.uuid4())}.py"
            algorithm_path = os.path.join(algorithms_dir, filename)
            algorithm_path = normalize_path(algorithm_path)
            file.save(algorithm_path)
            new_algorithm = Algorithm(
                name="algorithm",
                file_path=algorithm_path,
                user_id=user_id
            )
            new_algorithm.save()
            algorithms.append(new_algorithm)
        return algorithms


@algorithm_ns.route("/<int:id>")
class AlgorithmByIdResource(Resource):
    @algorithm_ns.marshal_with(algorithm_model)
    @jwt_required()
    def get(self, id):
        user_id=User.query.filter_by(username=get_jwt_identity()).first().id
        algorithm = Algorithm.query.get_or_404(id)
        if algorithm.user_id == user_id:
            return algorithm

    @algorithm_ns.marshal_with(algorithm_model)
    @jwt_required()
    def put(self, id):
        user_id=User.query.filter_by(username=get_jwt_identity()).first().id
        algorithm_to_update = Algorithm.query.get_or_404(id)
        if algorithm_to_update.user_id == user_id:
            data = request.get_json()
            algorithm_to_update.update(data.get("name"))
            return algorithm_to_update
    
    @algorithm_ns.marshal_with(algorithm_model)
    @jwt_required()
    def delete(self, id):
        user_id=User.query.filter_by(username=get_jwt_identity()).first().id
        algorithm_to_delete = Algorithm.query.get_or_404(id)
        if algorithm_to_delete.user_id == user_id:
            path = normalize_path(algorithm_to_delete.file_path)
            os.remove(path)
            algorithm_to_delete.delete()
            return algorithm_to_delete  


@algorithm_ns.route("/<int:id>/code")
class AlgorithmCodeByIdResource(Resource):
    @jwt_required()
    def get(self, id):
        user_id=User.query.filter_by(username=get_jwt_identity()).first().id
        algorithm = Algorithm.query.get_or_404(id)
        if algorithm.user_id == user_id:
            file_path = normalize_path(algorithm.file_path)
            directory = os.path.join(*os.path.dirname(file_path).split(os.sep)[1:])
            filename = os.path.basename(file_path)
            return send_from_directory(directory=directory, path=filename)


@dataset_ns.route("/")
class DatasetResource(Resource):
    @dataset_ns.marshal_with(dataset_model)
    @jwt_required()
    def get(self):
        user_id=User.query.filter_by(username=get_jwt_identity()).first().id
        datasets=Dataset.query.filter_by(user_id=user_id).all()
        return datasets
    
    @dataset_ns.marshal_with(dataset_model)
    @jwt_required()
    def post(self):
        datasets = []
        user_id=User.query.filter_by(username=get_jwt_identity()).first().id
        for (_, file) in request.files.items():
            datasets_dir = "./app/datasets" 
            filename = f"{str(uuid.uuid4())}.csv"
            dataset_path = os.path.join(datasets_dir, filename)
            dataset_path = normalize_path(dataset_path)
            file.save(dataset_path)
            new_dataset = Dataset(
                name="dataset",
                file_path=dataset_path,
                user_id=user_id
            )
            new_dataset.save()
            datasets.append(new_dataset)
        return datasets


@dataset_ns.route("/<int:id>")
class DatasetByIdResource(Resource):
    @dataset_ns.marshal_with(dataset_model)
    @jwt_required()
    def get(self, id):
        user_id=User.query.filter_by(username=get_jwt_identity()).first().id
        dataset = Dataset.query.get_or_404(id)
        if dataset.user_id == user_id:
            return dataset

    @dataset_ns.marshal_with(dataset_model)
    @jwt_required()
    def put(self, id):
        user_id=User.query.filter_by(username=get_jwt_identity()).first().id
        dataset_to_update = Dataset.query.get_or_404(id)
        if dataset_to_update.user_id == user_id:
            data = request.get_json()
            dataset_to_update.update(data.get("name"))
            return dataset_to_update
    
    @dataset_ns.marshal_with(dataset_model)
    @jwt_required()
    def delete(self, id):
        user_id=User.query.filter_by(username=get_jwt_identity()).first().id
        dataset_to_delete = Dataset.query.get_or_404(id)
        if dataset_to_delete.user_id == user_id:
            path = normalize_path(dataset_to_delete.file_path)
            os.remove(path)
            dataset_to_delete.delete()
            return dataset_to_delete  


@auth_ns.route("/signup")
class sign_up(Resource):
    @auth_ns.expect(signup_model)
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
        return make_response(jsonify({
            'message': 'User created successfully',
            'data': {
                'id': new_user.id,
                'username': new_user.username,
                'email': new_user.email
            }
        }), 201)


@auth_ns.route("/login")
class login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        db_user = User.query.filter_by(username=username).first()
        if db_user and check_password_hash(db_user.password, password):
            access_token = create_access_token(identity=db_user.username)
            refresh_token = create_refresh_token(identity=db_user.username)
            return make_response(jsonify({
                'message': 'Authorized succesfully',
                'data': {
                    'access_token': access_token,
                    'refresh_token': refresh_token
                }
            }), 200)
        return make_response(jsonify({'message': 'Invalid username or password'}), 401)


@auth_ns.route("/refresh")
class RefreshResource(Resource):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        new_access_token = create_access_token(identity=current_user)
        return make_response(jsonify({
            'message': 'Refreshed succesfully',
            "access_token": new_access_token
        }), 200)