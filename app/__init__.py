from flask import Flask
from flask_cors import CORS
from app.exts import db
from flask_migrate import Migrate
from app.models import User
from flask_restx import Api
from flask_jwt_extended import JWTManager
from app.routes import running_ns, algorithm_ns, dataset_ns, auth_ns


def create_app(config):
    app = Flask(__name__, static_url_path="/", static_folder="../client/build")
    app.config.from_object(config)
    #CORS(app)
    db.init_app(app)
    Migrate(app, db)
    JWTManager(app)

    api = Api(app, doc="/docs")
    api.add_namespace(running_ns)
    api.add_namespace(algorithm_ns)
    api.add_namespace(dataset_ns)
    api.add_namespace(auth_ns)

    @app.route("/")
    def index():
        return app.send_static_file("index.html")

    @app.shell_context_processor
    def make_shell_context():
        return { "db": db, "User": User }
    return app