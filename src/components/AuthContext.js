import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Try to get user data from localStorage or similar
        const savedUserData = localStorage.getItem('userData');
        return savedUserData ? JSON.parse(savedUserData) : null;
    });

    const login = (userData) => {
        alert(Object.keys(userData));
        setUser(userData);
        localStorage.setItem('userData', JSON.stringify(userData));  // Store user data securely
    };

    const update = (userData) => {
        if ( localStorage.getItem('userData'))
            localStorage.removeItem('userData');
        localStorage.setItem('userData', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userData');  // Clear user data from local storage
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, update }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
