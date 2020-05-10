const {
  createRole,
  findRoles,
  findRole,
  updateRole,
  deleteRole,
  viewRolesList,
  findRolesByGroup,
} = require("./Roles.Controller");
const router = require("express").Router();

router.post("/", createRole);
router.get("/list", viewRolesList);
router.put("/", updateRole);
router.get("/", findRoles);
router.get("/:id", findRole);
router.get("/:group_id", findRolesByGroup);
router.delete("/", deleteRole);

module.exports = router;
