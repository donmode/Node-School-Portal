const pool = require("../../config/database");
const dateFormat = require("dateformat");

const validation = (data) => {
  const { id, group_id, name } = data;
  let error = "";
  if (typeof group_id !== "undefined" && !group_id) {
    return (error = { message: "group_id is required!" });
  }

  if (typeof id !== "undefined" && !Number.isInteger(id)) {
    return (error = { message: "id is invalid/missing!" });
  }

  if (typeof name !== "undefined" && !name) {
    return (error = { message: "name is required!" });
  }
};

// create (this is a POST method)
const createRole = (data, callBack) => {
  if (!data.group_id || !data.name) {
    return callBack({ message: "incomplete params" });
  }

  //validate the data
  const validate = validation(data);
  if (typeof validate === "object" && validate !== null) {
    return callBack(validate);
  }

  //insert into the database
  pool.query(
    `insert into roles(group_id, name, created)
        values(?,?,?)`,
    [data.group_id, data.name, dateFormat(new Date(), "yyyy-mm-dd h:MM:ss")],
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

// findRoles (this is a GET request)
const findRoles = (callBack) => {
  //query the database
  pool.query(`select * from roles`, [], (error, results, fields) => {
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

//find roles by group_id
const findRolesByGroupID = (data, callBack) => {
  if (!data.group_id) {
    return callBack({ message: "incomplete params" });
  }

  //validate the data
  const validate = validation(data);
  if (typeof validate === "object" && validate !== null) {
    return callBack(validate);
  }

  //query the database
  pool.query(
    `select * from roles where group_id=?`,
    [data.group_id],
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

const findOne = (id, callBack) => {
  const data = { id: id };
  //validate the data
  const validate = validation(data);
  if (typeof validate === "object" && validate !== null) {
    return callBack(validate);
  }

  //query the database
  pool.query(
    `select * from roles where id = ?`,
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

const findByName = (data, callBack) => {
  if (!data.name) {
    return callBack({ message: "incomplete params" });
  }

  //validate the data
  const validate = validation(data);
  if (typeof validate === "object" && validate !== null) {
    return callBack(validate);
  }

  //query the database
  pool.query(
    `select * from roles where name = ?`,
    [data.name],
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
    `delete from roles where id = ?`,
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

const updateRole = (data, callBack) => {
  if (!data.group_id || !data.name || !data.id) {
    return callBack({ message: "incomplete params" });
  }

  //validate the data
  const validate = validation(data);
  if (typeof validate === "object" && validate !== null) {
    return callBack(validate);
  }

  //insert into the database
  pool.query(
    `update roles set group_id=?, name=?, modified=? where id=?`,
    [
      data.group_id,
      data.name,
      dateFormat(new Date(), "yyyy-mm-dd h:MM:ss"),
      data.id,
    ],
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
  pool.query(
    `select id, group_id, name from roles`,
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

module.exports = {
  create: createRole,
  findAll: findRoles,
  viewList: viewList,
  update: updateRole,
  findByName: findByName,
  findOne: findOne,
  deleteOne: deleteOne,
  findRolesByGroupID: findRolesByGroupID,
};
