"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityCodeController = void 0;
const activitycode_1 = __importDefault(require("../models/activitycode"));
class ActivityCodeController {
    constructor() {
        this.getCodes = (req, res) => {
            activitycode_1.default.find({}, (err, codes) => {
                if (err)
                    console.log("GRESKA");
                else {
                    res.json(codes);
                }
            });
        };
    }
}
exports.ActivityCodeController = ActivityCodeController;
//# sourceMappingURL=activitycode.controller.js.map