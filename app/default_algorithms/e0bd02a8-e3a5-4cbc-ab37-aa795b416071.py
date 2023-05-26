import sklearn.cluster as sk
from app.Algorithm import Algorithm

agglo = Algorithm(name="agglomerative", run=lambda data: sk.AgglomerativeClustering().fit(data).labels_)
algorithms = [agglo]