const {
  createModeOfAdmission,
  findModeOfAdmissions,
  findModeOfAdmission,
  updateModeOfAdmission,
  deleteModeOfAdmission,
} = require("./ModeOfAdmissions.Controller");
const router = require("express").Router();

router.post("/", createModeOfAdmission);
router.put("/", updateModeOfAdmission);
router.get("/", findModeOfAdmissions);
router.get("/:id", findModeOfAdmission);
router.delete("/", deleteModeOfAdmission);

module.exports = router;
