const router = require("express").Router();
const { Patients } = require("../models");

//GET all patients with specific clinic ID
router.get("/:clinicId", async (req, res, next) => {
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
router.get("/patient/:patientId", async (req, res, next) => {
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

//POST create patient
router.post("/:clinicId", async (req, res, next) => {
  try {
    const { clinicId } = req.params;
    console.log(req.body);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
