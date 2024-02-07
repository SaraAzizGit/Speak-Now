from flask import Flask, request, jsonify, send_file
from flask_cors import CORS # Cross Origin Resource Sharing
import os

app = Flask(__name__)
CORS(app)

feedback_data = {}

@app.route("/api/upload_video", methods=["GET", "POST"])
def upload_video():

    # checking if the POST request contains a file
    if "video" not in request.files:
        return jsonify({"error": "No video file provided"}), 400
    
    video_file = request.files["video"]

    save_path = os.path.join(os.path.dirname(__file__), "videos_for_analysis", "uploaded_video.mp4")
    video_file.save(save_path)

    return jsonify({"success": "Video uploaded successfully"}), 200



@app.route("/api/get_feedback", methods=["GET", "POST"])
def get_feedback():

    from facial_expression_data_analysis import nervousness_in_expressions, confidence_in_expressions
    from audio_data_analysis import nervousness_in_speech, confidence_in_speech

    # compiling results from expression and speech analysis
    nervousness = nervousness_in_expressions + nervousness_in_speech
    confidence = confidence_in_expressions + confidence_in_speech

    nervousness = round(nervousness, 2)
    confidence = round(confidence, 2)

    feedback_data = {"nervousness": nervousness, "confidence": confidence}

    return jsonify(feedback_data if feedback_data else {})



@app.route("/api/delete_video", methods=["POST"])
def delete_video():
    
    path = os.path.join(os.path.dirname(__file__), "videos_for_analysis", "uploaded_video.mp4")
    os.remove(path)

    global feedback_data
    feedback_data = {}

    return jsonify({"success": "Video deleted successfully"})



if __name__ == "__main__":
    app.run(debug=True)