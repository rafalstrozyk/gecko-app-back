const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var chunks = new Schema({}, { strict: false });

const ChunksModel = mongoose.model('photos.chunks', chunks);

module.exports = ChunksModel;
