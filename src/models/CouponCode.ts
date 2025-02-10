import mongoose from "mongoose";

const couponCodeSchema = new mongoose.Schema({
  Code: { type: String, required: true },
});

const CouponCode = mongoose.model("CouponCode", couponCodeSchema);

export default CouponCode;