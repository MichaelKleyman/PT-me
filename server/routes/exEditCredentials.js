const router = require("express").Router();
const { Exercise_Edited_Credentials } = require("../models");

//GET exercise edit history based on exerciseID
router.get(
  "/credential-history/:exerciseId/:amountOfCredentials",
  async (req, res, next) => {
    try {
      if (req.params.amountOfCredentials === "One") {
        const credential = await Exercise_Edited_Credentials.findOne({
          where: {
            ex_id: req.params.exerciseId,
          },
          order: [["createdAt", "DESC"]], //Latest edits to oldest edits
        });
        if (!credential) {
          return res
            .status(404)
            .send({ message: "Credential cant be fetched" });
        }
        return res.send(credential);
      } else {
        const credential = await Exercise_Edited_Credentials.findAll({
          where: {
            ex_id: req.params.exerciseId,
          },
          order: [["createdAt", "DESC"]], //Latest edits to oldest edits
        });
        if (!credential) {
          return res
            .status(404)
            .send({ message: "Credentials cant be fetched" });
        }
        return res.send(credential);
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

//POST a new person editing the exercise data
router.post(`/new-edit/:exerciseId`, async (req, res, next) => {
  try {
    console.log(req.body);
    const editedCredentials = await Exercise_Edited_Credentials.create({
      ex_id: req.params.exerciseId,
      clinicName: req.body.clinicName,
      editorName: req.body.editorName,
    });
    if (!editedCredentials) {
      return res
        .status(404)
        .send({ message: "Exercise credentials can't be added." });
    }
    return res.send(editedCredentials);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
