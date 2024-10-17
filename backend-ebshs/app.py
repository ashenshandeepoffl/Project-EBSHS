from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS
from werkzeug.security import generate_password_hash
from random import randint

app = Flask(__name__)
CORS(app)

# MySQL Database connection
def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host="localhost",  # your MySQL host
            user="root",       # your MySQL username
            password="As+s01galaxysa",  # your MySQL password
            database="feelhome_db"  # your MySQL database
        )
        if connection.is_connected():
            return connection
    except mysql.connector.Error as e:
        print(f"Error while connecting to MySQL: {str(e)}")
        return None

# Function to check if username or email exists
def check_user_exists(cursor, email, username):
    cursor.execute("SELECT username, email FROM users WHERE email=%s OR username=%s", (email, username))
    return cursor.fetchall()

# Function to generate random username suggestions
def suggest_usernames(username):
    return [f"{username}{randint(100, 999)}" for _ in range(3)]

# Route to handle registration
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    first_name = data['firstName']
    last_name = data['lastName']
    email = data['email']
    username = data['username']
    password = generate_password_hash(data['password'])  # Hash password for security
    birthday = data.get('birthday', None)
    gender = data.get('gender', None)
    address = data.get('address', None)
    country = data.get('country', None)
    city = data.get('city', None)
    postal_code = data.get('postalCode', None)
    mobile_number = data.get('mobileNumber', None)
    security_question = data.get('securityQuestion', None)
    security_answer = data.get('securityAnswer', None)

    # Ensure the database connection is established
    db = get_db_connection()
    if db is None:
        return jsonify({"error": "Failed to connect to the database"}), 500

    cursor = db.cursor()

    # Check if the email or username already exists
    existing_users = check_user_exists(cursor, email, username)
    if existing_users:
        # Check which one is taken (username or email)
        taken_email = any(user[1] == email for user in existing_users)
        taken_username = any(user[0] == username for user in existing_users)

        response = {}
        if taken_email:
            response['emailError'] = "Email already taken. Please try another email."
        if taken_username:
            response['usernameError'] = "Username already taken. Please try another username."
            response['suggestions'] = suggest_usernames(username)

        return jsonify(response), 409

    # Insert the new user into the database
    insert_query = """
        INSERT INTO users (
            first_name, last_name, email, username, password, birthday, gender, address, country, city, postal_code, mobile_number, security_question, security_answer
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    values = (
        first_name, last_name, email, username, password, birthday, gender, address, country, city, postal_code, mobile_number, security_question, security_answer
    )

    try:
        cursor.execute(insert_query, values)
        db.commit()
        return jsonify({"message": "User registered successfully!"}), 201
    except mysql.connector.Error as err:
        db.rollback()
        return jsonify({"error": str(err)}), 500
    finally:
        cursor.close()
        db.close()

# Route to get all users (for testing purposes)
@app.route('/users', methods=['GET'])
def get_users():
    db = get_db_connection()
    if db is None:
        return jsonify({"error": "Failed to connect to the database"}), 500

    cursor = db.cursor()
    try:
        cursor.execute("SELECT * FROM users")
        users = cursor.fetchall()
        return jsonify(users), 200
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        cursor.close()
        db.close()

if __name__ == '__main__':
    app.run(debug=True)
