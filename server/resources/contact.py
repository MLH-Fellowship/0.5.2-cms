from flask import Response, request
from database.models import Contact
from flask_restful import Resource

class ContactsApi(Resource):
    def get(self):
        contact = Contact.objects.to_json()
        return Response(contacts, mimetype='application/json', status=200)
    
    def post(self):
        body = request.get_json()
        contact = Contact(**body).save()
        id = contact.id
        return {'id': str(contact_id)}, 200


class ContactApi(Resource):
    def put(self, id):
        body = request.get_json()
        Contact.objects.get(id=id).update(**body)
        return '', 200

    def delete(self, id):
        contact = Contact.objects.get(id=id).delete()
        return '', 200

    def get(self, id):
        contacts = Contact.objects.get(id=id).to_json()
        return Response(contacts, mimetype="application/json", status=200)