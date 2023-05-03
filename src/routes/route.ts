import express from "express";
import { newGame, validateGame } from "../controllers/controller";
import { handleMethodNotAllowed } from "../services/service";

const defaultRoute = express.Router();

defaultRoute.route("/new").get(newGame).all(handleMethodNotAllowed);
defaultRoute.route("/validate").post(validateGame).all(handleMethodNotAllowed);

export { defaultRoute };
