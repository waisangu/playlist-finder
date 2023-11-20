import React from 'react';
import { useState } from 'react';
import ResultDisplay from '../components/ResultDisplay.jsx';

const PromptCreator = ({remountHandler}) => {

    const [input, setInput] = useState('');
    const [emotion, setEmotion] = useState('')
    const [playlistName, setPlaylistName] = useState('');
    const [playlistUri, setPlaylistUri] = useState('');
    const [playlistImage, setPlaylistImage] = useState('');

    const changeHandler = e => {
        setInput(e.target.value);
    };

    const keyDownHandler = e => {
        if (e.key === 'Enter') {
            setInput(e.target.value);
            clickHandler();
        }
    };

    const clickHandler = () => {
        fetch(`/api/${input}`)
        .then(res => res.text())
        .then(res => {
            res = JSON.parse(res);
            res[0] ? setEmotion(res[0]) : setEmotion('Random');
            setPlaylistName(res[1].data.name);
            setPlaylistUri(res[1].data.uri);
            setPlaylistImage(res[1].data.images.items[0].sources[0].url);
            remountHandler();
        })
        .catch(err => console.log(err))
        setInput('');
    };

    return (
        <div className='promptContainerBox'>
            <div className='promptCreatorBox'>
            <input type='text' value={input} onChange={changeHandler} onKeyDown={keyDownHandler} placeholder='Enter a prompt'></input>
            <button className='enterBtn' onClick={clickHandler}>Enter</button>
            </div>
            <ResultDisplay emotion={emotion} playlistName={playlistName} playlistUri={playlistUri} playlistImage={playlistImage}/>
        </div>
    )

};

export default PromptCreator;