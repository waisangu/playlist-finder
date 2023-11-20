import React from 'react';
import { useState } from 'react';

const ResultDisplay = ({emotion, playlistName, playlistUri, playlistImage}) => {

    return (
        <div className='resultDisplayContainer'>
            <div className='emotionContainer'><span>Prompt Analysis: </span>{emotion}</div>
            <div className='resultDisplayBox'>
            <div className='playlistNameContainer'><span>Name: </span>{playlistName}</div>
            <a className="playlistImagesContainer" href={playlistUri}>
                <img src={playlistImage}/>
            </a>
            </div>
        </div>
    )

};

export default ResultDisplay;