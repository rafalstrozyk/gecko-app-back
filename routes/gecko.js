const express = require('express');
const router = express.Router();
const GeckoModel = require('../database/models/gecko');

router.get('/', (req, res, next) => {
  GeckoModel.find({}, (err, data) => {
    if (err) console.log(err);
    res.status(200).json(data);
  });
});
router.get('/:id', (req, res, next) => {
  GeckoModel.find({_id: req.params.id}, (err, data) => {
    if (err) console.log(err);
    res.status(200).json(data);
  });
});

router.post('/', (req, res, next) => {
  console.log(req.body.hello);
  GeckoModel.create(req.body, (err, data) => {
    if (err) console.log(err);
    res.json(data);
  });
});

router.put('/:id', (req, res, next) => {
    GeckoModel.findByIdAndUpdate(req.params.id, req.body, (err,data) => {
        if (err) console.log(err);
        res.json(data);
    })
});

module.exports = router;
