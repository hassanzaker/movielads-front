import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { FaFilm, FaStickyNote, FaStar, FaFlag, FaCalendarAlt, FaComments } from 'react-icons/fa';

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
            return <BsFillArrowUpRightCircleFill style={{ color: '#007bff' }} />;
    }
};

const DynamicSortableList = ({ data }) => {
    const [sortConfig, setSortConfig] = useState({ key: 'movie_title', direction: 'ascending' });

    const sortedData = [...data].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const renderSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />;
        }
        return null;
    };

    return (
        <div>
            <Table striped bordered hover responsive className="text-center">
                <thead className="bg-primary text-white">
                    <tr>
                        {Object.keys(data[0]).map((key) => (
                            <th key={key} onClick={() => handleSort(key)} style={{ cursor: 'pointer' }}>
                                {getColumnIcon(key)} {key.toUpperCase()} {renderSortIcon(key)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((item, index) => (
                        <tr key={index}>
                            {Object.entries(item).map(([key, value], idx) => (
                                <td key={idx}>
                                    {key === 'added_at' ? getTimeDifference(value) : value}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default DynamicSortableList;
