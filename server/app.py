from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/api/test', methods=['GET'])
def test():
    print('hello word')
    return {'res': 'Yay'}

@app.route('/')
@app.route('/<path:path>')
def home():
    #this is the function responsible for generating the home page
    return render_template('index.html', token="flask-react") 


# @app.route('/all')
# def viewAll():
   
#     return render_template('update.html')

# @app.route('/user')
# def viewUser():
    
#     return render_template('user.html')
        
# @app.route('/group')
# def groups():
#     return render_template('groups.html')
    
if __name__ == '__main__':
    app.run(debug=True)