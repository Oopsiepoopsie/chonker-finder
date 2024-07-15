from flask import Flask, jsonify
from flask_cors import CORS

#app instance
app = Flask(__name__)
CORS(app)

#/api/home
@app.route("/api/home", methods = ['GET'])
def return_home():
    return jsonify({
        'message' : "Let's Find CHONKERS! (Work in progress)",
        'people' : ['Johnny', 'Jester', 'Charlie']
    })

if __name__ == "__main__":
    app.run(debug = True, port=8080)
