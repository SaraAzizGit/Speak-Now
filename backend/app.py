from flask import Flask, jsonify
from flask_cors import CORS
from facial_expression_data_analysis import nervousness_in_expressions, confidence_in_expressions
from audio_data_analysis import nervousness_in_speech, confidence_in_speech

app = Flask(__name__)
CORS(app)

@app.route("/api/upload_video", methods=["POST"])
def upload_video():

    

    return jsonify()



@app.route("/api/get_feedback", methods=["GET"])
def get_feedback():

    # compiling results from expression and speech analysis
    nervousness = nervousness_in_expressions + nervousness_in_speech
    confidence = confidence_in_expressions + confidence_in_speech

    nervousness = round(nervousness, 2)
    confidence = round(confidence, 2)

    return jsonify({"nervousness": nervousness, "confidence": confidence})



if __name__ == "__main__":
    app.run(debug=False)