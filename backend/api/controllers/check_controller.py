from flask import Blueprint, request, jsonify

check_api_blueprint = Blueprint('check_api', __name__)

# API just to check the status of the server and if it's up and endpoints are working
@check_api_blueprint.route('/check', methods=['GET'])
def check():
    return jsonify({"result":"api is working"})