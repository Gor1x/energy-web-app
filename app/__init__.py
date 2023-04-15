from flask import Flask
from flask_cors import CORS
from app.config import DevConfig

app = Flask(__name__, static_url_path="/", static_folder="../client/build")
app.config.from_object(DevConfig)
CORS(app)

from app import routes