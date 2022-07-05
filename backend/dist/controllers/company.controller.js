"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyController = void 0;
const warehouse_1 = __importDefault(require("../models/warehouse"));
const company_1 = __importDefault(require("../models/company"));
const user_1 = __importDefault(require("../models/user"));
class CompanyController {
    constructor() {
        this.getFalseStatusCompanies = (req, res) => {
            return company_1.default.find({ status: false }, (err, companies) => {
                if (err)
                    console.log(err);
                else
                    res.json(companies);
            });
        };
        this.accept = (req, res) => {
            company_1.default.findOneAndUpdate({ username: req.body.username }, { status: true }, (err, company) => {
                if (err)
                    console.log(err);
                else
                    res.json(company);
            });
        };
        this.decline = (req, res) => {
            company_1.default.findOneAndRemove({ username: req.body.username }, (err, company) => {
                if (err)
                    console.log(err);
                else
                    res.json(company);
            });
        };
        this.getCompany = (req, res) => {
            company_1.default.findOne({ 'username': req.body.username }, (err, com) => {
                if (err)
                    console.log(err);
                else {
                    res.json(com);
                }
            });
        };
        this.getWarehouses = (req, res) => {
            warehouse_1.default.find({ 'idW.username': req.body.username }, (err, ware) => {
                if (err)
                    console.log("error");
                else {
                    res.json(ware);
                }
            });
        };
        this.addOrderer = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username, 'type': "company" }, (err, user) => {
                if (user)
                    console.log("User with that username allready exists");
                else {
                    company_1.default.findOneAndUpdate({ 'username': req.body.companyUser }, { $push: { 'orderers': req.body.orderer } }, (err, comp) => {
                        if (err)
                            console.log(err);
                        else {
                            let newCompany = new company_1.default({ firstname: req.body.firstname, lastname: req.body.lastname,
                                username: req.body.username, password: req.body.password, companyName: req.body.companyName, email: req.body.email,
                                country: req.body.country, zipCode: req.body.zipCode, PIB: req.body.PIB, registrationNumber: req.body.registrationNumber,
                                street: req.body.street, phone: req.body.phoneNumber, city: req.body.city, status: true, infoAddedStatus: false });
                            newCompany.save().then(com => {
                                let newUser = new user_1.default({ username: username, password: password, type: "company" });
                                newUser.save();
                                res.status(200).json({ 'message': 'orderer added' });
                            }).catch(err => {
                                res.status(400).json({ 'message': 'error' });
                            });
                        }
                    });
                }
            });
        };
        this.searchByPIB = (req, res) => {
            company_1.default.findOne({ 'username': req.body.username }, (err, company) => {
                if (err)
                    console.log(err);
                else {
                    company_1.default.find({ 'PIB': req.body.PIB, $and: [{ 'username': { $ne: req.body.username } }, { 'username': { $nin: company.get('orderers.username') } }] }, (error, companies) => {
                        if (error)
                            console.log(error);
                        else {
                            res.json(companies);
                        }
                    });
                }
            });
        };
        this.getOrderers = (req, res) => {
            company_1.default.findOne({ 'username': req.body.username }, (err, comp) => {
                if (err)
                    console.log(err);
                else {
                    res.json(comp.get('orderers'));
                }
            });
        };
        this.addExistingCompanyToOrderers = (req, res) => {
            console.log("USAO");
            company_1.default.findOneAndUpdate({ 'username': req.body.companyUser }, { $push: { 'orderers': req.body.orderer } }, (err, comp) => {
                if (err) {
                    console.log("ERROR");
                    res.status(400).json({ 'message': 'error' });
                }
                else {
                    res.status(200).json({ 'message': 'uspesno' });
                }
            });
        };
    }
}
exports.CompanyController = CompanyController;
//# sourceMappingURL=company.controller.js.map