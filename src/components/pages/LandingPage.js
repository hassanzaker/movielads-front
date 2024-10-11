import React from 'react';
import { Container } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { FaSearch, FaUsers, FaPlayCircle, FaLightbulb, FaSmileBeam, FaSignInAlt, FaInfoCircle } from 'react-icons/fa';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <Container className="mt-5">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation={true}
                loop={true}
            >
                <SwiperSlide>
                    <div className="card text-center p-5 landing-page-card">
                        <h2 className="mb-4 text-primary">Welcome to Movie Lads</h2>
                        <ul className="list-unstyled text-secondary">
                            <li><FaSearch className="icon-style text-success" /> Search for movies, find them, and add them to your watchlist</li>
                            <li><FaUsers className="icon-style text-info" /> Share your thoughts about movies and chat with friends</li>
                            <li><FaPlayCircle className="icon-style text-danger" /> Play trivia games about your favorite movies</li>
                            <li><FaLightbulb className="icon-style text-warning" /> Get personalized recommendations</li>
                        </ul>
                        <button 
                            className="btn btn-outline-primary mt-4"
                            onClick={() => window.location.href = '/movies'}
                        >
                            Explore Movies
                        </button>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="card text-center p-5 landing-page-card bg-light">
                        <h2 className="mb-4 text-dark">Join Our Community</h2>
                        <p className="text-muted">Log in or sign up if you haven't already.</p>
                        <button 
                            className="btn btn-outline-primary m-2"
                            onClick={() => window.location.href = '/signin'}
                        >
                            <FaSignInAlt /> Sign In
                        </button>
                        <button 
                            className="btn btn-outline-success m-2"
                            onClick={() => window.location.href = '/signup'}
                        >
                            <FaSmileBeam /> Sign Up
                        </button>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="card text-center p-5 landing-page-card">
                        <h2 className="mb-4 text-primary">Do You Know Me?</h2>
                        <p className="text-secondary">Learn more about my background and experiences.</p>
                        <button 
                            className="btn btn-outline-info mt-4"
                            onClick={() => window.location.href = '/about'}
                        >
                            <FaInfoCircle /> About Me
                        </button>
                    </div>
                </SwiperSlide>
            </Swiper>
        </Container>
    );
};

export default LandingPage;
