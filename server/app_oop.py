import psycopg
from datetime import datetime

class FoodQuestDB:
    def __init__(self, dbname, user, host, port, password):
        self.connection = psycopg.connect(
            f"dbname={dbname} user={user} host={host} port={port} password={password}"
        )
        self.cur = self.connection.cursor()

    def __del__(self):
        self.cur.close()
        self.connection.close()

    def execute_query(self, query, params=None):
        try:
            if params:
                self.cur.execute(query, params)
            else:
                self.cur.execute(query)
            result = self.cur.fetchall()
            self.connection.commit()
            return result if result else None
        except Exception as err:
            print(f"Error executing query: {err}")
            return None

    def get_user_points_by_food(self, user_id):
        query = """
            SELECT f.food_name, p.points_awarded
            FROM points p
            JOIN foods f ON p.food_id = f.food_id
            WHERE p.user_id = %s
        """
        return self.execute_query(query, (user_id,))

    def get_users_ordered_by_points(self):
        query = """
            SELECT u.user_id, u.username, COALESCE(SUM(p.points_awarded), 0) AS total_points
            FROM users u
            LEFT JOIN points p ON u.user_id = p.user_id
            GROUP BY u.user_id, u.username
            ORDER BY total_points DESC;
        """
        return self.execute_query(query)

    def get_user_rank(self, user_id):
        query = """
            SELECT rank
            FROM (
                SELECT u.user_id, u.username, COALESCE(SUM(p.points_awarded), 0) AS total_points,
                RANK() OVER (ORDER BY COALESCE(SUM(p.points_awarded), 0) DESC) AS rank
                FROM users u
                LEFT JOIN points p ON u.user_id = p.user_id
                GROUP BY u.user_id, u.username
            ) AS ranked_users
            WHERE user_id=%s
        """
        return self.execute_query(query, (user_id,))

    def food_submission_times_of_user(self, user_id):
        query = """
            SELECT f.food_name, p.time_submitted, p.points_awarded
            FROM points p
            JOIN foods f ON p.food_id = f.food_id
            WHERE p.user_id = %s
            ORDER BY time_submitted DESC;
        """
        result = self.execute_query(query, (user_id,))
        if result:
            return [
                (food_name, time_submitted.strftime("%Y-%m-%d %H:%M:%S"), points_awarded)
                for food_name, time_submitted, points_awarded in result
            ]
        return None
    
    def get_all_users(self):
        query = """
            SELECT * FROM users
            NATURAL JOIN points;
        """
        return self.execute_query(query)

    def get_username(self, user_id):
        query = """
            SELECT u.username
            FROM users u
            WHERE u.user_id = %s
        """
        return self.execute_query(query, (user_id,))
    
    def insert_food(self, food_name, points, expiry_date, user_id):
        timeNow = datetime.now
        query = f"""
            INSERT INTO foods (food_name, expiry)
            VALUES ('{food_name}', '{expiry_date}')
            RETURNING food_id;

            INSERT INTO points (food_id, user_id, time_submitted, points_awarded)
            VALUES (currval('foods_food_id_seq'), '{user_id}', '{datetime.strftime(datetime.now(), '%Y-%m-%d %H:%M')}', '{points}');
        """
        
        return self.execute_query(query)

# Usage example:
if __name__ == "__main__":
    POSTGRES_PASS = "postgres"
    db = FoodQuestDB("FoodQuest", "postgres", "localhost", 5432, POSTGRES_PASS)

    # Example usage of methods
    user_id = 1
    print(db.get_user_points_by_food(user_id))
    print(db.get_users_ordered_by_points())
    print(db.get_user_rank(user_id))
    print(db.food_submission_times_of_user(user_id))
    print(db.get_username(user_id))