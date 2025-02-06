import "dotenv/config";
import bodyParser from "body-parser";
import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";

const app: Express = express();

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS_CORS,
  })
);