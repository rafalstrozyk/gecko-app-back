const GeckoModel = require('../../database/models/gecko');

const update = (req, res) => {
  GeckoModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { runValidators: true },
    (err, data) => {
      err
        ? res.status(404).json({ error: err.message })
        : res.status(200).json(data);
    }
  );
};

module.exports = update;
