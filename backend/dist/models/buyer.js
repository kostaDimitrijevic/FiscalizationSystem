"use strict";
// export class Buyer{
//     username: String
//     password: String
//     firstname: String
//     lastname: String
//     phoneNumber: String
//     IDNumber: String
// }
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Buyer = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    IDNumber: {
        type: String
    },
    bills: [{
            company: {
                type: String
            },
            object: {
                type: String
            },
            price: {
                type: Number
            },
            paymentMethod: {
                type: String
            }
        }]
});
exports.default = mongoose_1.default.model('Buyer', Buyer, 'buyers');
//# sourceMappingURL=buyer.js.map