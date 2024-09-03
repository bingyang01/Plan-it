from flask import Flask
from flask_pymongo import PyMongo
from sshtunnel import SSHTunnelForwarder
from flask_cors import CORS
from .schema import schema
from . import routes
from config import Config


def create_ssh_tunnel():
    """
    Create an SSH tunnel to a remote server.

    Returns:
        SSHTunnelForwarder: The SSH tunnel server object.
    """
    server = SSHTunnelForwarder(
        ssh_address_or_host='137.43.49.19',  # Remote server IP
        ssh_username='student',
        ssh_password='group4',
        remote_bind_address=('127.0.0.1', 27017)  # Remote MongoDB server address
    )
    server.start()
    return server


def create_app():
    """
    Create and configure the Flask app with an SSH tunnel for database connection.

    Returns:
        Flask: The Flask application object.
    """
    app = Flask(__name__, static_folder='../front_end/build', static_url_path='/')
    app.config.from_object(Config)
    ssh_tunnel = create_ssh_tunnel()

    # Database URI that includes the tunnel connection
    app.config['MONGO_URI'] = f'mongodb://localhost:{ssh_tunnel.local_bind_port}/NYCData'
    mongo = PyMongo(app)
    mongo.init_app(app)

    app.config['MONGO'] = mongo

    app.register_blueprint(routes.routes)

    # Enable CORS for the app
    CORS(app)

    return app
