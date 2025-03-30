import express, { Request, Response } from "express";
import HttpError from "../models/HttpError";
import Cart from "../models/CartData";
import mongoose from "mongoose";
import { handleRequestError } from "../utils";
const cartRouter = express.Router();

cartRouter.get("/:cart", async (_req: Request, res: Response) => {
    try {
      const cart = await Cart.find({cartOwner:  _req.params.cart});
      res.header('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGINS_CORS);
      if( cart.length > 0 ) {
          res.status(200).send({cart});
      }
      else {
        throw new Error(`The cart was not found.`);
      }
    } catch (error: any) {
      const httpError: HttpError = {
        httpCode: 400,
        message: error.message,
        error,
      };
      return handleRequestError(res, httpError);
    }
  });
  export default cartRouter;