import express, { Request, Response } from "express";
import HttpError from "../models/HttpError";
import Coupon from "../models/CouponData";
import { handleRequestError } from "../utils";
import { FAILED_TO_RETRIEVE_FROM_DB } from "../constants/errorMessages";
const couponCodesRouter = express.Router();

couponCodesRouter.use(express.json());

couponCodesRouter.get("/", async (_req: Request, res: Response) => {
    try {
      const coupons = await Coupon.find({coupon: _req.body[0].coupon});
      if( coupons.length > 0 ) {
        console.log(coupons[0].expires);
        res.send(coupons);
      }
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