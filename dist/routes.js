"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsersController_1 = __importDefault(require("./controllers/UsersController"));
const ReportLiraaController_1 = __importDefault(require("./controllers/ReportLiraaController"));
const VisitController_1 = __importDefault(require("./controllers/VisitController"));
const LocationController_1 = __importDefault(require("./controllers/LocationController"));
const routes = (0, express_1.Router)();
const usersController = new UsersController_1.default();
const reportLiraaController = new ReportLiraaController_1.default();
const visitController = new VisitController_1.default();
const locationController = new LocationController_1.default();
routes.post('/user/register', usersController.store);
routes.post('/user/login', usersController.login);
routes.get('/locations', locationController.getLocations);
// routes.get( '/locations/getImv', locationController.getAllImv );
// routes.get('/locations/getMnc', locationController.getAllMnc )
routes.post('/reportlira/register', reportLiraaController.register);
routes.get('/reportlira', reportLiraaController.getReports);
routes.get('/reportlira/getImv', reportLiraaController.getAllImv);
routes.get('/reportlira/getMnc', reportLiraaController.getAllMnc);
routes.post('/visit/register', visitController.register);
routes.get('/visit', visitController.getVisits);
routes.get('/visit/getImv', visitController.getAllImv);
routes.get('/visit/getMnc', visitController.getAllMnc);
exports.default = routes;
//# sourceMappingURL=routes.js.map