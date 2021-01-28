const { Binary } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GeckoModelSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name it is require'],
    min: [3, 'Min letters 3']
  },
  buy_date: Date,
  birth_date: Date,
  sex: {
    type: String,
    max: 1
  },
  morph: String,
  weight: Number,
  weight_history: [],
  eating_history: [],

});

const GeckoModel = mongoose.model('Gecko', GeckoModelSchema);

module.exports = GeckoModel;
