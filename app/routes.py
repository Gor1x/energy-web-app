from app import app, data
from flask import jsonify
import csv

@app.route("/")
def index():
    return app.send_static_file("index.html")
#./data/indoor-temperature-prediction/Meteo_0_test_1.csv
@app.route("/meteo_test")
def meteo_test():
    return jsonify({"data": data})