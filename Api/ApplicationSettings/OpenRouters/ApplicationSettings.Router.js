const {
  viewApplicationSettingsByName,
} = require("../ApplicationSettings.Controller");
const router = require("express").Router();

router.get("/by_name", viewApplicationSettingsByName);

module.exports = router;
