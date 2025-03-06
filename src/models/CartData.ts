import mongoose from "mongoose";

const cartDataSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, required: false },
  displayCurrencyValue: { type: Number, required: true },
  displayCurrencyValueType: { type: String, required: true },
  displayCurrencyValueSymbol: { type: String, required: true },
  productImageBinData: { type: String, required: true },
  displayItemName: { type: String, required: true },
  quantityNumber: { type: Number, required: true },
});

const Cart = mongoose.model("carts", cartDataSchema);

export default Cart;