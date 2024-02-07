from flask import Flask, request, jsonify, send_file
from flask_cors import CORS # Cross Origin Resource Sharing
import os

app = Flask(__name__)
CORS(app)

video_feedback_data = {}
video_id = ""

@app.route("/api/upload_video", methods=["GET", "POST"])
def upload_video():

    global video_id
    video_id = request.form.get('video_id')

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

    global feedback_data
    feedback_data = {"nervousness": nervousness, "confidence": confidence}
    video_feedback_data[video_id] = feedback_data
    print(video_feedback_data)

    return jsonify(video_feedback_data)



@app.route("/api/delete_video", methods=["POST"])
def delete_video():
    
    video_path = os.path.join(os.path.dirname(__file__), "videos_for_analysis", "uploaded_video.mp4")
    os.remove(video_path)

    audio_path = os.path.join(os.path.dirname(__file__), "audios_for_analysis", "audio.wav")
    os.remove(audio_path)

    if video_id in video_feedback_data:
        del video_feedback_data[video_id]

    return jsonify({"success": "Video deleted successfully"})



if __name__ == "__main__":
    app.run(debug=True)