import express, { Request, Response } from "express";
import HttpError from "../models/HttpError";
import Coupon from "../models/CouponData";
import mongoose from "mongoose";
import { handleRequestError } from "../utils";
const couponCodesRouter = express.Router();

couponCodesRouter.get("/:coupon", async (_req: Request, res: Response) => {
    try {
      const coupons = await Coupon.find({coupon: _req.params.coupon});
      res.header('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGINS_CORS);
      if( coupons.length > 0 ) {
        if((coupons[0]?.expires as Date).getTime() >= new Date().getTime())
        {
          res.status(200).send([{discountPercent: coupons[0]?.discount}]);
        }
        else
        {
          coupons.forEach(coupon => {
            try {
            coupon.deleteOne({ _id: coupon.id });
            }
            catch(e) {
              console.log(e);
            }
          })
          throw new Error('The coupon \'' + _req.params.coupon + '\' is expired.');
        }
      }
      else {
        throw new Error('The coupon ' + _req.params.coupon + ' was not found.');
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
  export default couponCodesRouter;