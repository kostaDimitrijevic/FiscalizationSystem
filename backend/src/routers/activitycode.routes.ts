import express from 'express'
import { ActivityCodeController } from '../controllers/activitycode.controller';

const activityRouter = express.Router();

activityRouter.route('/getCodes').get(
    (req,res) => new ActivityCodeController().getCodes(req,res)
)

export default activityRouter;