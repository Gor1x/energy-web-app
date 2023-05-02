from app import app
from app.exts import data
from app.models import User
from flask import request, jsonify, make_response
from flask_restx import Api, Resource, fields
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required
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

@api.route("/")
class index(Resource):
    def get(self):
        return app.send_static_file("index.html")


@api.route("/meteo_test")
class meteo_test(Resource):
    #@jwt_required()
    def get(self):
        return jsonify({"data": data})

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