from app.exts import db
from sqlalchemy import text

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