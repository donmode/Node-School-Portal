const pool = require("../../config/database");
const dateFormat = require("dateformat");

const validation = (data) => {
  const { id, application_type_id, school_program, code } = data;
  let error = "";
  if (typeof school_program !== "undefined" && !school_program) {
    if (school_program.length > 50) {
      return (error = {
        message: "school_program has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "school_program is required!" });
  }

  if (typeof code !== "undefined" && !code) {
    if (code.length > 50) {
      return (error = {
        message: "code has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "code is required!" });
  }

  if (typeof id !== "undefined" && !Number.isInteger(id)) {
    return (error = { message: "id is invalid/missing!" });
  }

  if (
    typeof application_type_id !== "undefined" &&
    !Number.isInteger(application_type_id)
  ) {
    return (error = { message: "application_type_id is invalid/missing!" });
  }
};

// create (this is a POST method)
const createSchoolProgram = (data, callBack) => {
  if (!data.school_program || !data.code || !data.application_type_id) {
    return callBack({ message: "incomplete params" });
  }

  //validate the data
  const validate = validation(data);
  if (typeof validate === "object" && validate !== null) {
    return callBack(validate);
  }

  //insert into the database
  pool.query(
    `insert into school_programs(school_program, code, application_type_id, created)
        values(?,?,?,?)`,
    [
      data.school_program,
      data.code,
      data.application_type_id,
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

// findSchoolPrograms (this is a GET request)
const findSchoolPrograms = (callBack) => {
  //query the database
  pool.query(`select * from school_programs`, [], (error, results, fields) => {
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
    `select * from school_programs where id = ?`,
    [data.id],
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      if (results.length < 1) {
        return callBack({ success: false, message: "Record not found!" });
      } else {
        return callBack(null, { success: true, results });
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
    `delete from school_programs where id = ?`,
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

const updateSchoolProgram = (data, callBack) => {
  if (!data.school_program || !data.code || !data.application_type_id) {
    return callBack({ message: "incomplete params" });
  }

  //validate the data
  const validate = validation(data);
  if (typeof validate === "object" && validate !== null) {
    return callBack(validate);
  }

  //insert into the database
  pool.query(
    `update school_programs set school_program=?, code=?, application_type_id=?, modified=? where id=?`,
    [
      data.school_programs,
      data.code,
      data.application_type_id,
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
    `select id, school_program from school_programs`,
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
  create: createSchoolProgram,
  findAll: findSchoolPrograms,
  update: updateSchoolProgram,
  findOne: findOne,
  deleteOne: deleteOne,
  viewList: viewList,
};
