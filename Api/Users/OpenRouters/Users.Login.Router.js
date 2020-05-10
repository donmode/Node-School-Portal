const { loginUser } = require("../Users.Controller");
const passport = require("passport");
const router = require("express").Router();

router.post("/", passport.authenticate("local", { session: false }), loginUser);

module.exports = router;
