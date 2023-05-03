from app import app
from app.exts import data
from app.models import User, Algorithm, Dataset
from flask import request, jsonify, make_response
from flask_restx import Api, Resource, fields
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

JWTManager(app)
api = Api(app, doc="/docs")

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
        'username': fields.String(),
        'email': fields.String(),
        'password': fields.String()
    }
)

@api.route("/algorithms")
class Algorithm(Resource):
    @api.marshal_with(algorithm_model)
    @jwt_required()
    def get(self):
        pass
    @api.marshal_with(algorithm_model)
    @jwt_required()
    def post(self):
        pass


@api.route("/algorithms/<int:id>")
class AlgorithmById(Resource):
    @api.marshal_with(algorithm_model)
    @jwt_required()
    def get(self, id):
        algorithm = Algorithm.query.get_or_404(id)
        return algorithm

    @api.marshal_with(algorithm_model)
    @jwt_required()
    def put(self, id):
        algorithm_to_update = Algorithm.query.get_or_404(id)
        data = request.get_json()
        algorithm_to_update.update(data.get("name"))
        return algorithm_to_update
    
    @api.marshal_with(algorithm_model)
    @jwt_required()
    def delete(self, id):
        algorithm_to_delete = Algorithm.query.get_or_404(id)
        algorithm_to_delete.delete()
        return algorithm_to_delete


@api.route("/dataset")
class dataset(Resource):
    def get(self):
        pass
    def post(self):
        pass    

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