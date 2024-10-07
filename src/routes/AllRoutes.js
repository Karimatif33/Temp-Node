const express = require("express");
const authenticateToken = require('../middleware/IsAuth');
const isAdmin = require('../middleware/IsAdmin');

const { fetshingAcadYearData } = require("../controller/AcadYearDataCtr");
const { AuthReq } = require("../controller/AuthReq");

const AllRoutes = express.Router();




AllRoutes.post("/auth", AuthReq);

AllRoutes.get("/acad-year", fetshingAcadYearData);


module.exports = AllRoutes;
