import functools
from flask import (
    Blueprint, flash, g, redirect, render_template,
    request, session, url_for)
from werkzeug.security import check_password_hash, generate_password_hash
from server.db import get_db


bp = Blueprint('auth', __name__, url_prefix='/auth')

#Register
@bp.route('/register', methods=('GET', 'POST'))
def register():
    if request.method == 'POST':
        
        username = request.form['username']
        pw = request.form['password']
        full_name = request.form['full_name']
        db = get_db()
        error = None

        if not username:
            error = 'Username is required.'
        elif not pw:
            error = 'Password is required.'
        elif not full_name:
            error = 'Full name is required.'
        elif db.execute(
            'SELECT id FROM person WHERE username = ?', (username,)
        ).fetchone() is not None:
            error = 'User {} is already registered.'.format(username)

        if error is None:
            db.execute(
                'INSERT INTO person(username, pw) VALUES (?, ?)',
                (username, generate_password_hash(pw))
            )
            db.commit()
            return redirect(url_for('auth.login'))

        flash(error)

    return render_template('insert template')
#Login
@bp.route('/login', methods = ('GET', 'POST'))
def login():
    if request.method == 'POST':
        username = request.form['username']
        pw = request.form['password']
        full_name = request.form['full_name']
        db = get_db()
        error = None
        user = db.execute(
            'SELECT * FROM user WHERE username = ?', (username,)
        ).fetchone()
        
        if user is None:
            error = 'Incorrect username.'
        elif not check_password_hash(user['pw'], pw):
            error = 'Incorrect password.'

        if error is None:
            session.clear()
            session['user_id'] = user['id']
            return redirect(url_for('index'))

        flash(error)
    
    return render_template('insert template here')

#checks if user is already logged in
@bp.before_app_request
def load_logged_in_user():
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        g.user = get_db().execute(
            'SELECT * FROM user WHERE id = ?', (user_id,)
        ).fetchone()

    
    #Logout
    @bp.route('/logout')
    def logout():
        session.clear()
        return redirect('url_for'('index'))

    #require user to be logged in
    def login_required(view):
        @functool.wraps(view)
        def wrapped_view(**kwargs):
            if g.user is None:
                return redirect(url_for('auth.login'))
            
            return view(**kwargs)
        
        return wrapped_view