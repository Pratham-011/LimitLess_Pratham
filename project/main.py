from flask import Flask, jsonify
from flask_cors import CORS  # Import the CORS module
import pandas as pd
import numpy as np

app = Flask(__name__)

# Enable CORS for all routes
CORS(app, resources={r"/*": {"origins": "*"}})

# Load and preprocess the dataset once (outside the route for efficiency)
covid_df = pd.read_csv('Covid-19 Twitter Dataset (Apr-Jun 2020).csv')
covid_df['created_at'] = covid_df['created_at'].astype(str)
covid_df['created_at'] = covid_df['created_at'].replace(['0.0', 'NaN', 'None', 'null', ''], np.nan)
covid_df['date'] = pd.to_datetime(covid_df['created_at'], errors='coerce')
covid_df = covid_df.dropna(subset=['date'])
covid_df['date'] = covid_df['date'].dt.strftime('%Y-%m-%d')

# Group by date and compute average sentiment polarity
covid_daily = covid_df.groupby('date')['polarity'].mean().reset_index()

def add_random_variation(data, variation_percentage=0.25):
    """
    Apply random variation to the 'polarity' column within the given percentage.
    """
    variation_range = variation_percentage  # 25-30% range
    random_factors = 1 + np.random.uniform(-variation_range, variation_range, size=len(data))
    data['polarity'] = data['polarity'] * random_factors
    return data

@app.route('/data')
def get_data():
    # Apply random variation every time the endpoint is called
    randomized_data = add_random_variation(covid_daily.copy(), variation_percentage=np.random.uniform(0.25, 0.30))

    # Convert to dictionary format for JSON
    timeline_data = randomized_data.to_dict(orient='records')

    # Return the data as JSON
    return jsonify(timeline_data)

if __name__ == '__main__':
    app.run(debug=True)
