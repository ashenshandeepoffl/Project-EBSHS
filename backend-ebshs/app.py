from flask import Flask, request, jsonify, session, send_from_directory
from flask_mysqldb import MySQL
from flask_session import Session
from flask_cors import CORS
import os
import bcrypt  # To securely hash the passwords
import werkzeug

app = Flask(__name__)
CORS(app, supports_credentials=True)

# Configure MySQL connection
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'As+s01galaxysa'
app.config['MYSQL_DB'] = 'feelhome_db'
mysql = MySQL(app)

# Configure session
app.config['SECRET_KEY'] = os.urandom(24)
app.config['SESSION_TYPE'] = 'filesystem'  # Storing sessions in the server's filesystem
Session(app)  # Initialize the session

# Absolute path to the 'backend-ebshs/uploads/profile_pictures' folder
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'backend-ebshs/uploads/profile_pictures')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Registration endpoint
@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        # Extract data from the request
        first_name = data['firstName']
        last_name = data['lastName']
        email = data['email']
        username = data['username']
        password = data['password']
        birthday = data['birthday']
        gender = data['gender']
        address = data['address']
        country = data['country']
        city = data['city']
        postal_code = data['postalCode']
        mobile_number = data['mobileNumber']
        security_question = data['securityQuestion']
        security_answer = data['securityAnswer']

        # Check if email or username already exists
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM users WHERE email = %s OR username = %s", (email, username))
        existing_user = cursor.fetchone()
        if existing_user:
            response = {"message": "User already exists"}
            if existing_user[3] == email:
                response["emailError"] = "Email is already registered"
            if existing_user[4] == username:
                response["usernameError"] = "Username is already taken"
            return jsonify(response), 409

        # Hash the password
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        # Insert new user into the database
        cursor.execute("""
            INSERT INTO users (first_name, last_name, email, username, password, birthday, gender, address, country, city, postal_code, mobile_number, security_question, security_answer)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (first_name, last_name, email, username, hashed_password, birthday, gender, address, country, city, postal_code, mobile_number, security_question, security_answer))
        mysql.connection.commit()
        cursor.close()

        return jsonify({"message": "Registration successful"}), 201

    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500


# Login endpoint
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()

        # Extract credentials from the request
        username = data['username']
        password = data['password']

        # Check the database for user credentials
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT id, username, password FROM users WHERE username = %s OR email = %s", (username, username))
        user = cursor.fetchone()
        cursor.close()

        if user and bcrypt.checkpw(password.encode('utf-8'), user[2].encode('utf-8')):
            session['user_id'] = user[0]
            session['username'] = user[1]
            return jsonify({"message": "Login successful"}), 200
        else:
            return jsonify({"error": "Invalid username or password"}), 401

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

# Logout endpoint
@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    session.pop('username', None)
    return jsonify({"message": "Logout successful"}), 200

# Home page users first and last name with profile pic
@app.route('/home', methods=['GET'])
def home():
    if 'user_id' not in session:
        return jsonify({"error": "Unauthorized"}), 401

    try:
        user_id = session['user_id']

        cursor = mysql.connection.cursor()
        cursor.execute("""
            SELECT first_name, last_name, profile_picture
            FROM users WHERE id = %s
        """, (user_id,))
        user = cursor.fetchone()
        cursor.close()

        if user:
            first_name, last_name, profile_picture = user
            message = f" {first_name} {last_name}"
            profile_picture_url = f"http://localhost:5000/uploads/profile_pictures/{profile_picture}" if profile_picture else f"https://avatars.dicebear.com/api/micah/{first_name}{last_name}.svg"

            return jsonify({
                "message": message,
                "profilePicture": profile_picture_url
            }), 200
        else:
            return jsonify({"error": "User not found"}), 404

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


@app.route('/check_session', methods=['GET'])
def check_session():
    if 'user_id' in session:
        return jsonify({"logged_in": True}), 200
    else:
        return jsonify({"logged_in": False}), 401

# Profile
@app.route('/profile', methods=['GET'])
def fetch_profile():
    if 'user_id' not in session:
        return jsonify({"error": "Unauthorized"}), 401

    try:
        user_id = session['user_id']

        cursor = mysql.connection.cursor()
        cursor.execute("""
            SELECT first_name, last_name, email, username, birthday, gender, address, country, city, postal_code, mobile_number, profile_picture
            FROM users WHERE id = %s
        """, (user_id,))
        user = cursor.fetchone()
        cursor.close()

        if user:
            first_name, last_name, email, username, birthday, gender, address, country, city, postal_code, mobile_number, profile_picture = user

            # Construct the profile picture URL correctly
            profile_picture_url = None
            if profile_picture:
                normalized_profile_picture = profile_picture.replace('\\', '/')
                profile_picture_url = f"http://localhost:5000/{normalized_profile_picture}"

            user_data = {
                "firstName": first_name,
                "lastName": last_name,
                "email": email,
                "username": username,
                "birthday": birthday,
                "gender": gender,
                "address": address,
                "country": country,
                "city": city,
                "postalCode": postal_code,
                "mobileNumber": mobile_number,
                "profilePicture": profile_picture_url,
            }
            return jsonify(user_data), 200
        else:
            return jsonify({"error": "User not found"}), 404

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


# Update Profile
@app.route('/updateProfile', methods=['POST'])
def update_profile():
    if 'user_id' not in session:
        return jsonify({"error": "Unauthorized"}), 401

    try:
        user_id = session['user_id']
        form_data = request.form
        profile_picture = request.files.get('profilePicture')

        # Update the profile details
        cursor = mysql.connection.cursor()
        update_query = """
            UPDATE users SET first_name = %s, last_name = %s, email = %s, username = %s, 
            birthday = %s, gender = %s, address = %s, country = %s, city = %s, 
            postal_code = %s, mobile_number = %s
            WHERE id = %s
        """
        cursor.execute(update_query, (
            form_data['firstName'], form_data['lastName'], form_data['email'],
            form_data['username'], form_data['birthday'], form_data['gender'],
            form_data['address'], form_data['country'], form_data['city'],
            form_data['postalCode'], form_data['mobileNumber'], user_id
        ))

        # Handle profile picture upload
        if profile_picture:
            filename = werkzeug.utils.secure_filename(profile_picture.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)

            # Save the file
            profile_picture.save(filepath)

            # Normalize the path to use forward slashes
            filepath = filepath.replace('\\', '/')

            # Update profile picture path in the database
            cursor.execute("UPDATE users SET profile_picture = %s WHERE id = %s", (filepath, user_id))

        mysql.connection.commit()
        cursor.close()

        return jsonify({"message": "Profile updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

# Fetch Profile Picture
@app.route('/profile/picture', methods=['GET'])
def fetch_profile_picture():
    if 'user_id' not in session:
        return jsonify({"error": "Unauthorized"}), 401

    try:
        user_id = session['user_id']

        cursor = mysql.connection.cursor()
        cursor.execute("SELECT profile_picture FROM users WHERE id = %s", (user_id,))
        user = cursor.fetchone()
        cursor.close()

        if user and user[0]:
            profile_picture = user[0]
            # Normalize the profile picture URL
            profile_picture_url = profile_picture.replace('\\', '/')
            full_url = f"http://localhost:5000/{profile_picture_url}"
            return jsonify({"profilePicture": full_url}), 200
        else:
            return jsonify({"profilePicture": None}), 404

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

# Route to serve profile pictures from 'backend-ebshs/uploads/profile_pictures' folder
@app.route('/uploads/profile_pictures/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True)
