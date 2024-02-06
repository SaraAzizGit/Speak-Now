import requests
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS # Cross Origin Resource Sharing
import os

app = Flask(__name__)
CORS(app)

@app.route("/api/upload_recorded_video", methods=["GET", "POST"])
def upload_recorded_video():
    # checking if the POST request contains a URL
    if "video" not in request.form:
        return jsonify({"error": "No video URL provided"}), 400
    
    video_url = request.form["video"]
    print("Received video URL:", video_url)

    # fetch the video file from the URL
    response = requests.get(video_url)
    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch video file from URL"}), 400
    
    video_file = response.content

    # save the video file
    save_path = os.path.join(os.path.dirname(__file__), "videos_for_analysis", "uploaded_video.mp4")
    with open(save_path, "wb") as f:
        f.write(video_file)

    return jsonify({"success": "Video uploaded successfully"}), 200




@app.route("/api/upload_video", methods=["GET", "POST"])
def upload_video():

    # checking if the POST request contains a file
    if "video" not in request.files:
        return jsonify({"error": "No video file provided"}), 400
    
    video_file = request.files["video"]

    save_path = os.path.join(os.path.dirname(__file__), "videos_for_analysis", "uploaded_video.mp4")
    video_file.save(save_path)

    return jsonify({"success": "Video uploaded successfully"}), 200



@app.route("/api/get_feedback", methods=["GET"])
def get_feedback():

    from facial_expression_data_analysis import nervousness_in_expressions, confidence_in_expressions
    from audio_data_analysis import nervousness_in_speech, confidence_in_speech

    # compiling results from expression and speech analysis
    nervousness = nervousness_in_expressions + nervousness_in_speech
    confidence = confidence_in_expressions + confidence_in_speech

    nervousness = round(nervousness, 2)
    confidence = round(confidence, 2)

    return jsonify({"nervousness": nervousness, "confidence": confidence})



@app.route("/api/delete_video", methods=["POST"])
def delete_video():
    
    path = os.path.join(os.path.dirname(__file__), "videos_for_analysis", "uploaded_video.mp4")
    os.remove(path)

    return jsonify({"success": "Video deleted successfully"})



if __name__ == "__main__":
    app.run(debug=True)