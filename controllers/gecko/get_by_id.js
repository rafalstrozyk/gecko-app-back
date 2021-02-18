const GeckoModel = require('../../database/models/gecko');

const getById = (req, res) => {
  GeckoModel.find({ _id: req.params.id }, (err, data) => {
    err
      ? res.status(404).json({ error: err.message })
      : res.status(200).json(data);
  });
};

module.exports = getById;
