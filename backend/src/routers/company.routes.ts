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

export default companiesRouter;