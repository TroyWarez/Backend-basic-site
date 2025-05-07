import mongoose from "mongoose";
interface StoreItem {
  sku: number | string;
  quantityNumber: number;
}
const orderDataSchema = new mongoose.Schema({
  firstName: {type: String, required: true },
  lastName: {type: String, required: true },
  residentialAddress: {type: String, required: true },
  ExtraInfomation: {type: String, required: false },
  cityName: {type: String, required: true },
  PostalCode: {type: String, required: true },
  State: {type: String, required: true },
  countryName: {type: String, required: true },
  email: {type: String, required: true },
  phoneNumber: {type: String, required: true },
  promoEmails: {type: Boolean, required: true },
  orderedItems: {type: Array<StoreItem>, required: true }
});

const Order = mongoose.model("order", orderDataSchema);

export default Order;