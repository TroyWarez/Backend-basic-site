import express, { Request, Response } from "express";
import HttpError from "../models/HttpError";
import Address from "../models/Address";
import mongoose from "mongoose";
import { handleRequestError } from "../utils";
const addressRoutes = express.Router();

addressRoutes.get("/:id", async (_req: Request, res: Response) => {
    try {
      const addressData = await Address.findOne({addressOwner: _req.params.id});
      res.header('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGINS_CORS);
      if( addressData ) {
        res.status(200).send(addressData);
      }
      else {
        throw new Error(`The address for userId '${ (_req.params.id) ? _req.params.id : 'Invalid User Id' }' was not found.`);
      }
    } catch (error: any) {
      const httpError: HttpError = {
        httpCode: 400,
        message: error.message,
        error,
      };
      return handleRequestError(res, httpError);
    }
  });

addressRoutes.post("/:id", async (_req: Request, res: Response) => {
    try {
      const addressData = await Address.findOne({cartOwner: _req.params.id});
      res.header('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGINS_CORS);
    if(addressData && _req.body) {
        const newAddressData = new Address({ 
            firstName: _req.body.savedAdress.firstName,
            lastName: _req.body.savedAdress.lastName,
            residentialAddress: _req.body.savedAdress.residentialAddress,
            ExtraInfomation: _req.body.savedAdress.ExtraInfomation,
            cityName: _req.body.savedAdress.cityName,
            PostalCode: _req.body.savedAdress.PostalCode,
            State: _req.body.savedAdress.State,
            countryName: _req.body.savedAdress.countryName,
            email: _req.body.savedAdress.email,
            phoneNumber: _req.body.savedAdress.phoneNumber,
            addressOwner: _req.params.id,
        });
        const cartReplaceData = await Address.replaceOne({addressOwner: _req.params.id}, newAddressData);
        res.status(200).send({message: 'Replaced address data.'});
    }
    else {
        const newAddressData = new Address({ 
            firstName: _req.body.savedAdress.firstName,
            lastName: _req.body.savedAdress.lastName,
            residentialAddress: _req.body.savedAdress.residentialAddress,
            ExtraInfomation: _req.body.savedAdress.ExtraInfomation,
            cityName: _req.body.savedAdress.cityName,
            PostalCode: _req.body.savedAdress.PostalCode,
            State: _req.body.savedAdress.State,
            countryName: _req.body.savedAdress.countryName,
            email: _req.body.savedAdress.email,
            phoneNumber: _req.body.savedAdress.phoneNumber,
            addressOwner: _req.params.id,
        });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newAddressData.save({ session });
    await session.commitTransaction();

      if( newAddressData ) {
        console.log(newAddressData);
      }
      else {
            const newCart = Address.insertOne(_req.body);
            res.status(200).send({message: 'Updated address data.'});
      }
    }
    } catch (error: any) {
      const httpError: HttpError = {
        httpCode: 400,
        message: error.message,
        error,
      };
      return handleRequestError(res, httpError);
    }
  });
  export default addressRoutes;