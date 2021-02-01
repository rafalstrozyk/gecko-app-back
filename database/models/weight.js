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

const eatValidate = [
  validate({
    validator: 'isLength',
    arguments: [3, 25],
  }),
];

const weight = new Schema({
  date_eating: { type: Date, required: [true, 'eating date is required'] },
  gecko_name: {
    type: String,
    required: [true, 'Name it is required'],
    validate: nameValidate,
  },
  eat_type: {
    type: String,
    required: [true, 'Type of eat is requred'],
    validate: eatValidate,
  },
});

const GeckoModel = mongoose.model('weight', weight);

module.exports = GeckoModel;
