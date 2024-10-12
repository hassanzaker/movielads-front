import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DynamicSortableList from '../../utils/DynamicSortableList';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { MdOutlineMovie } from 'react-icons/md';
import { AiOutlineWarning } from 'react-icons/ai';
import 'bootstrap/dist/css/bootstrap.min.css';

const Seenlist = () => {
    const [seenlistData, setSeenlistData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSeenlist = async () => {
            try {
                const response = await axios.get('seenlist/');  // Send GET request to backend
                setSeenlistData(response.data);
            } catch (err) {
                setError("Failed to load the watchlist. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchSeenlist();  // Trigger the fetch when the component loads
    }, []);

    if (loading) {
        return <div className="text-center"><MdOutlineMovie size={50} /><h4>Loading your seenlist...</h4></div>;
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
                    <h2><MdOutlineMovie size={30} /> Seen Movies</h2>
                    <DynamicSortableList data={seenlistData} />
                </Col>
            </Row>
        </Container>
    );
};

export default Seenlist;
