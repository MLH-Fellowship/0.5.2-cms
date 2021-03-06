# Connections
We believe that the connections made during an internship/fellowship/etc is the most valuable part of the experience, but it can also be difficult to maintain—especially for global programs such as the MLH Fellowship. You may need to keep notes of things said during a 1-on-1 meeting, their typical availability (in your time zone), their preferred modes of communication, etc. It can be overwhelming. That is why Connections is here to serve as your one-stop shop for keeping track of it all.  

## To run the app locally
#### Setup
In `/server` run the following commands
1. `$pip install virtualenv`
2. `$virtualenv venv; source venv/bin/activate`
3. `$pip install -r requirements.txt`
4. `$python app.py`

In `/client` run the following commands
1. `$npm install`
2. `$npm run watch` if in development, else `$npm run build
### Command Line Interface
 In `/cli` run the following commands
 1. `pip install typer`
    - You must have python 3.6 + installed for this to work! 
 2. `python main.py --help`
    - This will allow you to see all of the commands available to you.
    
Navigate to `http://127.0.0.1:5000/` when done! 

## Technologies Used
- Mongodb
- Flask, Flask_RESTfulApi, Flask_bcrypt, Flask_jwt_extended, Flask_mongoengine
- React
- semantic-ui-react
- Typer

#### Documentation
- [Flask-Restful](https://flask-restful.readthedocs.io/en/latest/quickstart.html)
- [Mongodb](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
- [Mongoengine](http://mongoengine.org/)
- [Flask REST API-Part:1- Using MongoDB with Flask](https://dev.to/paurakhsharma/flask-rest-api-part-1-using-mongodb-with-flask-3g7d)

## Contributors
- Amy Lei
- Fawziyah Alebiosu
- Ebonne Cabarrus

