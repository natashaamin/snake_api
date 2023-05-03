"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultRoute = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controllers/controller");
const service_1 = require("../services/service");
const defaultRoute = express_1.default.Router();
exports.defaultRoute = defaultRoute;
defaultRoute.route("/new").get(controller_1.newGame).all(service_1.handleMethodNotAllowed);
defaultRoute.route("/validate").post(controller_1.validateGame).all(service_1.handleMethodNotAllowed);
//# sourceMappingURL=route.js.map