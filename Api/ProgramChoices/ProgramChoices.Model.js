const pool = require("../../config/database");
const dateFormat = require("dateformat");

const validation = (data) => {
  const { id, number, pos_id, application_id } = data;
  let error = "";

  if (typeof id !== "undefined" && !Number.isInteger(id)) {
    return (error = { message: "id is invalid/missing!" });
  }

  if (typeof number !== "undefined" && !Number.isInteger(number)) {
    return (error = { message: "number is invalid/missing!" });
  }

  if (typeof pos_id !== "undefined" && !Number.isInteger(pos_id)) {
    return (error = { message: "pos_id is invalid/missing!" });
  }

  if (
    typeof application_id !== "undefined" &&
    !Number.isInteger(application_id)
  ) {
    return (error = { message: "application_id is invalid/missing!" });
  }
};

// create (this is a POST method)
const createProgramChoice = (data, callBack) => {
  if (!data.application_id || !data.pos_id) {
    return callBack({ message: "incomplete params" });
  }

  //validate the data
  const validate = validation(data);
  if (typeof validate === "object" && validate !== null) {
    return callBack(validate);
  }

  //insert into the database
  pool.query(
    `insert into program_choices(number, pos_id, application_id, created, modified)
        values(?,?,?,?,?)`,
    [
      data.number || 1,
      data.pos_id,
      data.application_id,
      dateFormat(new Date(), "yyyy-mm-dd h:MM:ss"),
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

// findprogram_choices (this is a GET request)
const findProgramChoices = (callBack) => {
  //query the database
  pool.query(`select * from program_choices`, [], (error, results, fields) => {
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
    `select * from program_choices where id = ?`,
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
    `delete from program_choices where id = ?`,
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

const updateProgramChoice = (data, callBack) => {
  if (!data.application_id || !data.pos_id || !data.id) {
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
    `update program_choices set ${query} modified=? where id=?`,
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

module.exports = {
  create: createProgramChoice,
  findAll: findProgramChoices,
  update: updateProgramChoice,
  findOne: findOne,
  deleteOne: deleteOne,
};
