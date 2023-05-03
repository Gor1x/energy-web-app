from flask_sqlalchemy import SQLAlchemy
import csv
from datetime import *
import numpy as np

db = SQLAlchemy()

data = {}
'''
with open("assets/data/Meteo_0_test_1.csv", "r") as f:
    reader = csv.reader(f, delimiter=",")
    header = next(reader)
    ts = header.index("ts")
    columns = ["BaroPressure", "DewPoint", "Humidity", "Temperature", "WindDirection", "WindSpeed"]
    column_indices = [header.index(column) for column in columns]
    data = {column: [] for column in columns}
    day_batch = {column: [] for column in columns}
    prev_date = datetime.utcfromtimestamp(0)
    def append_batch():
        if all(map(lambda key: len(day_batch[key]) > 0, day_batch)):
            for column in columns:
                data[column].append({
                    "date": prev_date.date().strftime("%B %d, %Y"),
                    "value": np.array(day_batch[column]).mean()
                })     
    for i, line in enumerate(reader):
        if not all(map(lambda k: line[k] != '', column_indices)):
            continue
        cur_date = datetime.utcfromtimestamp(int(line[ts][:-3]))
        if prev_date.date() < cur_date.date():
            append_batch()
            day_batch = {column: [] for column in columns}
            prev_date = cur_date
        for k, column in enumerate(columns):
            day_batch[column].append(float(line[column_indices[k]]))
    append_batch()
'''