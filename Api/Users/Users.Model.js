const pool = require("../../config/database");
const { genSaltSync, hashSync } = require("bcrypt");
const dateFormat = require("dateformat");

const validation = (data) => {
  const { id, group_id, role_id, username, password, email } = data;
  let error = "";

  if (typeof username !== "undefined" && (!username || username.length < 4)) {
    return (error = {
      message: "username is missing or shorter than 4 character length!",
    });
  }

  if (typeof email !== "undefined" && !email) {
    return (error = { message: "email is required!" });
  } else if (email) {
    let validate_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!validate_email.test(String(email).toLowerCase())) {
      return (error = { message: "invalid email format!" });
    }
  }

  if (typeof password !== "undefined" && (!password || password.length < 6)) {
    return (error = {
      message: "password is missing or shorter than 6 character length!",
    });
  }

  if (typeof id !== "undefined" && !Number.isInteger(id)) {
    return (error = { message: "id is invalid/missing!" });
  }

  if (typeof group_id !== "undefined" && !Number.isInteger(group_id)) {
    return (error = { message: "group_id is invalid/missing!" });
  }

  if (typeof role_id !== "undefined" && !Number.isInteger(role_id)) {
    return (error = { message: "role_id is invalid/missing!" });
  }
};

// create (this is a POST method)
const createUser = (data, callBack) => {
  if (
    !data.group_id ||
    !data.role_id ||
    !data.username ||
    !data.password ||
    !data.email
  ) {
    return callBack({ message: "incomplete params" });
  }

  //validate the data
  const validate = validation(data);
  if (typeof validate === "object" && validate !== null) {
    return callBack(validate);
  }

  //hash password
  const salt = genSaltSync(10);
  data.password = hashSync(data.password, salt);

  //insert into the database
  pool.query(
    `insert into users(group_id, role_id, username, password, email, meta, created)
        values(?,?,?,?,?,?,?)`,
    [
      data.group_id,
      data.role_id,
      data.username,
      data.password,
      data.email,
      data.meta || "",
      dateFormat(new Date(), "yyyy-mm-dd h:MM:ss"),
    ],
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, {
        message: "Records created successfully!",
        data: { id: results.insertId },
      });
    }
  );
};

// findUsers (this is a GET request)
const findUsers = (callBack) => {
  //query the database
  pool.query(`select * from users`, [], (error, results, fields) => {
    if (error) {
      return callBack(error);
    }
    if (results.length < 1) {
      return callBack(null, { message: "No record Found!" });
    } else {
      return callBack(null, results);
    }
  });
};

const logUserIn = (data, callBack) => {
  if (!data.email && !data.username) {
    return callBack(null, {
      success: false,
      message: "Kindly provide email/username",
    });
  }

  //validate the data
  const validate = validation(data);

  if (typeof validate === "object" && validate !== null) {
    return callBack(validate);
  }
  let query = "";
  let param = [];
  if (data.email) {
    query = ` email = ? `;
    param.push(data.email);
  } else if (data.username) {
    query = ` username = ? `;
    param.push(data.username);
  }

  //query the database
  pool.query(
    `select id, username, email, password, role_id, group_id from users where ${query}`,
    param,
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      if (results.length < 1) {
        return callBack(null, {
          success: false,
          message: "invalid credential(s)",
        });
      } else {
        return callBack(null, { success: true, payload: results[0] });
      }
    }
  );
};

const findOne = (id, callBack) => {
  const data = { id: id };
  //validate the data
  const validate = validation(data);
  if (typeof validate === "object" && validate !== null) {
    return callBack(validate);
  }

  //query the database
  pool.query(
    `select * from users where id = ?`,
    [data.id],
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      if (results.length < 1) {
        return callBack(null, { message: "Record not found!" });
      } else {
        return callBack(null, results);
      }
    }
  );
};

const deleteOne = (data, callBack) => {
  //validate the data
  const validate = validation(data);
  if (typeof validate === "object" && validate !== null) {
    return callBack(validate);
  }

  //query the database
  pool.query(
    `delete from users where id = ?`,
    [data.id],
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      if (results.affectedRows) {
        return callBack(null, { message: "Record deleted successfully!" });
      } else {
        return callBack(null, { message: "Record not found!" });
      }
    }
  );
};

const updateUser = (data, callBack) => {
  if (!data.id || data.length < 2) {
    return callBack({ message: "incomplete params" });
  }

  //validate the data
  const validate = validation(data);
  if (typeof validate === "object" && validate !== null) {
    return callBack(validate);
  }
  let query = "";
  let params = [];
  const id = data.id;
  delete data.id; // delete id so the query won't try to update it
  Object.entries(data).forEach(([key, value]) => {
    query += ` ${key}=?,`;
    params.push(value);
  });

  params.push(dateFormat(new Date(), "yyyy-mm-dd h:MM:ss")); //add modified datetime
  params.push(id);
  //insert into the database
  pool.query(
    `update users set ${query} modified=? where id=?`,
    params,
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      if (results.affectedRows) {
        return callBack(null, { message: "Record updated successfully!" });
      } else {
        return callBack(null, { message: "Record not found!" });
      }
    }
  );
};

const viewList = (callBack) => {
  pool.query(`select id, username from users`, (error, results, fields) => {
    if (error) {
      return callBack(error);
    }
    if (results.length < 1) {
      return callBack(null, { message: "No record Found!" });
    } else {
      return callBack(null, results);
    }
  });
};

module.exports = {
  create: createUser,
  findAll: findUsers,
  viewList: viewList,
  update: updateUser,
  findOne: findOne,
  deleteOne: deleteOne,
  logUserIn: logUserIn,
};
