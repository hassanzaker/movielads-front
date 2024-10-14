import React, { useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import { FaSortUp, FaSortDown, FaTrash, FaEye } from 'react-icons/fa';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { FaFilm, FaStickyNote, FaStar, FaFlag, FaCalendarAlt, FaComments } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const possibleColumnName = ['movie_id', 'movie_title', 'notes', 'rating', 'priority', 'added_at', 'review'];

// Utility function to calculate time difference in hours or days
const getTimeDifference = (addedAt) => {
    const currentTime = new Date();
    const addedTime = new Date(addedAt);
    const diffInMilliseconds = currentTime - addedTime;
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60); // Convert ms to hours

    if (diffInHours < 24) {
        return `${Math.floor(diffInHours)} hours ago`;
    } else {
        const diffInDays = Math.floor(diffInHours / 24); // Convert hours to days
        return `${diffInDays} days ago`;
    }
};

// Function to get the appropriate icon for each column
const getColumnIcon = (key) => {
    switch (key) {
        case 'movie_id':
            return <FaFilm />;
        case 'movie_title':
            return <FaFilm />;
        case 'notes':
            return <FaStickyNote />;
        case 'rating':
            return <FaStar />;
        case 'priority':
            return <FaFlag />;
        case 'added_at':
            return <FaCalendarAlt />;
        case 'review':
            return <FaComments />;
        default:
            return <BsFillArrowUpRightCircleFill />;
    }
};

const DynamicSortableList = ({ data, handleDeleteMovie, handleAddToSeenList, isWatchlist }) => {
    const [sortConfig, setSortConfig] = useState({ key: 'movie_title', direction: 'ascending' });
    const [selectedMovies, setSelectedMovies] = useState([]);
    const [allSelected, setAllSelected] = useState(false);
    const [showSeenModal, setShowSeenModal] = useState(false);
    const [selectedMovieForSeen, setSelectedMovieForSeen] = useState(null);
    const [seenRating, setSeenRating] = useState(8); // Default rating
    const [seenReview, setSeenReview] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [singleDelete, setSingleDelete] = useState(false);
    const [deleteMovie, setDeleteMovie] = useState('');
    const navigate = useNavigate();

    const sortedData = [...data].sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        
        // If sorting by movie_id, convert them to integers
        if (sortConfig.key === 'movie_id') {
            aValue = parseInt(aValue, 10);
            bValue = parseInt(bValue, 10);
        } else {
            // Convert other values to strings and lower case for proper comparison
            aValue = aValue?.toString().toLowerCase();
            bValue = bValue?.toString().toLowerCase();
        }
    
        if (aValue < bValue) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const handleSort = (key) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
        setSortConfig({ key, direction });
    };

    const handleMovieClick = (movieId) => {
        navigate(`/movies/${movieId}`);
    };

    const renderSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />;
        }
        return null;
    };

    const handleDeleteClick = (movieId) => {
       setSingleDelete(true);
       setShowDeleteModal(true);
       setDeleteMovie(movieId);
    };

    const handleMultiDeleteClick = () => {
        handleDeleteMovie(selectedMovies);
        setSelectedMovies([]);
    };

    const handleSeenModalOpen = (movie) => {
        setSelectedMovieForSeen(movie);
        setShowSeenModal(true);
    };

    const handleSeenModalSubmit = () => {
        if (selectedMovieForSeen) {
            handleAddToSeenList(selectedMovieForSeen.movie_id, seenRating, seenReview);
            setShowSeenModal(false);
        }
    };

    const handleSelectOption = (movie_id) => {
        if (selectedMovies.includes(movie_id)){
            setSelectedMovies(selectedMovies.filter(id => id !== movie_id));
            setAllSelected(false);
        } else {
            if (selectedMovies.length === data.length - 1){
                setAllSelected(true);
            }
            setSelectedMovies([...selectedMovies, movie_id])
            
        }

        
    };

    const handleAllSelect = () => {
        if (allSelected){
            setSelectedMovies([]);
            setAllSelected(false);
        } else {
            setSelectedMovies(data.map((item) =>  item.movie_id));
            setAllSelected(true);
        }
    };

    const handleDeleteModalClose = () => {
        setSingleDelete(false);
        setShowDeleteModal(false);
    };

    if (data.length === 0){
        return (
            <h2>List is Empty!</h2>
        );
    }

    return (
        <div>
            {/* Reserve space for the buttons */}
            <div style={{ height: '50px' }}>
                <div style={{ visibility: selectedMovies.length > 0 ? 'visible' : 'hidden' }}>
                    <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
                        Delete Selected
                    </Button>
                    <Button variant="primary" onClick={handleAllSelect}>
                        {allSelected ? 'Deselect All' : 'Select All'}
                    </Button>
                </div>
            </div>

            <Table striped bordered hover responsive className="text-center">
                <thead className="bg-primary text-white">
                    <tr>
                        <th>
                            <Form.Check
                                    type="checkbox"
                                    checked={allSelected}
                                    onChange={handleAllSelect}
                                />
                        </th>
                        {Object.keys(data[0]).map((key) => (
                            <th key={key} onClick={() => handleSort(key)} style={{ cursor: 'pointer' }}>
                                {getColumnIcon(key)} {key.toUpperCase()} {renderSortIcon(key)}
                            </th>
                        ))}
                        <th>Actions</th> {/* New column for actions */}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <Form.Check
                                    type="checkbox"
                                    checked={selectedMovies.includes(item.movie_id)}
                                    onChange={() => handleSelectOption(item.movie_id)}
                                />
                            </td>
                            {Object.entries(item).map(([key, value], idx) => (
                                <td key={idx}>
                                    {key === 'movie_id' || key === 'movie_title' ? (
                                        <span
                                            style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
                                            onClick={() => handleMovieClick(item.movie_id)}
                                        >
                                            {value}
                                        </span>
                                    ) : key === 'added_at' ? (
                                        getTimeDifference(value)
                                    ) : (
                                        value
                                    )}
                                </td>
                            ))}
                            <td>
                                {/* Delete button */}
                                <Button variant="danger" onClick={() => handleDeleteClick(item.movie_id)}>
                                    <FaTrash /> Delete
                                </Button>
                                {/* Add to Seen List button */}
                                {(isWatchlist ?
                                <Button variant="success" onClick={() => handleSeenModalOpen(item)} className="ms-2">
                                    <FaEye /> Add to Seen List
                                </Button> :
                                <></>)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Seen List Modal */}
            <Modal show={showSeenModal} onHide={() => setShowSeenModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add {selectedMovieForSeen?.movie_title} to Seen List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="10"
                                value={seenRating}
                                onChange={(e) => setSeenRating(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Review</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={seenReview}
                                onChange={(e) => setSeenReview(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowSeenModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleSeenModalSubmit}>Add to Seen List</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Are you sure you want to delete 
                        {singleDelete ? " this movie?" + deleteMovie : " these movies?" + selectedMovies.map((item) => item)} 
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleDeleteModalClose}>Cancell!</Button>
                    <Button 
                        variant="danger" 
                        onClick={() => {
                            if (singleDelete){
                                handleDeleteMovie(deleteMovie);
                                if (selectedMovies.includes(deleteMovie))
                                    setSelectedMovies(selectedMovies.filter(id => id !== deleteMovie));
                            }
                            else {
                                handleMultiDeleteClick();
                            }
                            handleDeleteModalClose();
                        }}>
                        Yes!
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DynamicSortableList;