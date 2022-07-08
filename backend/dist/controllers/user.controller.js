"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const company_1 = __importDefault(require("../models/company"));
const user_1 = __importDefault(require("../models/user"));
const warehouse_1 = __importDefault(require("../models/warehouse"));
class UserController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.registerCompany = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            const fs = require('fs');
            if (!fs.existsSync('./companyLogos')) {
                fs.mkdirSync('./companyLogos');
            }
            fs.writeFileSync('companyLogos\\' + req.body.username, req.body.companyLogo);
            user_1.default.findOne({ 'username': username, 'type': "company" }, (err, user) => {
                if (user)
                    console.log("User with that username allready exists");
                else {
                    let newCompany = new company_1.default({ firstname: req.body.firstname, lastname: req.body.lastname,
                        username: req.body.username, password: req.body.password, companyName: req.body.companyName, email: req.body.email,
                        country: req.body.country, zipCode: req.body.zipCode, PIB: req.body.PIB, registrationNumber: req.body.registrationNumber,
                        street: req.body.street, phone: req.body.phoneNumber, city: req.body.city, status: req.body.status, infoAddedStatus: false, companyLogoPath: 'companyLogos/' + req.body.username });
                    newCompany.save().then(com => {
                        let newUser = new user_1.default({ username: username, password: password, type: "company" });
                        newUser.save();
                        res.status(200).json({ 'message': 'company added' });
                    }).catch(err => {
                        res.status(400).json({ 'message': 'error' });
                    });
                }
            });
        };
        this.addInfo = (req, res) => {
            let username = req.body.username;
            console.log(req.body.warehouses[0]);
            let warehouses = req.body.warehouses;
            let i = 0;
            warehouses.forEach(warehouse => {
                let toSave = new warehouse_1.default({ idW: { username: username, idWare: i }, name: warehouse.name });
                toSave.save();
                i = i + 1;
            });
            company_1.default.findOneAndUpdate({ 'username': username }, { 'category': req.body.category, 'activityCodes': req.body.activityCodes, 'isPDV': req.body.isPDV,
                'banks': req.body.banks, 'numberOfWarehouses': req.body.numberOfWarehouses, 'warehouses': req.body.warehouses, 'numberOfRegisters': req.body.numberOfRegisters,
                'cashRegisters': req.body.cashRegisters, infoAddedStatus: true }, (error, company) => {
                if (error)
                    console.log(error);
                else {
                    if (company.banks.length > 0) {
                        res.status(200).json({ 'message': 'uspesno' });
                    }
                    else {
                        res.status(400).json({ 'message': 'neuspesno' });
                    }
                }
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map