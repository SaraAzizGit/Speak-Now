import { useState, useRef } from "react";
import VideoRecorder from "../../Components/Record/VideoRecorder";

const Record = () => {
    let [recordOption, setRecordOption] = useState("video");
    const toggleRecordOption = (type) => {
        return () => {
            setRecordOption(type);
        };
    };
    return (
        <div>
            <VideoRecorder />
        </div>
    );
};
export default Record;