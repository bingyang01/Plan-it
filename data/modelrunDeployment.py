import geopandas as gpd
import csv
import pandas as pd
import datetime
from pymongo import MongoClient
import pickle
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sshtunnel import SSHTunnelForwarder
import numpy as np
import time
from shapely.geometry import Point
import pytz
#from pandarallel import pandarallel
import numpy as np

#pandarallel.initialize(progress_bar=True)

largeZoneFilePath = 'NYC Taxi Zones.geojson'
smallZoneFilePath = 'database_zones.csv'
modelFilePathTaxi = 'xgboostmodel.pkl'
modelFilePathSubway = 'xgboostmodelsubway.pkl'
database_zones = 'database_zones.csv'

large_zones = gpd.read_file(largeZoneFilePath)
small_zones = pd.read_csv(smallZoneFilePath)
database_zones = gpd.read_file(database_zones, ignore_geometry=True)
zoneCount = len(database_zones)
zoneCountSubway = len(large_zones)
manhattan_zones = large_zones[large_zones['borough'] == 'Manhattan']

def zone_finder(lon, lat, zones):
    point = Point(lon, lat)
    point_gdf = gpd.GeoDataFrame([{'geometry': point}], crs=large_zones.crs)
    result = gpd.sjoin(point_gdf, zones, how='left', predicate='within')
    if not result.empty:
        return result.iloc[0]['location_id']
    else:
        return None


#manhattan_small_zones = database_zones.parallel_apply(lambda row: zone_finder(row['centroid_x'], row['centroid_y'], large_zones), axis=1)


with open(modelFilePathTaxi, "rb") as model:
    model = pickle.load(model)

with open(modelFilePathSubway, "rb") as Subwaymodel:
   subwayModel = pickle.load(Subwaymodel)

with open('columntransformer.pkl', "rb") as ct:
    print('ct open working!')
    ct = pickle.load(ct)

with open('columntransformersubway.pkl', "rb") as cts:
    print('cts open working!')
    cts = pickle.load(cts)


def update_database_zones(zoneFile = database_zones, delete = False):
    
    SSH_HOST = "137.43.49.19"
    SSH_PORT = 22
    SSH_USERNAME = "student"
    SSH_PASSWORD = "group4"

    DB_HOST = "127.0.0.1"
    DB_PORT = 27017
    DB_NAME = "NYCData"
    COLLECTION_NAME = "Zones"

    with SSHTunnelForwarder(
    (SSH_HOST, SSH_PORT),
    ssh_username=SSH_USERNAME,
    ssh_password=SSH_PASSWORD,
    remote_bind_address=(DB_HOST, DB_PORT)
    ) as tunnel:

        client = MongoClient(f"mongodb://localhost:{tunnel.local_bind_port}/")
        db = client[DB_NAME]
        collection = db[COLLECTION_NAME]
        print('Starting update!')

        if delete == True:
            delete_query = collection.delete_many({})
            print(f"Deleted {delete_query.deleted_count} documents")

        db.collection.insert(zoneFile)
        print(f'Database zones updated!')

        client.close()
        tunnel.stop()


#update_database_zones(zoneFile=manhattan_small_zones)


