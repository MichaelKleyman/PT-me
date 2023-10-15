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

//GET a patients latest appointments
router.get("/latest-appointment/:patientId", async (req, res, next) => {
  try {
    const appointments = await Appointments.findAll({
      where: {
        patientId: req.params.patientId,
      },
    });
    appointments.sort((a, b) => a.start - b.start);
    res.send(appointments);
    // if (!appointments) {
    //   return res.sendStatus(400).send({ message: "No appointments found" });
    // }

    // return res.send(appointments[appointments.length - 1]);
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

//POST recurring appointments
router.post(
  "/recurring-appointments/:patientId/:clinicId",
  async (req, res, next) => {
    try {
      console.log(req.body);
      const { appointments } = req.body;
      for (let i = 0; i < req.body.frequency; i++) {
        const currentDate = new Date(); // This should be the start date of the first week
        currentDate.setUTCDate(currentDate.getUTCDate() + 7 * i);
        for (let j = 0; j < Object.values(appointments).length; j++) {
          const appointment = Object.values(appointments)[j];
          const daysUntilNextDay = (dayName) => {
            const days = [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ];
            //Find the next occurrence of the specified day (e.g., 'Monday')
            const targetDay = days.indexOf(dayName);
            const currentDay = currentDate.getUTCDay();
            return (targetDay + 7 - currentDay) % 7;
          };

          const targetDay = appointment.day;
          const daysUntilTargetDay = daysUntilNextDay(targetDay);
          const nextDate = new Date(currentDate);
          nextDate.setUTCDate(currentDate.getUTCDate() + daysUntilTargetDay);

          //Set the appointment date and time
          const appointmentStart = new Date(appointment.start);
          const appointmentEnd = new Date(appointment.end);

          // Set the date of the appointment to the next occurrence of the specified day
          appointmentStart.setUTCFullYear(nextDate.getUTCFullYear());
          appointmentStart.setUTCMonth(nextDate.getUTCMonth());
          appointmentStart.setUTCDate(nextDate.getUTCDate());

          appointmentEnd.setUTCFullYear(nextDate.getUTCFullYear());
          appointmentEnd.setUTCMonth(nextDate.getUTCMonth());
          appointmentEnd.setUTCDate(nextDate.getUTCDate());

          console.log("Appointment start:", appointmentStart.toISOString());
          console.log("Appointment end:", appointmentEnd.toISOString());
          const res = await Appointments.create({
            patientId: req.params.patientId,
            clinicId: req.params.clinicId,
            start: appointmentStart,
            end: appointmentEnd,
          });
          if (!res) {
            return res
              .sendStatus(400)
              .send({ message: "Error creating the appointment" });
          }
        }
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

module.exports = router;
