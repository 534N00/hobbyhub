import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Main = () => {
    return (
        <div className="Main">
            <Navbar />
            <div className="Spacing">
                {/* Spacing div to create forehead for main content */}
            </div>
            <Outlet />
            <Footer />
        </div>
    );
};

export default Main;