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
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        logout();
        navigate("/signin");
    };

    return (
        <Dropdown show={show} onToggle={handleToggle}>
            <Dropdown.Toggle as={CustomToggle}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* Show avatar or a placeholder */}
                    <Image 
                        src={user?.avatar || '/placeholder.png'} 
                        roundedCircle 
                        style={{ width: 40, height: 40, marginRight: '10px' }} 
                    />
                </div>
            </Dropdown.Toggle>

            <Dropdown.Menu align="end" className="dropdown-menu" style={{ minWidth: '200px' }}>
                {/* Show user's name just below avatar */}
                {user ? (
                    <div>
                <div className="text-center p-2">
                    <span>{user?.username || ''}</span>
                </div>
                <div className="text-center p-2">
                    <span>{user?.email || ''}</span>
                </div>
                </div>
                ) : (
                    <div></div>
                )}
                <Dropdown.Divider />
                {user ? (
                    <>
                        <Dropdown.Item href="/profile" className="dropdown-item">Profile</Dropdown.Item>
                        <Dropdown.Item href="/dashboard" className="dropdown-item">Dashboard</Dropdown.Item>
                        <Dropdown.Item href="/watchlist" className="dropdown-item">Watchlist</Dropdown.Item>
                        <Dropdown.Item href="/seenlist" className="dropdown-item">Seen Movies</Dropdown.Item>
                        <Dropdown.Item href="/settings" className="dropdown-item">Setting</Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout} className="dropdown-item">Log out</Dropdown.Item>
                    </>
                ) : (
                    <>
                        <Dropdown.Item href="/signin" className="dropdown-item">Sign in</Dropdown.Item>
                        <Dropdown.Item href="/settings" className="dropdown-item">Setting</Dropdown.Item>
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
