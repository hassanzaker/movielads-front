import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieOverviewComponent from '../MovieOverviewComponent';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const MovieGrid = ({movies}) => {

   
    return (
        <Container>
            <Row>
                {movies.map(movie => (
                    <Col key={movie.id} sm={12} md={6} lg={4} xl={3}>
                        <MovieOverviewComponent movie={movie} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default MovieGrid;
