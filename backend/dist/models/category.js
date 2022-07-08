"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Category = new Schema({
    company: {
        type: String
    },
    category: {
        type: String
    },
    subcategories: [{
            type: String
        }]
});
exports.default = mongoose_1.default.model('Category', Category, 'categories');
//# sourceMappingURL=category.js.map