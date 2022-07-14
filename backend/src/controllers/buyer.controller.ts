import * as express from 'express';
import Buyer from '../models/buyer'
import User from '../models/user'

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
                res.json(buyer)
            }
        })
    }

    addNewBuyer = (req: express.Request, res: express.Response) => {
        User.findOne({'username': req.body.username, 'type' : "buyer"}, (err, user) => {
            if(user) {console.log("User with that username allready exists");}
            else{
                let newBuyer = new Buyer({username : req.body.username, password : req.body.password, firstname : req.body.firstname, 
                    lastname : req.body.lastname, phoneNumber : req.body.phoneNumber, IDNumber : req.body.IDNumber, bills : req.body.bills})
      
                newBuyer.save().then(com=>{
                    let newUser = new User({username : req.body.username, password : req.body.password, type: "buyer"});

                    newUser.save();
                    
                    res.status(200).json({'message': 'buyer added'});
                }).catch(err=>{
                    res.status(400).json({'message': 'error'})
                })
            }
        })
    }

    changePassword = (req: express.Request, res: express.Response) => {

        Buyer.findOneAndUpdate({'username' : req.body.username}, {$set : {'password' : req.body.password}}, (err, comp) => {
            if(err){
                console.log(err)
                res.status(400).json({'message': 'error'})
            }
            else{
                User.findOneAndUpdate({'username' : req.body.username}, {$set : {'password' : req.body.password}}, (err, comp) => {
                    if(err){
                        console.log(err)
                        res.status(400).json({'message': 'error'})
                    }
                    else{
                        res.status(200).json({'message': 'password changed'})
                    }
                })
            }
        })
    }
}