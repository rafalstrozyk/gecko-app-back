const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/geckos';

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

const db = mongoose.connection;

module.exports = db;
