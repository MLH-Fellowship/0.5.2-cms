from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# FOR TESTING API REQUESTS 
@app.route('/api/test', methods=['GET'])
def test():
    print('hello word')
    return jsonify({'res': 'Yay'})

@app.route('/')
@app.route('/<path:path>') # catch all routes and let react-router handle them
def home():
    return render_template('index.html', token="flask-react") 
    
if __name__ == '__main__':
    app.run(debug=True)