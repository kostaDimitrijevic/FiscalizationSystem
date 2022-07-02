import * as express from 'express';
import { isBoxedPrimitive } from 'util/types';
import Company from '../models/company';
import User from '../models/user'

export class UserController{
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        User.findOne({'username': username, 'password': password}, (err, user) => {
            if(err) console.log(err);
            else res.json(user);
        })
    }

    registerCompany = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        console.log(username + "," + password)

        User.findOne({'username': username, 'type' : "company"}, (err, user) => {
            if(user) console.log("User with that username allready exists");
            else {
                let newCompany = new Company({firstname: req.body.firstname, lastname: req.body.lastname,
                    username : req.body.username, password : req.body.password, companyName : req.body.companyName, email : req.body.email,
                    country : req.body.country, zipCode : req.body.zipCode, PIB : req.body.PIB, registrationNumber : req.body.registrationNumber, 
                    street : req.body.street, phone : req.body.phoneNumber, city : req.body.city, status : req.body.status})
                


                newCompany.save().then(com=>{
                    let newUser = new User({username : username, password : password, type: "company"});

                    newUser.save();
                    
                    res.status(200).json({'message': 'company added'});
                }).catch(err=>{
                    res.status(400).json({'message': 'error'})
                })


            }
        })
    }

    addInfo = (req: express.Request, res: express.Response) => {
        let username = req.body.username

        console.log(req.body.warehouses[0])

        Company.findOneAndUpdate({'username' : username}, {'category' : req.body.category, 'activityCodes': req.body.activityCodes, 'isPDV': req.body.isPDV,
        'banks' : req.body.banks, 'numberOfWarehouses' : req.body.numberOfWarehouses, 'warehouses' : req.body.warehouses, 'numberOfRegisters' : req.body.numberOfRegisters,
        'cashRegisters' : req.body.cashRegisters}, (error, company) => {
            if(error) console.log(error)
            else{
                if(company.banks.length > 0){
                    res.status(200).json({'message': 'uspesno'});
                }
                else{
                    res.status(400).json({'message': 'neuspesno'});
                }
            }
        })
    }
}