import express, { Request, Response } from "express";
import HttpError from "../models/HttpError";
import Coupon from "../models/CouponData";
import { handleRequestError } from "../utils";
import { INVALID_COUPON } from "../constants/errorMessages";
const couponCodesRouter = express.Router();

couponCodesRouter.use(express.json());

couponCodesRouter.get("/:coupon", async (_req: Request, res: Response) => {
    try {
      const coupons = await Coupon.find({coupon: _req.params.coupon});
      if( coupons.length > 0 && (coupons[0]?.expires as Date).getFullYear() < new Date().getFullYear()) {
        res.status(200).send([{discountPercent: coupons[0]?.discount}]);
      }
      else {
        throw new Error('The coupon ' + _req.params.coupon + ' was not found.');
      }
    } catch (error) {
      const httpError: HttpError = {
        httpCode: 400,
        message: INVALID_COUPON,
        error,
      };
      return handleRequestError(res, httpError);
    }
  });
  export default couponCodesRouter;