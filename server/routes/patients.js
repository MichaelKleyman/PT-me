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

module.exports = router;
