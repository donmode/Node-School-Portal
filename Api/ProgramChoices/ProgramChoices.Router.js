const {
  createProgramChoice,
  findProgramChoices,
  findProgramChoice,
  updateProgramChoice,
  deleteProgramChoice,
} = require("./ProgramChoices.Controller");
const router = require("express").Router();

router.post("/", createProgramChoice);
router.put("/", updateProgramChoice);
router.get("/", findProgramChoices);
router.get("/:id", findProgramChoice);
router.delete("/", deleteProgramChoice);

module.exports = router;
