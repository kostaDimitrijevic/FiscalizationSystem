import * as express from 'express';
import Warehouse from '../models/warehouse';
import Company from '../models/company';
import User from '../models/user';

export class CompanyController{

    getFalseStatusCompanies = (req: express.Request, res: express.Response) => {
    
        return Company.find({status: false}, (err, companies)=>{
            if(err) console.log(err)
            else res.json(companies)
        })
    }

    accept = (req: express.Request, res: express.Response) =>{
        Company.findOneAndUpdate({username : req.body.username}, {status : true}, (err, company)=>{
            if(err) console.log(err)
            else res.json(company)
        })
    }

    decline = (req: express.Request, res: express.Response) =>{
        Company.findOneAndRemove({username : req.body.username}, (err, company)=>{
            if(err) console.log(err)
            else res.json(company)
        })
    }

    getCompany = (req: express.Request, res: express.Response) =>{
        Company.findOne({'username' : req.body.username}, (err, com) =>{
            if(err) console.log(err)
            else{
                res.json(com);
            }
        })
    }

    getWarehouses = (req: express.Request, res: express.Response) =>{

        Warehouse.find({'idW.username' : req.body.username}, (err, ware) =>{
            if(err) console.log("error")
            else{
                res.json(ware)
            }
        })
    }

    
    addOrderer = (req: express.Request, res: express.Response) => {

        let username = req.body.username;
        let password = req.body.password;

        User.findOne({'username': username, 'type' : "company"}, (err, user) => {
            if(user) console.log("User with that username allready exists");
            else {
                
                Company.findOneAndUpdate({'username': req.body.companyUser}, {$push : {'orderers' : req.body.orderer}}, (err, comp) => {

                    if(err) console.log(err)
                    else{
                        let newCompany = new Company({firstname: req.body.firstname, lastname: req.body.lastname,
                            username : req.body.username, password : req.body.password, companyName : req.body.companyName, email : req.body.email,
                            country : req.body.country, zipCode : req.body.zipCode, PIB : req.body.PIB, registrationNumber : req.body.registrationNumber, 
                            street : req.body.street, phone : req.body.phoneNumber, city : req.body.city, status : true, infoAddedStatus: false})
        
                        newCompany.save().then(com=>{
                            let newUser = new User({username : username, password : password, type: "company"});
        
                            newUser.save();
         
                            res.status(200).json({'message': 'orderer added'});
                        }).catch(err=>{
                            res.status(400).json({'message': 'error'})
                        })
                    }
                })

            }
        })
    }

    searchByPIB = (req: express.Request, res: express.Response) => {
        
        Company.findOne({'username' : req.body.username}, (err, company) =>{
            if(err) console.log(err)
            else{
                Company.find({'PIB' : req.body.PIB, $and: [ {'username' :  {$ne : req.body.username}}, {'username' :  {$nin : company.get('orderers.username')}}] }, (error, companies)=>{
                    if(error) console.log(error)
                    else{
                        res.json(companies)
                    }
                })
            }
        })


    }

    getOrderers = (req: express.Request, res: express.Response) => {
        Company.findOne({'username' : req.body.username}, (err, comp)=>{
            if(err) console.log(err)
            else{
                res.json(comp.get('orderers'))
            }
        })
    }

    addExistingCompanyToOrderers = (req: express.Request, res: express.Response) => {
        console.log("USAO")
        Company.findOneAndUpdate({'username' : req.body.companyUser}, {$push : {'orderers' : req.body.orderer}}, (err, comp) =>{
            if(err) {
                console.log("ERROR")
                res.status(400).json({'message': 'error'})
            }
            else{
                res.status(200).json({'message': 'uspesno'});
            }
        })
    }
}