import React from 'react';
import { Link } from 'react-router-dom';
import './Movie.css'; 

const Movies = () => {
    const movies = [
        { id: 1, name: 'Inception', imageUrl: '/images/inception.jpg', description: 'A thief who steals corporate secrets through dream-sharing technology.', rating: '8.8/10' },
        { id: 2, name: 'Interstellar', imageUrl: '/images/intersteller.jpg', description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.', rating: '8.6/10' },
        { id: 3, name: 'The Matrix', imageUrl: '/images/matrix.jpg', description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.', rating: '8.7/10' },
        { id: 4, name: 'Avengers: Endgame', imageUrl: '/images/avengers.jpg', description: 'The surviving members of the Avengers work to reverse the damage caused by Thanos in Infinity War.', rating: '8.4/10' }
    ];

    return (
        <div className="movie-page">
            <h1 className="movie-head">Movie Catalog</h1>
            <div className="movie-grid">
                {movies.map((movie) => (
                    <Link to="/booking" key={movie.id} className="movie-card">
                        <img src={movie.imageUrl} alt={movie.name} />
                        <div className="movie-overlay">
                            <div className="movie-info">
                                <h3>{movie.name}</h3>
                                <p>{movie.description}</p>
                                <span className="rating">{movie.rating}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Movies;
