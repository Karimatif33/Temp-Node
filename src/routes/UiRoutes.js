const express = require("express");
// const dataController = require('../controller/dataController');
const { uiTotalsDataController } = require("../controller/Ui-Api's/TotalData");

const UiRoutes = express.Router();

UiRoutes.get('/uiTotalsData/:code', uiTotalsDataController);



module.exports = UiRoutes;