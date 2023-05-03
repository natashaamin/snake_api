"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const route_1 = require("./routes/route");
const service_1 = require("./services/service");
const app = (0, express_1.default)();
exports.routes = express_1.default.Router();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
exports.routes.use(route_1.defaultRoute);
app.use(service_1.errorHandler);
app.use('/', exports.routes);
exports.default = app;
//# sourceMappingURL=app.js.map