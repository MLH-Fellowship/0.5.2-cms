from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for
)
from werkzeug.exceptions import abort
from server.auth import login_required
from server.db import get_db

bp = Blueprint('contact', __name__)