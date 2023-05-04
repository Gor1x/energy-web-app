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
   * [GET /algorithms/\<int:id\>](#get-algorithms)
   * [PUT /algorithms/\<int:id\>](#put-algorithms)
   * [DELETE /algorithms/\<int:id\>](#delete-algorithms)
* **/datasets**
   * [POST /datasets/](#post-datasets)
* **/datasets/\<int:id\>**
   * [GET /datasets/\<int:id\>](#get-datasets)
   * [PUT /datasets/\<int:id\>](#put-datasets)
   * [DELETE /datasets/\<int:id\>](#delete-datasets)
* **/run/\<int:dataset_id\>/\<int:algorithm_id\>**
   * [GET /run/\<int:dataset_id\>/\<int:algorithm_id\>](#get-run)
