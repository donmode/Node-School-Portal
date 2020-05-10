const { applicationViewPosBySchoolDepartment } = require("../Pos.Controller");
const router = require("express").Router();

router.get("/application", applicationViewPosBySchoolDepartment);

module.exports = router;
