const router = require('express').Router();
const exercisesRouter = require('./exercises');
const patientsRouter = require('./patients');
const scheduleRouter = require('./schedule');

router.use('/exercises', exercisesRouter);
router.use('/patients', patientsRouter);
router.use('/schedule', scheduleRouter);

module.exports = router;
