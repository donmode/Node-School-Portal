const { viewApplicationsList } = require("../Applications.Controller");
const router = require("express").Router();

router.get("/", viewApplicationsList);

module.exports = router;
