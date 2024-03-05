import sklearn.cluster as sk
from app.Algorithm import Algorithm

linear_regression = Algorithm(name="linear-regression", run=lambda data: sk.LinearRegression().fit(data).labels_)
algorithms = [linear_regression]