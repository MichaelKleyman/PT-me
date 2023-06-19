const router = require('express').Router();
const { Schedule, ScheduleExercise, Exercises } = require('../models');

//GET individual schedule
router.get('/patient/:patientId', async (req, res, next) => {
  try {
    const schedule = await Schedule.findOne({
      where: {
        patientId: req.params.patientId,
      },
      include: [
        {
          model: ScheduleExercise,
          as: 'exercises',
          include: [{ model: Exercises, as: 'exercise' }],
        },
      ],
    });
    res.send(schedule);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
