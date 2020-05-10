const pool = require("../../config/database");
const dateFormat = require("dateformat");

const validation = (data) => {
  const { id, school_program_id, mode_of_admission, active } = data;
  let error = "";
  if (typeof mode_of_admission !== "undefined" && !mode_of_admission) {
    if (mode_of_admission.length > 50) {
      return (error = {
        message:
          "mode_of_admission has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "mode_of_admission is required!" });
  }

  if (typeof active !== "undefined" && typeof active !== "boolean") {
    return (error = { message: "active is invalid/missing!" });
  }

  if (typeof id !== "undefined" && !Number.isInteger(id)) {
    return (error = { message: "id is invalid/missing!" });
  }

  if (
    typeof school_program_id !== "undefined" &&
    !Number.isInteger(school_program_id)
  ) {
    return (error = { message: "school_program_id is invalid/missing!" });
  }
};

// create (this is a POST method)
const createModeOfAdmission = (data, callBack) => {
  if (!data.mode_of_admission || !data.school_program_id) {
    return callBack({ message: "incomplete params" });
  }

  //validate the data
  const validate = validation(data);
  if (typeof validate === "object" && validate !== null) {
    return callBack(validate);
  }

  //insert into the database
  pool.query(
    `insert into mode_of_admissions(mode_of_admission, school_program_id, active,  created)
        values(?,?,?,?)`,
    [
      data.mode_of_admission,
      data.school_program_id,
      data.active || false,
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

// findModeOfAdmissions (this is a GET request)
const findModeOfAdmissions = (callBack) => {
  //query the database
  pool.query(
    `select * from mode_of_admissions`,
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
    `select * from mode_of_admissions where id = ?`,
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
  if (!data.id) {
    return callBack({ message: "incomplete params" });
  }

  //validate the data
  const validate = validation(data);
  if (typeof validate === "object" && validate !== null) {
    return callBack(validate);
  }

  //query the database
  pool.query(
    `delete from mode_of_admissions where id = ?`,
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

const updateModeOfAdmission = (data, callBack) => {
  if (!data.school_program_id || !data.mode_of_admission || !data.active) {
    return callBack({ message: "incomplete params" });
  }

  //validate the data
  const validate = validation(data);
  if (typeof validate === "object" && validate !== null) {
    return callBack(validate);
  }

  //insert into the database
  pool.query(
    `update mode_of_admissions set mode_of_admission=?, active=?, school_program_id=?, modified=? where id=?`,
    [
      data.mode_of_admission,
      data.active,
      data.school_program_id,
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
    `select id, mode_of_admission from mode_of_admissions`,
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

//this fateches only active ModeOfAdmission
const viewListBySchoolProgram = (data, callBack) => {
  if (!data.school_program_id) {
    return callBack({ message: "incomplete params" });
  }
  //validate the data
  const validate = validation(data);
  if (typeof validate === "object" && validate !== null) {
    return callBack(validate);
  }

  pool.query(
    `select id, mode_of_admission from mode_of_admissions where school_program_id=? and active=?`,
    [data.school_program_id, 1],
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
  create: createModeOfAdmission,
  findAll: findModeOfAdmissions,
  update: updateModeOfAdmission,
  findOne: findOne,
  deleteOne: deleteOne,
  viewList: viewList,
  viewListBySchool: viewListBySchoolProgram,
};
