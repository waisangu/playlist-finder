import React from 'react';
import { useState, useEffect } from 'react';
import ResultDisplay from './ResultDisplay.jsx';


const LogDisplay = ({collection, remountHandler}) => {
    const deleteHandler = e => {
      fetch(`/delete/${e.target.value}`)
      .then(res => res.text())
      .then(res => {
        console.log(res)
        remountHandler();
      })
      .catch(err => console.log(err))
    }
  
  return(
    <div className="outerLogBox">
      {collection.map((prompt, idx) => {
      return (
        <div className="innerLogBox" key={`Prompt-${prompt._id.toString()}`}>
          <button className="deleteBtn" value={prompt._id} onClick={deleteHandler}>X</button>
          <div className='inputContainer'><span>Prompt: </span> {prompt.input} 
          </div>
          <div className='playlistNameContainer'><span>Name: </span> {prompt.playlistName}</div>
            <a className="playlistImagesContainer" href={prompt.uri}>
                <img src={prompt.playlistImage}/>
            </a>
        </div>
      )
     })}
    </div>
     
  );
};

export default LogDisplay;
