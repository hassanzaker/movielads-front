import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from './components/AuthContext';  // Import the authentication context
import Cookies from 'js-cookie';


const Signin = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const { user, login } = useAuth();  // Destructure the login method from AuthContext
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('users/signin/', credentials);
            const userData = response.data;
            login(userData);

            // Get the new CSRF token from cookies
            const csrfToken = Cookies.get('csrftoken');
            if (csrfToken) {
                axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
            }

            navigate('/home');
        } catch (error) {
            console.error(error);
            alert("Invalid login");
        }
    };

    useEffect(() => {
        if (user){
            alert("log out first!");
            navigate('/home');
        }
    }, [user, navigate]);
    
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2 className="mt-5">Sign In</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter username" 
                                name="username" 
                                value={credentials.username} 
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                name="password" 
                                value={credentials.password} 
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">Sign In</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};
    
    

export default Signin;
