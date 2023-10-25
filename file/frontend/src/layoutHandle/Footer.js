// src/components/Footer.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';



const Footer = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    if (!currentUser) {
        return <Navigate to="/login" />;
    }
    return (
        <footer className="bg-dark text-light text-center py-3 custom-bg">
            &copy; {new Date().getFullYear()} My Colony App
        </footer>
    );
};

export default Footer;
