import sklearn.cluster as sk
from app.Algorithm import Algorithm

k_means = Algorithm(name="k-means", run=lambda data: sk.KMeans().fit(data).labels_)
algorithms = [k_means]
