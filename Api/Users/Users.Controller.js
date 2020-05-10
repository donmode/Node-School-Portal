const {
  viewList,
  create,
  update,
  findAll,
  findOne,
  deleteOne,
  logUserIn,
} = require("./Users.Model");

const { sign } = require("jsonwebtoken");

const viewUsersList = (req, res) => {
  viewList((err, result) => {
    if (err) {
      return res.status(500).send({
        success: false,
        message: err.message,
      });
    }
    return res.status(200).send({
      success: true,
      payload: result,
    });
  });
};
const createUser = (req, res) => {
  const data = req.body;

  create(data, (err, result) => {
    if (err) {
      return res.status(500).send({
        success: false,
        message: err.message,
      });
    }
    return res.status(200).send({
      success: true,
      payload: result,
    });
  });
};

const updateUser = (req, res) => {
  const data = req.body;
  update(data, (err, result) => {
    if (err) {
      return res.status(500).send({
        success: false,
        message: err.message,
      });
    }
    return res.status(200).send({
      success: true,
      payload: result,
    });
  });
};

const loginUser = (req, res) => {
  let data = {};
  const validate_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const validated = validate_email.test(
    String(req.body.username).toLowerCase()
  );
  if (!validated) {
    data.username = req.body.username;
  } else {
    data.email = req.body.username;
  }

  logUserIn(data, (err, result) => {
    if (err) {
      return res.status(500).send({
        success: false,
        message: err.message,
      });
    }
    result.password = undefined;
    const token = sign({ payload: result }, process.env.PRIVATEKEY, {
      expiresIn: "1h",
    });
    return res.status(200).send({
      success: true,
      data: {
        message: "logged in successfully",
        payload: { token: token },
      },
    });
  });
};

const findUsers = (req, res) => {
  findAll((err, result) => {
    if (err) {
      return res.status(500).send({
        success: false,
        message: err.message,
      });
    }
    return res.status(200).send({
      success: true,
      payload: result,
    });
  });
};

const findUser = (req, res) => {
  const id = Number(req.query.id);
  findOne(id, (err, result) => {
    if (err) {
      return res.status(500).send({
        success: false,
        message: err.message,
      });
    }
    return res.status(200).send({
      success: true,
      payload: result,
    });
  });
};

const deleteUser = (req, res) => {
  const data = req.body;
  deleteOne(data, (err, result) => {
    if (err) {
      return res.status(500).send({
        success: false,
        message: err.message,
      });
    }
    return res.status(200).send({
      success: true,
      payload: result,
    });
  });
};

module.exports = {
  viewUsersList: viewUsersList,
  createUser: createUser,
  findUsers: findUsers,
  findUser: findUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  loginUser: loginUser,
};