def predict(hours):

    currentHour = datetime.datetime.now().hour
    currentDay = datetime.datetime.now().weekday()
    currentMonth = datetime.datetime.now().month
    
    results = {}
    for zone in range(1, zoneCount+1):
        print(f'Predicting for zone {zone}')

        centroid_coords = (database_zones['centroid_x'].iloc[zone-1], database_zones['centroid_y'].iloc[zone-1])
        
        prediction = []
        for hourCount in range(0, hours):

            hour = (currentHour + hourCount) % 24
            day = (currentDay + hourCount//24)
            
            X = pd.DataFrame({
            'dropoff_zone': [zone],
            'month': [currentMonth],
            'day': [day],
            'time_interval_float': [hour]})
            
            X_transformed = ct.transform(X)
            y_pred = model.predict(X_transformed)
            y_pred = np.maximum(y_pred, 0)

            #print(y_pred)
            
            prediction.append(float(y_pred[0]))

        #predictionTuple = (list(range(1, 73)), prediction)
        #results[zone].append(predictionTuple)
        results[zone] = {
            'centroid': centroid_coords,
            'data': (list(range(1, hours+1)), prediction)
        }
        print(results[zone])
    
    return results


def predict_subway(hours):

    currentHour = datetime.datetime.now().hour
    currentDay = datetime.datetime.now().weekday()
    currentMonth = datetime.datetime.now().month
    
    resultsSubway = {}
    for zone in range(1, zoneCountSubway+1):
        print(f'Predicting for zone {zone}')

        #centroid_coords = (database_zones['centroid_x'].iloc[zone-1], database_zones['centroid_y'].iloc[zone-1])
        
        prediction = []
        for hourCount in range(0, hours):

            hour = (currentHour + hourCount) % 24
            day = (currentDay + hourCount//24)
            
            X = pd.DataFrame({
            'zone': [zone],
            'month': [currentMonth],
            'day': [day],
            'time_interval_float': [hour]})
            
            X_transformed = cts.transform(X)
            y_pred = subwayModel.predict(X_transformed)
            y_pred = np.maximum(y_pred, 0)

            #print(y_pred)
            
            prediction.append(float(y_pred[0]))

        #predictionTuple = (list(range(1, 73)), prediction)
        #results[zone].append(predictionTuple)
        resultsSubway[zone] = {
            'zone': zone,
            'data': (list(range(1, hours+1)), prediction)
        }
        print(resultsSubway[zone])
    
    return resultsSubway


def grade_passenger_count(count):
    if count <= 100:
        return int(count)
    elif count <= 500:
        return 100 + ((count - 1) // 10)
    else:
        return 601


def predict_combined(hours, reverseHours):

    currentDateTime = datetime.datetime.utcnow()
    currentDateTime = currentDateTime.replace(minute=0, second=0, microsecond=0)

    pastHoursStrList = []
    futureHoursStrList = []

    for hourCount in range(reverseHours, 0, -1):
            newDateTime = currentDateTime - datetime.timedelta(hours=hourCount)
            pastHoursStrList.append(newDateTime.strftime('%Y-%m-%d %H:00:00'))

    for hourCount in range(0, hours + 1):
            newDateTime = currentDateTime + datetime.timedelta(hours=hourCount)
            futureHoursStrList.append(newDateTime.strftime('%Y-%m-%d %H:00:00'))
    
    results = {}

    for zone in range(1, len(database_zones) + 1):
        print(f'Predicting for zone {zone}')
        
        centroid_coords = (database_zones['centroid_x'].iloc[zone - 1], database_zones['centroid_y'].iloc[zone - 1])
        largeZone = zone_finder(centroid_coords[0], centroid_coords[1], large_zones)
        print(f'LargeZone = {largeZone}')
        prediction = []
        
        for hourCount in range(reverseHours, 0, -1):
            newDateTime = currentDateTime - datetime.timedelta(hours=hourCount)
            #pastHoursStrList.append(newDateTime.strftime('%Y-%m-%d %H:00:00'))

            hour = newDateTime.hour
            day = newDateTime.weekday()
            month = newDateTime.month
            
            X = pd.DataFrame({
                'dropoff_zone': [zone],
                'month': [month],
                'day': [day],
                'time_interval_float': [hour]
            })
            
            X_transformed = ct.transform(X)
            y_pred = model.predict(X_transformed)
            y_pred = np.maximum(y_pred, 0)
            
            X_Subway = pd.DataFrame({
                'zone': [largeZone],
                'month': [month],
                'day': [day],
                'time_interval_float': [hour]
            })
            
            X_Subway_transformed = cts.transform(X_Subway)
            y_Subway_pred = subwayModel.predict(X_Subway_transformed)
            y_Subway_pred = np.maximum(y_Subway_pred, 0)

            y_pred = y_pred[0]
            y_Subway_pred = y_Subway_pred[0]
            
            combined_y_pred = y_pred + y_Subway_pred
            combined_y_pred = float(combined_y_pred)

            combined_y_pred = grade_passenger_count(combined_y_pred)

            prediction.append(combined_y_pred)

        for hourCount in range(0, hours + 1):
            newDateTime = currentDateTime + datetime.timedelta(hours=hourCount)
            #futureHoursStrList.append(newDateTime.strftime('%Y-%m-%d %H:00:00'))

            hour = newDateTime.hour
            day = newDateTime.weekday()
            month = newDateTime.month
            
            X = pd.DataFrame({
                'dropoff_zone': [zone],
                'month': [month],
                'day': [day],
                'time_interval_float': [hour]
            })
            
            X_transformed = ct.transform(X)
            y_pred = model.predict(X_transformed)
            y_pred = np.maximum(y_pred, 0)
            
            X_Subway = pd.DataFrame({
                'zone': [largeZone],
                'month': [month],
                'day': [day],
                'time_interval_float': [hour]
            })
            
            X_Subway_transformed = cts.transform(X_Subway)
            y_Subway_pred = subwayModel.predict(X_Subway_transformed)
            y_Subway_pred = np.maximum(y_Subway_pred, 0)

            y_pred = y_pred[0]
            y_Subway_pred = y_Subway_pred[0]
            
            combined_y_pred = y_pred + y_Subway_pred
            combined_y_pred = float(combined_y_pred)

            combined_y_pred = grade_passenger_count(combined_y_pred)

            prediction.append(combined_y_pred)
        
        totalHoursStrList = pastHoursStrList + futureHoursStrList

        results[zone] = {
            'id': zone,
            'centroid': centroid_coords,
            'data': (totalHoursStrList, prediction)
        }

    return results


def update_database(hours, reverseHours, function='combined', delete=False):
    start_time = time.time()

    if function == 'combined':
        results = predict_combined(hours, reverseHours)
    if function == 'taxi':
        results = predict(hours, reverseHours)
    if function == 'subway':
        results = predict_subway(hours, reverseHours)

    SSH_HOST = "137.43.49.19"
    SSH_PORT = 22
    SSH_USERNAME = "student"
    SSH_PASSWORD = "group4"

    DB_HOST = "127.0.0.1"
    DB_PORT = 27017
    DB_NAME = "NYCData"
    COLLECTION_NAME = "BusynessPoints"

    with SSHTunnelForwarder(
    (SSH_HOST, SSH_PORT),
    ssh_username=SSH_USERNAME,
    ssh_password=SSH_PASSWORD,
    remote_bind_address=(DB_HOST, DB_PORT)
    ) as tunnel:

        client = MongoClient(f"mongodb://localhost:{tunnel.local_bind_port}/")
        db = client[DB_NAME]
        collection = db[COLLECTION_NAME]
        print('Starting update!')

        if delete:
            delete_query = collection.delete_many({})
            print(f"Deleted {delete_query.deleted_count} documents")

        for result in results.values():
            print(f'Updating...')
            collection.update_one(
                {"zoneID": result['id']},
                {"$set": {"centroid": result['centroid'], "data": result['data']}},
                upsert=True
            )
        end_time = time.time()
        elapsed_time = end_time - start_time
        print(f'It worked! You can sleep! {elapsed_time//1} seconds')

        client.close()
        tunnel.stop()

def calculate_hours():
    currentDateTime = datetime.datetime.utcnow()
    targetDateTime = (currentDateTime + datetime.timedelta(days=4)).replace(hour=0, minute=0, second=0, microsecond=0)

    hoursDifference = (targetDateTime - currentDateTime).days*24 + (targetDateTime - currentDateTime).seconds//3600
    print(hoursDifference)
    
    return hoursDifference

forwardHours = calculate_hours()

update_database(forwardHours, 24, 'combined', True)

#update_database(72, 24, 'combined', True)


