import React from "react";
import { ErrorMessage } from "./ErrorData";
import ErrorPic from "../../Assets/Error.png";
import Button from "../../Components/Button/Button";
import "./ErrorPage.css";

const ErrorPage = () => {
    const goBack = () => {
        window.history.back();
    };

    const error = ErrorMessage.map((data) => {
        return (
            <div className="container-fluid errorText">
                <p class="lead errorTextMessage">{data.message}</p>
            </div>
        );
    });

    return (
        <div className="container-fluid errorPageContainer">
            <div className="container-fluid errorMessage">
                {error}
                <Button message={"Go Back"} onClick={goBack} />
            </div>

            <div className="container-fluid errorPic">
                <img src={ErrorPic} className="img-fluid" alt="Error" />
            </div>
        </div>
    );
};

export default ErrorPage;
