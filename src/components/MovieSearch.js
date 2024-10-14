import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, ListGroup, Button, Badge } from 'react-bootstrap';
import { FaCalendarAlt, FaInfoCircle, FaStar, FaFilm } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MovieSearch.css';  // Import custom CSS file

const MovieSearch = () => {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (query.length > 2) {
            setLoading(true);
            const fetchSearchResults = async () => {
                try {
                    const response = await axios.get(`/search/movie?query=${query}&page=1`);
                    setSearchResults(response.data.results.slice(0, 10));
                } catch (error) {
                    console.error('Error fetching search results:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchSearchResults();
        } else {
            setSearchResults([]);
        }
    }, [query]);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const highlightQuery = (text) => {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, (match) => `<mark>${match}</mark>`);
    };

    const limitOverview = (text) => {
        return text.split(' ').slice(0, 30).join(' ') + '...'; // Limit to 30 words
    };

    const formatReleaseDate = (date) => {
        return date ? `(${new Date(date).getFullYear()})` : '';
    };

    return (
        <Container className="search-container mt-4">
            <Form>
                <Form.Group controlId="searchMovies">
                    <Form.Control
                        type="text"
                        placeholder="Search for a movie..."
                        value={query}
                        onChange={handleInputChange}
                        style={{ width: '400px' }}  // Set width to 400px or desired size
                    />
                </Form.Group>
            </Form>

            {loading ? (
                <div className="text-center mt-3">Loading...</div>
            ) : (
                <ListGroup className="mt-3 search-results">
                    {searchResults.map((movie) => (
                        <ListGroup.Item key={movie.id} className="search-result-item">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="movie-title mb-1">
                                        <FaFilm className="me-2 text-primary" />
                                        <span dangerouslySetInnerHTML={{ __html: highlightQuery(movie.original_title) }} />
                                        <small className="text-muted"> {formatReleaseDate(movie.release_date)} </small>
                                    </h5>
                                </div>
                                <Badge bg="warning" text="dark" className="movie-rating-badge">
                                    <FaStar /> {movie.vote_average.toFixed(1)}
                                </Badge>
                            </div>
                            <p className="movie-overview mt-2" dangerouslySetInnerHTML={{ __html: highlightQuery(limitOverview(movie.overview)) }} />
                        </ListGroup.Item>
                    ))}
                </ListGroup>

            )}
        </Container>
    );
};

export default MovieSearch;
