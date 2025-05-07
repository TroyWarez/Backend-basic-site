import "dotenv/config";
import express, { Request, Response } from "express";
import HttpError from "../models/HttpError";
import OrderData from "../models/OrderData";
import { handleRequestError } from "../utils";
import Order from "../models/OrderData";
const orderRouter = express.Router();
import mongoose from "mongoose";

orderRouter.post("/:order", async (_req: Request, res: Response) => {
    const order = new Order(_req.body?.orderData);
    try {
      //const cart = await OrderData.find({cartOwner:  _req.params.cart});
      res.header('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGINS_CORS);
      const session = await mongoose.startSession();
      session.startTransaction();

      res.status(201).send(order);

      await order.save({ session });
      await session.commitTransaction();

    } catch (error: any) {
      const httpError: HttpError = {
        httpCode: 400,
        message: error.message,
        error,
      };
      return handleRequestError(res, httpError);
    }
    const httpError: HttpError = {
      httpCode: 200,
      message: "",
    };
    return handleRequestError(res, httpError);
  });
  export default orderRouter;