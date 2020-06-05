from flask import Response, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from database.models import Contact, User
from flask_restful import Resource

class ContactsApi(Resource):
    @jwt_required
    def get(self):
        contact = Contact.objects.to_json()
        return Response(contact, mimetype='application/json', status=200)
    
    @jwt_required
    def post(self):
        user_id = get_jwt_identity()
        body = request.get_json()
        user = User.objects.get(id=user_id)
        contact = Contact(**body, added_by=user)
        contact.save()
        user.update(push__contacts=contact)
        user.save()
        id = contact.id
        return {'id': str(contact_id)}, 200


class ContactApi(Resource):
    @jwt_required
    def put(self, id):
        user_id = get_jwt_identity()
        contact = Contact.objects.get(id=id, added_by=user_id)
        body = request.get_json()
        Contact.objects.get(id=id).update(**body)
        return '', 200

    @jwt_required
    def delete(self, id):
        user_id = get_jwt_identity()
        contact = Contact.objects.get(id=id, added_by=user_id)
        contact.delete()
        return '', 200

    @jwt_required
    def get(self, id):
        contacts = Contact.objects.get(id=id).to_json()
        return Response(contacts, mimetype="application/json", status=200)