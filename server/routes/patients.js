const router = require("express").Router();
const { Patients, Schedule } = require("../models");

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
    const injuryDictionary = {
      Shoulders: 1,
      Back: 2,
      Knee: 3,
      Hip: 4,
    };
    const { Gender, Age, Insurance, Email, Address } = req.body;
    const firstName = req.body["First Name"];
    const lastName = req.body["Last Name"];
    const phoneNumber =
      req.body["Phone Number"].slice(0, 3) +
      "-" +
      req.body["Phone Number"].slice(3, 6) +
      "-" +
      req.body["Phone Number"].slice(6);
    const reasonForVisit = req.body["Reason For Visit"];
    const title = `${firstName} ${lastName}`;
    const address = `${Address},  ${req.body["City"]} ${req.body["State"]}`;
    const patient_info = {
      title,
      gender: Gender,
      age: Age,
      address,
      phoneNumber,
      email: Email,
      reasonForVisit,
      insurance: Insurance,
      injuryId: injuryDictionary[req.body["Injury Type"]],
      clinicId,
      start: new Date(),
      end: new Date(),
    };
    const newPatient = await Patients.create(patient_info);
    await Schedule.create({
      patientId: newPatient.id,
    });

    if (!newPatient) {
      return res
        .sendStatus(400)
        .send({ message: "Error creating the patient" });
    }

    return res.status(200).send({ patientId: newPatient.id });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
