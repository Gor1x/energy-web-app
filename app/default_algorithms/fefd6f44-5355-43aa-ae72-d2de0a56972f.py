import sklearn.cluster as sk
from app.Algorithm import Algorithm

dbscan = Algorithm(name="DBSCAN", run=lambda data: sk.DBSCAN().fit(data).labels_)
algorithms = [dbscan]