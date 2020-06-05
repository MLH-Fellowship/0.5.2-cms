from flask import Response, request
from flask_jwt_extended import create_access_token
from database.models import User
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
        return {'id': str(id)}, 200


class LoginApi(Resource):
    def post(self):
        body = request.get_json()
        user = User.objects.get(username=body.get('username'))
        # TODO: account for case where username was invalid 
        authorized = user.check_password(body.get('password'))

        if not authorized:
            return {'error': 'Email or password invalid'}, 401

        # TODO: return the user's list of contacts and groups as well
        expires = datetime.timedelta(days=7)
        access_token = create_access_token(identity=str(user.id), expires_delta=expires)
        return {'token': access_token}, 200