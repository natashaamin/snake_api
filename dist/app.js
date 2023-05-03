"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const route_1 = require("./routes/route");
const service_1 = require("./services/service");
const app = (0, express_1.default)();
exports.app = app;
const routes = express_1.default.Router();
exports.routes = routes;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
routes.use(route_1.defaultRoute);
app.use(service_1.errorHandler);
app.use('/', routes);
//# sourceMappingURL=app.js.map