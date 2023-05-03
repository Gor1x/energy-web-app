from collections.abc import Callable
import numpy as np
import os
import importlib
from dataclasses import dataclass


@dataclass
class SelectableParam:
    name: str
    items: [str]


@dataclass
class AlgoParams:
    bool_params: [bool]
    float_params: [float]
    int_params: [str]
    selectable_params: [SelectableParam]


class Algorithm:
    """
    This class is used to represent an instance of clustering algorithm.
    """

    def __init__(self, name: str, params: AlgoParams, run: Callable[[np.ndarray, dict], np.ndarray]):
        """
        :param name: title for algorithm
        :param run: function that implements clustering. It should take exactly two arguments: 2d-array with data
        and the number of classes
        """
        self.name = name
        self.params = params
        self.__run = run

    # Can't pass Dataset here, because it may contain target
    def run(self, data: np.ndarray, params: dict) -> np.ndarray:
        return self.__run(data, params)


def load_algorithms_from_module(file: str) -> [Algorithm]:
    lib = importlib.import_module('clustering.algorithms.' + os.path.splitext(os.path.basename(file))[0])
    return lib.algorithms


def load_algorithms() -> [Algorithm]:
    """
    This function scans all python files in ./algorithms folder.
    Each file should contain a global variable `algorithms` containing an Iterable of Algorithm with all algorithms
    defined in the file.

    :return: list with all algorithms extracted from those `algorithms` variables
    """
    res = []
    files = filter(lambda it: os.path.isfile(os.path.join('algorithms', it)), os.listdir('algorithms'))
    for file in files:
        try:
            res.extend(load_algorithms_from_module(file))
        except AttributeError:
            print(f"Could not find algorithms variable in file {file}, skipping")

    return res
