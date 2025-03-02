from pymongo import MongoClient
import networkx as nx
import matplotlib.pyplot as plt
import community as community_louvain  # python-louvain for community detection

# --- MongoDB Connection and Search Setup ---
client = MongoClient("mongodb+srv://prathamds02:1234@cluster0.aa2d7p9.mongodb.net/")
db = client["twitterDB"]
tweets_collection = db["tweets"]

def ensure_text_index():
    # Retrieve existing indexes on the collection.
    indexes = tweets_collection.index_information()
    for index in indexes.values():
        if any(field_type == "text" for _, field_type in index.get("key", [])):
            print("A text index already exists, using the existing index.")
            return
    # No text index found; create the desired text index.
    desired_key = [("text", "text"), ("hashtags", "text"), ("username", "text"), ("place", "text")]
    tweets_collection.create_index(
        desired_key,
        default_language="english",
        language_override="unused"  # Use a non-existent field to avoid conflicts
    )
    print("Text index created.")

def search_tweets(query):
    # Use MongoDB's $text operator for full-text search.
    cursor = tweets_collection.find({"$text": {"$search": query}})
    return list(cursor)

# --- Network Graph Building ---
def build_network(results):
    """
    Build a network graph from tweet results.
    Nodes: usernames (from "username" field)
    Edges: interactions from "mentions" (if present)
    """
    G = nx.Graph()
    for doc in results:
        username = doc.get("username")
        if username:
            G.add_node(username)
        # Process the "mentions" field: if not a list, treat it as empty.
        mentions = doc.get("mentions")
        if not isinstance(mentions, list):
            mentions = []
        for mentioned_user in mentions:
            if mentioned_user:
                G.add_node(mentioned_user)
                G.add_edge(username, mentioned_user)
    return G

# --- Cleaner Visualization ---
def visualize_network(G):
    if G.number_of_nodes() == 0:
        print("No network to display.")
        return

    # --- Community Detection ---
    partition = community_louvain.best_partition(G)

    # --- Influence Measures ---
    betweenness = nx.betweenness_centrality(G)
    # Scale node sizes based on betweenness centrality.
    node_sizes = [5000 * betweenness.get(node, 0.1) for node in G.nodes()]
    # Color nodes based on their community.
    community_colors = [partition.get(node, 0) for node in G.nodes()]

    # --- Use Kamada-Kawai Layout for a cleaner distribution ---
    pos = nx.kamada_kawai_layout(G)

    plt.figure(figsize=(12, 10))

    # Draw nodes with some transparency
    nx.draw_networkx_nodes(
        G,
        pos,
        node_color=community_colors,
        cmap=plt.cm.Set3,
        node_size=node_sizes,
        alpha=0.9
    )

    # Draw edges with reduced alpha to lessen clutter
    nx.draw_networkx_edges(
        G,
        pos,
        alpha=0.3,
        edge_color="gray"
    )

    # Draw labels with smaller font and a translucent bounding box
    nx.draw_networkx_labels(
        G,
        pos,
        font_size=8,
        font_family="sans-serif",
        bbox=dict(facecolor="white", alpha=0.6, edgecolor="none")
    )

    plt.title("Misinformation Network Graph\n(Communities & Influential Nodes)", fontsize=14)
    plt.axis("off")
    plt.tight_layout()  # Ensures the plot fits nicely in the figure
    plt.show()

# --- Main Execution ---
if __name__ == "__main__":
    ensure_text_index()
    query = input("Enter search query: ")
    results = search_tweets(query)
    print(f"Found {len(results)} result(s):")
    for doc in results:
        print(doc)
    
    # Build the network graph from the search results
    G = build_network(results)
    visualize_network(G)





# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from pymongo import MongoClient
# import networkx as nx
# import matplotlib.pyplot as plt
# import community as community_louvain  # python-louvain for community detection
# import io
# import base64

# app = Flask(__name__)
# CORS(app)  # Allow requests from your React app

# # --- MongoDB Connection ---
# client = MongoClient("mongodb+srv://prathamds02:1234@cluster0.aa2d7p9.mongodb.net/")
# db = client["twitterDB"]
# tweets_collection = db["tweets"]

# # --- Helper Functions ---

# def ensure_text_index():
#     indexes = tweets_collection.index_information()
#     for index in indexes.values():
#         if any(field_type == "text" for _, field_type in index.get("key", [])):
#             print("A text index already exists, using the existing index.")
#             return
#     desired_key = [("text", "text"), ("hashtags", "text"), ("username", "text"), ("place", "text")]
#     tweets_collection.create_index(
#         desired_key,
#         default_language="english",
#         language_override="unused"
#     )
#     print("Text index created.")

# def search_tweets(query):
#     cursor = tweets_collection.find({"$text": {"$search": query}})
#     return list(cursor)

# def build_network(results):
#     """
#     Build an undirected graph.
#     Nodes: tweet usernames.
#     Edges: from tweeting user to each mentioned user.
#     """
#     G = nx.Graph()
#     for doc in results:
#         username = doc.get("username")
#         if username:
#             G.add_node(username)
#         mentions = doc.get("mentions")
#         if not isinstance(mentions, list):
#             mentions = []
#         for mentioned_user in mentions:
#             if mentioned_user:
#                 G.add_node(mentioned_user)
#                 G.add_edge(username, mentioned_user)
#     return G

# def visualize_network(G):
#     if G.number_of_nodes() == 0:
#         print("No network to display.")
#         return None

#     partition = community_louvain.best_partition(G)
#     betweenness = nx.betweenness_centrality(G)
#     node_sizes = [5000 * betweenness.get(node, 0.1) for node in G.nodes()]
#     community_colors = [partition.get(node, 0) for node in G.nodes()]

#     pos = nx.kamada_kawai_layout(G)
#     plt.figure(figsize=(12, 10))
#     nx.draw_networkx_nodes(G, pos, node_color=community_colors, cmap=plt.cm.Set3, node_size=node_sizes, alpha=0.9)
#     nx.draw_networkx_edges(G, pos, alpha=0.3, edge_color="gray")
#     nx.draw_networkx_labels(G, pos, font_size=8, font_family="sans-serif",
#                             bbox=dict(facecolor="white", alpha=0.6, edgecolor="none"))
#     plt.title("Misinformation Network Graph\n(Communities & Influential Nodes)", fontsize=14)
#     plt.axis("off")
#     plt.tight_layout()

#     buf = io.BytesIO()
#     plt.savefig(buf, format='png')
#     plt.close()
#     buf.seek(0)
#     encoded_image = base64.b64encode(buf.getvalue()).decode('utf-8')
#     return encoded_image

# # --- API Endpoints ---

# @app.route('/search', methods=['POST'])
# def search():
#     data = request.get_json()
#     query = data.get('query')
#     ensure_text_index()
#     results = search_tweets(query)
#     return jsonify({"results": results})

# @app.route('/graph', methods=['POST'])
# def graph():
#     data = request.get_json()
#     query = data.get('query')
#     ensure_text_index()
#     results = search_tweets(query)
#     G = build_network(results)
#     encoded_image = visualize_network(G)
#     if encoded_image is None:
#         return jsonify({"graphImage": None})
#     return jsonify({"graphImage": encoded_image})

# if __name__ == '__main__':
#     app.run(debug=True)
