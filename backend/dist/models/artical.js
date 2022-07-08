"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Artical = new Schema({
    company: {
        type: String
    },
    category: {
        name: String,
        isSub: String
    },
    articalCode: {
        type: String
    },
    articalName: {
        type: String
    },
    unit: {
        type: String
    },
    taxRate: {
        type: Number
    },
    type: {
        type: String
    },
    manufacturer: {
        type: String
    },
    country: {
        type: String
    },
    foreinName: {
        type: String
    },
    barcode: {
        type: String
    },
    customsTariff: {
        type: Number
    },
    ecoTax: {
        type: Boolean
    },
    exciseTax: {
        type: Boolean
    },
    minSupplies: {
        type: Number
    },
    maxSupplies: {
        type: Number
    },
    description: {
        type: String
    },
    decleration: {
        type: String
    },
    pricesAndState: [{
            warehouseRegisterName: String,
            purchasePrice: Number,
            sellingPrice: Number,
            currentStockStatus: Number,
            minAmount: Number,
            maxAmount: Number
        }]
});
exports.default = mongoose_1.default.model('Artical', Artical, 'articals');
//# sourceMappingURL=artical.js.map