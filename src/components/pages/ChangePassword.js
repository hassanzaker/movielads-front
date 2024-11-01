import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match");
            return;
        }

        try {
            const response = await axios.put('users/change-password/', {
                current_password: currentPassword,
                new_password: newPassword,
                confirm_password: confirmPassword
            });
            setMessage(response.data.message);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            setError(err.response?.data?.error || "An error occurred");
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2 className="mt-5">Change Password</h2>
                    {message && <Alert variant="success">{message}</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="currentPassword">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter current password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="newPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="confirmPassword">
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">Change Password</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ChangePassword;