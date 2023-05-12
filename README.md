# energy-web-app

Тестовый деплой: https://energy-web-app-m79t.onrender.com/

### Инструкция по запуску backend-сервера:
* В корневой папке проекта создать virtual environment: `python -m venv ./venv`.
* Запустить скрипт `/venv/Scripts/activate.bat`.
* В корневой папке проекта выполнить `pip install pipenv`, а затем `pipenv install`. Должны установиться все необходимые зависимости из файла `Pipfile.lock`.
* В корневой папке проекта выполнить  `flask shell`. Затем исполнить `db.create_all()`, затем `quit()`. Должна создаться папка `instance` с файлом `dev.db`.
* (опционально) Если вдруг вы добавили новую таблицу или изменили существующую, например, в файле `app/models.py` добавили новое поле в классе `User`, необходимо обновить базу данных в соответствии с этим изменением. Сначала нужно сохранить его в папку `migrations/versions` при помощи команды `flask db migrate -m "Add new table"` в корне проекта. После этого необходимо обновить локальную базу до последней версии командой `flask db upgrade` также в корне проекта.
* Запустить backend-сервер командой `python run.py`

### Инструкция по запуску frontend-сервера:
* Перейти в папку `client`.
* Выполнить команду `npm install`. Должны установиться все необходимые зависимости из `package.json` в папку `node_modules`.
* Запустить frontend-сервер командой `npm start`

frontend-сервер можно не запускать. Вместо этого можно сбилдить react командой `npm run build` в папке `client`. backend-сервер возвращает сбилженный сайт из папки `client/build`. Но при таком использовании, необходимо будет билдить проект после каждого изменения в react-приложении в папке `client`. Такой вариант используется в продакшене.


