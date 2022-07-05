"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const company_controller_1 = require("../controllers/company.controller");
const companiesRouter = express_1.default.Router();
companiesRouter.route('/getFalseStatusCompanies').get((req, res) => new company_controller_1.CompanyController().getFalseStatusCompanies(req, res));
companiesRouter.route('/accept').post((req, res) => new company_controller_1.CompanyController().accept(req, res));
companiesRouter.route('/decline').post((req, res) => new company_controller_1.CompanyController().decline(req, res));
companiesRouter.route('/getCompany').post((req, res) => new company_controller_1.CompanyController().getCompany(req, res));
companiesRouter.route('/getWarehouses').post((req, res) => new company_controller_1.CompanyController().getWarehouses(req, res));
companiesRouter.route('/addOrderer').post((req, res) => new company_controller_1.CompanyController().addOrderer(req, res));
companiesRouter.route('/searchByPIB').post((req, res) => new company_controller_1.CompanyController().searchByPIB(req, res));
companiesRouter.route('/getOrderers').post((req, res) => new company_controller_1.CompanyController().getOrderers(req, res));
companiesRouter.route('/addExistingCompanyToOrderers').post((req, res) => new company_controller_1.CompanyController().addExistingCompanyToOrderers(req, res));
exports.default = companiesRouter;
//# sourceMappingURL=company.routes.js.map