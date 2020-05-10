const {
  viewModeOfAdmissionList,
  viewModeOfAdmissionListBySchool,
} = require("../ModeOfAdmissions.Controller");
const router = require("express").Router();

router.get("/", viewModeOfAdmissionList);
router.get("/school", viewModeOfAdmissionListBySchool);

module.exports = router;
