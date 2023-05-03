import express from "express";
import bodyParser from "body-parser";
import { defaultRoute } from './routes/route';
import { errorHandler } from "./services/service";

const app = express();
const routes = express.Router();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

routes.use(defaultRoute);

app.use(errorHandler);
app.use('/', routes);

export { app, routes };