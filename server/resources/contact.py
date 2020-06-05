from flask import Response, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from database.models import Contact, User
from flask_restful import Resource

class ContactsApi(Resource):
    def get(self):
        contact = Contact.objects.to_json()
        return Response(contact, mimetype='application/json', status=200)
    
    def post(self):
        body = request.get_json()
        user = User.objects.get(username=body['username'])
        contact_info = body.copy()
        del contact_info['username']
        user.contacts.append(contact_info)
        user.save()
        return {'contacts': user.contacts }, 200


class ContactApi(Resource):
    def post(self):
        body = request.get_json()
        username = body['username']
        user = User.objects.get(username=username)
        user.contacts = body['contacts']
        user.save()
        return {'new_contacts': user.contacts }, 200

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

class GroupsApi(Resource):
    def post(self):
        body = request.get_json()
        username = body['username']
        user = User.objects.get(username=username)

        group = {
            'group': body['group'],
            'description': body['description'],
            'region': body['region'],
            'contacts': body['contacts'],
        }
        
        user.groups.append(group)
        user.save()
        return { 'groups': user.groups }, 200
