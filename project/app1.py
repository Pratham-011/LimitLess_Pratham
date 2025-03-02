import pandas as pd
import json
import re
from bs4 import BeautifulSoup
import numpy as np
from textblob import TextBlob
from collections import Counter
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

# Engagement Analysis Functions
def analyze_engagement(df):
    sentiment_distribution = df['sentiment'].value_counts(normalize=True).to_dict()
    metrics = {
        'Average Likes': df['favorite_count'].mean(),
        'Average Retweets': df['retweet_count'].mean(),
        'Total Tweets': len(df),
        'Sentiment Distribution': sentiment_distribution
    }
    return metrics

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
        results[category] = sentiment
    return results

def analyze_response_patterns():
    # Convert 'created_at' to datetime (coerce errors and drop invalid rows)
    df['created_at'] = pd.to_datetime(df['created_at'], errors='coerce')
    df.dropna(subset=['created_at'], inplace=True)
    
    # Convert datetime to int64 (nanoseconds since epoch)
    df['created_at_int'] = df['created_at'].view('int64')
    
    # Create quantile-based periods
    df['period'] = pd.qcut(df['created_at_int'], q=3, labels=['Early', 'Mid', 'Late'])
    
    return df.groupby('period')['polarity'].agg(['mean', 'std']).round(3).to_dict()


def analyze_temporal_evolution():
    covid_weekly = df.set_index('created_at').resample('W').agg({'polarity': 'mean'}).dropna()
    return {
        'Mean': covid_weekly['polarity'].mean(),
        'Std': covid_weekly['polarity'].std(),
        'Min': covid_weekly['polarity'].min(),
        'Max': covid_weekly['polarity'].max()
    }

def analyze_emotions():
    covid_emotions = pd.DataFrame({
        'subjectivity': df['original_text'].apply(lambda x: TextBlob(str(x)).sentiment.subjectivity),
        'polarity': df['polarity']
    })
    return covid_emotions.describe().to_dict()

# API routes for different analysis functions
@app.route('/get_sentiment_distribution')
def get_sentiment_distribution():
    sentiment_distribution = df['sentiment'].value_counts(normalize=True).to_dict()
    return flask.jsonify(sentiment_distribution)

@app.route('/get_engagement_metrics')
def get_engagement_metrics():
    engagement_metrics = analyze_engagement(df)
    return flask.jsonify(engagement_metrics)

@app.route('/get_behavioral_keywords')
def get_behavioral_keywords():
    behavioral_results = analyze_behavioral_keywords()
    return flask.jsonify(behavioral_results)

@app.route('/get_response_patterns')
def get_response_patterns():
    response_patterns = analyze_response_patterns()
    return flask.jsonify(response_patterns)

@app.route('/get_temporal_evolution')
def get_temporal_evolution():
    temporal_results = analyze_temporal_evolution()
    return flask.jsonify(temporal_results)

@app.route('/get_emotion_analysis')
def get_emotion_analysis():
    emotion_results = analyze_emotions()
    return flask.jsonify(emotion_results)

@app.route('/')
def index():
    return flask.render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, port=5001) 
