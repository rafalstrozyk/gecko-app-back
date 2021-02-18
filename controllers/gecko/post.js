const GeckoModel = require('../../database/models/gecko');

const postGecko = (req, res) => {
  GeckoModel.create(req.body, (err, data) => {
    err
      ? res.status(404).json({ error: err.message })
      : res.status(200).json(data);
  });
};

module.exports = postGecko;
