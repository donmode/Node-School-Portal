const { findByToken } = require("../Api/Clients/Clients.Model");

const checkToken = (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    token = token.slice(7);
    findByToken(token, (err, result) => {
      if (err) {
        return res.status(500).send({
          success: false,
          message: err,
        });
      } else {
        if (!result.success) {
          return res.send({
            success: false,
            message: "Invalid Client Token!",
          });
        }
        next();
      }
    });
  } else {
    return res.send({
      success: false,
      message: "Access Denied! Unauthorized Client!!",
    });
  }
};

module.exports = checkToken;
