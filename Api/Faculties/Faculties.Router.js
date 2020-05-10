const {
  createFaculty,
  findFaculties,
  findFaculty,
  updateFaculty,
  deleteFaculty,
} = require("./Faculties.Controller");
const router = require("express").Router();

router.post("/", createFaculty);
router.put("/", updateFaculty);
router.get("/", findFaculties);
router.get("/:id", findFaculty);
router.delete("/", deleteFaculty);

module.exports = router;
