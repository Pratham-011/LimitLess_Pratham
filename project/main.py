from flask import Flask, jsonify
from flask_cors import CORS  # Import the CORS module
import pandas as pd
import numpy as np

app = Flask(__name__)

# Enable CORS for all routes
# CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})  # Only allow your React app to access the Flask API
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/data')
def get_data():
    # Load the dataset
    covid_df = pd.read_csv('Covid-19 Twitter Dataset (Apr-Jun 2020).csv')

    # Ensure 'created_at' is treated as a string
    covid_df['created_at'] = covid_df['created_at'].astype(str)

    # Replace invalid date values with NaN
    covid_df['created_at'] = covid_df['created_at'].replace(['0.0', 'NaN', 'None', 'null', ''], np.nan)

    # Convert 'created_at' to datetime
    covid_df['date'] = pd.to_datetime(covid_df['created_at'], errors='coerce')

    # Drop rows where date conversion failed
    covid_df = covid_df.dropna(subset=['date'])

    # Convert datetime to only date format (as a string to avoid JSON serialization issues)
    covid_df['date'] = covid_df['date'].dt.strftime('%Y-%m-%d')

    # Group by date and compute average sentiment polarity
    covid_daily = covid_df.groupby(covid_df['date'])['polarity'].mean().reset_index()

    # Convert to dictionary format for JSON
    timeline_data = covid_daily.to_dict(orient='records')

    # Return the data as JSON
    return jsonify(timeline_data)

if __name__ == '__main__':
    app.run(debug=True)

