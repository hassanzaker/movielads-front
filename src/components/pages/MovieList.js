import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Col, Row, Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieGrid from './MovieGrid';


const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [dropdownTitle, setDropdownTitle] = useState('Top Rated');
    const [listType, setListType] = useState("top_rated");

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(`movies/all?list_type=${listType}`);
                setMovies(response.data.results); // Assuming the API returns an object with a movies array
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, [listType]);

    const handleDropdownChoice = (actionName) => {
        setDropdownTitle(actionName);
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
                alert("Unknown!")
                break;
        }
    };

    return (
        <Container fluid style={{ paddingTop: '20px' }}>
            <Row>
                <Col xs={12} className="d-flex justify-content-end">
                    <DropdownButton id="dropdown-basic-button" title={dropdownTitle}>
                        <Dropdown.Item onClick={() => handleDropdownChoice('Top Rated')}>Top Rated</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDropdownChoice('Popular')}>Popular</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDropdownChoice('Now Playing')}>Now Playing</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDropdownChoice('Upcoming')}>Upcoming</Dropdown.Item>
                    </DropdownButton>
                </Col>
            </Row>
            <div className="movie-grid-container" style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
                <MovieGrid movies={movies} />
            </div>
        </Container>
    );
    
};

export default MovieList;
