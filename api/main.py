from flask import Flask
from flask_restx import Api
from flask_cors import CORS


def create_app(config):
    app = Flask(__name__, static_url_path="/", static_folder="../client/build")
    app.config.from_object(config)

    CORS(app)

    @app.route("/")
    def index():
        return app.send_static_file("index.html")

    return app