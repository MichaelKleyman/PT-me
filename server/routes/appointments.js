const router = require("express").Router();
const { Patients, Appointments } = require("../models");

//GET all appointments in the clinic
router.get("/:clinicId", async (req, res, next) => {
  try {
    const allAppointments = await Appointments.findAll({
      where: {
        clinicId: req.params.clinicId,
      },
      include: [
        {
          model: Patients,
          as: "patient", // Alias to access patient information
          attributes: ["id", "title"], // Include only the patient ID and name
        },
      ],
    });
    res.send(allAppointments);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//POST a patients appointment
router.post("/create-appointment/:patientId", async (req, res, next) => {
  try {
    const newAppointment = await Appointments.create({
      clinicId: req.body.clinicId,
      patientId: req.params.patientId,
      start: req.body.start,
      end: req.body.end,
    });
    if (!newAppointment) {
      return res
        .sendStatus(400)
        .send({ message: "Error creating the appointment" });
    }

    return res.status(200).send(newAppointment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//UPDATE a patients appointment
router.put("/update-appointment/:appointmentId", async (req, res, next) => {
  try {
    const [, [updatedAppointment]] = await Appointments.update(
      {
        start: req.body.start,
        end: req.body.end,
      },
      {
        returning: true,
        where: {
          id: req.params.appointmentId,
        },
      }
    );
    if (updatedAppointment) {
      res.send(updatedAppointment);
    } else {
      res.sendStatus(404).send({ message: "Patient not found" });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//DELETE a patients appointment
router.delete("/delete-appointment/:appointmentId", async (req, res, next) => {
  try {
    const canceledPatientAppointment = await Appointments.findOne({
      where: {
        id: req.params.appointmentId,
      },
    });
    if (canceledPatientAppointment) {
      await canceledPatientAppointment.destroy();
      res.status(200).json({ message: "Appointment deleted successfully" });
    } else {
      res.status(404).json({ message: "Appointment not found" });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
