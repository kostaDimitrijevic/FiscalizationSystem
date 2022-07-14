import * as express from 'express';
import Buyer from '../models/buyer'

export class BuyerController{
    addBillByID = (req: express.Request, res: express.Response) => {
        Buyer.findOneAndUpdate({'IDNumber' : req.body.IDNumber}, {$push : {'bills' : req.body.bill}}, (err, buyer) =>{
            if(err){
                console.log(err)
                res.status(400).json({'message': 'error'})
            }
            else{
                res.status(200).json({'message': 'bill added'})
            }
        })
    }

    getBuyer = (req: express.Request, res: express.Response) => {
        Buyer.findOne({'username' : req.body.username}, (err, buyer) => {
            if(err){
                console.log(err)
                res.status(400).json({'message': 'error'})
            }
            else{
                console.log(buyer)
                res.json(buyer)
            }
        })
    }
}