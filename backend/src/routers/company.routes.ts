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
companiesRouter.route('/getCashRegisters').post(
    (req, res) => new CompanyController().getCashRegisters(req, res)
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

companiesRouter.route('/getCompanyLogo').post(
    (req, res) => new CompanyController().getCompanyLogo(req, res)
)
companiesRouter.route('/addCategory').post(
    (req, res) => new CompanyController().addCategory(req, res)
)
companiesRouter.route('/addSubcategory').post(
    (req, res) => new CompanyController().addSubcategory(req, res)
)
companiesRouter.route('/getAllCategories').post(
    (req, res) => new CompanyController().getAllCategories(req, res)
)
companiesRouter.route('/addDepartment').post(
    (req, res) => new CompanyController().addDepartment(req, res)
)
companiesRouter.route('/updateDepartment').post(
    (req, res) => new CompanyController().updateDepartment(req, res)
)
companiesRouter.route('/addBill').post(
    (req, res) => new CompanyController().addBill(req, res)
)
companiesRouter.route('/getBills').post(
    (req, res) => new CompanyController().getBills(req, res)
)
companiesRouter.route('/getDailyReports').post(
    (req, res) => new CompanyController().getDailyReports(req, res)
)
companiesRouter.route('/getCompanies').get(
    (req, res) => new CompanyController().getCompanies(req, res)
)
export default companiesRouter;