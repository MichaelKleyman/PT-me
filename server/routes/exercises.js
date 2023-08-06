const router = require("express").Router();
const { Exercises, Patients, PatientExercises } = require("../models");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
// const exercises = require('../exercises');

app.use(cookieParser());

const cookieOptions = {
  sameSite: "None",
  secure: true,
};

//GET exercises
router.get("/", async (req, res, next) => {
  try {
    const exercises = await Exercises.findAll();
    res.cookie("youtube_video", "iframe_cookie", cookieOptions);
    res.send(exercises);
  } catch (error) {
    next(error);
  }
});

//GET exercises based on search input exercises/search-exercise
router.get("/search-exercise/:input", async (req, res, next) => {
  try {
    const { input } = req.params;
    const exercises = await Exercises.findAll();
    const filteredExercises = exercises.filter((ex) =>
      ex.name.toLowerCase().includes(input)
    );
    if (filteredExercises.length) {
      return res.send(filteredExercises);
    }
  } catch (error) {
    console.error("Error fetching exercises:", error);
    res.status(500).json({ message: "Internal server error" });
    next(error);
  }
});

//GET exercises/:id
router.get("/:id", async (req, res, next) => {
  try {
    const specificExercise = await Exercises.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.send(specificExercise);
  } catch (error) {
    next(error);
  }
});

//GET  exercises/injury/:injuryId
router.get("/injury/:injuryId", async (req, res, next) => {
  try {
    const exercises = await Exercises.findAll({
      where: {
        injuryId: req.params.injuryId,
      },
    });
    res.cookie("youtube_video", "your_cookie_value", cookieOptions);

    // res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    // res.setHeader(
    //   'Set-Cookie',
    //   cookie.serialize('cookieName', 'cookieValue', cookieOptions)
    // );
    res.send(exercises);
  } catch (error) {
    next(error);
  }
});

//GET exercises for specific patient: exercises/patient/:patientId
router.get("/patient/:patientId", async (req, res, next) => {
  try {
    const exercises = await Exercises.findAll({
      include: [
        {
          model: Patients,
          where: {
            id: req.params.patientId,
          },
        },
      ],
    });
    res.send(exercises);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//DELETE specific exercise for this specific patient
router.delete("/patient/:patientId/:exerciseId", async (req, res, next) => {
  try {
    const { exerciseId, patientId } = req.params;
    const deleteExercise = await PatientExercises.findOne({
      where: {
        patientId: patientId,
        exerciseId: exerciseId,
      },
    });
    if (deleteExercise) {
      await deleteExercise.destroy();
      res.status(200).json({ message: "Exercise deleted successfully" });
    } else {
      res.status(404).json({ message: "Exercise not found" });
    }
  } catch (error) {
    console.error("Error deleting exercise:", error);
    res.status(500).json({ message: "Internal server error" });
    next(error);
  }
});

module.exports = router;
