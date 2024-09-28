import requests
import os
from dotenv import load_dotenv

load_dotenv('../env/.env')

def get_food_data(input_data):
    api_key = os.getenv('API_KEY')
    api_url = f"https://api.nal.usda.gov/fdc/v1/foods/search?api_key={api_key}&query={input_data}&dataType=Foundation&pageSize=1"

    try:
        response = requests.get(api_url)
        response.raise_for_status()  # In case of errors for bad responses
        data = response.json()
        return data
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return {"error": "Internal Server Error"}


if __name__ == "__main__":
    input_data = "apple"
    food_data = get_food_data(input_data)
    print(food_data)
