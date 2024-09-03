import googlemaps
from flask import current_app,request
import time
import os
import json
import logging
from collections import defaultdict
from datetime import datetime, timedelta
from . import logging_config
import requests
import pytz

"""Used to track api calls"""
API_CALL_COUNT_FILE = "api_call_count.json"
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

api_call_count = defaultdict(list)

def timeit(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        execution_time = end - start
        logging.info(f"Function {func.__name__} executed in {execution_time:.4f} seconds")
        return result

    return wrapper


# mock google api data
@timeit
def load_mock_nearby_places():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    filepath = os.path.join(base_dir, 'mock_data', 'nearby_places_mock.json')
    with open(filepath ) as f:
        return json.load(f)['data']['nearbyPlaces']

@timeit
def load_mock_place_details(filepath=None):
    if filepath is None:
        base_dir = os.path.dirname(os.path.abspath(__file__))
        filepath = os.path.join(base_dir, 'mock_data', 'place_detail_mock.json')
    with open(filepath) as f:
        return json.load(f)['data']["placeDetails"]


def check_api_limit(ip_address):
    global api_call_count
    current_time = time.time()

    api_call_count[ip_address] = [timestamp for timestamp in api_call_count[ip_address] if
                                  current_time - timestamp < 600]

    if len(api_call_count[ip_address]) > 300:
        logging.warning(f"IP {ip_address} has made more than 300 API calls in the last 10 minutes.")


@timeit
def get_nearby_places(location, radius, place_types, keyword = None):
    global api_call_count
    api_key = current_app.config.get('GOOGLE_PLACES_API_KEY')
    gmaps = googlemaps.Client(key=api_key)
    places = []

    if request.headers.getlist("X-Forwarded-For"):
        ip_address = request.headers.getlist("X-Forwarded-For")[0]
    else:
        ip_address = request.remote_addr

    for place_type in place_types:
        places_result = gmaps.places_nearby(location=location, radius=radius, type=place_type, keyword = keyword)
        api_call_count[ip_address].append(time.time())
        logging.info(f"get_nearby_places: Google API call made by IP: {ip_address}, time:{datetime.now()} \n API Details: location: {location}, radius:{radius}, place_types: {place_types}")
        check_api_limit(ip_address)

        # while True:
        for place in places_result['results']:
            # pprint(place)
            place_obj = {
                "place_id":place['place_id'],
                "name": place.get('name'),
                "openNow": place.get('openNow'),
                "formattedAddress": place.get('vicinity'),
                "rating": place.get('rating'),
                "userRatingCount": place.get('user_ratings_total'),
                "location": {
                    "lat": place['geometry']['location']['lat'],
                    "lng": place['geometry']['location']['lng']
                },
                "types": place.get('types'),
                "photos": format_photos(place.get('photos', []))
                # "internationalPhoneNumber": place.get('international_phone_number'),
                # "website": place.get('website'),
                # "openingHours": format_opening_hours(place.get('opening_hours'))

            }
            places.append(place_obj)

            # if 'next_page_token' not in places_result:
            #     break
            # next_page_token = places_result['next_page_token']
            # time.sleep(3)
            # places_result = gmaps.places_nearby(location=location, radius=radius, type=place_type, keyword = keyword,
            #                                     page_token=next_page_token)
            # api_call_count[ip_address].append(time.time())
            # logging.info(f"get_nearby_places: Google API call made by IP: {ip_address}, time:{datetime.now()} \n API Call Details: location: {location}, radius:{radius}, place_types: {place_types}")
            # check_api_limit(ip_address)

    return places

"""When user click on the certain POI, the detail information will be passed"""
@timeit
def get_place_details(place_id):
    global api_call_count
    api_key = current_app.config.get('GOOGLE_PLACES_API_KEY')
    gmaps = googlemaps.Client(key=api_key)

    if request.headers.getlist("X-Forwarded-For"):
        ip_address = request.headers.getlist("X-Forwarded-For")[0]
    else:
        ip_address = request.remote_addr

    place_details = gmaps.place(place_id = place_id)['result']
    api_call_count[ip_address].append(time.time())
    logging.info(f"get_place_details: Google API call made by IP: {ip_address}, time:{datetime.now()} \n API Call Details: place_id: {place_id}")
    check_api_limit(ip_address)


    place_obj = {
        "name": place_details.get('name'),
        "formattedAddress": place_details.get('formatted_address'),
        "rating": place_details.get('rating'),
        "userRatingCount": place_details.get('user_ratings_total'),
        "location": {
            "lat": place_details['geometry']['location']['lat'],
            "lng": place_details['geometry']['location']['lng']
        },
        "types": place_details.get('types'),
        "internationalPhoneNumber": place_details.get('international_phone_number'),
        "website": place_details.get('website'),
        "openingHours": format_opening_hours(place_details.get('opening_hours')),
        "googleMapsUri": place_details.get('url'),
        "photos": format_photos(place_details.get('photos', []))
    }
    return place_obj
def format_opening_hours(opening_hours):
    if not opening_hours:
        return None

    periods = []
    for period in opening_hours.get('periods', []):
        periods.append({
            "open": format_point(period.get('open')),
            "close": format_point(period.get('close'))
        })

    special_days = []
    for special_day in opening_hours.get('special_days', []):
        special_days.append({
            "date": format_date(special_day.get('date'))
        })

    return {
        "openNow": opening_hours.get('open_now'),
        "periods": periods,
        "weekdayDescriptions": opening_hours.get('weekday_text'),
        "specialDays": special_days
    }

def format_point(point):
    if not point:
        return None

    return {
        "day": point.get('day'),
        "hour": int(point.get('time', '0000')[:2]),
        "minute": int(point.get('time', '0000')[2:])
    }

def format_date(date):
    if not date:
        return None

    return {
        "year": date.get('year'),
        "month": date.get('month'),
        "day": date.get('day')
    }

def format_photos(photos):
    if not photos:
        return []

    return [
        {
            "photoReference": photo.get('photo_reference'),
            "height": photo.get('height'),
            "width": photo.get('width'),
            "url": generate_photo_url(photo.get('photo_reference'))
        } for photo in photos[:3]
    ]

def generate_photo_url(photo_reference):
    api_key = current_app.config.get('GOOGLE_PLACES_API_KEY')
    return f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference={photo_reference}&key={api_key}"



"""
Connect to ticketmaster API and return event data
"""
@timeit
def get_nearby_events(location, radius, start_date_time = None, keyword = None, size = 20):
    url = "https://app.ticketmaster.com/discovery/v2/events.json"
    params = {
        "apikey":current_app.config.get('TICKETMASTER_API_KEY'),
        "latlong":location,
        "radius": radius,
        "startDateTime": start_date_time,
        "keyword": keyword,
        "size": size
    }
    # X-Forwarded-For: use this field to identify the ip address of user
    if request.headers.getlist("X-Forwarded-For"):
        # get real ip address/original user ip
        ip_address = request.headers.getlist("X-Forwarded-For")[0]
    else:
        ip_address = request.remote_addr

    response = requests.get(url, params = params)
    response.raise_for_status()
    data = response.json()
    api_call_count[ip_address].append(time.time())
    logging.info(f"get_nearby_events: Ticketmaster API call made by IP: {ip_address}, time: {datetime.now()} \n API Details: location: {location}, radius: {radius}, keyword: {keyword}")
    check_api_limit(ip_address)

    events = []
    if "_embedded" in data:
        for event in data['_embedded']['events']:
            venue = event['_embedded']['venues'][0]
            location = venue['location']
            latitude = location['latitude']
            longitude = location['longitude']
            city = venue.get('city', {}).get('name', '')
            state = venue.get('state', {}).get('name', '')
            country = venue.get('country', {}).get('name', '')
            address = venue.get("address", {}).get("line1", '')
            event_obj = {
                "place_id": event.get("id"),
                "name": event.get("name"),
                "types": event.get('type'),
                "formattedAddress": ', '.join(filter(None, [address, city, state, country])),
                "rating" : "",
                "openNow": " ",
                "userRatingCount": "",
                "location":{
                    "lat": latitude,
                    "lng": longitude
                },
                "photos":format_photos_event(event.get('images'))
            }
            events.append(event_obj)
    return events
def format_photos_event(photos):
    if not photos:
        return []

    return [
        {
            "photoReference": " ",
            "height": photo.get('height'),
            "width": photo.get('width'),
            "url": photo.get('url')
        } for photo in photos[:3]
    ]

@timeit
def get_event_datail(eventID):
    url = f"https://app.ticketmaster.com/discovery/v2/events/{eventID}.json"
    params = {
        "apikey": current_app.config.get('TICKETMASTER_API_KEY'),
    }

    # X-Forwarded-For: use this field to identify the ip address of user
    if request.headers.getlist("X-Forwarded-For"):
        # get real ip address/original user ip
        ip_address = request.headers.getlist("X-Forwarded-For")[0]
    else:
        ip_address = request.remote_addr

    response = requests.get(url, params=params)
    response.raise_for_status()
    data = response.json()
    api_call_count[ip_address].append(time.time())
    logging.info(
        f"get_nearby_events: Ticketmaster API call made by IP: {ip_address}, time: {datetime.now()} \n API Details: ID {eventID}")
    check_api_limit(ip_address)

    startdate = data['dates']['start'].get("localDate")
    starttime = data['dates']['start'].get("localTime")
    start = "".join([startdate," ", starttime])

    venue = data['_embedded']['venues'][0]
    city = venue.get('city', {}).get('name', '')
    state = venue.get('state', {}).get('name', '')
    country = venue.get('country', {}).get('name', '')
    address = venue.get("address", {}).get("line1", '')

    event_obj = {
        "place_id": data.get("id"),
        "name": data.get("name"),
        "formattedAddress": ', '.join(filter(None, [address, city, state, country])),
        "types": data.get('type'),
        "internationalPhoneNumber": " ",
        "website": data.get("url"),
        "openingHours":start,
    }
    return event_obj

# mock busyness data

def calculate_time(input_datetime):
    eastern = pytz.timezone('US/Eastern')

    input_datetime = datetime.strptime(input_datetime, "%Y-%m-%d %H:%M:%S")
    input_datetime = eastern.localize(input_datetime)
    input_datetime = input_datetime.replace(minute=0, second=0, microsecond=0)
    now = datetime.now(pytz.utc)

    base_datetime = now.astimezone(eastern)
    base_datetime = base_datetime.replace(minute=0, second=0, microsecond=0)
    time_difference = input_datetime - base_datetime
    if time_difference.total_seconds() < 0:
        return -1
    if time_difference.total_seconds() >= (3 * 24 + 25) * 3600:
        return -2
    return int(time_difference.total_seconds() // 3600) % 97

def calculate_future_busyness(data, input_datetime_str):

    start_index = calculate_time(input_datetime_str)
    input_datetime = datetime.strptime(input_datetime_str, "%Y-%m-%d %H:%M:%S")
    end_index = min(start_index + 24, 72)
    remaining_time_levels = data[start_index:end_index]
    input_hour = input_datetime.hour
    hours = [(input_hour + i) % 24 for i in range(len(remaining_time_levels))]
    return [{"hour": hour, "busynessLevel": level, "message": "Successful"} for hour, level in zip(hours, remaining_time_levels)]


