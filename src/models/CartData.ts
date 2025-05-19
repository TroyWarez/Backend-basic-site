import mongoose from "mongoose";

const cartDataSchema = new mongoose.Schema({
  cartData: {type: Array, required: true},
  cartOwner: { type: String, required: true}
});

const Cart = mongoose.model("cart", cartDataSchema);

export default Cart;