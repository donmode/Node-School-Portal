const { viewSchoolProgramList } = require("../SchoolPrograms.Controller");
const router = require("express").Router();

router.get("/", viewSchoolProgramList);

module.exports = router;
