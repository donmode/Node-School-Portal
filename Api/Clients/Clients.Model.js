const pool = require("../../config/database");
const dateFormat = require("dateformat");
const { sign } = require("jsonwebtoken");
const validation = (data) => {
  const { id, client_name, client_token, revoked } = data;
  let error = "";

  if (typeof id !== "undefined" && !Number.isInteger(id)) {
    return (error = { message: "id is invalid/missing!" });
  }

  if (typeof client_name !== "undefined" && !client_name) {
    return (error = { message: "client_name is required!" });
  }
  if (typeof client_token !== "undefined" && !client_token) {
    return (error = { message: "client_token is required!" });
  }

  if (typeof revoked !== "undefined" && typeof revoked !== "boolean") {
    return (error = { message: "revoked is invalid/missing!" });
  }
};

// create (this is a POST method)
const createClient = (data, callBack) => {
  if (!data.client_name) {
    return callBack({ message: "incomplete params" });
  }

  //validate the data
  const validate = validation(data);
  if (typeof validate === "object" && validate !== null) {
    return callBack(validate);
  }
  console.log("data: ", data);

  const tmp =
    "SW" +
    Math.ceil(Math.random() * 1000) +
    dateFormat(new Date(), "yyyymmddhMMss");
  const client_token = sign(
    { token: tmp + Math.floor(Math.random() * 10000) },
    process.env.PRIVATEKEY || "s0ck3tw0rks"
  );
  //insert into the database
  pool.query(
    `insert into clients(client_name, client_token, meta, revoked, created)
        values(?,?,?,?,?)`,
    [
      data.client_name,
      data.client_token || client_token,
      data.meta || "",
      data.revoked || false,
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

// findClients (this is a GET request)
const findClients = (callBack) => {
  //query the database
  pool.query(`select * from clients`, [], (error, results, fields) => {
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

const findOne = (id, callBack) => {
  const data = { id: id };
  //validate the data
  const validate = validation(data);
  if (typeof validate === "object" && validate !== null) {
    return callBack(validate);
  }

  //query the database
  pool.query(
    `select * from clients where id = ?`,
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
    `delete from clients where id = ?`,
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

const viewList = (callBack) => {
  pool.query(
    `select id, client_name from clients`,
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      if (results.length < 1) {
        return callBack(null, { message: "No record Found!" });
      } else {
        return callBack(null, results);
      }
    }
  );
};

const updateClient = (data, callBack) => {
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
    `update clients set ${query} modified=? where id=?`,
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

const findByToken = (token, callBack) => {
  const data = { client_token: token };
  //validate the data
  const validate = validation(data);
  if (typeof validate === "object" && validate !== null) {
    return callBack(validate);
  }

  //query the database
  pool.query(
    `select client_token from clients where client_token = ? and revoked != true`,
    [data.client_token],
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      if (results.length < 1) {
        return callBack(null, { success: false, message: "Record not found!" });
      } else {
        return callBack(null, { success: true, payload: results[0] });
      }
    }
  );
};

module.exports = {
  create: createClient,
  findAll: findClients,
  viewList: viewList,
  findOne: findOne,
  deleteOne: deleteOne,
  findByToken: findByToken,
  updateClient: updateClient,
};
