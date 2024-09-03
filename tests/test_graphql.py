import json
import googlemaps


def test_graphql_endpoint(client):
    response = client.get("/graphql")
    assert response.status_code == 200

# def test_graphql_poi_data_by_type(client):
#     query = """
#     {
#         POIDataByType(tagKey: "tourism", tagValue: "attraction") {
#             _id
#             type
#             id
#             lat
#             lon
#             tags
#         }
#     }
#     """
#     response = client.post('/graphql', data=json.dumps({"query": query}), content_type='application/json')
#     assert response.status_code == 200
#     data = response.get_json()
#     assert "data" in data
#     assert "POIDataByType" in data["data"]
#
#
# def test_graphql_poi_data_by_filters(client):
#     query = """
#  {
#     POIDataByFilters(filters: {
#         tags: [
#             {key: "tourism", value: "attraction"},
#             {key: "wheelchair", value: "yes"}
#         ],
#         latMin: 40.0,
#         latMax: 45.0,
#         lonMin: -75.0,
#         lonMax: -70.0
#     }) {
#         _id
#         type
#         id
#         lat
#         lon
#         tags
#     }
# }
#     """
#     response = client.post('/graphql', data = json.dumps({'query': query}), content_type = 'application/json')
#     assert response.status_code == 200
#     data = response.get_json()
#     assert "data" in data
#     assert "POIDataByFilters" in data["data"]
#
#
# # Google Places API GraphQL tests
#
# def test_graphql_nearby_places(client, mocker):
#     print("Starting test_graphql_nearby_places")
#     query = """
#     query {
#         nearbyPlaces(location: "40.7128,-74.0060", radius: 1500, placeTypes: ["restaurant"]) {
#             place_id
#             name
#             formattedAddress
#             rating
#             userRatingCount
#             location {
#                 lat
#                 lng
#             }
#             types
#             openNow
#             photos {
#                 photoReference
#                 height
#                 width
#                 url
#             }
#         }
#     }
#     """
#     print("Before mocker.patch")
#     mocker.patch('googlemaps.Client.places_nearby', return_value={
#         'results': [
#             {
#                 'place_id': 'ChIJN1t_tDeuEmsRUsoyG83frY4',
#                 'name': 'Test Place',
#                 'vicinity': 'Test Address',
#                 'rating': 4.5,
#                 'user_ratings_total': 100,
#                 'geometry': {
#                     'location': {'lat': 40.7128, 'lng': -74.0060}
#                 },
#                 'types': ['restaurant'],
#                 'opening_hours': {'open_now': True},
#                 'photos': [
#                     {
#                         'photo_reference': 'photoRef',
#                         'height': 400,
#                         'width': 600
#                     }
#                 ]
#             }
#         ],
#         'next_page_token': None
#     })
#     mocker.patch('googlemaps.Client.__init__', return_value=None)  # 模拟初始化
#     gmaps = googlemaps.Client(key='test')
#     gmaps.key = 'test'  # 手动设置密钥
#
#     print("After mocker.patch")
#     response = client.post('/graphql', data=json.dumps({"query": query}), content_type='application/json')
#     print("After client.post")
#     assert response.status_code == 200
#     data = response.get_json()
#     print("Received data:", data)
#     assert "data" in data
#     assert "nearbyPlaces" in data["data"]
#     places = data["data"]["nearbyPlaces"]
#     assert isinstance(places, list)
#     if places:
#         place = places[0]
#         assert "place_id" in place
#         assert "name" in place
#         assert "formattedAddress" in place
#         assert "rating" in place
#         assert "userRatingCount" in place
#         assert "location" in place
#         assert "types" in place
#         assert "openNow" in place
#         assert "photos" in place
#     print("End of test_graphql_nearby_places")
#
#
# def test_graphql_place_details(client, mocker):
#     query = """
#     query {
#         placeDetails(placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4") {
#             place_id
#             name
#             formattedAddress
#             rating
#             userRatingCount
#             location {
#                 lat
#                 lng
#             }
#             openNow
#             website
#             types
#             internationalPhoneNumber
#             googleMapsUri
#             openingHours {
#                 openNow
#                 periods {
#                     open {
#                         day
#                         hour
#                         minute
#                     }
#                     close {
#                         day
#                         hour
#                         minute
#                     }
#                 }
#                 weekdayDescriptions
#                 specialDays {
#                     date {
#                         year
#                         month
#                         day
#                     }
#                 }
#             }
#             photos {
#                 photoReference
#                 height
#                 width
#                 url
#             }
#         }
#     }
#     """
#     mocker.patch('googlemaps.Client.place', return_value={
#         'result': {
#             'place_id': 'ChIJN1t_tDeuEmsRUsoyG83frY4',
#             'name': 'Test Place',
#             'formatted_address': 'Test Address',
#             'rating': 4.5,
#             'user_ratings_total': 100,
#             'geometry': {
#                 'location': {'lat': 40.7128, 'lng': -74.0060}
#             },
#             'types': ['restaurant'],
#             'international_phone_number': '+1234567890',
#             'website': 'http://example.com',
#             'opening_hours': {
#                 'open_now': True,
#                 'periods': [
#                     {
#                         'open': {'day': 1, 'time': '0800'},
#                         'close': {'day': 1, 'time': '2200'}
#                     }
#                 ],
#                 'weekday_text': ['Monday: 8:00 AM – 10:00 PM'],
#                 'special_days': [{'date': {'year': 2023, 'month': 6, 'day': 20}}]
#             },
#             'url': 'http://maps.google.com/?cid=test',
#             'photos': [
#                 {
#                     'photo_reference': 'photoRef',
#                     'height': 400,
#                     'width': 600
#                 }
#             ]
#         }
#     })
#     mocker.patch('googlemaps.Client.__init__', return_value=None)  # 模拟初始化
#     gmaps = googlemaps.Client(key='test')
#     gmaps.key = 'test'  # 手动设置密钥
#
#     response = client.post('/graphql', data=json.dumps({"query": query}), content_type='application/json')
#     assert response.status_code == 200
#     data = response.get_json()
#     assert "data" in data
#     assert "placeDetails" in data["data"]
#     place = data["data"]["placeDetails"]
#     assert isinstance(place, dict)
#     assert "place_id" in place
#     assert "name" in place
#     assert "formattedAddress" in place
#     assert "rating" in place
#     assert "userRatingCount" in place
#     assert "location" in place
#     assert "openNow" in place
#     assert "website" in place
#     assert "types" in place
#     assert "internationalPhoneNumber" in place
#     assert "googleMapsUri" in place
#     assert "openingHours" in place
#     assert "photos" in place