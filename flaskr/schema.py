from ariadne import QueryType, make_executable_schema, load_schema_from_path
from flask_pymongo import PyMongo
from flask import current_app,request
from .utils import get_nearby_places, get_place_details,  calculate_time, calculate_future_busyness,load_mock_place_details,load_mock_nearby_places, get_nearby_events,get_event_datail
from datetime import datetime
import os
from collections import defaultdict
import pytz
import time
import logging

current_dir = os.path.dirname(os.path.abspath(__file__))
schema_path = os.path.join(current_dir, "schema_graphql.graphql")

type_defs = load_schema_from_path(schema_path)
mongo = PyMongo()

query = QueryType()
def timeit(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        execution_time = end - start
        # print("schema")
        logging.info(f"Resolver {func.__name__} executed in {execution_time:.4f} seconds")
        return result

    return wrapper

def field_with_timing(field_name):
    def decorator(func):
        func_with_timing = timeit(func)
        query.set_field(field_name, func_with_timing)
        return func_with_timing
    return decorator
@field_with_timing("allPOIData")
def resolve_all_poi_data(_, info):
    mongo = current_app.config['MONGO']
    return list(mongo.db.POIData.find())

@field_with_timing("POIDataByType")
def resolve_poi_data_by_tag(_, info, tagKey, tagValue):
    mongo = current_app.config['MONGO']
    query = {f"tags.{tagKey}": tagValue}
    return list(mongo.db.POIData.find(query))

@field_with_timing("POIDataByFilters")
def resolve_poi_data_by_filters(_, info, filters):
    mongo = current_app.config['MONGO']
    query = {}

    if "tags" in filters and filters["tags"]:
        for tag_filter in filters["tags"]:
            if "key" in tag_filter and "value" in tag_filter:
                query[f"tags.{tag_filter['key']}"] = tag_filter["value"]

    if "latMin" in filters and "latMax" in filters:
        query["lat"] = {"$gte": filters["latMin"], "$lte": filters["latMax"]}

    if "lonMin" in filters and "lonMax" in filters:
        query["lon"] = {"$gte": filters["lonMin"], "$lte": filters["lonMax"]}

    return list(mongo.db.POIData.find(query))


''' Google API calls'''
# mock data

@field_with_timing('mockNearbyPlaces')
def resolve_mock_nearby_places(_, info, location, radius, placeTypes):
    mock_nearby_places = load_mock_nearby_places()
    return mock_nearby_places

@field_with_timing("mockPlaceDetails")
def resolve_mock_place_details(_, info, placeId):
    mock_place_details = load_mock_place_details()
    for place in mock_place_details:
        if place.get('place_id') == placeId:
            return place
    return None


@field_with_timing("nearbyPlaces")
def resolve_nearby_places(_, info, location, radius, placeTypes, keyword = None):
    # print("hello")
    places = get_nearby_places(location, radius, placeTypes, keyword)
    return [
        { "place_id": place.get('place_id'),
            "name": place.get('name'),
            "formattedAddress": place.get('formattedAddress'),
            "rating": place.get('rating'),
            "userRatingCount": place.get('userRatingCount'),
            "location": {
                "lat": place['location']['lat'],
                "lng": place['location']['lng']
            },
            "types": place.get('types'),
             "openNow": place.get('openNow'),
            "photos": place.get('photos')
        } for place in places
    ]

@field_with_timing("placeDetails")
def resolve_place_details(_, info, placeId):
    place = get_place_details(placeId)
    return {
        "name": place.get('name'),
        "formattedAddress": place.get('formattedAddress'),
        "rating": place.get('rating'),
        "userRatingCount": place.get('userRatingCount'),
        "location": {
            "lat": place['location']['lat'],
            "lng": place['location']['lng']
        },
        "openNow": place['openingHours'].get('openNow'),
        "website": place.get('website'),
        "types": place.get('types'),
        "internationalPhoneNumber": place.get('internationalPhoneNumber'),
        "googleMapsUri": place.get('googleMapsUri'),
        "openingHours": {
            "openNow": place['openingHours'].get('openNow'),
            "periods": [
                {
                    "open": {
                        "day": period['open'].get('day'),
                        "hour": period['open'].get('hour'),
                        "minute": period['open'].get('minute')
                    } if period.get('open') else None,
                    "close": {
                        "day": period['close'].get('day'),
                        "hour": period['close'].get('hour'),
                        "minute": period['close'].get('minute')
                    } if period.get('close') else None
                } for period in place['openingHours'].get('periods', [])
            ],
            "weekdayDescriptions": place['openingHours'].get('weekdayDescriptions'),
            "specialDays": [
                {
                    "date": {
                        "year": special_day['date'].get('year'),
                        "month": special_day['date'].get('month'),
                        "day": special_day['date'].get('day')
                    }
                } for special_day in place['openingHours'].get('specialDays', [])
            ]
        } if place.get('openingHours') else None,

        "photos": place.get('photos')
    }
"""
Events Data
"""

@field_with_timing("nearbyEvents")
def resolve_get_nearby_events(_, info,location, radius, start_date_time = None, keyword = None, size = 20):
    events = get_nearby_events(location, radius, start_date_time, keyword, size)
    return[
        {
            "place_id": event.get("place_id"),
            "name": event.get("name"),
            "types": event.get("types"),
            "formattedAddress": event.get("formattedAddress"),
            "rating": event.get("rating"),
            "userRatingCount": event.get("userRatingCount"),
            "openNow": event.get("openNow"),
            "location": {
                "lat": event['location']['lat'],
                "lng": event['location']['lng']
            },
            "photos": event.get('photos')
        }for event in events
    ]


@field_with_timing("eventDetails")
def resolve_event_details(_, info,eventID):
    event = get_event_datail(eventID)
    return{
            "place_id": event.get("place_id"),
            "name": event.get("name"),
            "types": event.get("types"),
            "internationalPhoneNumber": event.get("internationalPhoneNumber"),
            "website": event.get("website"),
            "openingHours": event.get("openingHours"),
            "formattedAddress": event.get("formattedAddress"),
    }

# mock busyness data

# get all poi busyness level and show them on the map

@field_with_timing("getAllZoneBusyness")
def resolve_get_all_poi_busyness(_, info,input_datetime = None,input_date = None ):
    if input_datetime and input_date:
        raise ValueError("Please provide either input_datetime or input_date, but not both.")
    mongo = current_app.config['MONGO']

    collection = mongo.db.BusynessPoints

    results = collection.find()
    response = defaultdict(list)

    if input_datetime:
        input_datetime = datetime.strptime(input_datetime, "%Y-%m-%d %H:%M:%S")
        input_datetime = input_datetime.replace(minute=0, second=0, microsecond=0)
        input_datetime = str(input_datetime)

    if input_date:
        input_date = datetime.strptime(input_date, "%Y-%m-%d")
        input_date = input_date.strftime("%Y-%m-%d")


    for result in results:
        centroids = result['centroid']
        zoneID = result['zoneID']
        time_keys = result['data'][0]
        busyness_levels = result['data'][1]

        # print(f"Processing document with centroid: {centroids}")
        # print(f"Number of time keys: {len(time_keys)}")
        # print(f"Number of busyness levels: {len(busyness_levels)}")


        for i in range(len(time_keys)):
            # print(f"index: {i}")
            time_key = time_keys[i]
            busyness_level = busyness_levels[i]


            if (input_datetime is None and input_date is None) or (input_datetime and input_datetime == time_key) or (input_date and input_date in time_key):
                response[time_key].append({
                    "zoneID": zoneID,
                     "centroid": {
                        "longitude": centroids[0],
                        "latitude": centroids[1]
                },
                    "busynessLevel":busyness_level,
                    "message": "Successful."
                })

    zone_busyness = []
    for time_key, location in response.items():
        zone_busyness.append({
            "timeKey": time_key,
            "locations": location
        })
    return zone_busyness
    # time_index = calculate_time(input_datetime)
    # if time_index == -1:
    #     return [{
    #         "centroid": {
    #             "longitude": None,
    #             "latitude": None
    #         },
    #         "busynessLevel": None,
    #         "message": "Please enter a time that is greater than the current time."
    #     }]
    # if time_index == -2:
    #     return [{
    #         "centroid": {
    #             "longitude": None,
    #             "latitude": None
    #         },
    #         "busynessLevel": None,
    #         "message": "Please enter a time within the next 3 days."
    #     }]
    #
    # results = collection.find()
    # response = []
    #
    # for result in results:
    #     busyness_level = result['data'][1][time_index]
    #     response.append({
    #         "centroid": {
    #             "longitude": result['centroid'][0],
    #             "latitude": result['centroid'][1]
    #         },
    #         "busynessLevel":busyness_level,
    #         "message": "Successful."
    #     })


#get certain timepoint of poi

@field_with_timing("getCertainZoneBusyness")
def resolve_get_certain_poi_busyness(_,info, centroid, input_datetime):
    mongo = current_app.config['MONGO']
    collection = mongo.db.BusynessPoints


    time_index = calculate_time(input_datetime)
    if time_index == -1:
        return {
            "centroid": centroid,
            "busynessLevel": None,
            "message": "Please enter a time that is greater than the current time."
        }
    if time_index == -2:
        return {
            "centroid": centroid,
            "busynessLevel": None,
            "message": "Please enter a time within the next 3 days."
        }

    result = collection.find_one({"centroid":{"$all": [centroid['longitude'], centroid['latitude']]}})
    if result and 'data' in result:
        busyness_level = result['data'][1][time_index]
        return {
            "centroid": centroid,
            "busynessLevel":busyness_level,
            "message": "Successful."
        }
    return None

# get certain poi busyness for future 24 hours
@field_with_timing("getCertainZoneFutureBusyness")
def resolve_get_remaining_certain_poi_busyness(_, info, centroid, input_datetime):
    mongo = current_app.config['MONGO']
    collection = mongo.db.BusynessPoints

    time_index = calculate_time(input_datetime)
    if time_index == -1:
        return [
            {"hour": -1, "busynessLevel": -1, "message": "Please enter a time that is greater than the current time."}]
    if time_index == -2:
        return [
            {"hour": -1, "busynessLevel": -1, "message": "Please enter a time within the next 3 days."}]

    result = collection.find_one({"centroid": {"$all": [centroid['longitude'], centroid['latitude']]}})
    if result and 'data' in result:
        remaining_busyness = calculate_future_busyness(result['data'][1], input_datetime)
        return remaining_busyness
    return [{"hour": -1, "busynessLevel": -1, "message": "can't find result."}]




schema = make_executable_schema(type_defs, query)
