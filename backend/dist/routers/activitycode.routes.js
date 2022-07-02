"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const activitycode_controller_1 = require("../controllers/activitycode.controller");
const activityRouter = express_1.default.Router();
activityRouter.route('/getCodes').get((req, res) => new activitycode_controller_1.ActivityCodeController().getCodes(req, res));
exports.default = activityRouter;
//# sourceMappingURL=activitycode.routes.js.map