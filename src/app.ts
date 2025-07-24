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
const app: Express = express();
import fs from "fs";
import http from "https";
const port = 443;

const privateKey  = fs.readFileSync('sslcert/server.key');
const certificate = fs.readFileSync('sslcert/server.crt');

const credentials = {key: privateKey, cert: certificate};

// your express configuration here
const httpsServer = http.createServer(credentials, app);

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
app.use('/tpong', express.static(__dirname + '/public'));

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
    httpsServer.listen(3000, () => {
      console.log(`Listening on http://localhost:${3000}`);
    });
  })
  .catch((e) =>
    console.warn(`Unable to connect to the db with error: ${e.message}`)
  );
