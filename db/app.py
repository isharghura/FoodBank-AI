import psycopg

POSTGRES_PASS = "postgres"

connection = psycopg.connect(
    "dbname=FoodQuest user=postgres host=localhost port=5432 password=" + POSTGRES_PASS
)
cur = connection.cursor()


def get_user_points_by_food(user_id):
    try:
        cur.execute(
            """
            SELECT f.food_name, p.points_awarded
            FROM points p
            JOIN foods f ON p.food_id = f.food_id
            WHERE p.user_id = %s
            """,
            (user_id,),
        )

        result = cur.fetchall()
        connection.commit()

        if result:
            return result
        else:
            return None

    except Exception as err:
        print("Error retrieving user's points: ", err)
        return None
