const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config()

const promptController = require('./controllers/promptController');

const PORT = 3000;

const uri = `${process.env.MONGODB_URI}`

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('Connected to Database');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/api/:prompt', promptController.sendInput, (req, res) => {
  return res.status(200).send([res.locals.emotion, res.locals.spotify])
})

app.get('/query/', promptController.getCollection, (req, res) => {
  return res.status(200).send(res.locals.collection)
})

app.get('/delete/:collectionId', promptController.deleteDocument, (req, res) => {
  return res.status(200).send('Deleted!')
})

app.get('/', (req, res) => {
  return res.status(200).send('Great Server Page')
});

app.use((req, res) => res.sendStatus(404));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));