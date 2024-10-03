import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Dashboard = () => {
    const [message, setMessage] = useState('Hiiii');

    const { user } = useAuth();

    const navigate = useNavigate();


    // useEffect(() => {
        
    // }, []);

    return (
        <div>
            <h1>{message}</h1>
        </div>
    );
};


export default Dashboard;