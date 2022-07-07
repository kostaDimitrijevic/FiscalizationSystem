import express from 'express'
import { ArticalController } from '../controllers/artical.controller';

const articalRouter = express.Router();

articalRouter.route('/addArticalBasicInfo').post(
    (res, req) => new ArticalController().addArticalBaseInfo(res, req)
)

articalRouter.route('/getArticals').post(
    (res, req) => new ArticalController().getArticals(res, req)
)

articalRouter.route('/getArtical').post(
    (res, req) => new ArticalController().getArtical(res, req)
)

articalRouter.route('/addArticalMoreInfo').post(
    (res, req) => new ArticalController().addArticalMoreInfo(res, req)
)
articalRouter.route('/removeArtical').post(
    (res, req) => new ArticalController().removeArtical(res, req)
)

articalRouter.route('/addArticalpricesAndStatus').post(
    (res, req) => new ArticalController().addArticalpricesAndStatus(res, req)
)

export default articalRouter;