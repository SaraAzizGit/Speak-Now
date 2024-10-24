import React, { useState, useEffect } from "react";
import axios from "axios";
import PieChart from "../../Components/PieChart/PieChart";
import FeedbackHalfConfident from "../../Components/Read More/FeedbackHalfConfident";
import FeedbackHalfNervous from "../../Components/Read More/FeedbackHalfNervous";
import Button from "../../Components/Button/Button";
import Card from "../../Components/Card/Card";
import "./Feedback.css";

const Feedback = () => {
    const [feedbackData, setFeedbackData] = useState(null);
    const [loadingText, setLoadingText] = useState("Loading");

    useEffect(() => {
        // Make an API call to get feedback data
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:5000/api/upload_video",
                );
                setFeedbackData(response.data);
            } catch (error) {
                console.error("Error fetching feedback data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingText((prevText) => {
                if (prevText === "Loading...") return "Loading";
                else return prevText + ".";
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    if (feedbackData === null) {
        return (
            <div className="loading-container">
                <div className="loading-animation featuresPageHeading">
                    <p>{loadingText}</p>
                </div>
            </div>
        );
    }

    const pieChartData = {
        datasets: [
            {
                data: [feedbackData.nervousness, feedbackData.confidence],
                backgroundColor: ["#a772ea", "#DCC7F7"],
                offset: ["0", "60"],
                borderWidth: ["10", "0"],
                borderColor: ["transparent", "transparent"],
            },
        ],
    };

    const handleRetryButton = async () => {
        try {
            await axios.post("http://127.0.0.1:5000/api/delete_video");
        } catch (error) {
            console.log("Error retrying:", error);
        }
    };

    return (
        <div>
            <h1 className="display-1 featuresPageHeading">
                Great...Your Detailed Report is Here
            </h1>
            <div className="container-fluid feedbackContainer ">
                <div className="container-fluid textFeedack">
                    <div className="container-fluid cardContainerFeedback">
                        <div className="container-fluid">
                            <Card
                                body={"CONFIDENCE"}
                                percent={feedbackData.confidence}
                            />
                        </div>
                        <div className="container-fluid">
                            <Card
                                body={"NERVOUSNESS"}
                                percent={feedbackData.nervousness}
                            />
                        </div>
                    </div>
                    <div className="container-fluid reportFeedback">
                        {feedbackData.confidence > feedbackData.nervousness ? (
                            <FeedbackHalfConfident />
                        ) : (
                            <FeedbackHalfNervous />
                        )}
                    </div>
                    <div className="container-fluid buttonReport">
                        <Button
                            message={"Retry"}
                            onClick={handleRetryButton}
                            link={"features"}
                        />
                    </div>
                </div>

                <div className="container-fluid graphFeedback">
                    <PieChart data={pieChartData} />
                    <div className="container-fluid graphPercent1">
                        {feedbackData.nervousness}
                    </div>
                    <div className="container-fluid graphPercent2">
                        {feedbackData.confidence}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feedback;
