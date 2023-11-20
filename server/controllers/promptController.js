require('dotenv').config()
const Prompt = require('../models/promptModel');

const promptController = {};

promptController.sendInput = async (req, res, next) => {

    const transformEmotionResponse = {
        anger: ["angry", "rage", "headbanger"],
        disgust: ["disgust", "terrible", "the worst"],
        fear: ["scary", "frightening", "spooky"],
        joy: ["happy", "joyful", "vibes"],
        sadness: ["sad", "unhappy", "crying"],
        surprise: ["electrifying", "shocking", "surprising"]
    };

    
    try {
        const urlEmotion = 'https://twinword-emotion-analysis-v1.p.rapidapi.com/analyze/';
        const optionsEmotion = {
            method: 'POST',
            headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': `${process.env.EMOTION_ANALYSIS_API_KEY}`,
            'X-RapidAPI-Host': 'twinword-emotion-analysis-v1.p.rapidapi.com'
            },
            body: new URLSearchParams({
                text: `${req.params.prompt}`
            })
        };

        const responseEmotion = await fetch(urlEmotion, optionsEmotion);
        const resultEmotion = await responseEmotion.text();
        const resultEmotionFiltered = JSON.parse(resultEmotion).emotions_detected[0];

        const urlSpotify = transformEmotionResponse[resultEmotionFiltered] ? `https://spotify23.p.rapidapi.com/search/?q=${transformEmotionResponse[resultEmotionFiltered][Math.floor(Math.random()*3)]}%20playlist&type=playlists&offset=0&limit=20` : `https://spotify23.p.rapidapi.com/search/?q=top%20playlists&type=playlists&offset=0&limit=50`;

        const optionsSpotify = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': `${process.env.SPOTIFY_API_KEY}`,
                'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
            }
        };
        const responseSpotify = await fetch(urlSpotify, optionsSpotify);
        const resultSpotify = await responseSpotify.text();
        const resultSpotifyFiltered = JSON.parse(resultSpotify).playlists.items[Math.floor(Math.random()*15)];

        Prompt.create({input: req.params.prompt, playlistName: resultSpotifyFiltered.data.name, playlistImage: resultSpotifyFiltered.data.images.items[0].sources[0].url, uri: resultSpotifyFiltered.data.uri })

        res.locals.emotion = resultEmotionFiltered;
        res.locals.spotify = resultSpotifyFiltered;
        
        return next();
        
    } catch (error) {
        return next(error);
    }

};

promptController.getCollection = async (req, res, next) => {
    const collection = await Prompt.find({});
    res.locals.collection = collection;
    return next();
}

promptController.deleteDocument = async (req, res, next) => {
    try {
        const document = await Prompt.deleteOne({_id: req.params.collectionId})
        if (document.deletedCount === 0) {
            throw {
                log: 'Express error handler caught error from promptController.deleteDocument',
                message: { err: 'An error occurred from promptController.deleteDocument' },
            }
        } else return next();
    } catch (error) {
        return next(error);
    }
}

module.exports = promptController;

