import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import ProfileDropdown from './ProfileDropdown';

const NavigationBar = () => {
    const { user } = useAuth();

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src="/MovieLads-logo.png"  
                        width="30"   
                        height="30"  
                        className="d-inline-block align-top"  
                        alt="Movie Lads Logo"
                    />{' '}
                    Movie Lads
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/movies">Movies</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                    </Nav>
                    <Nav>
                        <ProfileDropdown />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
