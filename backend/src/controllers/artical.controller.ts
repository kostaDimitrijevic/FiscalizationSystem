import * as express from 'express';
import Artical from '../models/artical'

export class ArticalController{
    addArticalBaseInfo = (req: express.Request, res: express.Response) => {
        Artical.findOne({'articalCode' : req.body.articalCode}, (err, ar) => {
            if(ar) console.log("Artikal with that code allready exists!")
            else{
                let artical = new Artical({'company' : req.body.company, 'articalCode' : req.body.articalCode, 'articalName': req.body.articalName, 'taxRate': req.body.taxRate,
                'unit': req.body.unit, 'type': req.body.type})
                artical.save().then(art => {
                    res.status(200).json({'message': 'artical added'});
                }).catch(err => {
                    res.status(400).json({'message': 'error'})
                })
            }
        })
    }

    getArticals =(req: express.Request, res: express.Response) => {
        Artical.find({'company' : req.body.company}, (err, articals) => {
            if(err) console.log(err)
            else{
                res.json(articals)
            }
        })
    }

    getArtical =(req: express.Request, res: express.Response) => {
        Artical.findOne({'articalCode' : req.body.articalCode}, (err, artical) => {
            if(err) console.log(err)
            else{
                res.json(artical)
            }
        })
    }

    addArticalMoreInfo = (req: express.Request, res: express.Response) => {
        Artical.findOneAndUpdate({'articalCode' : req.body.articalCode}, {'country' : req.body.country, 'foreinName' : req.body.foreinName, 'barcode' : req.body.barcode,
        'manufacturer' : req.body.manufacturer, 'customsTariff' : req.body.customsTariff, 'ecoTax' : req.body.ecoTax, 'exciseTax' : req.body.exciseTax, 'minSupplies': req.body.minSupplies,
        'maxSupplies' : req.body.maxSupplies, 'description' : req.body.description, 'decleration' : req.body.decleration}, (err, art) => {
            if(err) {
                res.status(400).json({'message': 'error'})
                console.log(err)
            }
            else{
                res.status(200).json({'message': 'artical updated'});
            }
        })
    }

    removeArtical =(req: express.Request, res: express.Response) => {
        Artical.findOneAndRemove({'articalCode' : req.body.articalCode} , (err, resp) => {
            if(err) {
                console.log(err)
                res.status(400).json({'message': 'error'})
            }
            else{
                res.status(200).json({'message': 'artical removed'});
            }
        })
    }

    addArticalpricesAndStatus = (req: express.Request, res: express.Response) => {
        let toAdd = {
            warehouseRegisterName: req.body.warehouseRegisterName,
            purchasePrice: req.body.purchasePrice,
            sellingPrice: req.body.sellingPrice,
            currentStockStatus: req.body.currentStockStatus,
            minAmount: req.body.minAmount,
            maxAmount: req.body.maxAmount
        }
        Artical.findOneAndUpdate({'articalCode' : req.body.articalCode}, {$push : {'pricesAndState' : toAdd}}, (err, art) =>{
            if(err){
                console.log(err)
                res.status(400).json({'message': 'error'})
            }
            else{
                res.status(200).json({'message': 'artical updated'});
            }
        })
    }
}