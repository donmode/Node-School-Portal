const pool = require("../../config/database");
const dateFormat = require("dateformat");

const validation = (data) => {
  const {
    id,
    department_name,
    department_description,
    department_code,
    date_founded,
    faculty_id,
    mat_code,
  } = data;
  let error = "";

  if (typeof id !== "undefined" && !Number.isInteger(id)) {
    return (error = { message: "id is invalid/missing!" });
  }

  if (typeof faculty_id !== "undefined" && !Number.isInteger(faculty_id)) {
    return (error = { message: "faculty_id is invalid/missing!" });
  }

  if (
    typeof department_description !== "undefined" &&
    !department_description
  ) {
    if (department_description.length > 500) {
      return (error = {
        message:
          "department_description has exceeded maximum character length of 500!",
      });
    }
    return (error = { message: "department_description is required!" });
  }

  if (typeof department_code !== "undefined" && !department_code) {
    if (department_code.length > 50) {
      return (error = {
        message: "department_code has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "department_code is required!" });
  }

  if (typeof mat_code !== "undefined" && !mat_code) {
    if (mat_code.length > 50) {
      return (error = {
        message: "mat_code has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "mat_code is required!" });
  }

  if (typeof department_name !== "undefined" && !department_name) {
    if (department_name.length > 50) {
      return (error = {
        message: "department_name has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "department_name is required!" });
  }

  if (
    typeof date_founded !== "undefined" &&
    !dateFormat(date_founded, "yyyy-mm-dd")
  ) {
    return (error = { message: "date_founded is invalid/missing!" });
  }
};

// create (this is a POST method)
const createDepartment = (data, callBack) => {
  if (!data.department_name && !data.department_code && !data.faculty_id) {
    return callBack({ message: "incomplete params" });
  }

  //validate the data
  const validate = validation(data);
  if (typeof validate === "object" && validate !== null) {
    return callBack(validate);
  }

  //insert into the database
  pool.query(
    `insert into departments(department_name, department_code, mat_code, department_description, date_founded, faculty_id, created)
        values(?,?,?,?,?,?,?)`,
    [
      data.department_name,
      data.department_code,
      data.mat_code,
      data.department_description || "",
      data.date_founded || "",
      data.faculty_id,
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
const findDepartments = (callBack) => {
  //query the database
  pool.query(`select * from departments`, [], (error, results, fields) => {
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
    `select * from departments where id = ?`,
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
    `delete from departments where id = ?`,
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

const updateDepartment = (data, callBack) => {
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
    `update departments set ${query} modified=? where id=?`,
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
    `select id, department_name from departments`,
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

const viewByFaculty = (data, callBack) => {
  //validate the data
  const validate = validation(data);
  if (typeof validate === "object" && validate !== null) {
    return callBack(validate);
  }

  pool.query(
    `select id, department_name from departments where faculty_id=?`,
    [data.faculty_id],
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
  create: createDepartment,
  findAll: findDepartments,
  viewList: viewList,
  viewByFaculty: viewByFaculty,
  update: updateDepartment,
  findOne: findOne,
  deleteOne: deleteOne,
};
