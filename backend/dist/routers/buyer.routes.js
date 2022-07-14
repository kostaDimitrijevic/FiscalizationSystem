"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const buyer_controller_1 = require("../controllers/buyer.controller");
const buyerRouter = express_1.default.Router();
buyerRouter.route('/addBillByID').post((req, res) => new buyer_controller_1.BuyerController().addBillByID(req, res));
buyerRouter.route('/getBuyer').post((req, res) => new buyer_controller_1.BuyerController().getBuyer(req, res));
buyerRouter.route('/addNewBuyer').post((req, res) => new buyer_controller_1.BuyerController().addNewBuyer(req, res));
buyerRouter.route('/changePassword').post((req, res) => new buyer_controller_1.BuyerController().changePassword(req, res));
exports.default = buyerRouter;
//# sourceMappingURL=buyer.routes.js.map