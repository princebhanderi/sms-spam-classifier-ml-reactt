from flask import Flask, jsonify, request
from flask_cors import CORS  # Import CORS

# Your existing imports for model and preprocessing
import pickle
import string
from nltk.corpus import stopwords
import nltk
from nltk.stem.porter import PorterStemmer
from sklearn.feature_extraction.text import TfidfVectorizer

# Initialize Flask application
app = Flask(__name__)
CORS(app)  # Enable CORS for all origins

# Load your trained model and vectorizer
model = pickle.load(open('model.pkl', 'rb'))
vectorizer = pickle.load(open('vectorizer.pkl', 'rb'))

# Initialize NLTK objects
ps = PorterStemmer()
stop_words = set(stopwords.words('english'))

def preprocess_text(text):
    # Custom text preprocessing function
    text = text.lower()  # Convert to lowercase
    text = nltk.word_tokenize(text)  # Tokenize text
    text = [ps.stem(word) for word in text if word.isalnum() and word not in stop_words]  # Stemming and remove stopwords
    return " ".join(text)  # Return preprocessed text

@app.route('/predict', methods=['POST', 'OPTIONS'])  # Allow OPTIONS method
def predict():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()

    try:
        data = request.json  # Get JSON data from request
        message = data['message']  # Extract 'message' from JSON data

        # Preprocess the message
        processed_message = preprocess_text(message)

        # Vectorize the processed message
        input_vector = vectorizer.transform([processed_message])

        # Predict using the model
        prediction = model.predict(input_vector)[0]

        # Return prediction as JSON response
        return jsonify({'prediction': 'Spam' if prediction == 1 else 'Not Spam'})

    except Exception as e:
        return jsonify({'error': str(e)})  # Return error message if any issue occurs

def _build_cors_preflight_response():
    response = jsonify({})
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")
    return response

if __name__ == '__main__':
    app.run(debug=True)