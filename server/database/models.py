from .db import db
from flask_bcrypt import generate_password_hash, check_password_hash

class Contact(db.Document):
    name = db.StringField(required=True, unique=True)
    email = db.EmailField(required=True, unique=True)
    location = db.StringField(required=True)
    date = db.DateField(required=True)
    socials = db.ListField(required=True)
    notes = db.StringField(required=True)
    added_by = db.ReferenceField('User')

class User(db.Document):
    username = db.StringField(required=True, unique=True)
    fullname = db.StringField(required=True, unique=True)
    password = db.StringField(required=True, unique=True, min_length=6)
    contacts = db.ListField(db.ReferenceField('Contact', reverse_delete_rule=db.PULL))

    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        return check_password_hash(self.password, password)


#if user is deleted so are the contacts
User.register_delete_rule(Contact, 'added_by', db.CASCADE)