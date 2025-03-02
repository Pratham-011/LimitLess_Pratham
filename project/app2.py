import json
import csv
import os
import time
import requests
import asyncio
from datetime import datetime, timedelta
from collections import defaultdict
from twikit import Client, TooManyRequests
from configparser import ConfigParser

# ---- CONFIG ----
GEMINI_API_KEY = "AIzaSyA74ncBn269hXOTs_KSkWE1UZU0WCm48fo"  # Your Gemini API Key
COOKIE_FILE = "cookies.json"
QUERY = "Samay Raina"  # Change to any keyword, hashtag, or URL
DAYS_BACK = 5
MINIMUM_TWEETS = 50  # Fetch at least 50 tweets

# ---- AUTHENTICATION ----
config = ConfigParser()
config.read("/Users/manavpatel/MacBook Drive B/Synergy/Twitter_WebScraping-main/config.ini")
if "X" not in config:
    raise KeyError("Missing [X] section in config.ini. Please add it.")

username = config["X"].get("username", "").strip()
email = config["X"].get("email", "").strip()
password = config["X"].get("password", "").strip()

if not username or not email or not password:
    raise ValueError("Missing values in config.ini. Make sure username, email, and password are set.")

client = Client(language="en-US")
try:
    if os.path.exists(COOKIE_FILE):
        client.load_cookies(COOKIE_FILE)
    else:
        raise FileNotFoundError("Cookies not found. Logging in...")
except Exception:
    try:
        client.login(auth_info_1=username, auth_info_2=email, password=password)
        client.save_cookies(COOKIE_FILE)
    except Exception as e:
        print(f"Login failed: {str(e)}")
        # Continue execution regardless of login failure

# ---- FETCH TWEETS (ASYNC) ----
async def fetch_tweets(query, days):
    tweets = []
    since = datetime.utcnow() - timedelta(days=days)
    try:
        search_results = await client.search_tweet(query, product="Top")
        while len(tweets) < MINIMUM_TWEETS:
            for tweet in search_results:
                tweet_date = datetime.strptime(tweet.created_at, "%a %b %d %H:%M:%S +0000 %Y")
                if tweet_date >= since:
                    tweets.append([tweet_date, tweet.user.name, tweet.text, tweet.retweet_count, tweet.favorite_count])
            search_results = await search_results.next()
    except TooManyRequests as e:
        await asyncio.sleep(e.rate_limit_reset - datetime.utcnow().timestamp())
    except Exception as e:
        print(f"Error fetching tweets: {str(e)}")
    
    return tweets

# ---- GEMINI WEB SEARCH API CALL ----
def gemini_web_search(query):
    """Fetch recent news and insights about a person/topic using Gemini API."""
    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"
    headers = {"Content-Type": "application/json"}
    data = {
        "contents": [{"parts": [{"text": f"Give a timeline and key insights about {query}"}]}]
    }
    
    try:
        response = requests.post(f"{url}?key={GEMINI_API_KEY}", headers=headers, json=data)
        response.raise_for_status()  # Check if request was successful
        result = response.json()
        return result.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "No insights available.")
    
    except requests.exceptions.HTTPError as e:
        print(f"Gemini API HTTP Error: {e.response.status_code} - {e.response.text}")
    except requests.exceptions.RequestException as e:
        print(f"Gemini API Connection Error: {str(e)}")
    
    return "Failed to retrieve insights."

# ---- SAVE TO CSV ----
def save_to_csv(filename, data, headers):
    with open(filename, "w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        writer.writerow(headers)
        writer.writerows(data)

# ---- MAIN FUNCTION (ASYNC) ----
async def main():
    # Still fetch tweets to save them
    tweets = await fetch_tweets(QUERY, DAYS_BACK)
    print(f"Fetched {len(tweets)} tweets.")
    
    # Save the tweets to CSV
    save_to_csv("tweets.csv", tweets, ["Date", "User", "Text", "Retweets", "Likes"])
    
    # Use Gemini with web search for timeline and insights
    print("Requesting timeline and insights from Gemini with web search...")
    timeline_and_insights = gemini_web_search(QUERY)
    
    # Save the combined timeline and insights
    # with open("timeline_and_insights.txt", "w", encoding="utf-8") as file:
        # file.write(timeline_and_insights)
    
    # print(f"Timeline and insights saved to timeline_and_insights.txt")

if __name__ == "__main__":
    asyncio.run(main())