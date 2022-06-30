import * as express from 'express';
import User from '../models/user'

export class UserController{
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        console.log(username + "," + password)

        User.findOne({'username': username, 'password': password}, (err, user) => {
            console.log(user)
            if(err) console.log(err);
            else res.json(user);
        })
    }
}