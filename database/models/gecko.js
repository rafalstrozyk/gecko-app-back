const mongoose = require('mongoose');
const validate = require('mongoose-validator');

const Schema = mongoose.Schema;

const nameValidate = [
  validate({
    validator: 'isLength',
    arguments: [3, 50],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: true,
    message: 'Name should contain alpha-numeric characters only',
  }),
];

const GeckoModelSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name it is require'],
    validate: nameValidate,
  },
  buy_date: Date,
  birth_date: Date,
  sex: {
    type: String,
    max: 1,
  },
  morph: String,
  weight: Number,
  weight_history: [],
  eating: Date,
  eating_history: [],
  photos: []
});

const GeckoModel = mongoose.model('Gecko', GeckoModelSchema);

module.exports = GeckoModel;
