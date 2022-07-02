import * as express from 'express';
import Company from '../models/company';

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
}