const {
  viewList,
  create,
  update,
  findAll,
  findOne,
  deleteOne,
  viewListBySchool,
} = require("./ModeOfAdmissions.Model");

const viewModeOfAdmissionList = (req, res) => {
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

const viewModeOfAdmissionListBySchool = (req, res) => {
  const data = { school_program_id: Number(req.query.school_program_id) };
  viewListBySchool(data, (err, result) => {
    if (err) {
      return res.status(500).send({
        error: true,
        payload: err,
      });
    }
    return res.status(200).send({
      success: true,
      payload: result,
    });
  });
};

const createModeOfAdmission = (req, res) => {
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

const updateModeOfAdmission = (req, res) => {
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

const findModeOfAdmissions = (req, res) => {
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

const findModeOfAdmission = (req, res) => {
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

const deleteModeOfAdmission = (req, res) => {
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
  createModeOfAdmission: createModeOfAdmission,
  findModeOfAdmissions: findModeOfAdmissions,
  findModeOfAdmission: findModeOfAdmission,
  updateModeOfAdmission: updateModeOfAdmission,
  deleteModeOfAdmission: deleteModeOfAdmission,
  viewModeOfAdmissionList: viewModeOfAdmissionList,
  viewModeOfAdmissionListBySchool: viewModeOfAdmissionListBySchool,
};
