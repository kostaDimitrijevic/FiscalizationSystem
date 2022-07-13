"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const artical_controller_1 = require("../controllers/artical.controller");
const articalRouter = express_1.default.Router();
articalRouter.route('/addArticalBasicInfo').post((res, req) => new artical_controller_1.ArticalController().addArticalBaseInfo(res, req));
articalRouter.route('/getArticals').post((res, req) => new artical_controller_1.ArticalController().getArticals(res, req));
articalRouter.route('/getArtical').post((res, req) => new artical_controller_1.ArticalController().getArtical(res, req));
articalRouter.route('/addArticalMoreInfo').post((res, req) => new artical_controller_1.ArticalController().addArticalMoreInfo(res, req));
articalRouter.route('/removeArtical').post((res, req) => new artical_controller_1.ArticalController().removeArtical(res, req));
articalRouter.route('/addArticalpricesAndStatus').post((res, req) => new artical_controller_1.ArticalController().addArticalpricesAndStatus(res, req));
articalRouter.route('/addArticalCategory').post((res, req) => new artical_controller_1.ArticalController().addArticalCategory(res, req));
articalRouter.route('/getArticalsByObject').post((res, req) => new artical_controller_1.ArticalController().getArticalsByObject(res, req));
exports.default = articalRouter;
//# sourceMappingURL=artical.routes.js.map