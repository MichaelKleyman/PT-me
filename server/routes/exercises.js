const router = require('express').Router();
const { Exercises, Patients } = require('../models');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
// const exercises = require('../exercises');

app.use(cookieParser());

const cookieOptions = {
  sameSite: 'None',
  secure: true,
};

//GET exercises
router.get('/', async (req, res, next) => {
  try {
    const exercises = await Exercises.findAll();
    res.cookie('youtube_video', 'iframe_cookie', cookieOptions);

    res.send(exercises);
  } catch (error) {
    next(error);
  }
});

//GET shoulder exercises/:id
router.get('/:id', async (req, res, next) => {
  try {
    const shoulderExercises = await Exercises.findAll({
      where: {
        injuryId: req.params.id,
      },
    });
    res.cookie('youtube_video', 'your_cookie_value', cookieOptions);

    // res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    // res.setHeader(
    //   'Set-Cookie',
    //   cookie.serialize('cookieName', 'cookieValue', cookieOptions)
    // );
    res.send(shoulderExercises);
  } catch (error) {
    next(error);
  }
});

//GET exercises for specific patient: exercises/patient/:patientId
router.get('/patient/:patientId', async (req, res, next) => {
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

module.exports = router;
