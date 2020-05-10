const {
  createSchoolProgram,
  findSchoolPrograms,
  findSchoolProgram,
  updateSchoolProgram,
  deleteSchoolProgram,
} = require("./SchoolPrograms.Controller");
const router = require("express").Router();

router.post("/", createSchoolProgram);
router.put("/", updateSchoolProgram);
router.get("/", findSchoolPrograms);
router.get("/:id", findSchoolProgram);
router.delete("/", deleteSchoolProgram);

module.exports = router;
