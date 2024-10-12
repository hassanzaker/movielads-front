import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Container, Row, Col, ListGroup, ListGroupItem, Button, Badge } from 'react-bootstrap';
import axios from 'axios';
import CircularProgressBar from '../CircularProgressBar';
import { addToWatchList } from '../../utils/watchlistUtils';
import { addToSeenList } from '../../utils/seenListUtils';

import { FaCalendarAlt, FaClock, FaFilm, FaMoneyBill, FaChartLine, FaCheck, FaPlus } from 'react-icons/fa';

const MovieView = () => {
    const params = useParams();
    const [movie, setMovie] = useState(null);
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    const [isSeen, setIsSeen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const result = await axios.get(`movie/${params.movieId}`);
                setMovie(result.data.movie);
                setIsInWatchlist(result.data.watchlist);
                setIsSeen(result.data.seen);

            } catch (error) {
                const errorMessage = error.response.data.message || error.response.data.error || "An error occurred";
                console.error('Error adding movie to seenlist: ', errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [params]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleAddToWatchList = async () => {
        try {
            await addToWatchList(movie.id, 3, "Let's see!");
            setIsInWatchlist(true);
        } catch (error) {
            console.error("Error adding to watchlist", error);
        }
    };

    const handleAddToSeenList = async () => {
        try {
            await addToSeenList(movie.id, 8, "Awesome!");
            setIsSeen(true);
        } catch (error) {
            console.error("Error adding to watchlist", error);
        }
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col md={4}>
                    <Card className="mb-3 shadow" style={{ width: '100%' }}>
                        <div style={{ position: 'relative' }}>
                            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="rounded" />
                            <div style={{
                                position: 'absolute',
                                bottom: '10px',
                                right: '10px',
                                width: '60px',
                                height: '60px'
                            }}>
                                <CircularProgressBar value={movie.vote_average * 10} />
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col md={8}>
                    <Card className="shadow">
                        <Card.Body>
                            <Card.Title className="mb-3">{movie.original_title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{movie.tagline}</Card.Subtitle>
                            <Card.Text className="text-secondary">{movie.overview}</Card.Text>
                            <div className="mb-3">
                                <span className="font-weight-bold">Genres:</span>
                                {movie.genres.map(genre => (
                                    <Badge key={genre.id} bg="secondary" className="m-1">{genre.name}</Badge>
                                ))}
                            </div>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>
                                <FaCalendarAlt className="me-2 text-info" /> <strong>Release Date:</strong> {movie.release_date}
                            </ListGroupItem>
                            <ListGroupItem>
                                <FaClock className="me-2 text-warning" /> <strong>Runtime:</strong> {movie.runtime} minutes
                            </ListGroupItem>
                            <ListGroupItem>
                                <FaFilm className="me-2 text-primary" /> <strong>Status:</strong> {movie.status}
                            </ListGroupItem>
                            <ListGroupItem>
                                <FaChartLine className="me-2 text-success" /> <strong>Vote Average:</strong> {movie.vote_average} ({movie.vote_count} votes)
                            </ListGroupItem>
                            <ListGroupItem>
                                <FaMoneyBill className="me-2 text-danger" /> <strong>Budget:</strong> ${movie.budget.toLocaleString()}
                            </ListGroupItem>
                            <ListGroupItem>
                                <FaMoneyBill className="me-2 text-success" /> <strong>Revenue:</strong> ${movie.revenue.toLocaleString()}
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                    <Button
                        onClick={handleAddToWatchList}
                        variant={isInWatchlist ? "success" : "primary"}
                        disabled={isInWatchlist}
                        className="mt-3"
                        size="lg"
                        style={{ width: '100%' }}
                    >
                        {isInWatchlist ? (
                            <>
                                <FaCheck className="me-2" /> In Your Watchlist
                            </>
                        ) : (
                            <>
                                <FaPlus className="me-2" /> Add to Watchlist
                            </>
                        )}
                    </Button>
                    <Button
                        onClick={handleAddToSeenList}
                        variant={isSeen ? "success" : "primary"}
                        disabled={isSeen}
                        className="mt-3"
                        size="lg"
                        style={{ width: '100%' }}
                    >
                        {isSeen ? (
                            <>
                                <FaCheck className="me-2" /> Already Seen
                            </>
                        ) : (
                            <>
                                <FaPlus className="me-2" /> Seen it? Share your thoughts
                            </>
                        )}
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default MovieView;
