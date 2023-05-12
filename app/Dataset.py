from sklearn import preprocessing
import numpy as np
import pandas
import os
import json

from sklearn.datasets import make_blobs


class Dataset:
    """
    This class is used to represent an instance of clustering problem

    Attributes:
        data: 2d-array of float with shape (n_samples, n_features),where n_samples is number of elements, and n_features is number of features.
        target: expected partition into clusters (could be None)
        num_of_classes: number of clusters to which data should be divided
        feature_names: array with title for each feature
        name: title for the dataset
    """
    data: np.ndarray
    titles: np.ndarray
    feature_names: [str]

    def __init__(self, data: np.ndarray, feature_names: [str] = None):
        """
        When function is called, at least one of (num_of_classes, target) should be specified (preferably, exactly one).
        """
        self.data = data


def _dataset_filename(name: str) -> str:
    return os.path.join('app/datasets', os.path.splitext(os.path.basename(name))[0]) + '.csv'


def normalise_dataset(data: np.ndarray) -> np.ndarray:
    return preprocessing.MinMaxScaler().fit_transform(data)


def load_from_csv(file_name: str) -> pandas.DataFrame:
    return pandas.read_csv(file_name)


def get_cols_with_type(df: pandas.DataFrame, types: [str]) -> pandas.DataFrame:
    groups = df.columns.to_series().groupby(df.dtypes).groups
    groups = {str(k): list(v) for k, v in groups.items()}
    cols = []
    for t in types:
        cols += groups.get(t, [])
    return df[cols]


def get_feature_cols(df: pandas.DataFrame) -> pandas.DataFrame:
    return get_cols_with_type(df, ['int64', 'float64'])


def load_dataset(file: str) -> Dataset:
    df = load_from_csv(_dataset_filename(file))
    data = get_feature_cols(df).to_numpy()
    return Dataset(data, feature_names=get_feature_cols(df).columns.tolist())