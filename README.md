# energy-web-app

Тестовый деплой (ветка [prod](https://github.com/Astronomax/energy-web-app/tree/prod)): https://energy-web-app.onrender.com/

### Инструкция по запуску:
* Склонировать репозиторий: `git clone https://github.com/Astronomax/energy-web-app`
* В корневой папке проекта создать virtual environment: `python -m venv ./`
* Установить необходимые зависимости: `pip install -r requirements.txt`
* (опционально) При необходимости сбилдить react в папке client, если /client/build в репозитории устарел: `npm run build`
* Запустить сервер: `python run.py`

### API:
* **/signup**
   * [POST /signup/](#post-signup)
* **/login**
   * [POST /login/](#post-login)
* **/refresh**
   * [POST /refresh/](#post-refresh)
* **/algorithms**
   * [POST /algorithms/](#post-algorithms)
* **/algorithms/\<int:id\>**
   * [GET /algorithms/\<int:id\>](#get-algorithmsintid)
   * [PUT /algorithms/\<int:id\>](#put-algorithmsintid)
   * [DELETE /algorithms/\<int:id\>](#delete-algorithmsintid)
* **/datasets**
   * [POST /datasets/](#post-datasets)
* **/datasets/\<int:id\>**
   * [GET /datasets/\<int:id\>](#get-datasetsintid)
   * [PUT /datasets/\<int:id\>](#put-datasetsintid)
   * [DELETE /datasets/\<int:id\>](#delete-datasetsintid)
* **/run/\<int:dataset_id\>/\<int:algorithm_id\>**
   * [GET /run/\<int:dataset_id\>/\<int:algorithm_id\>](#get-runintdataset_idintalgorithm_id)

## POST /signup/
Реализует стандарт JSON Web Tokens. Регистрирует, и возвращает json-представление созданного пользователя.
#### Параметры запроса
*  `username`: String *(обязательно)* - Имя пользователя
*  `email`: String *(обязательно)* - Email пользователя
*  `password`: String *(обязательно)* - Пароль пользователя
#### Ответ
*  `username`: String *(обязательно)* - Имя пользователя
*  `email`: String *(обязательно)* - Email пользователя
*  `password`: String *(обязательно)* - Пароль пользователя
#### Пример ответа
```json

```

## POST /login/
Реализует стандарт JSON Web Tokens. Получает логин, пароль и в случае успеха возвращает пару токенов - access и refresh.
#### Параметры запроса
*  `username`: String *(обязательно)* - Имя пользователя
*  `password`: String *(обязательно)* - Пароль пользователя
#### Ответ
*  `access_token`: String - access-токен
*  `refresh_token`: String - refresh-токен
#### Пример ответа
```json

```

## POST /refresh/
Реализует стандарт JSON Web Tokens. Возвращает новый access-токен.
#### Ответ
*  `access_token`: String - access-токен
#### Пример ответа
```json

```

## POST /algorithms/
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

```

## GET /algorithms/\<int:id\>
Принимает id алгоритма в строке запроса. Сохраняет файл на сервере и возвращает json-представление сохраненного алгоритма. 
#### Строка запроса
*  `id`: Integer - id алгоритма
#### Ответ
*  `id`: Integer - id алгоритма
*  `name`: String - имя алгоритма
*  `user_id`: Integer - id пользователя, которому принадлежит файл
*  `file_path`: String - путь к файлу вида `app/algorithms/{uuid.uuid4()}.py`
#### Пример ответа
```json

```

## PUT /algorithms/\<int:id\>
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

```

## DELETE /algorithms/\<int:id\>
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

```

## POST /datasets/
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

```

## GET /datasets/\<int:id\>
Принимает id датасета в строке запроса. Сохраняет файл на сервере и возвращает json-представление сохраненного датасета. 
#### Строка запроса
*  `id`: Integer - id датасета
#### Ответ
*  `id`: Integer - id датасета
*  `name`: String - имя датасета
*  `user_id`: Integer - id пользователя, которому принадлежит файл
*  `file_path`: String - путь к файлу вида `app/datasets/{uuid.uuid4()}.py`
#### Пример ответа
```json

```

## PUT /datasets/\<int:id\>
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

```

## DELETE /datasets/\<int:id\>
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

```

## GET /run/\<int:dataset_id\>/\<int:algorithm_id\>
Принимает id датасета и алгоритма в строке запроса. Запускает выбранный алгоритм на выбранном датасете и возвращает результат запуска. 
#### Строка запроса
*  `dataset_id`: Integer - id датасета
*  `algorithm_id`: Integer - id алгоритма
#### Ответ
*  Результат запуска алгоритма на датасете.
#### Пример ответа
```json

```
