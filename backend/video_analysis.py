import os
import cv2 # for capturing and reading video
from deepface import DeepFace # for analyzing facial expressions in video frames
from moviepy.editor import VideoFileClip # for extracting audio from video

# function to analyze video frame by frame to recognize emotions expressed
def analyze_video(video_path):
    
    cap = cv2.VideoCapture(video_path)

    emotions = []

    while cap.isOpened():
        ret, frame = cap.read()

        if not ret:
            break

        result = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
        emotions.append(result[0])

        if cv2.waitKey(1) == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

    return emotions



# function to extract audio from video file
def extract_audio(video_path, output_audio_path):
    
    video_clip = VideoFileClip(video_path) # load video clip

    audio_clip = video_clip.audio # extract audio from video clip

    audio_clip.write_audiofile(output_audio_path) # save audio to a file

    video_clip.close()
    audio_clip.close()



# sending video file to functions to recognize emotions and extract audio
video_relative_path = "../backend/videos_for_analysis/test_video_1.mp4"
video_absolute_path = os.path.abspath(video_relative_path)

output_audio_relative_path = "../backend/audios_for_analysis/audio.wav"
output_audio_absolute_path = os.path.abspath(output_audio_relative_path)

facial_expression_data = analyze_video(video_absolute_path) # extracted emotions
extract_audio(video_absolute_path, output_audio_absolute_path) # extracted audio