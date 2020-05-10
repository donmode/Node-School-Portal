const pool = require("../../config/database");
const dateFormat = require("dateformat");

const validation = (data) => {
  const {
    id,
    faculty_name,
    faculty_description,
    faculty_code,
    date_founded,
    campus_id,
    mat_code,
  } = data;
  let error = "";

  if (typeof id !== "undefined" && !Number.isInteger(id)) {
    return (error = { message: "id is invalid/missing!" });
  }

  if (typeof campus_id !== "undefined" && !Number.isInteger(campus_id)) {
    return (error = { message: "campus_id is invalid/missing!" });
  }

  if (typeof faculty_description !== "undefined" && !faculty_description) {
    if (faculty_description.length > 500) {
      return (error = {
        message:
          "faculty_description has exceeded maximum character length of 500!",
      });
    }
    return (error = { message: "faculty_description is required!" });
  }

  if (typeof faculty_code !== "undefined" && !faculty_code) {
    if (faculty_code.length > 50) {
      return (error = {
        message: "faculty_code has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "faculty_code is required!" });
  }

  if (typeof mat_code !== "undefined" && !mat_code) {
    if (mat_code.length > 50) {
      return (error = {
        message: "mat_code has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "mat_code is required!" });
  }

  if (typeof faculty_name !== "undefined" && !faculty_name) {
    if (faculty_name.length > 50) {
      return (error = {
        message: "faculty_name has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "faculty_name is required!" });
  }

  if (
    typeof date_founded !== "undefined" &&
    !dateFormat(date_founded, "yyyy-mm-dd")
  ) {
    return (error = { message: "date_founded is invalid/missing!" });
  }
};

// create (this is a POST method)
const createFaculty = (data, callBack) => {
  if (!data.faculty_name && !data.faculty_code && !data.campus_id) {
    return callBack({ message: "incomplete params" });
  }

  //validate the data
  const validate = validation(data);
  if (typeof validate === "object" && validate !== null) {
    return callBack(validate);
  }

  //insert into the database
  pool.query(
    `insert into faculties(faculty_name, faculty_code, mat_code, faculty_description, date_founded, campus_id, created)
        values(?,?,?,?,?,?,?)`,
    [
      data.faculty_name,
      data.faculty_code,
      data.mat_code || "",
      data.faculty_description || "",
      data.date_founded || "",
      data.campus_id,
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

// findFaculties (this is a GET request)
const findFaculties = (callBack) => {
  //query the database
  pool.query(`select * from faculties`, [], (error, results, fields) => {
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
    `select * from faculties where id = ?`,
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
    `delete from faculties where id = ?`,
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

const updateFaculty = (data, callBack) => {
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
    `update faculties set ${query} modified=? where id=?`,
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
    `select id, faculty_name from faculties`,
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
  create: createFaculty,
  findAll: findFaculties,
  viewList: viewList,
  update: updateFaculty,
  findOne: findOne,
  deleteOne: deleteOne,
};
