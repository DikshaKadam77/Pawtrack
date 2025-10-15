// src/context/AuthContext.js

"use client"

import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AuthContext = createContext(null);

// Create the provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // On initial load, check localStorage for a logged-in user
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('pawTrackUser');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            localStorage.removeItem('pawTrackUser');
        }
    }, []);

    // Login function: stores user data in state and localStorage
    const login = (userData) => {
        // This function correctly stores the ENTIRE user object, including the 'role'
        localStorage.setItem('pawTrackUser', JSON.stringify(userData));
        setUser(userData);
    };

    // Logout function: clears user data
    const logout = () => {
        localStorage.removeItem('pawTrackUser');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to easily use the auth context
export const useAuth = () => {
    return useContext(AuthContext);
};