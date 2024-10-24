import React from "react";
import Button from "../Button/Button";
import { ReadMoreNervousData } from "./ReadMoreData";
import "./ReadMore.css";

const ReadMoreNervous = () => {
    const feedback = ReadMoreNervousData.map((data) => {
        if (data.id === "3" || data.id === "4") {
            return (
                <div className={`container-fluid `}>
                    <div className="container-fluid ">
                        <h1 className="h3 feedbackHeading ">{data.heading}</h1>
                    </div>
                    <div className="container-fluid ">
                        <h1 className="h6 feedbackData">
                            <ol>
                                <li>{data.placeholder[0]}</li>
                                <li>{data.placeholder[1]}</li>
                            </ol>
                        </h1>
                    </div>
                </div>
            );
        } else if (data.id === "2") {
            return (
                <div className={`container-fluid `}>
                    <div className="container-fluid ">
                        <h1 className="h3 feedbackHeading">{data.heading}</h1>
                    </div>
                    <div className="container-fluid ">
                        <h1 className="h6 feedbackData">
                            <ol>
                                <li>{data.placeholder[0]}</li>
                                <li>{data.placeholder[1]}</li>
                                <li>{data.placeholder[2]}</li>
                            </ol>
                        </h1>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={`container-fluid `}>
                    <div className="container-fluid ">
                        <h1 className="h3 feedbackHeading">{data.heading}</h1>
                    </div>
                    <div className="container-fluid ">
                        <h1 className="h6 feedbackData">
                            {data.placeholder[0]}
                        </h1>
                    </div>
                </div>
            );
        }
    });

    return (
        <div id="readMoreContainer">
            <div className="container-fluid first">{feedback}</div>
            <div className="container-fluid featureButton goback-btn">
                <Button message={"Go Back"} link={"feedback"}></Button>
            </div>
        </div>
    );
};

export default ReadMoreNervous;
