from flask import Flask, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime,timezone
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

#app instance
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Limit upload size to 16MB
CORS(app)

db = SQLAlchemy(app)

class Chonker(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    image_path = db.Column(db.String(255), nullable=True)
    timestamp = db.Column(db.DateTime, default=datetime.now(timezone.utc))

#/api/home
@app.route("/api/home", methods = ['GET'])
def return_home():
    return jsonify({
        'message' : "Let's Find CHONKERS! (Work in progress)",
        'people' : ['Johnny', 'Jester', 'Charlie']
    })
    

@app.route("/api/chonkers", methods=['GET'])
def get_chonkers():
    chonkers = Chonker.query.all()
    chonker_list = [
        {
            # 'id': chonker.id,
            'position':{
                'lat' : chonker.latitude,
                'lng' : chonker.longitude
            },
            'description': chonker.description,
            'category': chonker.category,
            'image_path': chonker.image_path,
            # 'timestamp': chonker.timestamp.isoformat()
        }
        for chonker in chonkers
    ]
    return jsonify(chonker_list)

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory('uploads', filename)

if __name__ == "__main__":
    app.run(debug = True, port=8080)
