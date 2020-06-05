from .contact import ContactsApi, ContactApi
from .auth import RegisterApi, LoginApi

def initialize_routes(api):
    api.add_resource(ContactsApi, '/api/contacts')
    api.add_resource(ContactApi, '/api/contacts/<id>')

    api.add_resource(RegisterApi, '/api/auth/register')
    api.add_resource(LoginApi, '/api/auth/login')