from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from google.genai import types

app = Flask(__name__)
CORS(app)  # allow React to connect

API_KEY = "AIzaSyC5V3COYo0DjK4fmsRDFtGgeUqNxMF1gI0"
MODEL = "gemini-2.5-flash"

client = genai.Client(api_key=API_KEY)

SYSTEM_INSTRUCTION = (
    "You are a helpful, friendly, and knowledgeable AI assistant."
)

config = types.GenerateContentConfig(
    system_instruction=SYSTEM_INSTRUCTION,
    temperature=0.7,
    max_output_tokens=1024,
)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message")

    try:
        response = client.models.generate_content(
            model=MODEL,
            contents=user_message,
            config=config,
        )

        return jsonify({
            "reply": response.text
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)