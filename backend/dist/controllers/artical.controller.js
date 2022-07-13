"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticalController = void 0;
const artical_1 = __importDefault(require("../models/artical"));
class ArticalController {
    constructor() {
        this.addArticalBaseInfo = (req, res) => {
            artical_1.default.findOne({ 'articalCode': req.body.articalCode }, (err, ar) => {
                if (ar)
                    console.log("Artikal with that code allready exists!");
                else {
                    let artical = new artical_1.default({ 'company': req.body.company, 'articalCode': req.body.articalCode, 'articalName': req.body.articalName, 'taxRate': req.body.taxRate,
                        'unit': req.body.unit, 'type': req.body.type });
                    artical.save().then(art => {
                        res.status(200).json({ 'message': 'artical added' });
                    }).catch(err => {
                        res.status(400).json({ 'message': 'error' });
                    });
                }
            });
        };
        this.getArticals = (req, res) => {
            artical_1.default.find({ 'company': req.body.company }, (err, articals) => {
                if (err)
                    console.log(err);
                else {
                    res.json(articals);
                }
            });
        };
        this.getArtical = (req, res) => {
            artical_1.default.findOne({ 'articalCode': req.body.articalCode }, (err, artical) => {
                if (err)
                    console.log(err);
                else {
                    res.json(artical);
                }
            });
        };
        this.addArticalMoreInfo = (req, res) => {
            artical_1.default.findOneAndUpdate({ 'articalCode': req.body.articalCode }, { 'country': req.body.country, 'foreinName': req.body.foreinName, 'barcode': req.body.barcode,
                'manufacturer': req.body.manufacturer, 'customsTariff': req.body.customsTariff, 'ecoTax': req.body.ecoTax, 'exciseTax': req.body.exciseTax, 'minSupplies': req.body.minSupplies,
                'maxSupplies': req.body.maxSupplies, 'description': req.body.description, 'decleration': req.body.decleration }, (err, art) => {
                if (err) {
                    res.status(400).json({ 'message': 'error' });
                    console.log(err);
                }
                else {
                    res.status(200).json({ 'message': 'artical updated' });
                }
            });
        };
        this.removeArtical = (req, res) => {
            artical_1.default.findOneAndRemove({ 'articalCode': req.body.articalCode }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ 'message': 'error' });
                }
                else {
                    res.status(200).json({ 'message': 'artical removed' });
                }
            });
        };
        this.addArticalpricesAndStatus = (req, res) => {
            let toAdd = {
                warehouseRegisterName: req.body.warehouseRegisterName,
                purchasePrice: req.body.purchasePrice,
                sellingPrice: req.body.sellingPrice,
                currentStockStatus: req.body.currentStockStatus,
                minAmount: req.body.minAmount,
                maxAmount: req.body.maxAmount
            };
            artical_1.default.findOneAndUpdate({ 'articalCode': req.body.articalCode }, { $push: { 'pricesAndState': toAdd } }, (err, art) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ 'message': 'error' });
                }
                else {
                    res.status(200).json({ 'message': 'artical updated' });
                }
            });
        };
        this.addArticalCategory = (req, res) => {
            artical_1.default.findOne({ 'articalCode': req.body.articalCode }, (err, art) => {
                if (art.category.name != undefined) {
                    res.status(200).json({ 'message': 'postoji' });
                }
                else {
                    artical_1.default.findOneAndUpdate({ 'articalCode': req.body.articalCode }, { 'category.name': req.body.category, 'category.isSub': req.body.isSub }, (err, art) => {
                        if (err) {
                            console.log(err);
                            res.status(400).json({ 'message': 'error' });
                        }
                        else {
                            res.status(200).json({ 'message': 'artical updated' });
                        }
                    });
                }
            });
        };
        this.getArticalsByObject = (req, res) => {
            if (req.body.warehouses != 'no') {
                artical_1.default.find({ 'company': req.body.company, 'pricesAndState.warehouseRegisterName': { $in: [req.body.warehouse] } }, (err, articals) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.json(articals);
                    }
                });
            }
            else {
                artical_1.default.find({ 'company': req.body.company, 'pricesAndState.warehouseRegisterName': { $in: [req.body.name] } }, (err, articals) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.json(articals);
                    }
                });
            }
        };
    }
}
exports.ArticalController = ArticalController;
//# sourceMappingURL=artical.controller.js.map