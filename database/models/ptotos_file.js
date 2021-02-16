const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var thingSchema = new Schema({}, { strict: false });

const PhotosFilesModel = mongoose.model('photos.files', thingSchema);

module.exports = PhotosFilesModel;

