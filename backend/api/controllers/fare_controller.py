from flask import Blueprint, request, jsonify
from ..services.fare_service import FareService

fare_api_blueprint = Blueprint('fare_api', __name__)

#API that processes an array of fares and spits out the total
@fare_api_blueprint.route('/calculate-fares', methods=['POST'])
def calculate_fares():
    try:
        fare_service = FareService()

        data = request.get_json()
        journeys = data.get('journeys', [])

        result = fare_service.calculate_daily_fare(journeys)
        return jsonify(result)

    except Exception as e:
            return jsonify({"error": f"An error occurred: {e}"}), 500
    
@fare_api_blueprint.route('/zones', methods=['GET'])
def get_zones():
    try:
        fare_service = FareService()

        result = fare_service.get_zones()
        # zones_list = [{"id": zone.id, "name": zone.zone_description} for zone in result]

        return jsonify(result)
    
    except Exception as e:
        return jsonify({"error": f"An error occurred: {e}"}), 500
