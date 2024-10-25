import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Dashboard = () => {
    const [data, setData] = useState('');

    const { user } = useAuth();

    const navigate = useNavigate();


    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await axios.get('users/dashboard/', { withCredentials: true });
                setData(response.data);
            } catch (error) {
                console.error("Error fetching welcome message", error);
            }
        };

        fetchDashboard();

        // if (!user) {
        //     navigate("/signin");
        // }
    }, [user, navigate]);

    return (
        <div>
            <h2>Welcome <b>{data.username}</b></h2>
            <h2><b>{data.favorite}</b> is your favorite Movie</h2>
        </div>
    );
};

export default Dashboard;
