const router = require('express').Router();
const express = require('express');
const { Patients } = require('../models');
const app = express();

//GET all patients with specific clinic ID
router.get('/:clinicId', async (req, res, next) => {
  try {
    const allPatients = await Patients.findAll({
      where: {
        clinicId: req.params.clinicId,
      },
    });
    res.send(allPatients);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//GET specific patient
router.get('/patient/:patientId', async (req, res, next) => {
  try {
    const patient = await Patients.findOne({
      where: {
        id: req.params.patientId,
      },
    });
    res.send(patient);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
