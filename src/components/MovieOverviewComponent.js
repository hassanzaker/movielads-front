import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import CircularProgressBar from './CircularProgressBar';



const MovieOverviewComponent = ({ movie }) => {

    const navigate = useNavigate();

    

    const handleOnClick = () => {
        navigate(`/movies/${movie.id}`);
    };

    return (
        <Card className="mb-3 movie-card" style={{ width: '18rem' }} onClick={handleOnClick}>
            <div style={{ position: 'relative' }}>
                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
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
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                {/* <Card.Text>
                    Release Date: {movie.release_date}<br />
                    Runtime: {movie.runtime} minutes<br />
                    Country: {movie?.origin_country ? movie.origin_country.join(', ') : ''}<br />
                    Language: {movie.original_language}
                </Card.Text> */}
                <Card.Text>
                    Release Date: {movie.release_date}<br />
                    Language: {movie.original_language}
                </Card.Text> 
                
            </Card.Body>
        </Card>
    );
};

export default MovieOverviewComponent;