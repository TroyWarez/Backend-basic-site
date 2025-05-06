import mongoose from "mongoose";

const orderDataSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, required: false },
  
});

const Order = mongoose.model("order", orderDataSchema);

export default Order;