### API:
* **/auth/signup**
   * [POST /auth/signup/](#post-authsignup)
* **/auth/login**
   * [POST /auth/login/](#post-authlogin)
* **/auth/refresh**
   * [POST /auth/refresh/](#post-authrefresh)
* **/algorithms**
   * [POST /algorithms/](#post-algorithms)
* **/algorithms/\<int:id\>**
   * [GET /algorithms/\<int:id\>](#get-algorithmsintid)
   * [PUT /algorithms/\<int:id\>](#put-algorithmsintid)
   * [DELETE /algorithms/\<int:id\>](#delete-algorithmsintid)
* **/algorithms/\<int:id\>/code**
   * [GET /algorithms/\<int:id\>/code](#get-algorithmsintidcode)
* **/datasets**
   * [POST /datasets/](#post-datasets)
* **/datasets/\<int:id\>**
   * [GET /datasets/\<int:id\>](#get-datasetsintid)
   * [PUT /datasets/\<int:id\>](#put-datasetsintid)
   * [DELETE /datasets/\<int:id\>](#delete-datasetsintid)
* **/run/\<int:dataset_id\>/\<int:algorithm_id\>**
   * [GET /run/\<int:dataset_id\>/\<int:algorithm_id\>](#get-runintdataset_idintalgorithm_id)

### POST /auth/signup/
Реализует стандарт JSON Web Tokens. Регистрирует, и возвращает json-представление созданного пользователя.
#### Параметры запроса
*  `username`: String *(обязательно)* - Имя пользователя
*  `email`: String *(обязательно)* - Email пользователя
*  `password`: String *(обязательно)* - Пароль пользователя
#### Ответ
*  `username`: String - Имя пользователя
*  `email`: String - Email пользователя
*  `id`: Integer - id пользователя
#### Пример ответа
```json
{
	"message": "User created successfully",
	"data": {
		"email": "fgfgfb93@gmail.com",
		"id": 1,
		"username": "astronomax"
	}
}
```

### POST /auth/login/
Реализует стандарт JSON Web Tokens. Получает логин, пароль и в случае успеха возвращает пару токенов - access и refresh.
#### Параметры запроса
*  `username`: String *(обязательно)* - Имя пользователя
*  `password`: String *(обязательно)* - Пароль пользователя
#### Ответ
*  `access_token`: String - access-токен
*  `refresh_token`: String - refresh-токен
#### Пример ответа
```json
{
	"data": {
		"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY4MzM3NzkyNSwianRpIjoiZThkZTZlOTMtODcyYS00OTkwLWJhODgtYzdmZGU2YzliOWU2IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImZlZ2llIiwibmJmIjoxNjgzMzc3OTI1LCJleHAiOjE2ODMzNzg4MjV9.h8IEzOW8Fv5njdsCdxZinOX6jB5u9AN2EfC_hdCdGSc",
		"refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY4MzM3NzkyNSwianRpIjoiNTE0MmQxMTAtYTA4ZC00ZDg1LThmZmYtZDIyMTZhZWZlZjIyIiwidHlwZSI6InJlZnJlc2giLCJzdWIiOiJmZWdpZSIsIm5iZiI6MTY4MzM3NzkyNSwiZXhwIjoxNjg1OTY5OTI1fQ.Nu-cL6Gf4gP61sKdYOb3Hw3IqUWW8alfZoayT9I-_gA"
	},
	"message": "Authorized succesfully"
}
```

### POST /auth/refresh/
Реализует стандарт JSON Web Tokens. Возвращает новый access-токен.
#### Ответ
*  `access_token`: String - access-токен
#### Пример ответа
```json
{
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY4MzM3ODA4NywianRpIjoiZTgwNmJmYjItODRjYS00NmEwLTk4YWYtYmI2N2YwNWIyMjA1IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImZlZ2llIiwibmJmIjoxNjgzMzc4MDg3LCJleHAiOjE2ODMzNzg5ODd9.5Y-HN2QHkGSvKoL_enQcUvVm5wunChoEEchpcEapruM",
	"message": "Refreshed succesfully"
}
```

### POST /algorithms/
Принимает файл алгоритма с расширением `.py` в теле запроса. Сохраняет файл на сервере и возвращает json-представление сохраненного алгоритма. 
#### Тело запроса
* файл с расширением `.py`
#### Ответ
*  `id`: Integer - уникальный id алгоритма, по которому дальше можно будет с ним работать
*  `name`: String - имя алгоритма
*  `user_id`: Integer - id пользователя, которому принадлежит файл
*  `file_path`: String - путь к файлу вида `app/algorithms/{uuid.uuid4()}.py`
#### Пример ответа
```json
{
	"id": 1,
	"name": "algorithm",
	"user_id": 1,
	"file_path": "./app/algorithms\\05aeee76-c314-4c92-88ab-23b6f1f14aec.py"
}
```

### GET /algorithms/\<int:id\>
Принимает id алгоритма в строке запроса. Возвращает json-представление алгоритма. 
#### Строка запроса
*  `id`: Integer - id алгоритма
#### Ответ
*  `id`: Integer - id алгоритма
*  `name`: String - имя алгоритма
*  `user_id`: Integer - id пользователя, которому принадлежит файл
*  `file_path`: String - путь к файлу вида `app/algorithms/{uuid.uuid4()}.py`
#### Пример ответа
```json
{
	"id": 1,
	"name": "algorithm",
	"user_id": 1,
	"file_path": "./app/algorithms\\05aeee76-c314-4c92-88ab-23b6f1f14aec.py"
}
```

### PUT /algorithms/\<int:id\>
Принимает id алгоритма в строке запроса. Обновляет алгоритм и возвращает json-представление обновленного алгоритма. 
#### Строка запроса
*  `id`: Integer - id алгоритма
#### Параметры запроса
*  `name`: String - новое имя алгоритма
#### Ответ
*  `id`: Integer - id алгоритма
*  `name`: String - имя алгоритма
*  `user_id`: Integer - id пользователя, которому принадлежит файл
*  `file_path`: String - путь к файлу вида `app/algorithms/{uuid.uuid4()}.py`
#### Пример ответа
```json
{
	"id": 1,
	"name": "algorithm",
	"user_id": 1,
	"file_path": "./app/algorithms\\05aeee76-c314-4c92-88ab-23b6f1f14aec.py"
}
```

### DELETE /algorithms/\<int:id\>
Принимает id алгоритма в строке запроса. Удаляет файл на сервере и возвращает json-представление удаленного алгоритма. 
#### Строка запроса
*  `id`: Integer - id алгоритма
#### Ответ
*  `id`: Integer - id алгоритма
*  `name`: String - имя алгоритма
*  `user_id`: Integer - id пользователя, которому принадлежит файл
*  `file_path`: String - путь к файлу вида `app/algorithms/{uuid.uuid4()}.py`
#### Пример ответа
```json
{
	"id": 1,
	"name": "algorithm",
	"user_id": 1,
	"file_path": "./app/algorithms\\05aeee76-c314-4c92-88ab-23b6f1f14aec.py"
}
```

### GET /algorithms/\<int:id\>/code
Принимает id алгоритма в строке запроса. Возвращает файл с кодом алгоритма. 
#### Строка запроса
*  `id`: Integer - id алгоритма
#### Ответ
*  файл с кодом алгоритма

### POST /datasets/
Принимает файл датасета с расширением `.csv` в теле запроса. Сохраняет файл на сервере и возвращает json-представление сохраненного датасета. 
#### Тело запроса
* файл с расширением `.csv`
#### Ответ
*  `id`: Integer - уникальный id датасета, по которому дальше можно будет с ним работать
*  `name`: String - имя датасета
*  `user_id`: Integer - id пользователя, которому принадлежит файл
*  `file_path`: String - путь к файлу вида `app/datasets/{uuid.uuid4()}.csv`
#### Пример ответа
```json
{
	"id": 1,
	"name": "dataset",
	"user_id": 1,
	"file_path": "./app/datasets\\30afcbe8-6774-4021-86df-d611b4eb84c7.py"
}
```

### GET /datasets/\<int:id\>
Принимает id датасета в строке запроса. Возвращает json-представление датасета. 
#### Строка запроса
*  `id`: Integer - id датасета
#### Ответ
*  `id`: Integer - id датасета
*  `name`: String - имя датасета
*  `user_id`: Integer - id пользователя, которому принадлежит файл
*  `file_path`: String - путь к файлу вида `app/datasets/{uuid.uuid4()}.py`
#### Пример ответа
```json
{
	"id": 1,
	"name": "dataset",
	"user_id": 1,
	"file_path": "./app/datasets\\30afcbe8-6774-4021-86df-d611b4eb84c7.py"
}
```

### PUT /datasets/\<int:id\>
Принимает id датасета в строке запроса. Обновляет датасет и возвращает json-представление обновленного датасета. 
#### Строка запроса
*  `id`: Integer - id датасета
#### Параметры запроса
*  `name`: String - новое имя датасета
#### Ответ
*  `id`: Integer - id датасета
*  `name`: String - имя датасета
*  `user_id`: Integer - id пользователя, которому принадлежит файл
*  `file_path`: String - путь к файлу вида `app/datasets/{uuid.uuid4()}.py`
#### Пример ответа
```json
{
	"id": 1,
	"name": "dataset",
	"user_id": 1,
	"file_path": "./app/datasets\\30afcbe8-6774-4021-86df-d611b4eb84c7.py"
}
```

### DELETE /datasets/\<int:id\>
Принимает id датасета в строке запроса. Удаляет файл на сервере и возвращает json-представление удаленного датасета. 
#### Строка запроса
*  `id`: Integer - id датасета
#### Ответ
*  `id`: Integer - id датасета
*  `name`: String - имя датасета
*  `user_id`: Integer - id пользователя, которому принадлежит файл
*  `file_path`: String - путь к файлу вида `app/datasets/{uuid.uuid4()}.py`
#### Пример ответа
```json
{
	"id": 1,
	"name": "dataset",
	"user_id": 1,
	"file_path": "./app/datasets\\30afcbe8-6774-4021-86df-d611b4eb84c7.py"
}
```

### GET /run/\<int:dataset_id\>/\<int:algorithm_id\>
Принимает id датасета и алгоритма в строке запроса. Запускает выбранный алгоритм на выбранном датасете и возвращает результат запуска. 
#### Строка запроса
*  `dataset_id`: Integer - id датасета
*  `algorithm_id`: Integer - id алгоритма
#### Ответ
*  Результат запуска алгоритма на датасете.
#### Пример ответа
```json

```
