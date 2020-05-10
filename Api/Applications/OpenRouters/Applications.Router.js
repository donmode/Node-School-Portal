const { createApplication } = require("../Applications.Controller");
const router = require("express").Router();

router.post("/", createApplication);

module.exports = router;
