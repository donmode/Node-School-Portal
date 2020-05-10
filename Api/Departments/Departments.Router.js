const {
  createDepartment,
  findDepartments,
  findDepartment,
  updateDepartment,
  deleteDepartment,
} = require("./Departments.Controller");
const router = require("express").Router();

router.post("/", createDepartment);
router.put("/", updateDepartment);
router.get("/", findDepartments);
router.get("/:id", findDepartment);
router.delete("/", deleteDepartment);

module.exports = router;
