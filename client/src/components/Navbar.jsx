import React, { useState } from "react";
import "../styles/Navbar.css";
import logo from "../assets/images/logo.png"
import { Link } from "react-router-dom";
import { IconUserCircle } from '@tabler/icons-react'


export default function Navbar({ Login = true }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLogin] = useState(Login);

    // console.log(window.location.pathname);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="search-container">
                <input type="text" className="search-bar" placeholder="Search 8,000+ tutorials" />
            </div>
            <div className="logo-container">
                <img src={logo} alt="logo" />
            </div>
            <ul className={`nav-links ${isOpen ? "open" : ""}`}>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    {isLogin ?
                        <Link to="/signin">Sign in</Link>
                        : <IconUserCircle />}
                </li>
                {/* <li>
                    <Link to="/signin">Sign in</Link>
                </li> */}
            </ul>
            <div className="hamburger" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>
    );
};


