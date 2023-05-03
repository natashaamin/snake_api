import { NextFunction, Request, Response } from "express";
import { Fruit } from "../types";

export const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const generateNewFruitPosition = (
  width: number,
  height: number
): Fruit => {
  return { x: randomInt(0, width - 1), y: randomInt(0, height - 1) };
};

export const handleMethodNotAllowed = (req: Request, res: Response, next: NextFunction) => {
  returnErrorResponse(res, "Invalid method", 405);
}

export const returnErrorResponse = (
  res: Response,
  error: string,
  status = 500
) => {
  res.status(status).send({
    message: error,
  });
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
};
