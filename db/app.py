import psycopg
import re
from datetime import datetime

POSTGRES_PASS = "postgres"

connection = psycopg.connect(
    "dbname=FoodQuest user=postgres host=localhost port=5432 password=" + POSTGRES_PASS
)
cur = connection.cursor()

cur.execute("SELECT * FROM test;")

rows = cur.fetchall()

for row in rows:
    print(row)

cur.close()
connection.close()
