import pytest
from app import create_app
from api.extensions import db as _db
from api.config import DBTestingConfig

@pytest.fixture(scope='session')
def app():
    # Set up the app with a test config
    app = create_app(config_class=DBTestingConfig)
    app.config.update({
        "TESTING": True,
        "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:",
        "CACHE_TYPE": "SimpleCache"  
    })

    with app.app_context():
        _db.create_all()
        yield app
        _db.drop_all()

@pytest.fixture()
def client(app):
    return app.test_client()