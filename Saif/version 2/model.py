from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Employees(db.Model):

    __tablename__ ='employees'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=True)
    name = db.Column(db.String(200),nullable= False )
    email = db.Column(db.String(200),nullable= False, unique= True)
    def __init__(self,name,email):
        self.name = name
        self.email = email
    def __repr__(self):
        return f" {self.name}, {self.email}"