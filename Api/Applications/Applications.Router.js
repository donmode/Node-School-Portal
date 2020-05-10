const {
  createApplication,
  findApplications,
  findApplication,
  updateApplication,
  deleteApplication,
} = require("./Applications.Controller");
const router = require("express").Router();

router.post("/", createApplication);
router.put("/", updateApplication);
router.get("/", findApplications);
router.get("/:id", findApplication);
router.delete("/", deleteApplication);

module.exports = router;
