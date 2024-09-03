from flaskr.schema import resolve_all_poi_data, resolve_poi_data_by_tag, resolve_poi_data_by_filters, \
    resolve_nearby_places, resolve_place_details, resolve_mock_nearby_places, resolve_mock_place_details, resolve_get_nearby_events, resolve_event_details, resolve_get_all_poi_busyness
import pytest
from flask_pymongo import PyMongo

@pytest.fixture
def app():
    from flask import Flask
    app = Flask(__name__)
    app.config['GOOGLE_PLACES_API_KEY'] = 'fake-api-key'
    app.config['TICKETMASTER_API_KEY'] = 'fake-api-key'
    return app



# test resolver for mock data
def test_resolve_mock_nearby_places(app):
    with app.app_context():
        info = None
        location = "40.748817,-73.985428"
        radius = 1000
        placeTypes = ["restaurant", "bar"]
        result = resolve_mock_nearby_places(None, info, location, radius, placeTypes)
        assert isinstance(result, list)
        assert len(result) > 0
        assert "place_id" in result[0]
        assert "name" in result[0]

def test_resolve_mock_place_details(app):
    with app.app_context():
        info = None
        placeId = "EXAMPLE_PLACE_ID_2"
        result = resolve_mock_place_details(None, info, placeId)
        assert isinstance(result, dict)
        assert "place_id" in result
        assert "name" in result



def mocked_get_nearby_places(*args, **kwargs):
    return [
        {
            "place_id": "ChIJN1t_tDeuEmsRUsoyG83frY4",
            "name": "Mock Place",
            "formattedAddress": "Mock Address",
            "rating": 4.5,
            "userRatingCount": 100,
            "location": {"lat": 40.748817, "lng": -73.985428},
            "types": ["restaurant"],
            "openNow": True,
            "photos": ["photo1", "photo2"]
        }
    ]

def mocked_get_place_details(*args, **kwargs):
    return {
        "name": "Mock Place",
        "formattedAddress": "Mock Address",
        "rating": 4.5,
        "userRatingCount": 100,
        "location": {"lat": 40.748817, "lng": -73.985428},
        "types": ["restaurant"],
        "internationalPhoneNumber": "+1234567890",
        "website": "http://mockplace.com",
        "openingHours": {
            "openNow": True,
            "periods": [
                {
                    "open": {"day": 1, "hour": 9, "minute": 0},
                    "close": {"day": 1, "hour": 17, "minute": 0}
                }
            ],
            "weekdayDescriptions": ["Monday: 9:00 AM – 5:00 PM"],
            "specialDays": [
                {"date": {"year": 2023, "month": 12, "day": 25}}
            ]
        },
        "googleMapsUri": "http://maps.google.com/?q=mockplace",
        "photos": ["photo1", "photo2"]
    }

# Mock Ticketmaster API responses
def mocked_get_nearby_events(*args, **kwargs):
    return [
        {
            "place_id": "1",
            "name": "Mock Event",
            "types": "concert",
            "formattedAddress": "123 Main St, City, State, Country",
            "rating": 4.5,
            "userRatingCount": 100,
            "openNow": True,
            "location": {"lat": 40.748817, "lng": -73.985428},
            "photos": ["photo1", "photo2"]
        }
    ]

def mocked_get_event_datail(*args, **kwargs):
    return {
        "place_id": "1",
        "name": "Mock Event",
        "types": "concert",
        "formattedAddress": "123 Main St, City, State, Country",
        "internationalPhoneNumber": "+1234567890",
        "website": "http://mockevent.com",
        "openingHours": "2023-12-01T20:00:00Z"
    }

# Tests for Google API resolvers
def test_resolve_nearby_places(app, mocker):
    with app.app_context():
        info = None
        location = "40.748817,-73.985428"
        radius = 1000
        placeTypes = ["restaurant", "bar"]
        keyword = "coffee"

        mocker.patch('flaskr.schema.get_nearby_places', side_effect=mocked_get_nearby_places)

        result = resolve_nearby_places(None, info, location, radius, placeTypes, keyword)

        assert isinstance(result, list)
        assert len(result) > 0
        assert result[0]["name"] == "Mock Place"
        assert result[0]["rating"] == 4.5
        assert result[0]["formattedAddress"] == "Mock Address"
        assert result[0]["userRatingCount"] == 100
        assert result[0]["location"] == {"lat": 40.748817, "lng": -73.985428}
        assert result[0]["types"] == ["restaurant"]
        assert result[0]["openNow"] is True
        assert result[0]["photos"] == ["photo1", "photo2"]

def test_resolve_place_details(app, mocker):
    with app.app_context():
        info = None
        placeId = "ChIJN1t_tDeuEmsRUsoyG83frY4"

        mocker.patch('flaskr.schema.get_place_details', side_effect=mocked_get_place_details)

        result = resolve_place_details(None, info, placeId)

        assert isinstance(result, dict)
        assert result["name"] == "Mock Place"
        assert result["formattedAddress"] == "Mock Address"
        assert result["rating"] == 4.5
        assert result["userRatingCount"] == 100
        assert result["location"] == {"lat": 40.748817, "lng": -73.985428}
        assert result["types"] == ["restaurant"]
        assert result["internationalPhoneNumber"] == "+1234567890"
        assert result["website"] == "http://mockplace.com"
        assert result["openingHours"]["openNow"] is True
        assert result["openingHours"]["periods"] == [
            {
                "open": {"day": 1, "hour": 9, "minute": 0},
                "close": {"day": 1, "hour": 17, "minute": 0}
            }
        ]
        assert result["openingHours"]["weekdayDescriptions"] == ["Monday: 9:00 AM – 5:00 PM"]
        assert result["openingHours"]["specialDays"] == [
            {
                "date": {"year": 2023, "month": 12, "day": 25}
            }
        ]
        assert result["photos"] == ["photo1", "photo2"]

# Tests for Ticketmaster API resolvers
def test_resolve_get_nearby_events(app, mocker):
    with app.app_context():
        info = None
        location = "40.748817,-73.985428"
        radius = 1000
        start_date_time = "2023-12-01T00:00:00Z"
        keyword = "music"
        size = 10

        mocker.patch('flaskr.schema.get_nearby_events', side_effect=mocked_get_nearby_events)

        result = resolve_get_nearby_events(None, info, location, radius, start_date_time, keyword, size)

        assert isinstance(result, list)
        assert len(result) > 0
        assert result[0]["name"] == "Mock Event"
        assert result[0]["types"] == "concert"
        assert result[0]["formattedAddress"] == "123 Main St, City, State, Country"
        assert result[0]["location"] == {"lat": 40.748817, "lng": -73.985428}

def test_resolve_event_details(app, mocker):
    with app.app_context():
        info = None
        eventID = "1"

        mocker.patch('flaskr.schema.get_event_datail', side_effect=mocked_get_event_datail)

        result = resolve_event_details(None, info, eventID)

        assert isinstance(result, dict)
        assert result["name"] == "Mock Event"
        assert result["types"] == "concert"
        assert result["formattedAddress"] == "123 Main St, City, State, Country"
        assert result["internationalPhoneNumber"] == "+1234567890"
        assert result["website"] == "http://mockevent.com"
        assert result["openingHours"] == "2023-12-01T20:00:00Z"