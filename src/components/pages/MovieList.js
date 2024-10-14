import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Col, Row, Dropdown, DropdownButton, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieGrid from './MovieGrid';
import { FaStar, FaFire, FaFilm, FaCalendarAlt } from 'react-icons/fa';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [dropdownTitle, setDropdownTitle] = useState('Top Rated');
    const [listType, setListType] = useState("top_rated");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);  // Current page state
    const [totalPages, setTotalPages] = useState(1);    // Total pages from API

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(`/movies/all?list_type=${listType}&page=${currentPage}`);
                setMovies(response.data.results);
                setTotalPages(response.data.total_pages);  // Set total pages
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [listType, currentPage]);  // Trigger fetch when page or list type changes

    const handleDropdownChoice = (actionName) => {
        setDropdownTitle(actionName);
        setLoading(true);
        setCurrentPage(1);  // Reset to page 1 when changing the list type
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

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Generate page numbers around the current page (5 before and 5 after)
    const getPageNumbers = () => {
        const pageNumbers = [];
        const startPage = Math.max(1, currentPage - 5); // Ensures no pages below 1
        const endPage = Math.min(totalPages, currentPage + 5); // Ensures no pages above total pages
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
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
            
            {/* Pagination Controls */}
            <div className="d-flex justify-content-center mt-3">
                <Button variant="secondary" className="fixed" onClick={handlePreviousPage} disabled={currentPage === 1}>
                    {"<<"}
                </Button>

                {/* Show 5 pages before and after current */}
                {getPageNumbers().map(pageNumber => (
                    <Button
                        key={pageNumber}
                        variant={pageNumber === currentPage ? 'secondary' : 'outline-secondary'}
                        onClick={() => handlePageClick(pageNumber)}
                        className="mx-1"
                    >
                        {pageNumber}
                    </Button>
                ))}

                <Button variant="secondary" onClick={handleNextPage} disabled={currentPage === totalPages}>
                    {">>"}
                </Button>
            </div>

            <div className="d-flex justify-content-center mt-3">
                <span>Page {currentPage} of {totalPages}</span>
            </div>
        </Container>
    );
};

export default MovieList;
