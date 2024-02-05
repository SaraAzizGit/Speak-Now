import subprocess
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS # Cross Origin Resource Sharing
import os

app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    response = send_file('index.html')
    response.headers['Cross-Origin-Opener-Policy'] = 'same-origin'
    response.headers['Cross-Origin-Embedder-Policy'] = 'require-corp'
    return response



@app.route('/api/crop-video', methods=['POST'])
def crop_video():
    # Check if a file was uploaded
    if 'video' not in request.files:
        return 'No file provided', 400

    video_file = request.files['video']

    # Save the uploaded video
    video_path = 'uploaded_video.webm'
    video_file.save(video_path)

    # Define the start and end time for cropping (example: 10 seconds to 30 seconds)
    start_time = '00:00:00'
    duration = '00:00:02'

    # Define the output file path for the cropped video
    cropped_video_path = 'cropped_video.webm'

    # Run ffmpeg command to crop the video
    crop_command = f'ffmpeg -i {video_path} -ss {start_time} -t {duration} -c:v copy -c:a copy {cropped_video_path}'
    subprocess.run(crop_command, shell=True)

    # Return the path to the cropped video
    return jsonify({'cropped_video_path': cropped_video_path})
    


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