"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyController = void 0;
const company_1 = __importDefault(require("../models/company"));
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
    }
}
exports.CompanyController = CompanyController;
//# sourceMappingURL=company.controller.js.map