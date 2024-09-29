import requests
import os
from dotenv import load_dotenv
import json
from collections import defaultdict

load_dotenv()

def get_food_data(input_data):
    """
    Fetches food data from the USDA Food Data Central API based on the input query.

    Parameters:
    input_data (str): The name or description of the food item to search for (e.g., 'apple').

    Returns:
    dict: The JSON response from the API containing food data. In case of an error, it returns a dictionary with an error message.
    """

    api_key = os.getenv('API_KEY')
    print(f"api-Key {api_key}")
    if api_key == None: return "Not able to retrieve food data, API KEY might be \'Null\'"

    api_url = f"https://api.nal.usda.gov/fdc/v1/foods/search?api_key={api_key}&query={input_data}"
    
    try:
        response = requests.get(api_url)
        response.raise_for_status()  # In case of errors for bad responses
        data = response.json()
        return data
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return {"error": "Internal Server Error"}

def process_New_json(json_data):
    """
    Processes the JSON response from the USDA Food Data Central API and aggregates nutrient values.

    Parameters:
    json_data (dict): The JSON data from the USDA API containing nutrient information.

    Returns:
    dict: A dictionary summarizing the total nutrient values and other relevant information.
    """
    # Initialize a dictionary to hold the sum of values by nutrient name
    nutrient_totals = defaultdict(float)

    for food in json_data["foods"]:
        for nutrient in food["foodNutrients"]:
            nutrient_name = nutrient["nutrientName"]
            value = nutrient["value"]
            nutrient_totals[nutrient_name] += value

    # Prepare the new JSON structure
    total_value = sum(nutrient_totals.values())
    ingredients = list(nutrient_totals.keys())

    # Identify vitamins if any
    vitamins = [name for name in ingredients if "Vitamin" in name]

    # Final JSON structure
    result = {
        "item": json_data["foodSearchCriteria"]["generalSearchInput"],
        "category": json_data["foods"][0]["foodCategory"],
        "ingredients": ingredients,
        "vitamins": vitamins,
        "total_value": total_value
    }

    output = json.dumps(result, indent=4)
    return output


def process_food_data(food_item):
    """
    Processes the nutrient data of a given food item and returns a summary JSON.

    Parameters:
    food_item (str): The name of the food item (e.g., 'apple').
    json_data (dict): The JSON data containing the nutrients and their values.

    Returns:
    dict: A dictionary containing the processed summary of the food item.
    """
    food_data = get_food_data(food_item)
    result = process_New_json(food_data)
    return result

if __name__ == "__main__":
    input_data = "apple"
    print(process_food_data(input_data))
