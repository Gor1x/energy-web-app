from app.exts import db
from sqlalchemy import text
from sqlalchemy import event

class User(db.Model):
    id=db.Column(db.Integer(), primary_key=True)
    username=db.Column(db.String(25), nullable=False, unique=True)
    email=db.Column(db.String(80), nullable=False)
    password=db.Column(db.Text(), nullable=False)

    def __repr__(self):
        return f"<User {self.username}>"
    
    def save(self):
        db.session.add(self)
        db.session.commit()


class Algorithm(db.Model):
    id=db.Column(db.Integer(), primary_key=True)
    user_id=db.Column(db.Integer())
    name=db.Column(db.String(80), nullable=False)
    file_path=db.Column(db.String(80), nullable=False, unique=True)

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self, name):
        self.name = name
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


class Dataset(db.Model):
    id=db.Column(db.Integer(), primary_key=True)
    user_id=db.Column(db.Integer())
    name=db.Column(db.String(80), nullable=False)
    file_path=db.Column(db.String(80), nullable=False, unique=True)
    num_rows=db.Column(db.Integer(), nullable=False, server_default=text('0'))

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self, name):
        self.name = name
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

@event.listens_for(Dataset.__table__, 'after_create')
def insert_default_datasets(*args, **kwargs):
    db.session.add(Dataset(user_id=-1, name='Climate_2021_2023', num_rows=145337, file_path='app\\default_datasets\\0ad7ba6c-73da-402a-92d6-52f4ba05a8df'))

    db.session.add(Dataset(user_id=-1, name='Meteo_2021_2023', num_rows=25495, file_path='app\\default_datasets\\51724a33-bb2c-42c9-8ed3-cbd7f7b061e5'))

    db.session.add(Dataset(user_id=-1, name='Power_2021_2023', num_rows=22892, file_path='app\\default_datasets\\b332e7fa-4425-4305-b8ac-dbc4466a9ffb'))

    db.session.commit()

@event.listens_for(Algorithm.__table__, 'after_create')
def insert_default_algorithms(*args, **kwargs):
    db.session.add(Algorithm(user_id=-1, name='k-means', file_path='app\\default_algorithms\\0b660859-8455-4bf5-987d-895e87f57d2f.py'))
    db.session.add(Algorithm(user_id=-1, name='birch', file_path='app\\default_algorithms\\44bfb5f6-5834-4e48-a766-e8cd698a328b.py'))
    db.session.add(Algorithm(user_id=-1, name='affinity', file_path='app\\default_algorithms\\b52dd258-c1c5-4bd7-92c2-b9195d6e86fb.py'))
    db.session.add(Algorithm(user_id=-1, name='agglomerative', file_path='app\\default_algorithms\\e0bd02a8-e3a5-4cbc-ab37-aa795b416071.py'))
    db.session.add(Algorithm(user_id=-1, name='dbscan', file_path='app\\default_algorithms\\fefd6f44-5355-43aa-ae72-d2de0a56972f.py'))
    db.session.add(Algorithm(user_id=-1, name='linear-regression', file_path='app\\default_algorithms\\1848e792-ed35-4b03-9f0f-3e0674a8b5f5.py'))
    db.session.commit()