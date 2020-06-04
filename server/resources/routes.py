from .contact import ContactsApi, ContactApi

def initialize_routes(api):
    api.add_resource(ContactsApi, '/api/contacts')
    api.add_resource(ContactApi, '/api/contacts/<id>')