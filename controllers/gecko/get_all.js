const GeckoModel = require('../../database/models/gecko');

const getAll = (req, res) => {
  GeckoModel.find({}, (err, data) => {
    err
      ? res.status(404).json({ error: err.message })
      : res.status(200).json(data);
  });
};

module.exports = getAll;
