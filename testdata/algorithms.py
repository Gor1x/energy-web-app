import sklearn.cluster as sk

from app.Algorithm import Algorithm
from app.Algorithm import AlgoParams
from app.Algorithm import SelectableParam

k_means = Algorithm(
    name="k-means",
    params=AlgoParams(
        bool_params=[],
        float_params=["tol"],
        int_params=["n_clusters", "n_init", "max_iter", "verbose"],
        selectable_params=[SelectableParam(name="algorithm",
                                            items=["elkan", "auto", "full"])]
    ),
    run=lambda data, params:
    sk.KMeans(**params)
    .fit(data).labels_
)

algorithms = [k_means]
