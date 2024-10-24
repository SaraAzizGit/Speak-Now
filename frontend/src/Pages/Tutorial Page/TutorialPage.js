import React from "react";
import ReactPlayer from "react-player";
import Button from "../../Components/Button/Button";
import tutorial from "../../Assets/Tutorial.mp4";
import "./TutorialPage.css";

const TutorialPage = () => {
    return (
        <div className="container-fluid tutorialPageContainer">
            <h1 className="display-1 tutorialHeading">Feeling Stuck?</h1>
            <h1 className="display-6 tutorialSubHeading">
                No worries, we got you!
            </h1>
            <div className="container-fluid tutorialVideoContainer">
                <ReactPlayer
                    url={tutorial}
                    playing={true}
                    volume={0.1}
                    controls={true}
                />
            </div>
            <div className="container-fluid tutorialButton">
                <Button message={"Let's go Speak!"} link={"features"}></Button>
            </div>
        </div>
    );
};

export default TutorialPage;
