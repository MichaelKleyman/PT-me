const router = require("express").Router();
const exercisesRouter = require("./exercises");
const patientsRouter = require("./patients");
const scheduleRouter = require("./schedule");
const exerciseEditCredentialsRouter = require("./exEditCredentials");
const clinicRouter = require("./clinic");
const appointmentsRouter = require("./appointments");

router.use("/exercises", exercisesRouter);
router.use("/patients", patientsRouter);
router.use("/schedule", scheduleRouter);
router.use("/exEditCredentials", exerciseEditCredentialsRouter);
router.use("/clinic", clinicRouter);
router.use("/appointments", appointmentsRouter);

module.exports = router;
