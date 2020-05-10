const { viewAcademicSessionList } = require("../AcademicSessions.Controller");
const router = require("express").Router();

router.get("/", viewAcademicSessionList);

module.exports = router;
