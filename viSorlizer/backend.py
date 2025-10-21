from flask import Flask, jsonify, render_template, request, session
from flask_cors import CORS
import requests
import webbrowser

app = Flask(__name__, template_folder='frontend')
app.SECRET_KEY = 'YOUR_SECRET_KEY'
app.SECRET_TOKEN = 'YOUR_SECRET_TOKEN'
CORS(app)

PORT = 5000
OPEN_BROWSER = True
API_URL = 'YOUR_MODEL_API'

def query_chatbot(payload):
    headers = {"Authorization": f"Bearer {app.SECRET_TOKEN}"}
    response = requests.post(API_URL, headers=headers, json=payload)
    
    if response.status_code != 200:
        return f"Error!!!"
    
    data = response.json()
    
    if isinstance(data, list) and len(data) > 0 and "generated_text" in data[0]:
        return data[0]["generated_text"]
    else:
        return str(data)

@app.route("/")
def home():
    return render_template("index.html")

@app.route('/<sorting_name>')
def sorting(sorting_name):
    """Render the template for a specific sorting"""

    valid_sorting = ['bubblesort', 'insertionsort', 'oddevensort', 'selectionsort',
                     'quicksort', 'combsort', 'gnomesort', 'cocktailsort', 'heapsort',
                     'pesort', 'mergesort', 'cubesort', 'introsort', 'shellsort',
                     'timsort', 'pancakesort', 'strandsort', 'exchangesort', 'cyclesort',
                     'flashsort', 'stoogesort']
    if sorting_name in valid_sorting:
        return render_template(f'sort_algos/{sorting_name}.html', audio=session.get("audio", True))
    return "Sorting Algorithms not found", 404

@app.route("/ranking")
def ranking():
    return render_template("ranking.html")

@app.route("/audio/", methods=["PUT"])
def change_audio():
    session["audio"] = not session.get("audio", True)
    return "", 204

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message", "")
    ai_response = query_chatbot({"inputs": user_input})
    return jsonify({"response": ai_response})

if __name__ == '__main__':
    if OPEN_BROWSER:
        def open_browser():
            webbrowser.open('http://127.0.0.1:%d' % PORT)
        open_browser()

    app.run(host='127.0.0.1', port=PORT)