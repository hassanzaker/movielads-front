import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

import { Card, Container, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import axios from 'axios';
import CircularProgressBar from '../CircularProgressBar';



const MovieView = () => {
    const params = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            const result = await axios.get(`movies/movie/${params.movieId}`);
            setMovie(result.data.movie);
        };

        fetchMovie();
    }, [params]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col md={4}>
                <Card className="mb-3" style={{ width: '18rem' }} >
                    <div style={{ position: 'relative' }}>
                        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        <div style={{
                            position: 'absolute',
                            bottom: '10px',  // Positions the progress bar 10px from the bottom of the image
                            right: '10px',  // Positions the progress bar 10px from the right of the image
                            width: '50px',  // Specific width for the progress bar
                            height: '50px'  // Specific height for the progress bar
                        }}>
                            <CircularProgressBar value={movie.vote_average * 10} />
                        </div>
                    </div>
                </Card>
                </Col>
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{movie.original_title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{movie.tagline}</Card.Subtitle>
                            <Card.Text>{movie.overview}</Card.Text>
                            <div className="mb-3">
                                <span className="font-weight-bold">Genres:</span>
                                {movie.genres.map(genre => (
                                    <span key={genre.id} className="badge bg-secondary m-1">{genre.name}</span>
                                ))}
                            </div>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem><strong>Release Date:</strong> {movie.release_date}</ListGroupItem>
                            <ListGroupItem><strong>Status:</strong> {movie.status}</ListGroupItem>
                            <ListGroupItem><strong>Runtime:</strong> {movie.runtime} minutes</ListGroupItem>
                            <ListGroupItem><strong>Vote Average:</strong> {movie.vote_average} ({movie.vote_count} votes)</ListGroupItem>
                            <ListGroupItem><strong>Budget:</strong> ${movie.budget.toLocaleString()}</ListGroupItem>
                            <ListGroupItem><strong>Revenue:</strong> ${movie.revenue.toLocaleString()}</ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default MovieView;
