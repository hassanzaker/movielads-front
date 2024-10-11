import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useAuth } from './components/AuthContext'; // Import the AuthContext if needed

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        birth_date: '',
        favorite_movie: '',
        password1: '',
        password2: '',
        avatar: null
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { user } = useAuth(); // Destructure user from AuthContext

    const handleChange = (e) => {
        const { name } = e.target;
        // Check if the input is the file input
        if (name === 'avatar') {
            setFormData({...formData, avatar: e.target.files[0]});
        } else {
            setFormData({...formData, [name]: e.target.value});
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password1 !== formData.password2) {
            setError('Passwords do not match.');
            return;
        }

        const formPayload = new FormData();
        for (const key in formData) {
            formPayload.append(key, formData[key]);
        }

        try {
            const response = await axios.post('users/signup/', formPayload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert("User created successfully!");
            setError('');
            navigate('/signin');
        } catch (err) {
            if (err.response && err.response.data) {
                setError(Object.values(err.response.data).join(' '));
            } else {
                setError('An error occurred during sign-up. Please try again.');
            }
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
                    <h2 className="mt-5">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter username" 
                                name="username" 
                                value={formData.username} 
                                onChange={handleChange} 
                                autoComplete="username" 
                                required 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                autoComplete="email" 
                                required 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="birthDate">
                            <Form.Label>Birth Date</Form.Label>
                            <Form.Control 
                                type="date" 
                                name="birth_date" 
                                value={formData.birth_date} 
                                onChange={handleChange} 
                                autoComplete="bday" 
                                required 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="favoriteMovie">
                            <Form.Label>Favorite Movie</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Favorite Movie" 
                                name="favorite_movie" 
                                value={formData.favorite_movie} 
                                onChange={handleChange} 
                                autoComplete="off" 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                name="password1" 
                                value={formData.password1} 
                                onChange={handleChange} 
                                autoComplete="new-password" 
                                required 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password2">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Confirm Password" 
                                name="password2" 
                                value={formData.password2} 
                                onChange={handleChange} 
                                autoComplete="new-password" 
                                required 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="avatar">
                            <Form.Label>Avatar</Form.Label>
                            <Form.Control 
                                type="file" 
                                name="avatar" 
                                onChange={handleChange} 
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">Sign Up</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Signup;
