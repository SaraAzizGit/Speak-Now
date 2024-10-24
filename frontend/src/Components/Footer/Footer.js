import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    return (
        <div className="container-fluid footerLines">
            <footer>
                <Link to="/team" className="footerLink">
                    By MASSF
                </Link>
            </footer>
        </div>
    );
};

export default Footer;
