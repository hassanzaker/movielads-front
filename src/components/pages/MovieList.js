import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Col, Row, Dropdown, DropdownButton, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieGrid from './MovieGrid';
import { FaStar, FaFire, FaFilm, FaCalendarAlt } from 'react-icons/fa';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [dropdownTitle, setDropdownTitle] = useState('Top Rated');
    const [listType, setListType] = useState("top_rated");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(`movies/all?list_type=${listType}`);
                setMovies(response.data.results);
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [listType]);

    const handleDropdownChoice = (actionName) => {
        setDropdownTitle(actionName);
        setLoading(true);
        switch (actionName) {
            case "Top Rated":
                setListType("top_rated");
                break;
            case "Popular":
                setListType("popular");
                break;
            case "Now Playing":
                setListType("now_playing");
                break;
            case "Upcoming":
                setListType("upcoming");
                break;
            default:
                alert("Unknown selection!");
                break;
        }
    };

    return (
        <Container fluid className="mt-4">
            <Row className="mb-4">
                <Col xs={12} className="d-flex justify-content-between align-items-center">
                    <h2 className="text-primary">
                        Movie Explorer
                    </h2>
                    <DropdownButton
                        id="dropdown-basic-button"
                        title={dropdownTitle}
                        variant="primary"
                    >
                        <Dropdown.Item onClick={() => handleDropdownChoice('Top Rated')}>
                            <FaStar className="me-2 text-warning" /> Top Rated
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDropdownChoice('Popular')}>
                            <FaFire className="me-2 text-danger" /> Popular
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDropdownChoice('Now Playing')}>
                            <FaFilm className="me-2 text-info" /> Now Playing
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDropdownChoice('Upcoming')}>
                            <FaCalendarAlt className="me-2 text-success" /> Upcoming
                        </Dropdown.Item>
                    </DropdownButton>
                </Col>
            </Row>
            <div className="movie-grid-container" style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
                {loading ? (
                    <div className="text-center">
                        <span className="spinner-border text-primary" role="status" aria-hidden="true"></span>
                        <p>Loading movies...</p>
                    </div>
                ) : (
                    <MovieGrid movies={movies} />
                )}
            </div>
        </Container>
    );
};

export default MovieList;
