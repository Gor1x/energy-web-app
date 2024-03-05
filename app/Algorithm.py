import numpy as np
import importlib

class Algorithm:
    """
    This class is used to represent an instance of clustering algorithm.
    """

    def __init__(self, name: str, run):
        """
        :param name: title for algorithm
        :param run: function that implements clustering. It should take exactly two arguments: 2d-array with data
        and the number of classes
        """
        self.name = name
        self.__run = run

    # Can't pass Dataset here, because it may contain target
    def run(self, data: np.ndarray) -> np.ndarray:
        return self.__run(data)


def load_algorithms_from_module(module: str) -> [Algorithm]:
    lib = importlib.import_module(module)
    return lib.algorithms
