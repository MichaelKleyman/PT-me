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

//GET patients based on search input patients/search-patients
router.get("/search-patients/:input", async (req, res, next) => {
  try {
    const { input } = req.params;
    const patients = await Patients.findAll();
    const filteredPatients = patients.filter((ex) =>
      ex.title.toLowerCase().includes(input)
    );
    if (filteredPatients.length) {
      return res.send(filteredPatients);
    }
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ message: "Internal server error" });
    next(error);
  }
});

//GET specific patient
router.get("/specific-patient/:patientId", async (req, res, next) => {
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
      Neck: 5,
      "Wrist/Hand": 6,
      "Ankle/Foot": 7,
      Abdominal: 8,
      Gluteal: 9,
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

//DELETE a specific patient
router.delete("/:patientId", async (req, res, next) => {
  try {
    await Patients.destroy({
      where: {
        id: req.params.patientId,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//DELETE a patients appointment completely
router.put("/delete-appointment/:patientId", async (req, res, next) => {
  try {
    const [, [canceledPatientAppointment]] = await Patients.update(
      { start: null, end: null },
      {
        returning: true,
        where: {
          id: req.params.patientId,
        },
      }
    );
    if (canceledPatientAppointment) {
      res.send(canceledPatientAppointment);
    } else {
      res.status(404).send({ message: "Patient not found" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//UPDATE a patients appointment start and end
router.put("/update-appointment/:patientId", async (req, res, next) => {
  try {
    console.log(req.body);
    const [, [updatedAppointment]] = await Patients.update(
      { start: req.body.start, end: req.body.end },
      {
        returning: true,
        where: {
          id: req.params.patientId,
        },
      }
    );
    if (updatedAppointment) {
      res.send(updatedAppointment);
    } else {
      res.status(404).send({ message: "Patient not found" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//UPDATE a patients information
router.put("/update/:patientId", async (req, res, next) => {
  try {
    const injuryOptions = [
      "Shoulders",
      "Back",
      "Knee",
      "Hip",
      "Neck",
      "Wrist/Hand",
      "Ankle/Foot",
      "Abdominal",
      "Gluteal",
    ];
    const newPatientData = await Patients.update(
      {
        title: req.body["First Name"] + " " + req.body["Last Name"],
        gender: req.body.Gender.value,
        age: req.body.Age,
        address:
          req.body.Address +
          ", " +
          req.body.City +
          " " +
          req.body.State +
          ", " +
          req.body.Zipcode,
        phoneNumber:
          req.body["Phone Number"].slice(0, 3) +
          "-" +
          req.body["Phone Number"].slice(3, 6) +
          "-" +
          req.body["Phone Number"].slice(6),
        email: req.body.Email,
        reasonForVisit: req.body["Reason For Visit"],
        insurance: req.body.Insurance.value,
        injuryId: injuryOptions.indexOf(req.body["Injury Type"]) + 1,
      },
      {
        returning: true,
        where: {
          id: req.params.patientId,
        },
      }
    );
    if (newPatientData) {
      res.send(newPatientData);
    } else {
      res.status(404).send({ message: "Patient data can't be edited." });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
