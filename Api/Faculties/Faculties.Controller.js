const {
  viewList,
  create,
  update,
  findAll,
  findOne,
  deleteOne,
} = require("./Faculties.Model");

const viewFacultiesList = (req, res) => {
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
const createFaculty = (req, res) => {
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

const updateFaculty = (req, res) => {
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

const findFaculties = (req, res) => {
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

const findFaculty = (req, res) => {
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

const deleteFaculty = (req, res) => {
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
  viewFacultiesList: viewFacultiesList,
  createFaculty: createFaculty,
  findFaculties: findFaculties,
  findFaculty: findFaculty,
  updateFaculty: updateFaculty,
  deleteFaculty: deleteFaculty,
};
