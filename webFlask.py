from flask import Flask, render_template, request


app = Flask(__name__)

@app.route('/')
#when user visits site/index, they see the following:
def home():
    #this is the function responsible for generating the home page
    return render_template('index.html') 



@app.route('/all')
    
def viewAll():
   
    return render_template('update.html')

@app.route('/user')

def viewUser():
    
    return render_template('user.html')
        
@app.route('/group')

def groups():
    return render_template('groups.html')
    
app.run(host='0.0.0.0', port= 8080)