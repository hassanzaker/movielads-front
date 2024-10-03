import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useAuth } from './components/AuthContext';

const Home = () => {
    const [message, setMessage] = useState('');

    const { user } = useAuth();

    const navigate = useNavigate();


    useEffect(() => {
        const fetchWelcomeMessage = async () => {
            try {
                const response = await axios.get('users/home/', { withCredentials: true });
                setMessage(response.data.message);
            } catch (error) {
                console.error("Error fetching welcome message", error);
                setMessage("Sign in first!");
            }
        };

        fetchWelcomeMessage();

        if (!user) {
            navigate("/signin");
        }
    }, [user, navigate]);

    return (
        <div>
            <h1>{message}</h1>
        </div>
    );
};

export default Home;
