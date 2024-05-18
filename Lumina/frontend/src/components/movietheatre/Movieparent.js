import React, { useState, useEffect } from 'react';
import MoviePlayer from './movieplay'; // Ensure this path is correct

const MovieContainer = ({ movieId }) => {
    const [movieDetails, setMovieDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simulating fetching data that includes a YouTube video URL
        // Here, you would typically fetch this data from your backend or another API
        setTimeout(() => {
            // Example data fetched that includes a YouTube video URL
            const fetchedData = {
                title: "Welcome TO Our Virtual Movie Theater",
                description: "Enjoy Your Movie.",
                
                videoUrl: "https://www.youtube.com/watch?v=TcMBFSGVi1c" // YouTube video URL
            };
            setMovieDetails(fetchedData);
            setLoading(false);
        }, 1000); // Simulating network delay
    }, [movieId]); // Dependency array includes movieId, change this if your data fetching logic differs

    if (loading) {
        return <div>Loading movie details...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return <MoviePlayer movieDetails={movieDetails} />;
};

export default MovieContainer;
