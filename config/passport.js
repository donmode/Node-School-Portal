const LocalStrategy = require("passport-local").Strategy;
const { compareSync } = require("bcrypt");
const { logUserIn } = require("../Api/Users/Users.Model");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      (username = "superadmin", password = "password", done) => {
        //process User's argument (to be passed in for validation)
        let data = {};
        const validate_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const validated = validate_email.test(String(username).toLowerCase());
        if (!validated) {
          data.username = username;
        } else {
          data.email = username;
        }
        //validate User
        logUserIn(data, (userErr, userResult) => {
          if (userErr) {
            return done(userErr, false, { message: userErr });
          } else {
            if (!userResult.success) {
              return done(null, false, { message: userResult });
            }

            //verify User's password
            const validUser = compareSync(
              password,
              userResult.payload.password
            );
            if (!validUser) {
              return done(null, false, { message: "invalid password!" });
            }
            return done(null, {
              user: validUser,
            });
          }
        });
      }
    )
  );
};
