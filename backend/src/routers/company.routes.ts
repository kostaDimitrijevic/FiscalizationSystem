import express from 'express'
import { CompanyController } from '../controllers/company.controller';

const companiesRouter = express.Router();

companiesRouter.route('/getFalseStatusCompanies').get(
    (req,res) => new CompanyController().getFalseStatusCompanies(req,res)
)

companiesRouter.route('/accept').post(
    (req,res) => new CompanyController().accept(req,res)
)

companiesRouter.route('/decline').post(
    (req,res) => new CompanyController().decline(req,res)
)

companiesRouter.route('/getCompany').post(
    (req,res) => new CompanyController().getCompany(req, res)
)

companiesRouter.route('/getWarehouses').post(
    (req, res) => new CompanyController().getWarehouses(req, res)
)
companiesRouter.route('/addOrderer').post(
    (req, res) => new CompanyController().addOrderer(req, res)
)

companiesRouter.route('/searchByPIB').post(
    (req, res) => new CompanyController().searchByPIB(req, res)
)
companiesRouter.route('/getOrderers').post(
    (req, res) => new CompanyController().getOrderers(req, res)
)
companiesRouter.route('/addExistingCompanyToOrderers').post(
    (req, res) => new CompanyController().addExistingCompanyToOrderers(req, res)
)
export default companiesRouter;