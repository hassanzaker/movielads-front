import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import ProfileDropdown from './ProfileDropdown';
import MovieSearch from './MovieSearch';

const NavigationBar = () => {
    const { user } = useAuth();

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container fluid>
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
                        <Nav.Link href="/classifier">Classifier</Nav.Link>
                    </Nav>
                    <Nav className="d-flex align-items-center w-100 flex-column flex-lg-row"> 
                        <div className="w-100 mb-2 mb-lg-0"> 
                            {/* Ensure the search bar takes full width on mobile */}
                            <MovieSearch />
                        </div>
                        <div className="ms-lg-3"> 
                            {/* Margin applied on larger screens only */}
                            <ProfileDropdown />
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
