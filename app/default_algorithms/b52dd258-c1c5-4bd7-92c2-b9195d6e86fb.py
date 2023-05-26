import sklearn.cluster as sk
from app.Algorithm import Algorithm

affinity = Algorithm(name="affinity", run=lambda data: sk.AffinityPropagation().fit(data).labels_)
algorithms = [affinity]