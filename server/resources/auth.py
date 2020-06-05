from flask import Response, request
from flask_jwt_extended import create_access_token
from database.models import User
from database.models import Contact
from database.models import Group
from flask_restful import Resource
import datetime

class RegisterApi(Resource):
    def post(self):
        body = request.get_json()
        # TODO: return error if username not unique
        user = User(**body)
        user.hash_password()
        user.save()
        id = user.id
        return {'id': str(id), 'username': user.username, 'groups': user.groups, 'contacts': user.contacts, 'error':''}, 200


class LoginApi(Resource):
    def post(self):
        body = request.get_json()
        user = User.objects.get(username=body.get('username'))
        print(user)
        # TODO: account for case where username was invalid 
        authorized = user.check_password(body.get('password'))

        if not authorized:
            return {'error': 'Email or password invalid'}, 401

        expires = datetime.timedelta(days=7)
        access_token = create_access_token(identity=str(user.id), expires_delta=expires)
        return {'id': str(id), 'username': user.username, 'groups': user.groups, 'contacts': user.contacts, 'error': ''}, 200
