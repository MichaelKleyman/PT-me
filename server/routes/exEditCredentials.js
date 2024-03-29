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
        if (credential) {
          return res.send(credential);
        } else {
          console.error("Credential cannot be fetched");
        }
      } else {
        const credential = await Exercise_Edited_Credentials.findAll({
          where: {
            ex_id: req.params.exerciseId,
          },
          order: [["createdAt", "DESC"]], //Latest edits to oldest edits
        });

        if (credential) {
          return res.send(credential);
        } else {
          console.error("Credentials cannot be fetched");
        }
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
    const injuryOptions = [
      "",
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
    const fieldNameTranslation = {
      exerciseType: "Exercise Type",
      exerciseName: "Exercise Name",
      musclesWorked: "Muscles Worked",
      exerciseDescription: "Exercise Description",
      exerciseVideo: "Exercise Video Link",
      exerciseTips: "Exercise Tips",
    };

    const databaseNameMap = {
      exerciseType: "injuryId",
      exerciseName: "name",
      musclesWorked: "musclesWorked",
      exerciseDescription: "description",
      exerciseVideo: "videoLink",
      exerciseTips: "tips",
    };

    const { editedFields, currentExercise, tips } = req.body;
    const allEditedData = [];
    //first KV pair is the previous fields, second KV pair is the updated fields
    Object.entries(editedFields).forEach((arrayElem) => {
      const obj = {
        [`Old ${fieldNameTranslation[arrayElem[0]]}`]:
          databaseNameMap[arrayElem[0]] === "injuryId"
            ? injuryOptions[currentExercise[databaseNameMap[arrayElem[0]]]]
            : databaseNameMap[arrayElem[0]] === "tips"
            ? `${currentExercise[databaseNameMap[arrayElem[0]]]}
              `
            : currentExercise[databaseNameMap[arrayElem[0]]],
        [fieldNameTranslation[arrayElem[0]]]:
          databaseNameMap[arrayElem[0]] === "tips"
            ? `${tips}
       ${arrayElem[1]}`
            : arrayElem[1],
      };
      allEditedData.push(obj);
    });

    const editedCredentials = await Exercise_Edited_Credentials.create({
      ex_id: req.params.exerciseId,
      clinicName: req.body.clinicName,
      editorName: req.body.editorName,
      editedFields: allEditedData,
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

//POST a comment for the specific exercise
router.post("/comment/:id", async (req, res, next) => {
  try {
    const credential = await Exercise_Edited_Credentials.findByPk(
      req.params.id
    );
    if (!credential) {
      return res.status(404).json({ message: "Record not found" });
    }

    // Add the new comment to the comment array
    if (credential.comments === null) {
      credential.comments = [
        { comment: req.body.comment, clinicName: req.body.clinicName },
      ];
      await credential.save();
      return res.status(200).json({ message: "Comment added successfully" });
    }
    const newComments = [
      ...credential.comments,
      { comment: req.body.comment, clinicName: req.body.clinicName },
    ];
    credential.comments = newComments;
    await credential.save();
    return res
      .status(200)
      .json({ message: "Comment added successfully", comments: newComments });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
