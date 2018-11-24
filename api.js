const express = require('express');
const router = express.Router();

const firstNames = require('./first-names.json');

const randomBetweenOneDec = (min, max) => Math.round((Math.random() * (max - min + 1) + min) * 10) / 10;
const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

router.get('/scores', (req, res, next) => {
  // const max = 100;
  // const r1 = randomBetween(1, max - 3);
  // const r2 = randomBetween(1, max - 2 - r1);
  // const r3 = randomBetween(1, max - 1 - r1 - r2);
  // const r4 = max - r1 - r2 - r3;
  const scores = [];
  const numPeople = randomBetween(4, 10);
  for (let i = 0; i < numPeople; i++) {
    scores[i] = {
      name: firstNames[randomBetween(0, firstNames.length)],
      score: randomBetweenOneDec(60, 100)
    };
  }
  res.status(200).json({
    success: true,
    // scores: {
    //   daniel: randomBetweenOneDec(60, 100),
    //   micah: randomBetweenOneDec(60, 100),
    //   sean: randomBetweenOneDec(60, 100),
    //   alvin: randomBetweenOneDec(60, 100),
    //   david: randomBetweenOneDec(60, 100)
    // }
    scores: scores
  });
});

// Keep at end of file
router.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

router.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    success: false,
    error: error.message || 'Internal server error'
  });
});

module.exports = router;
