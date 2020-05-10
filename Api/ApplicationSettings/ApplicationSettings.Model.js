const pool = require("../../config/database");
const dateFormat = require("dateformat");

const validation = (data) => {
  const { id, name, value } = data;
  let error = "";

  if (typeof id !== "undefined" && !Number.isInteger(id)) {
    return (error = { message: "id is invalid/missing!" });
  }

  if (typeof name !== "undefined" && !name) {
    return (error = { message: "name is required!" });
  }

  if (typeof value !== "undefined" && !value) {
    return (error = { message: "value is required!" });
  }
};

// create (this is a POST method)
const createApplicationSetting = (data, callBack) => {
  if (!data.name && !data.value) {
    return callBack({ message: "incomplete params" });
  }

  //validate the data
  const validate = validation(data);
  if (typeof validate === "object" && validate !== null) {
    return callBack(validate);
  }

  //insert into the database
  pool.query(
    `insert into application_settings(name, value, created)
        values(?,?,?)`,
    [data.name, data.value, dateFormat(new Date(), "yyyy-mm-dd h:MM:ss")],
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

// findApplicationSettings (this is a GET request)
const findApplicationSettings = (callBack) => {
  //query the database
  pool.query(
    `select * from application_settings`,
    [],
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
    `select * from application_settings where id = ?`,
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
    `delete from application_settings where id = ?`,
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

const updateApplicationSetting = (data, callBack) => {
  if (!data.name || !data.id || !data.value) {
    return callBack({ message: "incomplete params" });
  }

  //validate the data
  const validate = validation(data);
  if (typeof validate === "object" && validate !== null) {
    return callBack(validate);
  }

  //insert into the database
  pool.query(
    `update application_settings set name=?, value=?, modified=? where id=?`,
    [
      data.name,
      data.value,
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
    `select id, name from application_settings`,
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

const viewByName = (data, callBack) => {
  //validate the data
  const validate = validation(data);
  if (typeof validate === "object" && validate !== null) {
    return callBack(validate);
  }

  pool.query(
    `select id, name, value from application_settings where name=?`,
    [data.name],
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
  create: createApplicationSetting,
  findAll: findApplicationSettings,
  viewList: viewList,
  update: updateApplicationSetting,
  findOne: findOne,
  deleteOne: deleteOne,
  viewByName: viewByName,
};
