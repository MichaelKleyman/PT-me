const router = require("express").Router();
const { Patients, Appointments } = require("../models");
const { Op } = require("sequelize");

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

//GET all appointments for the patient
router.get("/all-patient-appointments/:patientId", async (req, res, next) => {
  try {
    const appointments = await Appointments.findAll({
      where: {
        patientId: req.params.patientId,
      },
    });
    const currentDate = new Date();
    appointments.sort((a, b) => {
      const timeDifferenceA = Math.abs(new Date(a.start) - currentDate);
      const timeDifferenceB = Math.abs(new Date(b.start) - currentDate);
      return timeDifferenceA - timeDifferenceB;
    });
    res.send(appointments);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//GET appointments for the current week
router.get("/filter-appointments/:filter/:clinicId", async (req, res, next) => {
  try {
    // if (req.params.filter === "Current Week") {
    //   const today = new Date();
    //   const startOfWeek = new Date(today);
    //   startOfWeek.setHours(0, 0, 0, 0); // Set to the beginning of the current day

    //   const endOfWeek = new Date(today);
    //   endOfWeek.setHours(23, 59, 59, 999); // Set to the end of the current day

    //   const dayOfWeek = today.getDay();
    //   startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek); // Set to Monday of the current week
    //   endOfWeek.setDate(endOfWeek.getDate() + (6 - dayOfWeek)); // Set to Sunday of the current week

    //   const appointments = await Appointments.findAll({
    //     where: {
    //       clinicId: req.params.clinicId,
    //       start: {
    //         [Op.gte]: startOfWeek, // Start time greater than or equal to Monday
    //         [Op.lte]: endOfWeek, // Start time less than or equal to Sunday
    //       },
    //     },
    //   });
    //   res.send(appointments);
    // }
    let start, end;
    if (req.params.filter === "Current Week") {
      // Calculate start and end dates for the current week
      start = new Date();
      start.setHours(0, 0, 0, 0);
      const dayOfWeek = start.getDay();
      start.setDate(start.getDate() - dayOfWeek);
      end = new Date(start);
      end.setDate(end.getDate() + 6);
      end.setHours(23, 59, 59, 999);
    } else if (req.params.filter === "Last 30 Days") {
      // Calculate start and end dates for the last 30 days
      start = new Date();
      start.setDate(start.getDate() - 30);
      start.setHours(0, 0, 0, 0);
      end = new Date();
      end.setHours(23, 59, 59, 999);
    } else if (req.params.filter === "Last 3 Months") {
      // Calculate start and end dates for the last 3 months
      start = new Date();
      start.setHours(0, 0, 0, 0);
      start.setMonth(start.getMonth() - 2); // Subtract 2 months to go back 3 months
      start.setDate(1); // Set to the 1st day of the month
      end = new Date();
      end.setHours(23, 59, 59, 999);
    }
    const appointments = await Appointments.findAll({
      where: {
        clinicId: req.params.clinicId,
        start: {
          [Op.gte]: start,
          [Op.lte]: end,
        },
      },
    });
    res.send(appointments);
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
    const currentDate = new Date();
    appointments.sort((a, b) => {
      const timeDifferenceA = Math.abs(new Date(a.start) - currentDate);
      const timeDifferenceB = Math.abs(new Date(b.start) - currentDate);
      return timeDifferenceA - timeDifferenceB;
    });
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
      const { appointments } = req.body;
      const arr = [];
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
          const result = await Appointments.create({
            patientId: req.params.patientId,
            clinicId: req.params.clinicId,
            start: appointmentStart,
            end: appointmentEnd,
          });
          if (!result) {
            return res
              .sendStatus(400)
              .send({ message: "Error creating the appointment" });
          }
          arr.push(result);
        }
      }
      return res.send({ appointments: arr });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

module.exports = router;
