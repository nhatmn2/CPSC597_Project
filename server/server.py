import sys
from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd 
import csv

# app instance
app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024  # 100 MB limit
CORS(app)

# /api/home
@app.route("/api/home", methods=['GET'])
def return_home():
    return jsonify({
        'message': "Hello World"
    })

# /api/upload
@app.route("/api/upload", methods=['POST'])
def upload_file():
    csv.field_size_limit(sys.maxsize)  # Set maximum size to system's maximum size
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    try:
        df = pd.read_csv(file)
        if df.empty:
            return jsonify({"error": "No data in file or file format is incorrect."}), 400
        return df.to_json(orient='records')
    except Exception as e:
        return jsonify({"error": "Error processing file", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=8080)