import express, { Request, Response } from "express";
import HttpError from "../models/HttpError";
import CartData from "../models/CartData";
import mongoose from "mongoose";
import { handleRequestError } from "../utils";
const cartRouter = express.Router();

cartRouter.get("/users/:id", async (_req: Request, res: Response) => {
    try {
      const cartData = await CartData.findOne({cartOwner: _req.params.id});
      res.header('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGINS_CORS);
      if( cartData ) {
        res.status(200).send(cartData);
      }
      else {
        throw new Error(`The cart for userId '${ (_req.params.id) ? _req.params.id : 'Invalid User Id' }' was not found.`);
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

cartRouter.post("/users/:id", async (_req: Request, res: Response) => {
    try {
      const cartFindData = await CartData.findOne({cartOwner: _req.params.id});
      res.header('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGINS_CORS);
    if(cartFindData) {
        cartFindData.cartData = _req.body?.cartItems;
        cartFindData.cartOwner = _req.params.id;
        const cartReplaceData = await CartData.replaceOne({cartOwner: _req.params.id}, cartFindData);
        res.status(200).send({message: 'Replaced cart data.'});
    }
    else {
    const cartData = new CartData({cartOwner: _req.params?.id, cartData: _req.body?.cartItems});
    const session = await mongoose.startSession();
    session.startTransaction();
    await cartData.save({ session });
    await session.commitTransaction();

      if( cartData ) {
        console.log(cartData);
      }
      else {
            const newCart = CartData.insertOne(_req.body);
            res.status(200).send({message: 'Updated cart data.'});
      }
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