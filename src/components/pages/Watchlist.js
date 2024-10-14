import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DynamicSortableList from '../../utils/DynamicSortableList';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { MdOutlineMovie } from 'react-icons/md';
import { AiOutlineWarning } from 'react-icons/ai';
import 'bootstrap/dist/css/bootstrap.min.css';

const Watchlist = () => {
    const [watchlistData, setWatchlistData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchWatchlist = async () => {
        try {
            const response = await axios.get('watchlist/'); // Send GET request to backend
            setWatchlistData(response.data);
        } catch (err) {
            setError("Failed to load the watchlist. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWatchlist(); // Trigger the fetch when the component loads
    }, []);

    // Function to delete multiple movies from the watchlist
    const handleDeleteMovies = async (selectedMovieIds) => {
        try {
            await axios.delete('watchlist/delete/', {
                data: { movie_ids: selectedMovieIds }
            });

            // Update the local state to remove the deleted movies from the list
            setWatchlistData((prev) => prev.filter((movie) => !selectedMovieIds.includes(movie.movie_id)));
        } catch (error) {
            console.error('Error deleting movies from watchlist:', error);
        }
    };

    const handleAddToSeenList = async (movieId, rating, review) => {
        try {
            await axios.post(`seen/add/`, { movie_id: movieId, rating, review });
            // You may want to remove it from the watchlist as well after adding to seen list.
            setWatchlistData((prev) => prev.filter((movie) => movie.movie_id !== movieId));
        } catch (error) {
            console.error('Error adding to seen list:', error);
        }
    };

    if (loading) {
        return (
            <div className="text-center"><MdOutlineMovie size={50} /><h4>Loading your watchlist...</h4></div>
        );
    }

    if (error) {
        return (
            <Alert variant="danger" className="text-center">
                <AiOutlineWarning size={30} /> {error}
            </Alert>
        );
    }

    return (
        <Container>
            <Row>
                <Col className="text-center">
                    <h2><MdOutlineMovie size={30} /> Your Watchlist</h2>
                    <DynamicSortableList
                        data={watchlistData}
                        handleDeleteMovie={handleDeleteMovies}
                        handleAddToSeenList={handleAddToSeenList}
                        isWatchlist={true}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default Watchlist;
