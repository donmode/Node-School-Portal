const {
  createApplicationSetting,
  findApplicationSettings,
  findApplicationSetting,
  updateApplicationSetting,
  deleteApplicationSetting,
  viewApplicationSettingsList,
} = require("./ApplicationSettings.Controller");
const router = require("express").Router();

router.post("/", createApplicationSetting);
router.get("/list", viewApplicationSettingsList);
router.put("/", updateApplicationSetting);
router.get("/", findApplicationSettings);
router.get("/:id", findApplicationSetting);
router.delete("/", deleteApplicationSetting);

module.exports = router;
