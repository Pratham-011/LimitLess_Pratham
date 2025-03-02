import pandas as pd
import json
import re
from bs4 import BeautifulSoup
import numpy as np
from textblob import TextBlob
import flask
from flask_cors import CORS
from flask import Flask, jsonify

app = flask.Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Load dataset
file_path = "Covid-19 Twitter Dataset (Apr-Jun 2020).csv"
df = pd.read_csv(file_path)

# Clean the dataset and extract necessary columns
df = df[['source', 'original_text', 'created_at', 'favorite_count', 'retweet_count', 'hashtags', 'user_mentions', 'sentiment', 'polarity']].dropna()

def clean_source(html_text):
    return BeautifulSoup(str(html_text), "html.parser").text

df['source'] = df['source'].apply(clean_source)

def extract_mentions(text):
    text = re.sub(r'http\S+', '', str(text))
    return re.findall(r'@(\w+)', text)

# Utility to add 25-30% random variation to numeric values
def add_random_variation(value):
    variation_factor = np.random.uniform(0.7, 1.3)  # 30% variation
    return value * variation_factor

def add_random_variation_dict(d):
    return {k: add_random_variation(v) for k, v in d.items()}

def add_random_variation_to_distribution(d):
    noisy = {k: v * np.random.uniform(0.7, 1.3) for k, v in d.items()}
    total = sum(noisy.values())
    return {k: v / total for k, v in noisy.items()}  # Re-normalize to sum to 1

# Engagement Analysis
def analyze_engagement(df):
    sentiment_distribution = df['sentiment'].value_counts(normalize=True).to_dict()
    sentiment_distribution = add_random_variation_to_distribution(sentiment_distribution)

    metrics = {
        'Average Likes': add_random_variation(df['favorite_count'].mean()),
        'Average Retweets': add_random_variation(df['retweet_count'].mean()),
        'Total Tweets': len(df),
        'Sentiment Distribution': sentiment_distribution
    }
    return metrics

# Behavioral Keywords Analysis
def analyze_behavioral_keywords():
    behavioral_categories = {
        'prevention': ['mask', 'distance', 'hygiene', 'sanitize', 'wash'],
        'medical': ['vaccine', 'treatment', 'hospital', 'doctor', 'medicine'],
        'social_impact': ['lockdown', 'isolation', 'quarantine', 'social'],
        'emotional': ['fear', 'anxiety', 'hope', 'worry', 'stress']
    }
    results = {}
    for category, keywords in behavioral_categories.items():
        matches = df['original_text'].str.contains('|'.join(keywords), case=False)
        sentiment = df[matches]['polarity'].mean()
        results[category] = add_random_variation(sentiment)  # Randomize sentiment
    return results

# Response Patterns Analysis
def analyze_response_patterns():
    df['created_at'] = pd.to_datetime(df['created_at'], errors='coerce')
    df.dropna(subset=['created_at'], inplace=True)
    df['created_at_int'] = df['created_at'].view('int64')
    df['period'] = pd.qcut(df['created_at_int'], q=3, labels=['Early', 'Mid', 'Late'])

    response_patterns = df.groupby('period')['polarity'].agg(['mean', 'std']).round(3).to_dict()

    # Add random variation to mean and std values
    for period in response_patterns:
        response_patterns[period] = {k: add_random_variation(v) for k, v in response_patterns[period].items()}

    return response_patterns

# Temporal Evolution Analysis
def analyze_temporal_evolution():
    covid_weekly = df.set_index('created_at').resample('W').agg({'polarity': 'mean'}).dropna()
    return {
        'Mean': add_random_variation(covid_weekly['polarity'].mean()),
        'Std': add_random_variation(covid_weekly['polarity'].std()),
        'Min': add_random_variation(covid_weekly['polarity'].min()),
        'Max': add_random_variation(covid_weekly['polarity'].max())
    }

# Emotion Analysis
def analyze_emotions():
    covid_emotions = pd.DataFrame({
        'subjectivity': df['original_text'].apply(lambda x: TextBlob(str(x)).sentiment.subjectivity),
        'polarity': df['polarity']
    })
    emotions_stats = covid_emotions.describe().to_dict()

    # Add variation to all numerical emotion metrics
    for column in emotions_stats:
        emotions_stats[column] = add_random_variation_dict(emotions_stats[column])

    return emotions_stats

# API routes with variation added
@app.route('/get_sentiment_distribution')
def get_sentiment_distribution():
    sentiment_distribution = df['sentiment'].value_counts(normalize=True).to_dict()
    randomized_distribution = add_random_variation_to_distribution(sentiment_distribution)
    return jsonify(randomized_distribution)

@app.route('/get_engagement_metrics')
def get_engagement_metrics():
    engagement_metrics = analyze_engagement(df)
    return jsonify(engagement_metrics)

@app.route('/get_behavioral_keywords')
def get_behavioral_keywords():
    behavioral_results = analyze_behavioral_keywords()
    return jsonify(behavioral_results)

@app.route('/get_response_patterns')
def get_response_patterns():
    response_patterns = analyze_response_patterns()
    return jsonify(response_patterns)

@app.route('/get_temporal_evolution')
def get_temporal_evolution():
    temporal_results = analyze_temporal_evolution()
    return jsonify(temporal_results)

@app.route('/get_emotion_analysis')
def get_emotion_analysis():
    emotion_results = analyze_emotions()
    return jsonify(emotion_results)

@app.route('/')
def index():
    return flask.render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, port=5001)
