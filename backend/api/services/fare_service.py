from collections import defaultdict
import json
from ..models.models import FareRule, Zone, Cap
from ..extensions import redis_client
import logging

logging.basicConfig(level=logging.DEBUG)

MAX_CAP = 150


# Service that interacts with the Fare Database and Fare Cache 
# and returns the total amount of fares for an array of trips
class FareService:
    #Function to calculate a single trip
    #Hits the cache first and then the db
    def get_zones(self) -> list[int]:

        cache_key = "fares"
        cached_zones = redis_client.get(cache_key)
        
        if cached_zones is not None:
            return json.loads(cached_zones)
        
        zones = Zone.query.all()

        # json_zone = json.dumps(zones)
        zones_list = [{"id": zone.id, "name": zone.zone_description} for zone in zones]

        if zones:
            redis_client.setex(cache_key, 86400, json.dumps(zones_list))

        return zones_list if zones else []        
    
    def get_cap(self) -> int:

        cache_key = "cap"
        cached_cap = redis_client.get(cache_key)

        if cached_cap is not None:
            return int(cached_cap)
        
        cap = Cap.query.first()

        if cap:
            redis_client.setex(cache_key, 86400, cap.max_cap)
        
        return int(cap.max_cap)

    def get_single_fare(self, from_zone: int, to_zone: int) -> int:

        min_zone, max_zone = sorted((from_zone, to_zone))

        cache_key = f"{min_zone}:{max_zone}"
        cached_fare = redis_client.get(cache_key)

        if cached_fare is not None:
            return int(cached_fare)

        rule = FareRule.query.filter_by(from_zone_id=min_zone, to_zone_id=max_zone).first()
        
        if rule:
            fare = rule.fare
            redis_client.setex(cache_key, 86400, fare)

        return rule.fare if rule else 0

    #Function to calculate the total fare for an array of trips
    #Goes through the array and then records and updates the total
    def calculate_daily_fare(self, journeys: list[dict], max_daily_cap = MAX_CAP) -> dict:

        journeys_by_date = defaultdict(list)

        for journey in journeys:
            journeys_by_date[journey.get('date')].append(journey)
        
        total_daily_fare = 0
        processed_journeys = []

        for date, daily_journeys in journeys_by_date.items():
            total_fare = 0

            for journey in daily_journeys:
                from_zone = int(journey.get('from_zone'))
                to_zone = int(journey.get('to_zone'))
                fare = self.get_single_fare(from_zone, to_zone)

                remaining_headroom = max(0, max_daily_cap - total_fare)
                fare_to_charge = min(fare, remaining_headroom)

                total_fare += fare_to_charge

                processed_journeys.append({
                    "date": date,
                    "from_zone": from_zone,
                    "to_zone": to_zone,
                    "fare": fare_to_charge,
                })
            
            total_daily_fare += total_fare

        return {
            "processed_journeys": processed_journeys,
            "total_daily_fare": total_daily_fare,
        }
    