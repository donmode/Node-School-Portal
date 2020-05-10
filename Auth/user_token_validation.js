const { verify } = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    token = token.slice(7);
    verify(token, process.env.PRIVATEKEY, (err, decode) => {
      if (err) {
        return res.send({
          success: false,
          message: "Invalid User Token!",
        });
      } else {
        next();
      }
    });
  } else {
    return res.send({
      success: false,
      message: "Access Denied! Unauthorized User!!",
    });
  }
};

module.exports = checkToken;
