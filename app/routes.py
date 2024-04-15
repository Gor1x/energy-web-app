import codecs
import json
import os
import shutil
import uuid
from glob import glob

import dask.dataframe as dd
import numpy as np
import pandas as pd
from flask import request, jsonify, make_response, send_from_directory
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from flask_restx import Namespace, Resource, fields
from werkzeug.security import generate_password_hash, check_password_hash

import app.Algorithm as alg
import app.Dataset as dts
from app.models import User, Algorithm, Dataset

running_ns = Namespace("run", description="Run")
algorithm_ns = Namespace("algorithms", description="Algorithm")
default_algorithm_ns = Namespace("default algorithms", description="Default algorithms")
dataset_ns = Namespace("datasets", description="Dataset")
default_dataset_ns = Namespace("default datasets", description="Default dataset")
auth_ns = Namespace("auth", description="Auth")

signup_model = auth_ns.model(
    'SignUp',
    {
        'username': fields.String(),
        'email': fields.String(),
        'password': fields.String()
    }
)

algorithm_model = algorithm_ns.model(
    'Algorithm',
    {
        'id': fields.Integer(),
        'name': fields.String(),
        'user_id': fields.Integer(),
        'file_path': fields.String()
    }
)

dataset_model = dataset_ns.model(
    'Dataset',
    {
        'id': fields.Integer(),
        'name': fields.String(),
        'user_id': fields.Integer(),
        'file_path': fields.String(),
        'num_rows': fields.Integer()
    }
)


def normalize_path(path):
    return os.path.normpath(path).replace("\\", os.sep).replace("/", os.sep)


class NumpyEncoder(json.JSONEncoder):
    """ Special json encoder for numpy types """

    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)


@running_ns.route("/")
class RunResource(Resource):
    @jwt_required()
    def get(self):
        args = request.args
        user_id = User.query.filter_by(username=get_jwt_identity()).first().id
        algorithm = Algorithm.query.get_or_404(args['algorithm_id'])
        dataset = Dataset.query.get_or_404(args['dataset_id'])
        if (algorithm.user_id == -1 or algorithm.user_id == user_id) and (
                dataset.user_id == -1 or dataset.user_id == user_id):
            module = os.path.splitext(algorithm.file_path)
            module = module[0].replace('\\', '.').replace('/', '.')
            print(module)
            algorithms = alg.load_algorithms_from_module(module)
            dataset = dts.load_dataset(normalize_path(f"{dataset.file_path}/*.part"))
            pred = algorithms[0].run(dataset.data)
            json_dump = json.dumps(pred, cls=NumpyEncoder)
            response = make_response(json_dump, 200)
            response.headers['Content-Type'] = 'application/json'
            return response


@algorithm_ns.route("/")
class AlgorithmResource(Resource):
    @algorithm_ns.marshal_with(algorithm_model)
    @jwt_required()
    def get(self):
        user_id = User.query.filter_by(username=get_jwt_identity()).first().id
        algorithms = Algorithm.query.filter_by(user_id=-1).all() + Algorithm.query.filter_by(user_id=user_id).all()
        return algorithms

    @algorithm_ns.marshal_with(algorithm_model)
    @jwt_required()
    def post(self):
        algorithms = []
        user_id = User.query.filter_by(username=get_jwt_identity()).first().id
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
        user_id = User.query.filter_by(username=get_jwt_identity()).first().id
        algorithm = Algorithm.query.get_or_404(id)
        if algorithm.user_id == -1 or algorithm.user_id == user_id:
            return algorithm

    @algorithm_ns.marshal_with(algorithm_model)
    @jwt_required()
    def put(self, id):
        user_id = User.query.filter_by(username=get_jwt_identity()).first().id
        algorithm_to_update = Algorithm.query.get_or_404(id)
        if algorithm_to_update.user_id == user_id:
            data = request.get_json()
            algorithm_to_update.update(data.get("name"))
            return algorithm_to_update

    @algorithm_ns.marshal_with(algorithm_model)
    @jwt_required()
    def delete(self, id):
        user_id = User.query.filter_by(username=get_jwt_identity()).first().id
        algorithm_to_delete = Algorithm.query.get_or_404(id)
        if algorithm_to_delete.user_id == user_id:
            path = normalize_path(algorithm_to_delete.file_path)
            os.remove(path)
            algorithm_to_delete.delete()
            return algorithm_to_delete


@algorithm_ns.route("/code/<int:id>")
class AlgorithmCodeByIdResource(Resource):
    @jwt_required()
    def get(self, id):
        user_id = User.query.filter_by(username=get_jwt_identity()).first().id
        algorithm = Algorithm.query.get_or_404(id)
        if algorithm.user_id == -1 or algorithm.user_id == user_id:
            file_path = normalize_path(algorithm.file_path)
            directory = os.path.join(*os.path.dirname(file_path).split(os.sep)[1:])
            filename = os.path.basename(file_path)
            return send_from_directory(directory=directory, path=filename)


