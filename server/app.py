from flask import Flask, render_template
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_restful import Api
from resources.routes import initialize_routes
from database.db import initialize_db


app = Flask(__name__)
app.config.from_envvar('ENV_FILE_LOCATION')
api = Api(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb://localhost/contacts'
}

@app.route('/')
@app.route('/<path:path>') # catch all routes and let react-router handle them
def home(path=''):
    return render_template('index.html', token="flask-react")

initialize_db(app)
initialize_routes(api)

app.run(debug=True)
