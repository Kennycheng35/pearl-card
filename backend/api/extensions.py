from flask_sqlalchemy import SQLAlchemy
import redis
import fakeredis
from . import config

db = SQLAlchemy()

#Wrapper class that initializes Redis configurations based on if it's for testing or not
class Redis:
    def __init__(self):
        self.client = None

    def init_app(self, app):
        if app.config.get('TESTING'):
            self.client = fakeredis.FakeRedis(decode_responses=True)
        else:
            self.client = redis.Redis(
                host=app.config.get('REDIS_HOST'),
                port=app.config.get('REDIS_PORT'),
                decode_responses=True
            )

    def __getattr__(self, name):
        return getattr(self.client, name)

redis_client = Redis()
