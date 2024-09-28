CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
	name varchar(255) not null
);

CREATE TABLE foods (
    food_id SERIAL PRIMARY KEY,
    food_name VARCHAR(255) NOT NULL,
	expiry TIMESTAMP NOT NULL,
    quantity INT DEFAULT 0
);

CREATE TABLE points (
    point_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    food_id INT REFERENCES foods(food_id),
    time_submitted TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
