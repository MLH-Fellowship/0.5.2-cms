from .db import db

class User(db.Document):
    name = db.StringField(required=True)
    email = db.EmailField(required=True, unique=True)
    password = db.StringField(required=True, unique=True, min_length=6)

class Contact(db.Document):
    name = db.StringField(required=True, unique=True)
    email = db.StringField(required=True, unique=True)
    location = db.StringField(required=True)
    date = db.DateField(required=True)
    socials = db.ListField(required=True)
    notes = db.StringField(required=True)