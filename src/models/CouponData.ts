import mongoose from "mongoose";

const couponDataSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, required: false },
  coupon: { type: String, required: true },
  discount: { type: Number, required: false },
  expires: { type: Date, required: false },
});

const Coupon = mongoose.model("coupons", couponDataSchema);

export default Coupon;