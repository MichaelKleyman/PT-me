const router = require("express").Router();
const { Schedule, ScheduleExercise, Exercises } = require("../models");

//GET individual schedule
router.get("/patient/:patientId", async (req, res, next) => {
  try {
    const schedule = await Schedule.findOne({
      where: {
        patientId: req.params.patientId,
      },
      include: [
        {
          model: ScheduleExercise,
          as: "exercises",
          include: [{ model: Exercises, as: "exercise" }],
        },
      ],
    });
    res.send(schedule);
  } catch (error) {
    next(error);
  }
});

//update sets for the specific Schedule Exercise id
router.put(
  "/patient/:patientId/exercise-sets/:scheduleExerciseId",
  async (req, res, next) => {
    try {
      console.log(req.body);
      const exercise = await Schedule.findOne({
        where: {
          patientId: req.params.patientId,
        },
        include: [
          {
            model: ScheduleExercise,
            as: "exercises",
            where: { id: req.params.scheduleExerciseId },
          },
        ],
      });
      const targetExercise = exercise.exercises[0];
      targetExercise.sets = req.body.sets;
      targetExercise.reps = req.body.reps;
      await targetExercise.save();
      res.send(targetExercise);
    } catch (error) {
      next(error);
    }
  }
);

//update reps for the specific Schedule Exercise id
router.put(
  "/patient/:patientId/exercise-reps/:scheduleExerciseId",
  async (req, res, next) => {
    try {
      console.log(req.body);
      const exercise = await Schedule.findOne({
        where: {
          patientId: req.params.patientId,
        },
        include: [
          {
            model: ScheduleExercise,
            as: "exercises",
            where: { id: req.params.scheduleExerciseId },
          },
        ],
      });
      const targetExercise = exercise.exercises[0];
      targetExercise.sets = req.body.sets;
      targetExercise.reps = req.body.reps;
      await targetExercise.save();
      res.send(targetExercise);
    } catch (error) {
      next(error);
    }
  }
);

//add patients exercise to the patients flowsheet
router.post(
  "/patient/:patientId/new-exercise/:scheduleExerciseId",
  async (req, res, next) => {
    try {
      // console.log(req.body);
      const exercise = await Schedule.findOne({
        where: {
          patientId: req.params.patientId,
        },
        include: [
          {
            model: ScheduleExercise,
            as: "exercises",
            where: { id: req.params.scheduleExerciseId },
          },
        ],
      });
      console.log(exercise);
    } catch (error) {
      console.log("ERROR: >>>>>", error);
      next(error);
    }
  }
);

module.exports = router;
