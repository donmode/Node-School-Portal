const {
  viewList,
  create,
  update,
  findAll,
  findOne,
  deleteOne,
} = require("./Applications.Model");
const { SendMail } = require("../../Mailer");
const {
  findOne: findOneSchoolProgram,
} = require("../SchoolPrograms/SchoolPrograms.Model");
const {
  create: createProgramChoice,
} = require("../ProgramChoices/ProgramChoices.Model");
const {
  viewByName: viewApplicationSettingsByName,
} = require("../ApplicationSettings/ApplicationSettings.Model");

const { findByName: findRoleByName } = require("../Roles/Roles.Model");

const {
  create: applicantCreateUser,
  deleteOne: applicantDeleteUser,
} = require("../Users/Users.Model");

const viewApplicationsList = (req, res) => {
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

const createUser = (id, email) => {
  return new Promise((resolve, reject) => {
    //create user
    findRoleByName({ name: "Applicant" }, (errRole, resultRole) => {
      if (errRole) {
        console.log("errRole::::: ", errRole);
        reject({ error: errRole });
      } else {
        const role_id = resultRole[0].id;
        const group_id = resultRole[0].group_id;
        const now = new Date().getTime();
        const password = `${id}${now}`;
        viewApplicationSettingsByName({ name: "school_suffix" }, (err, res) => {
          if (err) {
            console.log(err);
            reject({ error: err });
          } else {
            const applicationNumber = `${res[0].value}${password}`;
            applicantCreateUser(
              {
                group_id: group_id,
                role_id: role_id,
                username: applicationNumber,
                email: email,
                password: password,
              },
              (err, res) => {
                if (err) {
                  reject({ error: err });
                } else {
                  resolve({
                    user_id: res.data.id,
                    username: applicationNumber,
                    password: password,
                  });
                }
              }
            );
          }
        });
      }
    });
  });
};

const processApplicationCreation = (data, pos) => {
  //create applicants record
  return new Promise((resolve, reject) => {
    create(data, (err, result) => {
      if (err) {
        console.log("create err::::: ", err);
        reject({ error: err });
      } else {
        //save program choice
        const application_id = result.data.id;
        let initialCounter = 0;
        pos.map((value, index) => {
          const schoolProgramData = {
            number: index + 1,
            pos_id: Number(value),
            application_id: application_id,
          };
          createProgramChoice(schoolProgramData, (err, result) => {
            if (err) {
              console.log(err);
              reject({
                error:
                  "System Error!!  Unable to process application creation completely",
                application_id: application_id,
              });
            } else {
              initialCounter++;

              if (initialCounter === pos.length) {
                resolve({
                  length: initialCounter,
                  application_id: application_id,
                  email: data.email,
                });
              }
            }
          });
        });
      }
    });
  });
};

const createApplication = (req, res) => {
  let data = req.body;

  // get application_type_id
  findOneSchoolProgram(data.school_program_id, (err, result) => {
    if (err) {
      return res.status(500).send({
        success: false,
        message: "System Error!!  Unable to store application",
      });
    } else {
      if (!result.success) {
        return res.send({
          success: false,
          message: "Unable to process application",
        });
      }
      data.application_type_id = result.results[0].application_type_id;

      //destructure pos from data to be  passed down and delete
      const { pos } = data;
      delete data.pos;

      processApplicationCreation(data, pos)
        .then((creationResult) => {
          if (creationResult.length === pos.length) {
            createUser(creationResult.application_id, creationResult.email)
              .then((userResult) => {
                update(
                  {
                    id: creationResult.application_id,
                    user_id: userResult.user_id,
                    application_number: userResult.username,
                    application_status: 1,
                  },
                  (error, result) => {
                    if (error) {
                      console.log(error);
                      applicantDeleteUser(
                        { id: userResult.user_id },
                        (error, result) => {
                          if (error) {
                            return res.status(500).send({
                              success: false,
                              message:
                                "System Error!!  Unable to process application, kindly contact the school administrators",
                            });
                          } else {
                            deleteOne(
                              { id: creationResult.application_id },
                              (error, result) => {
                                if (error) {
                                  return res.status(500).send({
                                    success: false,
                                    message:
                                      "System Error!!  Unable to process application, kindly contact the school administrators",
                                  });
                                } else {
                                  return res.send({
                                    success: false,
                                    message:
                                      "System Error!! Unable to process application",
                                  });
                                }
                              }
                            );
                          }
                        }
                      );
                    } else {
                      //send mail
                      return SendMail(
                        data.email,
                        "Application Created Successfully",
                        getMailContent(userResult.username, userResult.password)
                      )
                        .then((result) => {
                          return res.status(200).send({
                            success: true,
                            payload: result,
                          });
                        })
                        .catch((err) => {
                          console.log(err);
                          return res.status(500).send({
                            success: true,
                            message:
                              "Application created successfully, email notification failed, kindly contact Support",
                          });
                        });
                    }
                  }
                );
                // user_id
                //   username
                //     password

                //                   $applicationDetails['application_number'] = $application_number;
                //                   $applicationDetails['user_id'] = $createUser -> id;
                //                   $applicationDetails['application_status'] = 1; //sets application status to 1,

                //                   $application = $this -> Applications -> updateApplicationDetails($application, $applicationDetails);

                //                   $school = $this -> Settings -> getSchoolName();

                //                   $mail_data['first_name'] = $application -> first_name;
                //                   $mail_data['application_number'] = $application -> application_number;
                //                   $mail_data['application_password'] = $application_password;
                //                   $mail_data['url'] = $url;
                //                   $mail_data['school'] = $school;
                //                   $subject = strtoupper($school). " APPLICATION LOGIN DETAILS";
                //                   $email_address = trim($application -> email);

                //                   $this -> request -> session() -> write('mailContent', [
                //                     "mail_data" => $mail_data, "email_address" => $email_address, "subject" => $subject
                //                 ]);

                //                  $sendMail = $this -> sendMail();
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => {
          if (err.application_id !== undefined) {
            deleteOne({ id: err.application_id }, (error, result) => {
              if (error) {
                return res.status(500).send({
                  success: false,
                  message:
                    "System Error!!  Unable to process application, kindly contact the school administrators",
                });
              } else {
                return res.send({
                  success: false,
                  message: err.error,
                });
              }
            });
          } else {
            console.log(err);
            return res.send({
              success: false,
              message: err.error,
            });
          }
        });

      //update applications record
      //send mail

      // return res.status(200).send({
      //   success: true,
      //   payload: result,
      // });
    }
  });
};
const getMailContent = (username, password) => {
  return `<div>
            <h2> Hello, </h2>
            <p>Sequel to your recent application, a user's record have been created for you. kindly enter the following credentials to access the portal<br><br>
            <span>Username: ${username}</span>
            <br>
            <span>Password: ${password}</span>
            <br><br>
            Thanks and regards.
            </p>
          </div>`;
};
const updateApplication = (req, res) => {
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

const findApplications = (req, res) => {
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

const findApplication = (req, res) => {
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

const deleteApplication = (req, res) => {
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
  viewApplicationsList: viewApplicationsList,
  createApplication: createApplication,
  findApplications: findApplications,
  findApplication: findApplication,
  updateApplication: updateApplication,
  deleteApplication: deleteApplication,
};
