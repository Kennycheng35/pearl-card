from flask import Flask
from flask_cors import CORS
from api.controllers.fare_controller import fare_api_blueprint
from api.controllers.check_controller import check_api_blueprint
from api.extensions import db, redis_client  
from api.config import DBConfig


def create_app(config_class=DBConfig):
    app = Flask(__name__)
    CORS(app)

    app.config.from_object(config_class)

    db.init_app(app)
    redis_client.init_app(app)

    app.register_blueprint(fare_api_blueprint)
    app.register_blueprint(check_api_blueprint)
    return app

app = create_app(config_class=DBConfig)

if __name__ == '__main__':
    print("Running Service")
    app.run(host='0.0.0.0', debug=True, port=5001)