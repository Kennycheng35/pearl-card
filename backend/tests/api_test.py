from unittest.mock import MagicMock
from api.services.fare_service import FareService


def test_get_single_fare_from_db(mocker, client): 
 
    mock_rule = MagicMock()
    mock_rule.fare = 55
    
    mock_FareRule = mocker.patch('api.services.fare_service.FareRule')
    mock_FareRule.query.filter_by.return_value.first.return_value = mock_rule

    service = FareService()
    fare = service._get_single_fare(from_zone=1, to_zone=2)
    
    assert fare == 55


def test_calculate_fares_endpoint(client, mocker):
    mocker.patch('api.services.fare_service.FareService._get_single_fare', return_value=55)
    
    response = client.post('/calculate-fares', json={
        "journeys": [
            {"from_zone": 1, "to_zone": 2}
        ]
    })
    
    assert response.status_code == 200
    
    data = response.get_json()
    assert data['total_daily_fare'] == 55
    assert data['processed_journeys'][0]['fare'] == 55