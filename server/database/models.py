from .db import db
from flask_bcrypt import generate_password_hash, check_password_hash

class Contact(db.Document):
    name = db.StringField(required=True)
    email = db.EmailField(required=True)
    location = db.StringField(required=True)
    date = db.StringField(required=True)
    groups = db.ListField(default=list)
    socials = db.ListField(default=list)
    notes = db.StringField(required=True)
    image = db.StringField(required=True)
    added_by = db.ReferenceField('User')

class Group(db.Document):
    group = db.StringField(required=True)
    description = db.StringField(required=True)
    contacts = db.ListField(default=list)
    added_by = db.ReferenceField('User')

class User(db.Document):
    username = db.StringField(required=True, unique=True)
    fullname = db.StringField() 
    password = db.StringField(required=True, min_length=6)
    contacts = db.ListField(reverse_delete_rule=db.PULL, default=list)
    groups = db.ListField(reverse_delete_rule=db.PULL, default=list)

    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        return check_password_hash(self.password, password)


#if user is deleted so are the contacts
User.register_delete_rule(Contact, 'added_by', db.CASCADE)
User.register_delete_rule(Group, 'added_by', db.CASCADE)