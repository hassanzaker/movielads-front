import axios from 'axios';

export const addToSeenList = async (movieId, rating, review = '') => {
    try {
        const response = await axios.post('seen/add/', {
            movie_id: movieId,
            rating: rating,
            review: review,
        });
        alert('Movie added to seenlist successfully!');
        return response.data;
    } catch (error) {
        const errorMessage = error.response.data.message || error.response.data.error || "An error occurred";
        console.error('Error adding movie to seenlist: ', errorMessage);
        alert(errorMessage);
        throw error;
    }
};
