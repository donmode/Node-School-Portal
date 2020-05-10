const {
  createAcademicSession,
  findAcademicSessions,
  findAcademicSession,
  updateAcademicSession,
  deleteAcademicSession,
} = require("./AcademicSessions.Controller");
const router = require("express").Router();

router.post("/", createAcademicSession);
router.put("/", updateAcademicSession);
router.get("/", findAcademicSessions);
router.get("/:id", findAcademicSession);
router.delete("/", deleteAcademicSession);

module.exports = router;
