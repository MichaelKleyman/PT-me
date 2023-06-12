const router = require('express').Router();
const exercisesRouter = require('./exercises');
const patientsRouter = require('./patients');

router.use('/exercises', exercisesRouter);
router.use('/patients', patientsRouter);

module.exports = router;
