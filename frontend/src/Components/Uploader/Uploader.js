import React from "react";
import axios from "axios";
import { useState } from "react";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";
import ReactPlayer from "react-player";
import "./Uploader.css";
import Button from "../../Components/Button/Button";

const Uploader = () => {
    const [video, setVideo] = useState(null);
    const [fileName, setFileName] = useState("No selected file");

    const uploadVideo = async (file) => {
        const formData = new FormData();
        formData.append("video", file);

        try {
            const response = await axios.post(
                "http://127.0.0.1:5000/api/upload_video",
                formData,
                { method: "POST" },
            );

            console.log(response.data);
        } catch (error) {
            console.log("Error uploading video", error);
        }
    };

    const handleFileChange = (files) => {
        if (files.length > 0) {
            const file = files[0];
            setFileName(file.name);

            if (file.type.startsWith("video/")) {
                setFileName(file.name);
                setVideo(URL.createObjectURL(file));
                uploadVideo(file);
            } else {
                window.location.href = "/error";
            }
        }
    };

    return (
        <div className="container-fluid uploaderContainer">
            <main className="container-fluid containerMain">
                <div className="container-fluid uploaderContainer">
                    <form
                        className="container-fluid UploaderForm"
                        onClick={() =>
                            document.querySelector(".input-field").click()
                        }
                    >
                        <input
                            type="file"
                            className="input-field"
                            hidden
                            onChange={({ target: { files } }) =>
                                handleFileChange(files)
                            }
                        />
                        {video ? (
                            <ReactPlayer
                                url={video}
                                playing={true}
                                volume={0.5}
                                controls={true}
                            />
                        ) : (
                            <>
                                <MdCloudUpload color="#a772ea" size={100} />
                                <p className="lead iconText">
                                    Browse Files to Upload
                                </p>
                            </>
                        )}
                    </form>
                </div>

                <div className="container-fluid uploaded-rowContainer">
                    <section className="uploaded-row">
                        <AiFillFileImage color="#a772ea" />
                        <span className="upload-content">
                            {fileName}
                            <MdDelete
                                onClick={() => {
                                    setFileName("No selected file");
                                    setVideo(null);
                                }}
                                color="#a772ea"
                            />
                        </span>
                    </section>
                </div>

                <div className="container-fluid featureButton">
                    <Button message={"Upload"} link={"feedback"}></Button>
                </div>
            </main>
        </div>
    );
};

export default Uploader;
