"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyController = void 0;
const warehouse_1 = __importDefault(require("../models/warehouse"));
const company_1 = __importDefault(require("../models/company"));
const user_1 = __importDefault(require("../models/user"));
const category_1 = __importDefault(require("../models/category"));
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
        this.getCashRegisters = (req, res) => {
            company_1.default.findOne({ 'username': req.body.username }, (err, comp) => {
                if (err)
                    console.log(err);
                else {
                    res.json(comp.cashRegisters);
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
        this.getCompanyLogo = (req, res) => {
            company_1.default.findOne({ 'username': req.body.username }, (err, comp) => {
                if (err)
                    console.log(err);
                else {
                    const fs = require('fs');
                    res.json(fs.readFileSync(comp.get('companyLogoPath'), { encoding: 'utf8' }));
                }
            });
        };
        this.addCategory = (req, res) => {
            category_1.default.findOne({ 'company': req.body.company, 'category': req.body.name }, (err, cat) => {
                if (cat)
                    console.log("Kategorija sa tim nazivom vec postoji");
                else {
                    let newCat = new category_1.default({ company: req.body.company, category: req.body.name });
                    newCat.save().then(category => {
                        res.status(200).json({ 'message': 'category added' });
                    }).catch(error => {
                        res.status(400).json({ 'message': 'error' });
                    });
                }
            });
        };
        this.addSubcategory = (req, res) => {
            console.log(req.body.company);
            category_1.default.findOne({ 'company': req.body.company, 'category': req.body.name }, (err, cat) => {
                let error = false;
                cat.subcategories.forEach(subCat => {
                    if (subCat == req.body.subcategory) {
                        error = true;
                    }
                });
                if (error) {
                    res.status(200).json({ 'message': 'postoji' });
                }
                else {
                    category_1.default.findOneAndUpdate({ 'company': req.body.company, 'category': req.body.name }, { $push: { 'subcategories': req.body.subcategory } }, (err, cat) => {
                        if (err) {
                            console.log(err);
                            res.status(400).json({ 'message': 'error' });
                        }
                        else {
                            res.status(200).json({ 'message': 'Subcategory added' });
                        }
                    });
                }
            });
        };
        this.getAllCategories = (req, res) => {
            category_1.default.find({ 'company': req.body.company }, (err, cat) => {
                if (err)
                    console.log(err);
                else {
                    res.json(cat);
                }
            });
        };
        this.addDepartment = (req, res) => {
            company_1.default.updateOne({ 'username': req.body.username }, { $push: { 'departments': req.body.department } }, (err) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ 'message': 'error' });
                }
                else {
                    res.status(200).json({ 'message': 'department added' });
                }
            });
        };
        this.updateDepartment = (req, res) => {
            company_1.default.findOne({ 'username': req.body.username }, (err, comp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ 'message': 'error' });
                }
                else {
                    comp.departments.forEach((department, index) => {
                        if (department.departmentName == req.body.departmentName) {
                            comp.departments.splice(index, 1);
                        }
                    });
                    comp.departments.push(req.body.department);
                    company_1.default.findOneAndUpdate({ 'username': req.body.username }, { $set: { 'departments': comp.departments } }, (err, compa) => {
                        if (err) {
                            console.log(err);
                            res.status(400).json({ 'message': 'error' });
                        }
                        else {
                            res.status(200).json({ 'message': 'department added' });
                        }
                    });
                }
            });
        };
        this.addBill = (req, res) => {
            company_1.default.findOneAndUpdate({ 'username': req.body.username }, { $push: { 'bills': req.body.bill } }, (err, comp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ 'message': 'error' });
                }
                else {
                    if (comp.dailyReports.length > 0) {
                        let found = false;
                        comp.dailyReports.forEach(report => {
                            if (report.date == req.body.bill.date) {
                                found = true;
                                report.totalAmount += req.body.bill.realPrice;
                                report.totalAmountPDV += req.body.bill.priceWithPDV;
                                company_1.default.updateOne({ 'username': req.body.username, 'dailyReports.date': req.body.bill.date }, { $set: { 'dailyReports.totalAmount': report.totalAmount, 'dailyReports.totalAmountPDV': report.totalAmountPDV } }, (err) => {
                                    if (err) {
                                        console.log(err);
                                        res.status(400).json({ 'message': 'error' });
                                    }
                                });
                            }
                        });
                        if (!found) {
                            company_1.default.updateOne({ 'username': req.body.username }, { $set: { 'dailyReports.date': req.body.bill.date, 'dailyReports.totalAmount': req.body.bill.realPrice, 'dailyReports.totalAmountPDV': req.body.bill.priceWithPDV } }, (err) => {
                                if (err) {
                                    console.log(err);
                                    res.status(400).json({ 'message': 'error' });
                                }
                            });
                        }
                    }
                    else {
                        company_1.default.updateOne({ 'username': req.body.username }, { $set: { 'dailyReports.date': req.body.bill.date, 'dailyReports.totalAmount': req.body.bill.realPrice, 'dailyReports.totalAmountPDV': req.body.bill.priceWithPDV } }, (err) => {
                            if (err) {
                                console.log(err);
                                res.status(400).json({ 'message': 'error' });
                            }
                        });
                    }
                    res.status(200).json({ 'message': 'bill added' });
                }
            });
        };
        this.getBills = (req, res) => {
            company_1.default.findOne({ 'username': req.body.username }, (err, comp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(comp.bills);
                }
            });
        };
        this.getDailyReports = (req, res) => {
            company_1.default.findOne({ 'username': req.body.username }, (err, comp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(comp.dailyReports);
                }
            });
        };
    }
}
exports.CompanyController = CompanyController;
//# sourceMappingURL=company.controller.js.map