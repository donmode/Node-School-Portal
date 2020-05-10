const {
  createGroup,
  findGroups,
  findGroup,
  updateGroup,
  deleteGroup,
  viewGroupsList,
} = require("./Groups.Controller");
const router = require("express").Router();

router.post("/", createGroup);
router.get("/list", viewGroupsList);
router.put("/", updateGroup);
router.get("/", findGroups);
router.get("/:id", findGroup);
router.delete("/", deleteGroup);

module.exports = router;
