import express, { Request, Response } from "express";
import HttpError from "../models/HttpError";
import CouponCode from "../models/CouponCode";
import { handleRequestError } from "../utils";
import { FAILED_TO_RETRIEVE_FROM_DB } from "../constants/errorMessages";
const couponCodesRouter = express.Router();

const basePaths = {
    coupons: "/coupons",
  };

couponCodesRouter.get("/", async (_req: Request, res: Response) => {
    try {
      const coupons = await CouponCode.find();
      res.send(coupons);
    } catch (error) {
      const httpError: HttpError = {
        httpCode: 500,
        message: FAILED_TO_RETRIEVE_FROM_DB,
        error,
      };
      return handleRequestError(res, httpError);
    }
  });
  export default couponCodesRouter;