const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const EatingModel = require('../database/models/eating');
const GeckoModel = require('../database/models/gecko');

const checkList = [
  check('geckos_id')
    .isArray({ min: 1 })
    .withMessage('geckos_id: You must post array witch geckos _id'),
  check('date_eating')
    .trim()
    .isDate({format:'dd/MM/yyyy'})
    .withMessage('date_eating : You must give date of eating'),
  check('eat_type')
    .isLength({ min: 3 })
    .withMessage('eat_type: You must give eat type min 3 letters'),
];

router.get('/', (req, res, next) => {
  EatingModel.find({}, (err, data) => {
    err
      ? res.status(404).json({ error: err.message })
      : res.status(200).json(data);
  });
});

router.post('/', checkList, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).json({ errors: errors.array() });
  }
  const eatData = {
    date_eating: new Date(req.body.date_eating),
    eat_type: req.body.eat_type,
  };

  const geckosId = [...req.body.geckos_id];

  let eatingId;

  EatingModel.create(eatData, (err, eatingData) => {
    if (err) res.status(404).json({ error: err.message });
    eatingId = eatingData._id;

    GeckoModel.updateMany(
      { _id: { $in: geckosId } },
      {
        $push: { eating_history: [eatingId] },
        eating: eatingData.date_eating,
      },
      { runValidators: true },
      (err) => {
        err
          ? res.status(404).json({ error: err.message })
          : res.status(200).json({ message: 'succes' });
      }
    );
  });
});

router.put('/:id', (req, res, next) => {
  EatingModel.findByIdAndUpdate(
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
