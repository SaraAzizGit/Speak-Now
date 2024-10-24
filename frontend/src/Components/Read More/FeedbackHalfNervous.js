import React from "react";
import { ReadMoreNervousData } from "./ReadMoreData";
import { Link } from "react-router-dom";
import "./FeedbackHalf.css";

const FeedbackHalfNervous = () => {
    const feedbackHalf = ReadMoreNervousData.map((data) => {
        if (data.id === "1") {
            return (
                <div className={`container-fluid`}>
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
        if (data.id === "2") {
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
        }
        return null;
    });

    return (
        <div className="container-fluid">
            {feedbackHalf}
            <button className="read-more">
                <Link to={"/readmore-nervous"} className="read-more">
                    Read More
                </Link>
            </button>
        </div>
    );
};

export default FeedbackHalfNervous;
