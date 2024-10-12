import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import CircularProgressBar from './CircularProgressBar';
import { FaCalendarAlt, FaGlobe, FaPlayCircle } from 'react-icons/fa';

const MovieOverviewComponent = ({ movie }) => {
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate(`/movies/${movie.id}`);
    };

    return (
        <Card className="mb-4 shadow-sm movie-card" style={{ width: '18rem', cursor: 'pointer' }} onClick={handleOnClick}>
            <div style={{ position: 'relative' }}>
                <Card.Img 
                    variant="top" 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    alt={movie.title} 
                    className="img-fluid rounded-top"
                />
                <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    width: '50px',
                    height: '50px',
                }}>
                </div>
            </div>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">
                    {movie.title}
                    <FaPlayCircle className="text-primary" size={20} />
                </Card.Title>
                <Card.Text>
                    <span className="d-block">
                        <FaCalendarAlt className="me-2 text-secondary" />
                        <strong>Release:</strong> {movie.release_date}
                    </span>
                    <span className="d-block mt-2">
                        <FaGlobe className="me-2 text-secondary" />
                        <strong>Language:</strong> {movie.original_language}
                    </span>
                </Card.Text>
                <Badge bg="info" className="mt-2">
                    {movie.vote_average.toFixed(1)}
                </Badge>
            </Card.Body>
        </Card>
    );
};

export default MovieOverviewComponent;
