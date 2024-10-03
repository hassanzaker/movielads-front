// src/components/NotFound.js

import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';  // Optional CSS file for styling

const NotFound = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/home');
    };

    return (
        <Container className="text-center mt-5">
            <h1>404 - Page Not Found</h1>
            <p>Oops! The page you're looking for doesn't exist.</p>
            <img
                src="/404-image.png"  // Add an image if you want
                alt="404 Not Found"
                className="img-fluid"
                style={{ maxWidth: '400px', margin: '20px auto' }}
            />
            <div>
                <Button variant="primary" onClick={goHome}>
                    Go Back Home
                </Button>
            </div>
        </Container>
    );
};

export default NotFound;
