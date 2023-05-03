from flask import Flask
from flask_cors import CORS
from app.config import DevConfig
from app.exts import db
from flask_migrate import Migrate
from app.models import User

app = Flask(__name__, static_url_path="/", static_folder="../client/build")
app.config.from_object(DevConfig)
db.init_app(app)
migrate=Migrate(app, db)
#CORS(app)

@app.route("/")
def index():
    return app.send_static_file("index.html")

@app.shell_context_processor
def make_shell_context():
    return {
        "db": db,
        "User": User 
    }

from app import routes