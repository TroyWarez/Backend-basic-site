import express, { Request, Response } from "express";
import HttpError from "../models/HttpError";
import Product from "../models/ProductData";
import mongoose from "mongoose";
import { handleRequestError } from "../utils";
const productRoutes = express.Router();

productRoutes.get("/:product", async (_req: Request, res: Response) => {
    try {
      const products = await Product.find((_req.params.product !== '0') ? {sku: _req.params.product} : {});
      res.header('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGINS_CORS);
      if( products.length > 0 ) {
          res.status(200).send(products);
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
  export default productRoutes;