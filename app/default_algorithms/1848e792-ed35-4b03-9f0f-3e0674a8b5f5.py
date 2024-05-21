import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from app.Algorithm import Algorithm

def linear_regression(data: np.ndarray) -> np.ndarray:
    # Предполагаем, что первый столбец - целевая переменная
    y = data[:, 0]  # Первый столбец - это целевая переменная
    X = data[:, 1:]  # Все столбцы, кроме первого - это признаки

    # Разделяем данные на обучающую и тестовую выборки
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = LinearRegression()
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    print(f'Mean Squared Error: {mse}')
    return y_pred

linear_regression_algorithm = Algorithm(name="linear-regression", run=linear_regression)

linear_regression = Algorithm(name="linear-regression", run=lambda data: linear_regression_algorithm.run(data))
algorithms = [linear_regression]