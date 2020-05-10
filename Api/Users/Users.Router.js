const {
  createUser,
  findUsers,
  findUser,
  updateUser,
  deleteUser,
  viewUsersList,
  loginUser,
} = require("./Users.Controller");
const passport = require("passport");
const router = require("express").Router();

router.post("/register", createUser);
router.get("/list", viewUsersList);
router.put("/", updateUser);
router.get("/", findUsers);
router.get("/:id", findUser);
router.delete("/", deleteUser);

module.exports = router;
