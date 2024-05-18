import React from 'react';
import ReactPlayer from 'react-player';
import './moviePlayer.css'

const MoviePlayer = ({ movieDetails }) => {
    if (!movieDetails) {
        return <div>Movie details are not available.</div>;
    }

    const videoUrl = movieDetails.videoUrl || 'https://www.youtube.com/watch?v=MjQG-a7d41Q';

    return (
        <div className='movie-player-container'>
            <div className='movie-details'>
                <h1>{movieDetails.title}</h1>
                <p>{movieDetails.description}</p>
                
            </div>
            <div className='video-player'>
                <ReactPlayer
                    url={videoUrl}
                    controls
                    width='100%'
                    height='650px'
                />
            </div>
        </div>
    );
};

export default MoviePlayer;
