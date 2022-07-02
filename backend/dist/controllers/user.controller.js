"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const company_1 = __importDefault(require("../models/company"));
const user_1 = __importDefault(require("../models/user"));
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
            console.log(username + "," + password);
            user_1.default.findOne({ 'username': username, 'type': "company" }, (err, user) => {
                if (user)
                    console.log("User with that username allready exists");
                else {
                    let newCompany = new company_1.default({ firstname: req.body.firstname, lastname: req.body.lastname,
                        username: req.body.username, password: req.body.password, companyName: req.body.companyName, email: req.body.email,
                        country: req.body.country, zipCode: req.body.zipCode, PIB: req.body.PIB, registrationNumber: req.body.registrationNumber,
                        street: req.body.street, phone: req.body.phoneNumber, city: req.body.city, status: req.body.status });
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
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map