@dataset_ns.route("/")
class DatasetResource(Resource):
    @dataset_ns.marshal_with(dataset_model)
    @jwt_required()
    def get(self):
        user_id = User.query.filter_by(username=get_jwt_identity()).first().id
        datasets = Dataset.query.filter_by(user_id=-1).all() + Dataset.query.filter_by(user_id=user_id).all()
        return datasets

    @dataset_ns.marshal_with(dataset_model)
    @jwt_required()
    def post(self):
        datasets = []
        datasets_dir = "./app/datasets"
        user_id = User.query.filter_by(username=get_jwt_identity()).first().id
        for (_, file) in request.files.items():
            fileid = str(uuid.uuid4())
            file_path = normalize_path(os.path.join(datasets_dir, f"{fileid}"))

            part_size = 60000
            # npart = (len(df) + part_size - 1)
            df = dd.from_pandas(pd.read_csv(file), chunksize=part_size)
            # df = df.repartition(npartitions=npart)
            pfsums = np.cumsum(df.map_partitions(len).compute()).tolist()
            df["iddx"] = 1
            df["iddx"] = df["iddx"].cumsum()
            df = df.set_index("iddx")
            df.to_csv(file_path)
            json_file = f"{file_path}/index.json"
            json.dump(pfsums, codecs.open(json_file, 'w', encoding='utf-8'), sort_keys=True, indent=4)

            # df["idx"] = 1
            # df["idx"] = df["idx"].cumsum()
            # df.to_csv(file_path)
            num_rows = df.shape[0].compute()
            new_dataset = Dataset(
                name="dataset",
                file_path=file_path,
                user_id=user_id,
                num_rows=num_rows
            )
            new_dataset.save()
            datasets.append(new_dataset)
        return datasets


@dataset_ns.route("/<int:id>")
class DatasetByIdResource(Resource):
    @dataset_ns.marshal_with(dataset_model)
    @jwt_required()
    def get(self, id):
        user_id = User.query.filter_by(username=get_jwt_identity()).first().id
        dataset = Dataset.query.get_or_404(id)
        if dataset.user_id == -1 or dataset.user_id == user_id:
            return dataset

    @dataset_ns.marshal_with(dataset_model)
    @jwt_required()
    def put(self, id):
        user_id = User.query.filter_by(username=get_jwt_identity()).first().id
        dataset_to_update = Dataset.query.get_or_404(id)
        if dataset_to_update.user_id == user_id:
            data = request.get_json()
            dataset_to_update.update(data.get("name"))
            return dataset_to_update

    @dataset_ns.marshal_with(dataset_model)
    @jwt_required()
    def delete(self, id):
        user_id = User.query.filter_by(username=get_jwt_identity()).first().id
        dataset_to_delete = Dataset.query.get_or_404(id)
        if dataset_to_delete.user_id == user_id:
            path = normalize_path(dataset_to_delete.file_path)
            shutil.rmtree(path)
            dataset_to_delete.delete()
            return dataset_to_delete


@dataset_ns.route("/data/<int:id>")
class DatasetDataByIdResource(Resource):
    @jwt_required()
    def get(self, id):
        args = request.args
        from_row = int(args['from'])
        to_row = int(args['to'])
        from_date = ""
        if 'from_date' in args:
            from_date = args['from_date']
        to_date = ""
        if 'to_date' in args:
            to_date = args['to_date']
        column = ""
        if 'column' in args:
            column = args['column']

        user_id = User.query.filter_by(username=get_jwt_identity()).first().id
        dataset = Dataset.query.get_or_404(id)
        if dataset.user_id == -1 or dataset.user_id == user_id:
            # file_path = normalize_path(f"{dataset.file_path}/*.part")

            # if dataset.user_id == -1:
            #    df = dd.read_csv(file_path, compression='gzip').set_index('Unnamed: 0')
            # else:
            #    df = dd.read_csv(file_path).set_index('Unnamed: 0')

            with open(normalize_path(f"{dataset.file_path}/index.json"), 'r', encoding='utf-8') as f:
                pfsum = json.load(f)
            from_file = np.searchsorted(pfsum, from_row, side='left')
            to_file = np.searchsorted(pfsum, to_row - 2, side='rigth')
            filenames = glob(normalize_path(f"{dataset.file_path}/*.part"))
            df = dd.read_csv(filenames[from_file:to_file + 1]).set_index('iddx')

            if 'Date' in df.columns and from_date != "" and to_date != "":
                df['Date'] = pd.to_datetime(df['Date'])
                mask = (df['Date'] >= from_date) & (df['Date'] <= to_date)
                df = df.loc[mask]

            if column not in df.columns:
                return make_response(df.loc[from_row:to_row - 1].compute().to_json(orient='records'), 200)

            return make_response(df.loc[from_row:to_row - 1, column].compute().to_json(orient='records'), 200)


@auth_ns.route("/signup")
class sign_up(Resource):
    @auth_ns.expect(signup_model)
    def post(self):
        data = request.get_json()
        username = data.get('username')
        db_user = User.query.filter_by(username=username).first()

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
