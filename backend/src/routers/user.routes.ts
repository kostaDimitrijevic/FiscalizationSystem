import express from 'express';
import { UserController } from '../controllers/user.controller';
const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res)=>new UserController().login(req, res)
)
userRouter.route('/registerCompany').post(
    (req, res)=>new UserController().registerCompany(req, res)
)
userRouter.route('/addInfo').post(
    (req, res)=>new UserController().addInfo(req, res)
)


export default userRouter;