import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Main = () => {
    return (
        <div className="Main">
            <Navbar />
            <div className="Spacing">
                {/* Spacing div to create forehead for main content */}
            </div>
            <Outlet />
            <div className="Spacing">
                {/* Spacing div to create forehead for main content */}
            </div>
        </div>
    );
};

export default Main;