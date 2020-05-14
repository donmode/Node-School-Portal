require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const passport = require("passport");
const validateUserToken = require("./Auth/user_token_validation");
const validateClientToken = require("./Auth/client_token_validation");

//configure passport

//ROUTERS

//open endpoints
const modeOfAdmissionsOpenRouter = require("./Api/ModeOfAdmissions/OpenRouters/ModeOfAdmissionsList.Router");
const facultiesOpenRouter = require("./Api/Faculties/OpenRouters/FacultiesList.Router");
const academicSessionsOpenRouter = require("./Api/AcademicSessions/OpenRouters/AcademicSessionsList.Router");
const schoolProgramsOpenRouter = require("./Api/SchoolPrograms/OpenRouters/SchoolProgramsList.Router");
const applicationSettingsOpenRouter = require("./Api/ApplicationSettings/OpenRouters/ApplicationSettings.Router");
const departmentsOpenRouter = require("./Api/Departments/OpenRouters/DepartmentsList.Router");
const applicationsListOpenRouter = require("./Api/Applications/OpenRouters/ApplicationsList.Router");
const applicationsOpenRouter = require("./Api/Applications/OpenRouters/Applications.Router");
const posOpenRouter = require("./Api/Pos/OpenRouters/PosList.Router");
const userOpenRouter = require("./Api/Users/OpenRouters/Users.Login.Router");

//closed endpoints
const schoolProgramsRouter = require("./Api/SchoolPrograms/SchoolPrograms.Router");
const modeOfAdmissionsRouter = require("./Api/ModeOfAdmissions/ModeOfAdmissions.Router");
const rolesRouter = require("./Api/Roles/Roles.Router");
const groupsRouter = require("./Api/Groups/Groups.Router");
const clientsRouter = require("./Api/Clients/Clients.Router");
const usersRouter = require("./Api/Users/Users.Router");

// const applicationsRouter = require("./Api/Applications/Applications.Router");

app.use(express.json());
app.use(cors()); //allow cors on all routes
app.use(passport.initialize());
app.use(passport.session());

//NOTE!!!!!
//define open endpoints first
app.use("/api/users/login", validateClientToken, userOpenRouter);
app.use(
  "/api/school_programs/list",
  validateClientToken,
  schoolProgramsOpenRouter
);

app.use("/api/faculties/list", validateClientToken, facultiesOpenRouter);

app.use(
  "/api/mode_of_admissions/list",
  validateClientToken,
  modeOfAdmissionsOpenRouter
);

app.use(
  "/api/applications/create",
  validateClientToken,
  applicationsOpenRouter
);

app.use(
  "/api/applications/list",
  validateClientToken,
  applicationsListOpenRouter
);

app.use(
  "/api/academic_sessions/list",
  validateClientToken,
  academicSessionsOpenRouter
);

app.use(
  "/api/application_settings/list",
  validateClientToken,
  applicationSettingsOpenRouter
);
app.use("/api/departments/list", validateClientToken, departmentsOpenRouter);
app.use("/api/pos/list", validateClientToken, posOpenRouter);

//register router (closed endpoints)
app.use("/api/school_programs", validateUserToken, schoolProgramsRouter);
app.use("/api/mode_of_admissions", validateUserToken, modeOfAdmissionsRouter);
app.use("/api/roles", validateUserToken, rolesRouter);
app.use("/api/groups", validateUserToken, groupsRouter);
app.use("/api/clients", validateUserToken, clientsRouter);
app.use("/api/users", validateUserToken, usersRouter);

// app.use("/api/applications", validateUserToken, applicationsRouter);

//listen to a port
app.listen(process.env.PORT, () => {
  console.log("Server up and running on port: ", process.env.PORT);
});
