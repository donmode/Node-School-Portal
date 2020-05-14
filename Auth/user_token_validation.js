const { verify } = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    token = token.slice(7);
    const PRIVATEKEY = process.env.PRIVATEKEY || "s0ck3tw0rks";
    verify(token, PRIVATEKEY, (err, decode) => {
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
