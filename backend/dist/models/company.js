"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Company = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    email: {
        type: String
    },
    companyName: {
        type: String
    },
    country: {
        type: String
    },
    city: {
        type: String
    },
    zipCode: {
        type: String
    },
    street: {
        type: String
    },
    PIB: {
        type: String
    },
    registrationNumber: {
        type: Number
    },
    status: {
        type: Boolean
    }
});
exports.default = mongoose_1.default.model('Company', Company, 'companies');
//# sourceMappingURL=company.js.map