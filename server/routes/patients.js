const router = require('express').Router();
const express = require('express');
const { Patients } = require('../models');
const app = express();

//GET all patients
router.get('/', async (req, res, next) => {
  try {
    const allPatients = await Patients.findAll();
    res.send(allPatients);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
