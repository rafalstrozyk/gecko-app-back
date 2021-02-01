const express = require('express');
const router = express.Router();
const GeckoModel = require('../database/models/gecko');

router.get('/', (req, res, next) => {
  GeckoModel.find({}, (err, data) => {
    err
      ? res.status(404).json({ error: err.message })
      : res.status(200).json(data);
  });
});
router.get('/:id', (req, res, next) => {
  GeckoModel.find({ _id: req.params.id }, (err, data) => {
    err
      ? res.status(404).json({ error: err.message })
      : res.status(200).json(data);
  });
});

router.post('/', (req, res, next) => {
  GeckoModel.create(req.body, (err, data) => {
    err
      ? res.status(404).json({ error: err.message })
      : res.status(200).json(data);
  });
});

router.put('/:id', (req, res, next) => {
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
});

module.exports = router;
