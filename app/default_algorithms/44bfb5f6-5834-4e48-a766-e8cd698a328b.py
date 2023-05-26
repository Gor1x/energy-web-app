import sklearn.cluster as sk
from app.Algorithm import Algorithm

birch = Algorithm(name="BIRCH", run=lambda data: sk.Birch().fit(data).labels_)
algorithms = [birch]