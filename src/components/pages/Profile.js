import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import { useAuth } from '../AuthContext';
import axios from 'axios';

const Profile = () => {
    const [profileData, setProfileData] = useState({
        username: '',
        email: '',
        birth_date: '',
        favorite_movie: '',
        avatar: '', 
    });

    const { user, update } = useAuth();

    const [avatarPreview, setAvatarPreview] = useState(user?.avatar || ''); // Ensure this is initialized correctly
    const [avatarFile, setAvatarFile] = useState(null); // Store the uploaded file

    const [isEditing, setIsEditing] = useState(false);
    const [initialProfileData, setInitialProfileData] = useState({}); // Save initial data to reset on cancel
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/users/profile/');
                setProfileData({
                    username: response.data.username,
                    email: response.data.email,
                    birth_date: response.data.birth_date,
                    favorite_movie: response.data.favorite_movie,
                    avatar: response.data.avatar || '', // Fallback to empty string if no avatar
                });
                setInitialProfileData({
                    username: response.data.username,
                    email: response.data.email,
                    birth_date: response.data.birth_date,
                    favorite_movie: response.data.favorite_movie,
                    avatar: response.data.avatar || '', // Fallback to empty string if no avatar
                });
                setAvatarPreview(response.data.avatar || ''); // Fallback to empty string
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };
        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarPreview(URL.createObjectURL(file)); // Set a local preview of the image
            setAvatarFile(file); // Store the file for upload
        }
    };

    const handleEditClick = (e) => {
        e.preventDefault();
        setIsEditing(!isEditing);
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        setProfileData(initialProfileData); // Reset to original data
        setAvatarPreview(initialProfileData.avatar || ''); // Reset avatar preview
        setIsEditing(false);
        fileInputRef.current.value = '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', profileData.username);
        formData.append('email', profileData.email);
        formData.append('birth_date', profileData.birth_date);
        formData.append('favorite_movie', profileData.favorite_movie);
        if (avatarFile) {
            formData.append('avatar', avatarFile); // Append only if there's a new file
        }

        try {
            const response = await axios.put('/users/profile/update/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setProfileData({
                username: response.data.user.username,
                email: response.data.user.email,
                birth_date: response.data.user.birth_date,
                favorite_movie: response.data.user.favorite_movie,
                avatar: response.data.user.avatar,
            });
            setInitialProfileData({
                username: response.data.user.username,
                email: response.data.user.email,
                birth_date: response.data.user.birth_date,
                favorite_movie: response.data.user.favorite_movie,
                avatar: response.data.user.avatar,
            });
            setAvatarPreview(response.data.user.avatar); // Update the avatar preview with the new image
            update(response.data.user); // Update the user context
            setIsEditing(false);
            fileInputRef.current.value = '';
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col md={6} className="mx-auto">
                    <h2>User Profile</h2>
                    {avatarPreview && (
                        <div className="mb-3 text-center">
                            <Image src={avatarPreview} roundedCircle width={150} height={150} alt="User Avatar" />
                        </div>
                    )}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={profileData.username}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={profileData.email}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Birth Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="birth_date"
                                value={profileData.birth_date || ''} // Ensure controlled value
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Favorite Movie</Form.Label>
                            <Form.Control
                                type="text"
                                name="favorite_movie"
                                value={profileData.favorite_movie || ''} // Ensure controlled value
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Avatar</Form.Label>
                            <Form.Control
                                type="file"
                                name="avatar"
                                onChange={handleAvatarChange}
                                disabled={!isEditing}
                                ref={fileInputRef}
                            />
                        </Form.Group>

                        {isEditing ? (
                        <>
                            <Button variant="success" type="submit">Save Changes</Button>
                            <Button variant="secondary" className="ms-2" onClick={handleCancelClick}>Cancel</Button>
                        </>
                        ) : (
                            <Button variant="primary" type="button" onClick={handleEditClick}>Edit Profile</Button>
                        )}
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
