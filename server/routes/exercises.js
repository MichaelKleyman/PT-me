const router = require('express').Router();
const exercises = require('../exercises');

//GET exercises
router.get('/', async (req, res, next) => {
  try {
    res.send(exercises);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
