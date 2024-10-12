import axios from 'axios';

export const addToWatchList = async (movieId, priority = 2, notes = '') => {
    try {
        const response = await axios.post('watchlist/add/', {
            movie_id: movieId,
            priority: priority,
            notes: notes,
        });
        alert('Movie added to watchlist successfully!');
        return response.data;
    } catch (error) {
        const errorMessage = error.response.data.message || error.response.data.error || "An error occurred";
        console.error('Error adding movie to watchlist: ', errorMessage);
        alert(errorMessage);
        throw error;
    }
};
