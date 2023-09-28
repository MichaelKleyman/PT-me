const router = require("express").Router();
const { User } = require("../models");

//GET specific clinic
router.get("/:clinicName", async (req, res, next) => {
  try {
    const clinic = await User.findOne({
      where: {
        clinicName: req.params.clinicName,
      },
    });
    if (!clinic) {
      return res.status(404).send({ message: "Clinic cant be fetched" });
    }
    return res.send(clinic);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
