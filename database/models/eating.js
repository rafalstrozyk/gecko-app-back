const mongoose = require('mongoose');
const validate = require('mongoose-validator');

const Schema = mongoose.Schema;

const eatValidate = [
  validate({
    validator: 'isLength',
    arguments: [3, 25],
  }),
];

const eating = new Schema({
  date_eating: { type: Date, required: [true, 'eating date is required'] },

  eat_type: {
    type: String,
    required: [true, 'Type of eat is requred'],
    validate: eatValidate,
  },
});

const EatingModel = mongoose.model('eating', eating);

module.exports = EatingModel;
