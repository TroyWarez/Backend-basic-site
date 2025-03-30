import mongoose from "mongoose";

const cartDataSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, required: false },
  cartData: {type: Array, required: true},
  cartOwner: { type: String, required: true}
});

const Cart = mongoose.model("cart", cartDataSchema);

export default Cart;