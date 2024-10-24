import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
    return (
        <div className="container-fluid navContainer">
            <nav className="navbar navbar-expand-lg bg-body-tertiary navbarMain">
                <div className="container-fluid navSubContainer">
                    {/*<div className="collapse navbar-collapse" id="navbarSupportedContent">*/}

                    <div
                        className="navbar-expand navSubSub"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 navList">
                            <li>
                                <Link to="/" className="navbar-brand">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="navbar-brand">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/features" className="navbar-brand">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link to="/team" className="navbar-brand">
                                    Team
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="navbar-brand">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
