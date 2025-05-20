import "dotenv/config";
import bodyParser from "body-parser";
import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import couponCodesRouter from "./routes/couponCodesRoutes";
import orderRouter from "./routes/orderRoutes"
import userRouter from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import cartRouter from "./routes/cartRoutes";
import addressRoutes from "./routes/addressRoutes";
import serveStatic from "serve-static";
const app: Express = express();
const port = 443;

const PORT = 3000;


// Mount the middleware at "/static" to serve static content only when their request path is prefixed with "/static".

    // GET /static/style.css etc.
app.use('/', express.static(__dirname + '/public'));
app.use('/assets', express.static(__dirname + '/public/assets/'));
app.use('/checkout', express.static(__dirname + '/public'));
app.use('/checkout/cart', express.static(__dirname + '/public'));
app.use('/signup', express.static(__dirname + '/public'));
app.use('/customer/account/login', express.static(__dirname + '/public'));
app.use('/legal/privacy/privacy-policy', express.static(__dirname + '/public'));
app.use('/terms-and-conditions', express.static(__dirname + '/public'));
app.use('/legal', express.static(__dirname + '/public'));
app.use('/order-status', express.static(__dirname + '/public'));

app.listen(port, () => console.log(`Server listening on port: ${port} ${__dirname}`));
app.use(bodyParser.json());

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS_CORS,
  })
);

app.use("/api/get/products", productRoutes);

app.use("/api/users", userRouter);

app.use("/api/post/orders", orderRouter);

app.use("/api/get/coupons", couponCodesRouter);

app.use("/api/cart", cartRouter);

app.use("/api/addresses", addressRoutes);

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING!)
  .then(() => {
    console.log(`Successfully connected to the db.`);
    const PORT = process.env.PORT || 3000;
    app.listen(3000, () => {
      console.log(`Listening on http://localhost:${3000}`);
    });
  })
  .catch((e) =>
    console.warn(`Unable to connect to the db with error: ${e.message}`)
  );
