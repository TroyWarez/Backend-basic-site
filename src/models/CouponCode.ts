import mongoose from "mongoose";

const couponCodeSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  coupon: { type: String, required: true },
  expires: { type: String, required: true },
  discount: { type: String, required: true },
});

const CouponCode = mongoose.model("CouponCode", couponCodeSchema);

export default CouponCode;