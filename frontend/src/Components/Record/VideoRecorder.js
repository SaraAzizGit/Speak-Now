import { useState, useRef } from "react";
import axios from "axios";
import Slider from './Slider';
import './VidTrim.css';
import VideoInput from './VideoInput';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const mimeType = "video/webm";

const VideoRecorder = () => {
    const [permission, setPermission] = useState(false);
    const mediaRecorder = useRef(null);
    const liveVideoFeed = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [stream, setStream] = useState(null);
    const [videoChunks, setVideoChunks] = useState([]);
    const [recordedVideo, setRecordedVideo] = useState(null);
    const [startRecordingTime, setStartRecordingTime] = useState(null);

    const [start_val, set_start_val] = useState(0);
    const [end_val, set_end_val] = useState(0);
    const [vid, set_vid] = useState();
    const [vid_loaded, set_vid_loaded] = useState(false);
    const [vid_duration, set_vid_duration] = useState(0);
    const [dataUrl, setDataUrl] = useState();
    const [processing, setProcessing] = useState(false);
    const [progress, setProgress] = useState();

    var ffmpeg = createFFmpeg({log: true});
    ffmpeg.setProgress(({ratio}) => {
        setProgress((ratio * 100).toPrecision(2));
    })

    var data = "";
    
    function onSlideChangeStart(event) {
        console.log(event.target.value);
        set_start_val(event.target.value);
        set_end_val(Math.max(end_val, event.target.value));
    }

    function onSlideChangeEnd(event) {
        set_end_val(Math.max(start_val, event.target.value));
    }

    function secondsToTimeStamp (s) {
        var date = new Date(0);
        date.setSeconds(s);
        var timeString = date.toISOString().substring(11, 19);
        return timeString;
    }

    async function handleClick(event) {

        setProcessing(true);
        await ffmpeg.load();
        await ffmpeg.FS('writeFile', 'in.avi', await fetchFile(vid));
        await ffmpeg.run('-ss', secondsToTimeStamp(start_val), '-to', secondsToTimeStamp(end_val), '-i', 'in.avi', 'out.mp4');
        setProgress(100);
        data = (await ffmpeg.FS('readFile', 'out.mp4'));
        setDataUrl(URL.createObjectURL(new Blob([data.buffer], {type: 'video/mp4'})));
    }

    const getCameraPermission = async () => {
        setRecordedVideo(null);
        if ("MediaRecorder" in window) {
            try {
                const videoConstraints = {
                    audio: false,
                    video: true,
                };
                const audioConstraints = { audio: true };
                // create audio and video streams separately
                const audioStream = await navigator.mediaDevices.getUserMedia(
                    audioConstraints
                );
                const videoStream = await navigator.mediaDevices.getUserMedia(
                    videoConstraints
                );
                setPermission(true);
                //combine both audio and video streams
                const combinedStream = new MediaStream([
                    ...videoStream.getVideoTracks(),
                    ...audioStream.getAudioTracks(),
                ]);
                setStream(combinedStream);
                //set videostream to live feed player
                liveVideoFeed.current.srcObject = videoStream;
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    const startRecording = async () => {
        setRecordingStatus("recording");
        const media = new MediaRecorder(stream, { mimeType });
        mediaRecorder.current = media;
        mediaRecorder.current.start();
        setStartRecordingTime(Date.now()); // Record the start time
        let localVideoChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            localVideoChunks.push(event.data);
        };
        setVideoChunks(localVideoChunks);
    };

    const stopRecording = async () => {
        setPermission(false);
        setRecordingStatus("inactive");
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = async () => {
            const endRecordingTime = Date.now(); // Record the end time
            const duration = endRecordingTime - startRecordingTime;
            const startSeconds = 0; // Example start time in seconds
            const endSeconds = duration; // Example end time in seconds

            // Filter video chunks for the desired duration
            const filteredChunks = videoChunks.filter((chunk, index) => {
                const startTime = index * 1000 / 60; // Assuming 60 fps
                return startTime >= startSeconds && startTime <= endSeconds;
            });

            const videoBlob = new Blob(filteredChunks, { type: mimeType });
            const videoUrl = URL.createObjectURL(videoBlob);
            setRecordedVideo(videoUrl);
            setVideoChunks([]);

            const formData = new FormData();
            formData.append('video', videoBlob, 'cropped_video.webm');

            try {
                const response = await axios.post('http://localhost:5000/api/crop-video', formData, { method: 'POST', })

                console.log(response.data);
                // You can handle success here, like displaying a success message or redirecting the user.
            } catch (error) {
                console.error('Error uploading video:', error);
                // You can handle errors here, like displaying an error message to the user.
            }
        };
    };

    return (
        <div>
            <h2>Video Recorder</h2>
            <main>
                <div className="video-controls">
                    {!permission ? (
                        <button onClick={getCameraPermission} type="button">
                            Record Video
                        </button>
                    ) : null}
                    {permission && recordingStatus === "inactive" ? (
                        <button onClick={startRecording} type="button">
                            Start Recording
                        </button>
                    ) : null}
                    {recordingStatus === "recording" ? (
                        <button onClick={stopRecording} type="button">
                            Stop Recording
                        </button>
                    ) : null}
                </div>
            </main>

            <div className="video-player">
                {!recordedVideo ? (
                    <video ref={liveVideoFeed} autoPlay className="live-player"></video>
                ) : null}
                {recordedVideo ? (
                    <div className="recorded-player">
                        <video className="recorded" src={recordedVideo} controls></video>
                        <a download href={recordedVideo}>
                            Download Recording
                        </a>
                    </div>
                ) : null}
            </div>
            <div className="VidTrim">
                <div>
                    <VideoInput vid_load={set_vid_loaded} set_vid_duration={set_vid_duration} set_vid={set_vid} width={"60%"} height={"30%"}></VideoInput>
                    <div id="Sliders">
                        <Slider value={start_val} max={vid_duration} disabled={vid_loaded} title={"Start Trim"} changeSlide={onSlideChangeStart} convertTime={secondsToTimeStamp}></Slider>
                        
                        <Slider value={end_val} min={start_val} max={vid_duration} disabled={vid_loaded} title={"End Trim"} changeSlide={onSlideChangeEnd} convertTime={secondsToTimeStamp}></Slider>
                    </div>
                    <div id="btnContainer">
                    <button id="btnConvert" onClick={handleClick} disabled={!vid_loaded}>Trim Video</button>
                    </div>
                    <div>
                    {processing && <p className="details">Processing: {progress}%</p>}
                    </div>
                </div>
                <div id="output-video">
                    {dataUrl && <VideoInput source={dataUrl} width={"60%"} height={"30%"}></VideoInput>}
                </div>
            </div>
        </div>
    );
};

export default VideoRecorder;