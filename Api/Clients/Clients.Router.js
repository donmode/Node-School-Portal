const {
  createClient,
  findClients,
  findClient,
  deleteClient,
  viewClientsList,
  updateClient,
} = require("./Clients.Controller");
const router = require("express").Router();
const passport = require("passport");
require("../../config/passport")(passport);

router.post(
  "/",
  // passport.authenticate("oauth2-resource-owner-password"),
  passport.authenticate("local"),
  createClient
);
router.get("/list", viewClientsList);
router.get("/", findClients);
router.get("/:id", findClient);
router.delete("/", deleteClient);
router.put("/", updateClient);

module.exports = router;
