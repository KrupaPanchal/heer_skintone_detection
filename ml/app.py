from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import cv2
from PIL import Image
import io

from face_detect import get_face
from skin_extract import extract_skin
from skin_tone import get_skin_tone_and_undertone

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

def normalize_skin(face_img):
    """Reduce makeup & filter effects"""
    lab = cv2.cvtColor(face_img, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    a = cv2.GaussianBlur(a, (5, 5), 0)
    b = cv2.GaussianBlur(b, (5, 5), 0)
    normalized = cv2.merge((l, a, b))
    normalized = cv2.merge((l, a, b))
    return cv2.cvtColor(normalized, cv2.COLOR_LAB2BGR)

@app.route("/", methods=["GET"])
def home():
    return "ML Service is Running! 🤖 Use /analyze endpoint.", 200

@app.route("/analyze", methods=["POST"])
def analyze():
    try:
        # 1️⃣ Validate image
        if "image" not in request.files:
            return jsonify({"errorType": "NO_IMAGE"}), 400

        file = request.files["image"]
        img_bytes = file.read()

        if not img_bytes:
            return jsonify({"errorType": "EMPTY_IMAGE"}), 400

        # 2️⃣ Decode safely
        try:
            pil_image = Image.open(io.BytesIO(img_bytes)).convert("RGB")
        except:
            return jsonify({"errorType": "INVALID_IMAGE"}), 400

        image = np.array(pil_image)
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

        # 3️⃣ Detect face
        face, status = get_face(image)

        if status == "NO_FACE":
            return jsonify({"errorType": "NO_FACE"}), 400

        if status == "FULL_BODY":
            return jsonify({"errorType": "FULL_BODY"}), 400

        # 4️⃣ Normalize makeup / filter
        face = normalize_skin(face)

        # 5️⃣ Extract skin
        skin, mask = extract_skin(face)

        if skin is None or mask is None:
            return jsonify({"errorType": "SKIN_EXTRACTION_FAILED"}), 400

        # 6️⃣ Detect tone
        tone, undertone = get_skin_tone_and_undertone(skin, mask)

        if tone is None:
            return jsonify({"errorType": "DETECTION_FAILED"}), 400

        return jsonify({
            "skinTone": tone,
            "undertone": undertone
        })

    except Exception as e:
        print("🔥 INTERNAL ERROR:", e)
        return jsonify({
            "errorType": "SERVER_ERROR",
            "message": "Unable to analyze image"
        }), 500

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port, debug=True)
