from flask import Flask, render_template, request, jsonify

app = Flask(__name__)
FAKE_ID = 0

@app.route('/api/login', methods=['POST', 'GET'])
def login():
    # authenticate the user 
    # if successful return all data associated with the user (groups and contacts)
    # store in cookies/sessions(?)
    return jsonify({})

@app.route('/api/logout', methods=['POST'])
def logout():
    # log user out by clearing session/cookies(?)
    return jsonify({})

@app.route('/api/new-contact', methods=['POST'])
def contacts():
    """
    Endpoint for associating new contact with the given user
    in the data.
    
    Params:
    @_id (int): unique id associated with the user
    @contact (object): info about the contact to be created
    """
    if request.method == 'POST':
        # create contact 
        # generate unique id for that contact (hash email?)
        # use that hash to also get avatar from: https://api.adorable.io/avatars/285/{hash}.png
        # add to db
        # return contact just created
        pass

    return jsonify({})

@app.route('/api/contacts', methods=['POST'])
def update_contact():
    """
    Endpoint for updating existing contact associated with the given user

    Params:
    @_id (int): unique id associated with the user
    @contact_id (int): unqiue id associated with the contact
    @key (string): the data that was updated
    @vaue (string): the value of the update 
    """
    if request.method == 'POST':
        # find contact associated with contact_id 
        # replace the data associated with them unless 
        # the type is "group" (in which you append and you will need to update the group info as well!)
        # save and return
        pass

    return jsonify({})

@app.route('/api/new-group', methods=['POST'])
def add_group():
    """
    Endpoint for creating new group for the given user

    Params
    @_id (int): unique id associated with the user
    @group_info (object): info associated with the group to be created
    """
    if request.method == 'POST':
        # create new instance of group (name will be the identifier since it makes no sense to have dupes)
        # if name already exists, return error/indicator
        # else append to user's list of groups
        pass

    return jsonify({})

@app.route('/api/groups', methods=['POST'])
def update_group():
    """
    Endpoint for updating existing group associated with given user

    Params
    @_id (int): unique id associated with the user
    @group_name (string): unique identifier associated with the group
    @key (string): the data to be modified
    @value (string/int): the new value for the key
    """
    if request.method == 'POST':
        # get the group associated with the user
        # update the key with the value
        # if key == 'contacts' then append the value instead
        pass

    return jsonify({})

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