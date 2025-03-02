import google.generativeai as genai

def get_news_insights(query):
    genai.configure(api_key="AIzaSyA74ncBn269hXOTs_KSkWE1UZU0WCm48fo")
    
    model = genai.GenerativeModel("gemini-2.0-flash")
    prompt = f"""
    Provide a detailed news insight and a chronological timeline for past 1 months of major events related to the keyword: {query}.
    The response should include:
    - A summary of the latest insights.
    - A timeline of key events with dates.
    - The impact or significance of these events.
    """
    
    response = model.generate_content(prompt)
    return response.text

if __name__ == "__main__":
    query = input("Enter a keyword to fetch news insights and timeline: ")
    insights = get_news_insights(query)
    print("\nNews Insights and Timeline:")
    print(insights)