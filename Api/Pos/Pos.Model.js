const pool = require("../../config/database");
const dateFormat = require("dateformat");

const validation = (data) => {
  const {
    id,
    pos_name,
    pos_description,
    pos_code,
    delivery_mode,
    department_id,
    school_program_id,
    start_level,
    end_level,
    max_pass,
    mat_code,
    max_load,
    promotion_credits,
    probation_credits,
    application,
    entrance_examination_date,
    capacity,
  } = data;
  let error = "";

  if (typeof id !== "undefined" && !Number.isInteger(id)) {
    return (error = { message: "id is invalid/missing!" });
  }

  if (
    typeof department_id !== "undefined" &&
    !Number.isInteger(department_id)
  ) {
    return (error = { message: "department_id is invalid/missing!" });
  }

  if (
    typeof school_program_id !== "undefined" &&
    !Number.isInteger(school_program_id)
  ) {
    return (error = { message: "school_program_id is invalid/missing!" });
  }

  if (typeof max_pass !== "undefined" && !Number.isInteger(max_pass)) {
    return (error = { message: "max_pass is invalid/missing!" });
  }

  if (typeof max_load !== "undefined" && !Number.isInteger(max_load)) {
    return (error = { message: "max_load is invalid/missing!" });
  }

  if (
    typeof probation_credits !== "undefined" &&
    !Number.isInteger(probation_credits)
  ) {
    return (error = { message: "probation_credits is invalid/missing!" });
  }

  if (
    typeof promotion_credits !== "undefined" &&
    !Number.isInteger(promotion_credits)
  ) {
    return (error = { message: "promotion_credits is invalid/missing!" });
  }

  if (typeof pos_description !== "undefined" && !pos_description) {
    if (pos_description.length > 255) {
      return (error = {
        message:
          "pos_description has exceeded maximum character length of 255!",
      });
    }
    return (error = { message: "pos_description is required!" });
  }

  if (typeof pos_code !== "undefined" && !pos_code) {
    if (pos_code.length > 50) {
      return (error = {
        message: "pos_code has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "pos_code is required!" });
  }

  if (typeof mat_code !== "undefined" && !mat_code) {
    if (mat_code.length > 50) {
      return (error = {
        message: "mat_code has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "mat_code is required!" });
  }

  if (typeof start_level !== "undefined" && !start_level) {
    if (start_level.length > 30) {
      return (error = {
        message: "start_level has exceeded maximum character length of 30!",
      });
    }
    return (error = { message: "start_level is required!" });
  }

  if (typeof end_level !== "undefined" && !end_level) {
    if (end_level.length > 30) {
      return (error = {
        message: "end_level has exceeded maximum character length of 30!",
      });
    }
    return (error = { message: "end_level is required!" });
  }

  if (typeof pos_name !== "undefined" && !pos_name) {
    if (pos_name.length > 255) {
      return (error = {
        message: "pos_name has exceeded maximum character length of 255!",
      });
    }
    return (error = { message: "pos_name is required!" });
  }

  if (typeof delivery_mode !== "undefined" && !delivery_mode) {
    if (delivery_mode.length > 50) {
      return (error = {
        message: "delivery_mode has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "delivery_mode is required!" });
  }

  if (typeof application !== "undefined" && typeof application !== "boolean") {
    return (error = { message: "application is invalid/missing!" });
  }

  if (typeof capacity !== "undefined" && !Number.isInteger(capacity)) {
    return (error = { message: "capacity is invalid/missing!" });
  }

  if (
    typeof entrance_examination_date !== "undefined" &&
    !dateFormat(entrance_examination_date, "yyyy-mm-dd")
  ) {
    return (error = {
      message: "entrance_examination_date is invalid/missing!",
    });
  }
};

// create (this is a POST method)
const createPo = (data, callBack) => {
  if (
    !data.pos_name &&
    !data.pos_code &&
    !data.school_program_id &&
    !data.department_id &&
    !application &&
    !data.start_level &&
    !data.end_level &&
    !data.mat_code &&
    !data.delivery_mode
  ) {
    return callBack({ message: "incomplete params" });
  }

  //validate the data
  const validate = validation(data);
  if (typeof validate === "object" && validate !== null) {
    return callBack(validate);
  }

  //insert into the database
  pool.query(
    `insert into pos(pos_name, pos_code, pos_description, application, school_program_id, department_id, start_level, end_level, 
      mat_code, delivery_mode, capacity, entrance_examination_date, probation_credits, promotion_credits, max_pass, 
      max_load, created)
        values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.pos_name,
      data.pos_code,
      data.pos_description || "",
      data.application,
      data.school_program_id,
      data.department_id,
      data.start_level,
      data.end_level,
      data.mat_code,
      data.delivery_mode,
      data.capacity || 0,
      data.entrance_examination_date || "",
      data.probation_credits || 0,
      data.promotion_credits || 0,
      data.max_pass || 0,
      data.max_load || 0,
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

// finddepartments (this is a GET request)
const findPos = (callBack) => {
  //query the database
  pool.query(`select * from pos`, [], (error, results, fields) => {
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
    `select * from pos where id = ?`,
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
    `delete from pos where id = ?`,
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

const updatePo = (data, callBack) => {
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
    `update pos set ${query} modified=? where id=?`,
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
  pool.query(
    `select id, pos_name , pos_code from pos`,
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

const applicationViewBySchoolDepartment = (data, callBack) => {
  if (!data.department_id || !data.school_program_id) {
    return callBack({ message: "incomplete params" });
  }
  //validate the data
  const validate = validation(data);
  if (typeof validate === "object" && validate !== null) {
    return callBack(validate);
  }

  pool.query(
    `select id, pos_name from pos where school_program_id=? and department_id=? and application=1`,
    [data.school_program_id, data.department_id],
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
  create: createPo,
  findAll: findPos,
  viewList: viewList,
  applicationViewBySchoolDepartment: applicationViewBySchoolDepartment,
  update: updatePo,
  findOne: findOne,
  deleteOne: deleteOne,
};
