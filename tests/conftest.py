import pytest
from flaskr import create_app
import googlemaps

@pytest.fixture(scope='session')
def app():
    app = create_app()
    app.config.update({
        "TESTING": True,
        # "GOOGLE_PLACES_API_KEY": "AIzaSyDycyuW05OS9hQzBqIfkVwC8erakfIS0O0",
    })
    yield app

@pytest.fixture(scope='session')
def client(app):
    return app.test_client()

@pytest.fixture(scope='session')
def runner(app):
    return app.test_cli_runner()

# @pytest.fixture
# def mocker():
#     with pytest.MonkeyPatch.context() as mp:
#         yield mp