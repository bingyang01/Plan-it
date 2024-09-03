from flask import request, jsonify, Blueprint
from ariadne import graphql_sync, make_executable_schema, load_schema_from_path
from .constant import PLAYGROUND_HTML
from flask import current_app as app
from .schema import schema
from datetime import datetime

routes = Blueprint('routes', __name__)

@routes.route('/graphql', methods=["GET"])
def graphql_playground():
    return PLAYGROUND_HTML, 200

@routes.route('/graphql', methods=["POST"])
def graphql_server():
    data = request.get_json()
    success, result = graphql_sync(
        schema,
        data,
        context_value=request,
        debug=app.debug
    )
    status_code = 200 if success else 400
    return jsonify(result), status_code

@routes.route('/hello')
def hello():
    return 'Hello, World!'


@routes.route('/')
def index():
    return app.send_static_file('index.html')

