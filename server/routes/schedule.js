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

//update a date for the specific Schedule Exercise id
router.put(
  '/patient/:patientId/exercise/:scheduleExerciseId',
  async (req, res, next) => {
    try {
      const exercise = await Schedule.findOne({
        where: {
          patientId: req.params.patientId,
        },
        include: [
          {
            model: ScheduleExercise,
            as: 'exercises',
            where: { id: req.params.scheduleExerciseId },
          },
        ],
      });
      const targetExercise = exercise.exercises[0];
      targetExercise.sets = req.body.sets;
      await targetExercise.save();
      res.send(targetExercise);
      res.send(exercise);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
