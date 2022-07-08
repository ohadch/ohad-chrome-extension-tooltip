import json

from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

PORT = 8500


@app.post("/tooltip")
def tooltip():
    text = json.loads(request.data)["text"]

    return {
        "text": f"{len(text)} characters"
    }


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=PORT)
