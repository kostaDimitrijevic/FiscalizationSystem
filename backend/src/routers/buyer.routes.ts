import express from 'express'
import { BuyerController } from '../controllers/buyer.controller';

const buyerRouter = express.Router();

buyerRouter.route('/addBillByID').post(
    (req,res) => new BuyerController().addBillByID(req,res)
)
buyerRouter.route('/getBuyer').post(
    (req,res) => new BuyerController().getBuyer(req,res)
)

export default buyerRouter;