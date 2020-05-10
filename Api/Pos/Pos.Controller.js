const {
  viewList,
  applicationViewBySchoolDepartment,
  create,
  update,
  findAll,
  findOne,
  deleteOne,
} = require("./Pos.Model");

const applicationViewPosBySchoolDepartment = (req, res) => {
  const data = {
    school_program_id: Number(req.query.school_program_id),
    department_id: Number(req.query.department_id),
  };

  applicationViewBySchoolDepartment(data, (err, result) => {
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

const viewPosList = (req, res) => {
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
const createPo = (req, res) => {
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

const updatePo = (req, res) => {
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

const findPos = (req, res) => {
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

const findPo = (req, res) => {
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

const deletePo = (req, res) => {
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
  viewPosList: viewPosList,
  applicationViewPosBySchoolDepartment: applicationViewPosBySchoolDepartment,
  createPo: createPo,
  findPos: findPos,
  findPo: findPo,
  updatePo: updatePo,
  deletePo: deletePo,
};
