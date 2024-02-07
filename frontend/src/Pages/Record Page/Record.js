import React from "react";
import VideoRecorder from "../../Components/Record/VideoRecorder";

const Record = () => {
    return (
        <div className="container-fluid">
            <div className="container-fluid uploadHeading">
                <h1 className='display-1 uploadVideoHeading'>Record your video to process!</h1>
            </div>
            <VideoRecorder />
        </div>
    );
};
export default Record;