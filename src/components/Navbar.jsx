import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="Navbar">
            <nav>
                <ul>
                    <li className="title-item"><h2>Plant Royale</h2></li>
                    <li><Link to="/" className="Link">Home</Link></li>
                    <li><Link to="/all" className="Link">All Plants</Link></li>
                    <li><Link to="/post" className="Link">Post a Plant</Link></li>
                    <li><Link to="/about" className="Link">About</Link></li>
                </ul>  
            </nav>
        </div>
    );
};

export default Navbar;