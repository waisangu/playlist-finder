const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promptSchema = new Schema({
   input : { type: String, required: true },
   playlistName: { type: String, required: true },
   playlistImage: { type: String, required: true },
   uri: { type: String, required: true }
});

module.exports = mongoose.model('Prompt', promptSchema);