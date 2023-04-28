const router = require('express').Router();
const exercisesRouter = require('./exercises');

router.use('/exercises', exercisesRouter);

module.exports = router;
