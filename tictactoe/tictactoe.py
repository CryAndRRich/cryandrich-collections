from flask import Flask, render_template, request, session
from flask_cors import CORS
import webbrowser

app = Flask(__name__)
CORS(app)
app.secret_key = 'your_secret_key'

PORT = 5000
OPEN_BROWSER = True

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/variations', methods=['POST'])
def variations():
    msg = {
        'player1': request.form['player1'],
        'player2': request.form['player2']
    }
    session['message'] = msg
    return render_template('variations.html', msg=msg)

@app.route('/variations/back', methods=['POST'])
def variations_back():
    return render_template('variations.html', msg=session.get('message'))

@app.route('/<variant_name>')
def variant(variant_name):
    """Render the template for a specific variant"""

    valid_variants = ['basic', 'hexagonal', 'qubic']
    if variant_name in valid_variants:
        return render_template(f'variants_template/{variant_name}.html', msg=session.get('message'))
    return "Variant not found", 404

if __name__ == '__main__':
    if OPEN_BROWSER:
        def open_browser():
            webbrowser.open(f'http://127.0.0.1:{PORT}')
        open_browser()

    app.run(host='127.0.0.1', port=PORT)
