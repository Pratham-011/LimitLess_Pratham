from elasticsearch import Elasticsearch

# Connect to your Elasticsearch instance
es = Elasticsearch("http://localhost:9200")  # Ensure Elasticsearch is running

def create_index():
    mapping = {
        "mappings": {
            "properties": {
                "tweet": {"type": "keyword"},
                "tweet_ID": {"type": "keyword"},
                "user": {"type": "text"},
                "username": {"type": "keyword"},
                "text": {"type": "text"},
                "created_at": {"type": "date", "format": "EEE MMM dd HH:mm:ss Z yyyy"},
                "likes": {"type": "integer"},
                "language": {"type": "keyword"},
                "hashtags": {"type": "keyword"},
                "mentions": {"type": "keyword"},
                "place": {"type": "keyword"}
            }
        }
    }
    # Create the index "tweets" (ignore error if it already exists)
    es.indices.create(index="tweets", body=mapping, ignore=400)
    print("Index created (or already exists).")

def index_sample_document():
    doc = {
        "tweet": "1",
        "tweet_ID": "1895898312735166948",
        "user": "Infosec Alevski 💻🕵️‍♂️",
        "username": "Alevskey",
        "text": "DeepSeek claims ‘theoretical’ profit margins of 545%: https://t.co/gYeicht7Wr by TechCrunch #infosec #cybersecurity #technology #news",
        "created_at": "Sat Mar 01 18:05:56 +0000 2025",
        "likes": 0,
        "language": "en",
        "hashtags": None,   # Replace NaN with None or clean the data
        "mentions": None,
        "place": None
    }
    # Index the document with a specific id
    es.index(index="tweets", id="67c34fd6719fd98b1db6eb5e", document=doc)
    print("Document indexed.")

if __name__ == "__main__":
    create_index()
    index_sample_document()
