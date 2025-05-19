import mongoose from "mongoose";
import CartItem from "./CartItem";
const cartDataSchema = new mongoose.Schema({
  cartData: {type: Array<CartItem>, required: true},
  cartOwner: { type: String, required: true}
});

const Cart = mongoose.model("cart", cartDataSchema);

export default Cart;