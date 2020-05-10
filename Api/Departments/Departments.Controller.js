const {
  viewList,
  viewByFaculty,
  create,
  update,
  findAll,
  findOne,
  deleteOne,
} = require("./Departments.Model");

const viewDepartmentsByFaculty = (req, res) => {
  const data = { faculty_id: Number(req.query.faculty_id) };

  viewByFaculty(data, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        error: true,
        message: "internal error",
      });
    }
    return res.status(200).send({
      success: true,
      payload: result,
    });
  });
};

const viewDepartmentsList = (req, res) => {
  viewList((err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        error: true,
        message: "internal error",
      });
    }
    return res.status(200).send({
      success: true,
      payload: result,
    });
  });
};
const createDepartment = (req, res) => {
  const data = req.body;
  create(data, (err, result) => {
    if (err) {
      return res.status(500).send({
        success: false,
        message: err.message,
      });
    }
    return res.status(200).send({
      success: true,
      payload: result,
    });
  });
};

const updateDepartment = (req, res) => {
  const data = req.body;
  update(data, (err, result) => {
    if (err) {
      return res.status(500).send({
        success: false,
        message: err.message,
      });
    }
    return res.status(200).send({
      success: true,
      payload: result,
    });
  });
};

const findDepartments = (req, res) => {
  findAll((err, result) => {
    if (err) {
      return res.status(500).send({
        success: false,
        message: err.message,
      });
    }
    return res.status(200).send({
      success: true,
      payload: result,
    });
  });
};

const findDepartment = (req, res) => {
  const id = Number(req.query.id);
  findOne(id, (err, result) => {
    if (err) {
      return res.status(500).send({
        success: false,
        message: err.message,
      });
    }
    return res.status(200).send({
      success: true,
      payload: result,
    });
  });
};

const deleteDepartment = (req, res) => {
  const data = req.body;
  deleteOne(data, (err, result) => {
    if (err) {
      return res.status(500).send({
        success: false,
        message: err.message,
      });
    }
    return res.status(200).send({
      success: true,
      payload: result,
    });
  });
};

module.exports = {
  viewDepartmentsList: viewDepartmentsList,
  viewDepartmentsByFaculty: viewDepartmentsByFaculty,
  createDepartment: createDepartment,
  findDepartments: findDepartments,
  findDepartment: findDepartment,
  updateDepartment: updateDepartment,
  deleteDepartment: deleteDepartment,
};
