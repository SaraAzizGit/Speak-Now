import React from 'react'
import axios from 'axios'
import { useRecordWebcam } from 'react-record-webcam'
import { useState } from 'react'
import './Record.css'
import Button from '../../Components/Button/Button'

const Record = () => {
    const {
        activeRecordings,
        cancelRecording,
        clearPreview,
        //closeCamera,
        createRecording,
        devicesByType,
        devicesById,
        download,
        muteRecording,
        openCamera,
        pauseRecording,
        resumeRecording,
        startRecording,
        stopRecording,
    } = useRecordWebcam();

    const [videoDeviceId, setVideoDeviceId] = useState("");
    const [audioDeviceId, setAudioDeviceId] = useState("");

    const handleSelect = async (event) => {
        const { deviceid: deviceId } =
          event.target.options[event.target.selectedIndex].dataset;
        if (devicesById[deviceId].type === "videoinput") {
          setVideoDeviceId(deviceId);
        }
        if (devicesById[deviceId].type === "audioinput") {
          setAudioDeviceId(deviceId);
        }
      };
    
    const start = async () => {
      const recording = await createRecording(videoDeviceId, audioDeviceId);
      if (recording) await openCamera(recording.id);
    };

    const uploadVideo = async(file) => {
      const formData = new FormData();
      formData.append('video', file);

      try {
        await axios.post('http://localhost:5000/api/upload_video', formData, { headers: {
          'Content-Type': 'multipart/form-data',
        }}, );
        console.log('Video uploaded successfully');
      } catch (error) {
        console.log('Error uploading video:', error);
      }
    };

    const handleStopRecording = async(recordingId) => {
      await stopRecording(recordingId);

      const recording = activeRecordings.find((rec) => rec.id === recordingId);

      if (recording && recording.blob) {
        uploadVideo(recording.blob);
      }
    };

    return (
      
    <div className='container-fluid mainContainer'>

      <div className="input">

        <div className='container-fluid'>
          <h4>Select video input</h4>
          <select className="input-select" onChange={handleSelect}>
            {devicesByType?.video?.map((device) => (
              <option key={device.deviceId} data-deviceid={device.deviceId}>
                {device.label}
              </option>
            ))}
          </select>
        </div>

        <div className='container-fluid'>
          <h4>Select audio input</h4>
          <select className="input-select" onChange={handleSelect}>
            {devicesByType?.audio?.map((device) => (
              <option key={device.deviceId} data-deviceid={device.deviceId}>
                {device.label}
              </option>
            ))}
          </select>
        </div>

      </div>
      
      <div className="input-start">
        <button onClick={start}>Open camera</button>
      </div>
      
      <div className="devices">
        {activeRecordings?.map((recording) => (
          

          <div className="device" key={recording.id}>
            <p>Live</p>
            <div className="device-list">
              <small>Status: {recording.status}</small>
              <small>Video: {recording.videoLabel}</small>
              <small>Audio: {recording.audioLabel}</small>
            </div>
            <div className="container-fluid videosContainer">
            <video ref={recording.webcamRef} loop autoPlay playsInline />
            <div className="controls">
              <button
                disabled={
                  recording.status === "RECORDING" ||
                  recording.status === "PAUSED"
                }
                onClick={() => startRecording(recording.id)}
              >
                Record
              </button>
              <button
                disabled={
                  recording.status !== "RECORDING" &&
                  recording.status !== "PAUSED"
                }
                onClick={() =>
                  recording.status === "PAUSED"
                    ? resumeRecording(recording.id)
                    : pauseRecording(recording.id)
                }
              >
                {recording.status === "PAUSED" ? "Resume" : "Pause"}
              </button>
              <button
                className={recording.isMuted ? "selected" : ""}
                onClick={() => muteRecording(recording.id)}
              >
                Mute
              </button>
              <button
                disabled={recording.status !== "RECORDING"}
                onClick={() => stopRecording(recording.id)}
              >
                Stop
              </button>
              <button onClick={() => cancelRecording(recording.id)}>
                Cancel
              </button>
            </div>

            <div className="container-fluid preview">
              <p>Preview</p>
              <video ref={recording.previewRef} autoPlay loop playsInline />
              <div className="controls">                
                <button onClick={() => download(recording.id)}>Download</button>
                <button onClick={() => clearPreview(recording.id)}>Clear preview</button>
              </div>
            </div>
            <div className="container-fluid featureButton"> <Button message={"Upload"} link={"feedback"} onClick={() => handleStopRecording(recording.id)}></Button></div>
            </div>
          </div>
        ))}
      </div>
      
    </div>
    )
}

export default Record
