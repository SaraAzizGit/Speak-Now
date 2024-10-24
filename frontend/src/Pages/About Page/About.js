import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import { AboutSpeakNow } from "./AboutData";
import "./About.css";
import Footer from "../../Components/Footer/Footer";
const About = () => {
    const paragraph = AboutSpeakNow.map((data) => {
        return (
            <div className="container-fluid aboutDataContainer">
                <p class="lead aboutDataPara">{data.paragraph}</p>
            </div>
        );
    });
    return (
        <div className="container-fluid">
            <NavBar />
            <div className="container-fluid aboutContainer">
                <h1 className="display-1 aboutHeading">
                    Get{" "}
                    <span className="display-1 aboutHeadingSpan">Better </span>{" "}
                    , Speak{" "}
                    <span className="display-1 aboutHeadingSpan">Better </span>
                </h1>
                {paragraph}
            </div>
            <Footer />
        </div>
    );
};

export default About;
