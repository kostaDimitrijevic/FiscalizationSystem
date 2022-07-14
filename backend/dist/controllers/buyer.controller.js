"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyerController = void 0;
const buyer_1 = __importDefault(require("../models/buyer"));
const user_1 = __importDefault(require("../models/user"));
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
                    res.json(buyer);
                }
            });
        };
        this.addNewBuyer = (req, res) => {
            user_1.default.findOne({ 'username': req.body.username, 'type': "buyer" }, (err, user) => {
                if (user) {
                    console.log("User with that username allready exists");
                }
                else {
                    let newBuyer = new buyer_1.default({ username: req.body.username, password: req.body.password, firstname: req.body.firstname,
                        lastname: req.body.lastname, phoneNumber: req.body.phoneNumber, IDNumber: req.body.IDNumber, bills: req.body.bills });
                    newBuyer.save().then(com => {
                        let newUser = new user_1.default({ username: req.body.username, password: req.body.password, type: "buyer" });
                        newUser.save();
                        res.status(200).json({ 'message': 'buyer added' });
                    }).catch(err => {
                        res.status(400).json({ 'message': 'error' });
                    });
                }
            });
        };
        this.changePassword = (req, res) => {
            buyer_1.default.findOneAndUpdate({ 'username': req.body.username }, { $set: { 'password': req.body.password } }, (err, comp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ 'message': 'error' });
                }
                else {
                    user_1.default.findOneAndUpdate({ 'username': req.body.username }, { $set: { 'password': req.body.password } }, (err, comp) => {
                        if (err) {
                            console.log(err);
                            res.status(400).json({ 'message': 'error' });
                        }
                        else {
                            res.status(200).json({ 'message': 'password changed' });
                        }
                    });
                }
            });
        };
    }
}
exports.BuyerController = BuyerController;
//# sourceMappingURL=buyer.controller.js.map