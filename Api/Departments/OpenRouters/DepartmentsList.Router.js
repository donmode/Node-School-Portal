const { viewDepartmentsByFaculty } = require("../Departments.Controller");
const router = require("express").Router();

router.get("/faculty", viewDepartmentsByFaculty);

module.exports = router;
