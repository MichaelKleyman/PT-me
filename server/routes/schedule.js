const router = require("express").Router();
const {
  Schedule,
  ScheduleExercise,
  Exercises,
  PatientExercises,
} = require("../models");

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
  "/patient/:patientId/new-exercise/:scheduleExerciseId/:exerciseId",
  async (req, res, next) => {
    try {
      const { scheduleId, exerciseId, sets, reps } = req.body;
      const exercise = await ScheduleExercise.create({
        scheduleId,
        exerciseId,
        sets,
        reps,
      });
      const patientExercise = await PatientExercises.findOne({
        where: {
          patientId: req.params.patientId,
          exerciseId: req.params.exerciseId,
        },
      });
      await patientExercise.destroy();
      res.send(exercise);
    } catch (error) {
      console.log("ERROR: >>>>>", error);
      next(error);
    }
  }
);

//POST exercise from exercise list into an empty flowsheet
router.post(
  "/patient/:patientId/new-flowsheet/:exerciseId",
  async (req, res, next) => {
    try {
      const { patientId, exerciseId } = req.params;
      const schedule = await Schedule.findOne({
        where: {
          patientId: patientId,
        },
      });

      if (!schedule) {
        res.status(404).json({ message: "Schedule not found" });
      }
      const newScheduleExercise = await ScheduleExercise.create({
        scheduleId: schedule.id,
        exerciseId: exerciseId,
        sets: 3,
        reps: 10,
      });
      const patientExercise = await PatientExercises.findOne({
        where: {
          patientId: patientId,
          exerciseId: exerciseId,
        },
      });
      await patientExercise.destroy();

      res.send(newScheduleExercise).status(200);
    } catch (error) {
      console.error("Error deleting exercise:", error);
      res.status(500).json({ message: "Internal server error" });
      next(error);
    }
  }
);

//put exercise from patient flowsheet back to patient exercise list
router.post(
  "/patient/:patientId/remove-from-flowsheet/:scheduleExerciseId/:exerciseId",
  async (req, res, next) => {
    try {
      const deleteFromFlowSheet = await ScheduleExercise.findOne({
        where: {
          scheduleId: req.params.scheduleExerciseId,
          exerciseId: req.params.exerciseId,
        },
      });
      await deleteFromFlowSheet.destroy();
      const exerciseAssignedToPatient = await PatientExercises.create({
        patientId: req.params.patientId,
        exerciseId: req.params.exerciseId,
      });
      res.send(exerciseAssignedToPatient);
    } catch (error) {
      console.log("ERROR: >>>>>", error);
      next(error);
    }
  }
);

module.exports = router;
