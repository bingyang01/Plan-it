import requests

url = "http://137.43.49.19/ai/api/generate"
prompt = "I'm planning a trip to Manhattan, New York. Recommend some interesting locations along the way of my Itinerary: "
itinerary = "1. Empire State Building - 9:00-9:30; 2. The Museum of Modern Art - 10:00-12:00; 3. Central Park - 12:00-14:00"

data = {
    "model": "qwen2:0.5b",
    "prompt": prompt+itinerary,
}

response = requests.post(url, json=data,timeout=30)

print(response.json())
