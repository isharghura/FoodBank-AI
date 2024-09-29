from flask import Flask, request, jsonify
from app_oop import FoodQuestDB
from flask_cors import CORS
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from dataProcessing.food_processor import process_food_data 
from cv_data.testing import run_prediction
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes
load_dotenv()
databaseName = os.getenv("DATABASE_NAME")
databasePass = os.getenv("PASSWORD")
db = FoodQuestDB(databaseName, "postgres", "localhost", 5432, databasePass)

def predict_image(base64):
    model_output = run_prediction(base64)
    print(f"Model predicted: {model_output}")
    return gather_data_from_food(model_output)

def gather_data_from_food(food_item):
    return process_food_data(food_item)

@app.route("/save-image", methods=['POST'])
def send_image():
    # send base64 image to ml
    # take output food name, send to food_processor
    # take output from food_processor, convert to points
    # add food and data to db
    data = request.json
    base64_image = data.get('imageData')
    return predict_image(base64_image)

@app.route("/get-all-users")
def get_all_users():
    users = db.get_users_ordered_by_points()
    return jsonify(users)

@app.route("/get-user-data")
def get_user(user_id):
    return db.food_submission_times_of_user(user_id)

@app.route("/insert-food", methods=['POST'])
def insert_food(food_name, points, expiry_date, user_id):
    return db.insert_food(food_name, points, expiry_date, user_id)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
