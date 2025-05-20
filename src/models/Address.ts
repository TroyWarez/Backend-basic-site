import mongoose from "mongoose";
const addressDataSchema = new mongoose.Schema({

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
    addressOwner: {type: String, required: true },
});

const Address = mongoose.model("addresses", addressDataSchema);

export default Address;