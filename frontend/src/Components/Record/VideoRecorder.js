import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Slider from "./Slider";
import "./VideoRecorder.css";
import VideoInput from "./VideoInput";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import Button from "../../Components/Button/Button";

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
    const [length, setLength] = useState(0);

    const [start_val, set_start_val] = useState(0);
    const [end_val, set_end_val] = useState(0);
    const [set_vid] = useState();
    const [vid_duration, set_vid_duration] = useState(0);
    const [dataUrl, setDataUrl] = useState();
    const [processing, setProcessing] = useState(false);
    const [progress, setProgress] = useState();

    useEffect(() => {}, [length]);

    var ffmpeg = createFFmpeg({ log: true });
    ffmpeg.setProgress(({ ratio }) => {
        setProgress((ratio * 100).toPrecision(2));
    });

    var data = "";

    function onSlideChangeStart(event) {
        set_start_val(event.target.value);
        set_end_val(Math.max(end_val, event.target.value));
    }

    function onSlideChangeEnd(event) {
        set_end_val(Math.max(start_val, event.target.value));
    }

    function secondsToTimeStamp(s) {
        var date = new Date(0);
        date.setSeconds(s);
        var timeString = date.toISOString().substring(11, 19);
        return timeString;
    }

    async function handleClick(event) {
        setProcessing(true);
        await ffmpeg.load();
        await ffmpeg.FS("writeFile", "in.avi", await fetchFile(recordedVideo));
        await ffmpeg.run(
            "-ss",
            secondsToTimeStamp(start_val),
            "-to",
            secondsToTimeStamp(end_val),
            "-i",
            "in.avi",
            "out.mp4",
        );
        setProgress(100);
        data = await ffmpeg.FS("readFile", "out.mp4");
        const dataUrl = URL.createObjectURL(
            new Blob([data.buffer], { type: "video/mp4" }),
        );
        setDataUrl(dataUrl);
        const file = new Blob([data.buffer], { type: "video/mp4" });
        uploadVideo(file);
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
                const audioStream =
                    await navigator.mediaDevices.getUserMedia(audioConstraints);
                const videoStream =
                    await navigator.mediaDevices.getUserMedia(videoConstraints);
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
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
        }
        mediaRecorder.current.onstop = async () => {
            const endRecordingTime = Date.now(); // Record the end time
            const duration = endRecordingTime - startRecordingTime;
            setLength(duration / 1000);
            const startSeconds = 0; // Example start time in seconds
            const endSeconds = duration; // Example end time in seconds

            // Filter video chunks for the desired duration
            const filteredChunks = videoChunks.filter((chunk, index) => {
                const startTime = (index * 1000) / 60; // Assuming 60 fps
                return startTime >= startSeconds && startTime <= endSeconds;
            });

            const videoBlob = new Blob(filteredChunks, { type: mimeType });
            const videoUrl = URL.createObjectURL(videoBlob);
            setRecordedVideo(videoUrl);
            setVideoChunks([]);
        };
    };

    const uploadVideo = async (file) => {
        const formData = new FormData();
        formData.append("video", file);

        try {
            const response = await axios.post(
                "http://127.0.0.1:5000/api/upload_video",
                formData,
            );
            console.log(response.data);
        } catch (error) {
            console.error("Error uploading video", error);
        }
    };

    return (
        <div>
            <main>
                <div className="video-controls">
                    {!permission ? (
                        <div class="btn-container">
                            <button
                                class="record-btn"
                                onClick={getCameraPermission}
                                type="button"
                            >
                                Record Video
                            </button>
                        </div>
                    ) : null}
                    {permission && recordingStatus === "inactive" ? (
                        <div class="btn-container">
                            <button
                                class="record-btn"
                                onClick={startRecording}
                                type="button"
                            >
                                Start Recording
                            </button>
                        </div>
                    ) : null}
                    {recordingStatus === "recording" ? (
                        <div class="btn-container">
                            <button
                                class="record-btn"
                                onClick={stopRecording}
                                type="button"
                            >
                                Stop Recording
                            </button>
                        </div>
                    ) : null}
                </div>
            </main>

            <div className="video-player">
                {!recordedVideo ? (
                    <video
                        ref={liveVideoFeed}
                        autoPlay
                        className="live-player"
                    ></video>
                ) : null}
                {recordedVideo ? (
                    <div className="recorded-player">
                        <div className="VidTrim">
                            <div>
                                <div className="live-player">
                                    {recordedVideo && (
                                        <VideoInput
                                            source={recordedVideo}
                                            vid_load={setRecordedVideo}
                                            set_vid_duration={set_vid_duration}
                                            set_vid={set_vid}
                                        ></VideoInput>
                                    )}
                                </div>
                                <div id="Sliders">
                                    <Slider
                                        value={start_val}
                                        max={length}
                                        disabled={recordedVideo}
                                        title={"Start Trim"}
                                        changeSlide={onSlideChangeStart}
                                        convertTime={secondsToTimeStamp}
                                    ></Slider>

                                    <Slider
                                        value={end_val}
                                        min={start_val}
                                        max={length}
                                        disabled={recordedVideo}
                                        title={"End Trim"}
                                        changeSlide={onSlideChangeEnd}
                                        convertTime={secondsToTimeStamp}
                                    ></Slider>
                                </div>
                                <div class="btn-container">
                                    <button
                                        class="record-btn"
                                        onClick={handleClick}
                                        disabled={!recordedVideo}
                                    >
                                        Trim Video
                                    </button>
                                </div>
                                <div>
                                    {processing && progress !== 100 ? (
                                        <p className="details">Processing...</p>
                                    ) : null}
                                </div>
                                <div class="output-video-player">
                                    {dataUrl && (
                                        <VideoInput
                                            source={dataUrl}
                                        ></VideoInput>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div class="btn-container">
                            {dataUrl && (
                                <div className="container-fluid featureButton">
                                    <Button
                                        message={"Upload"}
                                        link={"feedback"}
                                    ></Button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default VideoRecorder;
