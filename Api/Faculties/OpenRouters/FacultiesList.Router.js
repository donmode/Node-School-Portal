const { viewFacultiesList } = require("../Faculties.Controller");
const router = require("express").Router();

router.get("/", viewFacultiesList);

module.exports = router;
