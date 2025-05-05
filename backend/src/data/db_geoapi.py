import requests

BASE_URL = "https://api.geoapi.es"  # Ajusta según la documentación real

def get_provinces():
    url = f"{BASE_URL}/provincias"
    resp = requests.get(url)
    resp.raise_for_status()
    return resp.json()


