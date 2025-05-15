import mongoose from "mongoose";

const productDataSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: false },
    sku: { type: String, required: true},
    displayItemName:  { type: String, required: true},
    displayItemDescription:  { type: String, required: true},
    displayCurrencyValue:  { type: String, required: true},
    displayCurrencySaleValue:  { type: Number, required: true},
    displayCurrencyValueType:  { type: String, required: true},
    displayCurrencyValueSymbol:  { type: String, required: true},
    productImageBinData:  { type: String, required: true},
    stockAmount:  { type: Number, required: true},
    categories:  { type: Array, required: true},
    dateAdded:  { type: String, required: true},
});

const Product = mongoose.model("product", productDataSchema);

export default Product;