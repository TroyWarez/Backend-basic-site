import "dotenv/config";
import bodyParser from "body-parser";
import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import couponCodesRouter from "./routes/couponCodesRoutes";
import cartRouter from "./routes/cartRoutes"
const app: Express = express();

app.use("/coupons", couponCodesRouter);
app.use("/cart", cartRouter);

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS_CORS,
  })
);

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING!)
  .then(() => {
    console.log(`Successfully connected to the db.`);
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Listening on http://localhost:${PORT}`);
    });
  })
  .catch((e) =>
    console.warn(`Unable to connect to the db with error: ${e.message}`)
  );
