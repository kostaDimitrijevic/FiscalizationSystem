import express from 'express'
import { BuyerController } from '../controllers/buyer.controller';

const buyerRouter = express.Router();

buyerRouter.route('/addBillByID').post(
    (req,res) => new BuyerController().addBillByID(req,res)
)
buyerRouter.route('/getBuyer').post(
    (req,res) => new BuyerController().getBuyer(req,res)
)
buyerRouter.route('/addNewBuyer').post(
    (req,res) => new BuyerController().addNewBuyer(req,res)
)
buyerRouter.route('/changePassword').post(
    (req, res) => new BuyerController().changePassword(req, res)
)
export default buyerRouter;