"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Warehouse = new Schema({
    idW: {
        username: String,
        idWare: String
    },
    name: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Warehouse', Warehouse, 'warehouses');
//# sourceMappingURL=warehouse.js.map