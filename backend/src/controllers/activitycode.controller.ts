import * as express from 'express';
import ActivityCode from '../models/activitycode'

export class ActivityCodeController{
    getCodes = (req: express.Request, res: express.Response) => {
        
        ActivityCode.find({}, (err, codes) => {
            if(err) console.log("GRESKA")
            else{
                res.json(codes)
            }
        })
    }
}