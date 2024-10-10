import React, { useState } from 'react';
import { Dropdown, Image } from 'react-bootstrap';
import { useAuth } from './AuthContext';  // Import the authentication context
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const ProfileDropdown = () => {
    const { user, logout } = useAuth();  // Destructure the user and logout methods from AuthContext
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleToggle = () => {
        setShow(!show);
    };

    const handleLogout = async () => {
        try {
            const csrfToken = Cookies.get('csrftoken');
            alert(csrfToken);
            // Ensure the token is available before making the request
            const response = await axios.post(
                '/users/logout/', 
                {}, 
                {
                    headers: {
                        'X-CSRFToken': csrfToken, // Include the CSRF token in the header
                    },
                }
            );
            console.log("Logout successful:", response);
        } catch (error) {
            console.error("Error during logout:", error);
        } finally {
            logout();
            Cookies.remove('csrftoken');
            Cookies.remove('sessionid');
            navigate("/signin");
        }
    };

    return (
        <Dropdown show={show} onToggle={handleToggle}>
            <Dropdown.Toggle as={CustomToggle}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* Show avatar or a placeholder */}
                    <Image 
                        src={user?.user?.avatar || '/placeholder.png'} 
                        roundedCircle 
                        style={{ width: 40, height: 40, marginRight: '10px' }} 
                    />
                </div>
            </Dropdown.Toggle>

            <Dropdown.Menu align="end" className="bg-dark text-white" style={{ minWidth: '200px' }}>
                {/* Show user's name just below avatar */}
                {user ? (
                    <div>
                <div className="text-center p-2">
                    <span>{user?.user?.username || ''}</span>
                </div>
                <div className="text-center p-2">
                    <span>{user?.user?.email || ''}</span>
                </div>
                </div>
                ) : (
                    <div></div>
                )}
                <Dropdown.Divider />
                {user ? (
                    <>
                        <Dropdown.Item href="/profile" className="text-white bg-dark">Profile</Dropdown.Item>
                        <Dropdown.Item href="/dashboard" className="text-white bg-dark">Dashboard</Dropdown.Item>
                        <Dropdown.Item href="/change-password" className="text-white bg-dark">Change Password</Dropdown.Item>
                        <Dropdown.Item href="/preferences" className="text-white bg-dark">Preferences</Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout} className="text-white bg-dark">Log out</Dropdown.Item>
                    </>
                ) : (
                    <>
                        <Dropdown.Item href="/signin" className="text-white bg-dark">Sign in</Dropdown.Item>
                        <Dropdown.Item href="/preferences" className="text-white bg-dark">Preferences</Dropdown.Item>
                    </>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};

// Custom toggle to use the avatar as the Dropdown button
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href="#"
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
    </a>
));

export default ProfileDropdown;
