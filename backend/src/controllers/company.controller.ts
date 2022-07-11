import * as express from 'express';
import Warehouse from '../models/warehouse';
import Company from '../models/company';
import User from '../models/user';
import Category from '../models/category';

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

    getCashRegisters = (req: express.Request, res: express.Response) => {
        Company.findOne({'username' : req.body.username}, (err, comp) => {
            if(err) console.log(err)
            else{
                res.json(comp.cashRegisters)
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

    getCompanyLogo = (req: express.Request, res: express.Response) => {
        Company.findOne({'username' : req.body.username}, (err, comp) => {
            if(err) console.log(err)
            else{
                const fs = require('fs');
                res.json( fs.readFileSync(comp.get('companyLogoPath'), {encoding:'utf8'}))
            }
        })
    }

    addCategory = (req: express.Request, res: express.Response) => {
        Category.findOne({'company' : req.body.company, 'category' : req.body.name}, (err, cat)=>{
            if(cat) console.log("Kategorija sa tim nazivom vec postoji")
            else{
                let newCat = new Category({company : req.body.company, category: req.body.name})

                newCat.save().then(category=>{

                    res.status(200).json({'message': 'category added'});
                }).catch(error=>{
                    res.status(400).json({'message': 'error'})
                })
            }
        })
    }

    addSubcategory = (req: express.Request, res: express.Response) => {
        console.log(req.body.company)
        Category.findOne({'company' : req.body.company, 'category' : req.body.name}, (err, cat) => {
            let error = false
            cat.subcategories.forEach(subCat => {
                if(subCat == req.body.subcategory){
                    error = true
                }
            });
            if(error){
                res.status(200).json({'message': 'postoji'})
            }else{
                Category.findOneAndUpdate({'company' : req.body.company, 'category' : req.body.name}, {$push : {'subcategories' : req.body.subcategory}},(err, cat)=>{
                    if(err) {
                        console.log(err)
                        res.status(400).json({'message': 'error'})
                    }
                    else{
                        res.status(200).json({'message': 'Subcategory added'})
                    }
                })
            }
        })

    }

    getAllCategories = (req: express.Request, res: express.Response) => {
        Category.find({'company' : req.body.company}, (err, cat)=>{
            if(err) console.log(err)
            else{
                res.json(cat)
            }
        })
    }

    addDepartment = (req: express.Request, res: express.Response) => {
        Company.updateOne({'username' : req.body.username}, {$push : {'departments': req.body.department}}, (err) => {
            if(err) {
                console.log(err)
                res.status(400).json({'message': 'error'})
            }
            else{
                res.status(200).json({'message': 'department added'})
            }
        })
    }

    updateDepartment = (req: express.Request, res: express.Response) => {
        Company.findOne({'username' : req.body.username}, (err, comp) => {
            if(err){
                console.log(err)
                res.status(400).json({'message': 'error'})
            }
            else{
                comp.departments.forEach((department, index) => {
                    if(department.departmentName == req.body.departmentName){
                        comp.departments.splice(index, 1)
                    }
                });
                comp.departments.push(req.body.department)
                        
                Company.findOneAndUpdate({'username' : req.body.username}, {$set : {'departments': comp.departments}}, (err, compa) => {
                    if(err) {
                        console.log(err)
                        res.status(400).json({'message': 'error'})
                    }
                    else{
                        res.status(200).json({'message': 'department added'})
                    }
                })

            }
        })
    }
}