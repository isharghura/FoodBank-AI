import requests
import os
from dotenv import load_dotenv
import json
from collections import defaultdict

load_dotenv()


def process_New_json(json_data):
    """
    Processes the JSON response from the USDA Food Data Central API and aggregates nutrient values.

    Parameters:
    json_data (dict): The JSON data from the USDA API containing nutrient information.

    Returns:
    dict: A dictionary summarizing the total nutrient values and other relevant information.
    """
    # Check if the "foods" key exists in the response
    if "foods" not in json_data:
        print("Error: 'foods' key not found in the response.")
        print(f"Full JSON response: {json.dumps(json_data, indent=4)}")
        return {"error": "'foods' key not found in the API response"}

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
        "category": (
            json_data["foods"][0]["foodCategory"] if json_data["foods"] else "Unknown"
        ),
        "ingredients": ingredients,
        "vitamins": vitamins,
        "total_value": total_value,
    }

    output = json.dumps(result, indent=4)
    return output


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
