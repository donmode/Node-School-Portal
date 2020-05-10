const pool = require("../../config/database");
const dateFormat = require("dateformat");

const validation = (data) => {
  const { id, name, start_date, end_date, active } = data;
  let error = "";
  if (typeof name !== "undefined" && !name) {
    if (name.length > 50) {
      return (error = {
        message: "name has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "name is required!" });
  }

  if (typeof active !== "undefined" && typeof active !== "boolean") {
    return (error = { message: "active is invalid/missing!" });
  }

  if (typeof id !== "undefined" && !Number.isInteger(id)) {
    return (error = { message: "id is invalid/missing!" });
  }

  if (
    typeof start_date !== "undefined" &&
    !dateFormat(start_date, "yyyy-mm-dd")
  ) {
    return (error = { message: "start_date is invalid/missing!" });
  }

  if (typeof end_date !== "undefined" && !dateFormat(end_date, "yyyy-mm-dd")) {
    return (error = { message: "end_date is invalid/missing!" });
  }
};

// create (this is a POST method)
const createAcademicSession = (data, callBack) => {
  if (!data.name || !data.start_date || !data.end_date || !data.active) {
    return callBack({ message: "incomplete params" });
  }
  //validate the data
  const validate = validation(data);
  if (typeof validate === "object" && validate !== null) {
    return callBack(validate);
  }
  //insert into the database
  pool.query(
    `insert into academic_sessions(name, start_date, end_date, active, created)
        values(?,?,?,?,?)`,
    [
      data.name,
      data.start_date,
      data.end_date,
      data.active,
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

// findAcademicSessions (this is a GET request)
const findAcademicSessions = (callBack) => {
  //query the database
  pool.query(
    `select * from academic_sessions`,
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
    `select * from academic_sessions where id = ?`,
    [data.id],
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      if (results.length < 1) {
        return callBack({ message: "Record not found!" });
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
    `delete from academic_sessions where id = ?`,
    [data.id],
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      if (results.affectedRows) {
        return callBack(null, { message: "Record deleted successfully!" });
      } else {
        return callBack({ message: "Record not found!" });
      }
    }
  );
};

const updateAcademicSession = (data, callBack) => {
  if (!data.name || !data.start_date || !data.end_date || !data.active) {
    return callBack({ message: "incomplete params" });
  }

  //validate the data
  const validate = validation(data);
  if (typeof validate === "object" && validate !== null) {
    return callBack(validate);
  }

  //insert into the database
  pool.query(
    `update academic_sessions set name=?, start_date=?, end_date=?, active=?, modified=? where id=?`,
    [
      data.name,
      data.start_date,
      data.end_date,
      data.active,
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
    `select id, name from academic_sessions order by name DESC`,
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
  create: createAcademicSession,
  findAll: findAcademicSessions,
  update: updateAcademicSession,
  findOne: findOne,
  deleteOne: deleteOne,
  viewList: viewList,
};
