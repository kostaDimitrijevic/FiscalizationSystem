"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyerController = void 0;
const buyer_1 = __importDefault(require("../models/buyer"));
class BuyerController {
    constructor() {
        this.addBillByID = (req, res) => {
            buyer_1.default.findOneAndUpdate({ 'IDNumber': req.body.IDNumber }, { $push: { 'bills': req.body.bill } }, (err, buyer) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ 'message': 'error' });
                }
                else {
                    res.status(200).json({ 'message': 'bill added' });
                }
            });
        };
        this.getBuyer = (req, res) => {
            buyer_1.default.findOne({ 'username': req.body.username }, (err, buyer) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ 'message': 'error' });
                }
                else {
                    console.log(buyer);
                    res.json(buyer);
                }
            });
        };
    }
}
exports.BuyerController = BuyerController;
//# sourceMappingURL=buyer.controller.js.map