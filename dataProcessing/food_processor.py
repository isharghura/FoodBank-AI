import requests
import os
from dotenv import load_dotenv
import json
from collections import defaultdict

load_dotenv()


def get_food_data(input_data):
    """
    Fetches food data from the USDA Food Data Central API based on the input query.
    """
    api_key = os.getenv("API_KEY")
    if api_key is None:
        return {"error": "API Key is missing"}

    # Extract the 'label' from input_data (assuming it's a dictionary with a 'label' key)
    if isinstance(input_data, dict) and "label" in input_data:
        query = input_data["label"]
    else:
        query = input_data

    api_url = (
        f"https://api.nal.usda.gov/fdc/v1/foods/search?api_key={api_key}&query={query}"
    )

    try:
        response = requests.get(api_url)
        response.raise_for_status()  # Ensure the request was successful
        data = response.json()
        return data
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return {"error": str(e)}


def process_New_json(json_data):
    """
    Processes the JSON response from the USDA Food Data Central API and aggregates nutrient values,
    including the amount of sugar.
    """
    # Check if the "foods" key exists in the response
    if "foods" not in json_data:
        print("Error: 'foods' key not found in the response.")
        print(f"Full JSON response: {json.dumps(json_data, indent=4)}")
        return {"error": "'foods' key not found in the API response"}

    # Initialize a dictionary to hold the sum of values by nutrient name
    nutrient_totals = defaultdict(float)
    sugar_content = 0.0

    for food in json_data["foods"]:
        for nutrient in food["foodNutrients"]:
            nutrient_name = nutrient["nutrientName"]
            value = nutrient["value"]
            nutrient_totals[nutrient_name] += value

            # Look specifically for sugar-related nutrients
            if "Sugar" in nutrient_name or "Sugars, total" in nutrient_name:
                sugar_content += value

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
        "sugar_content": sugar_content,  # Include the sugar content
    }

    output = json.dumps(result, indent=4)
    return output


def process_food_data(food_item):
    """
    Processes the nutrient data of a given food item and returns a summary JSON.
    """
    food_data = get_food_data(food_item)

    # Check if the API returned a valid response
    if "error" in food_data:
        return food_data

    result = process_New_json(food_data)
    print(result)
    return result


if __name__ == "__main__":
    input_data = "orange"
    process_food_data(input_data)
