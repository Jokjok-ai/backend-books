import express from "express";
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import cors from "cors";

export const web = express();

web.use(
  cors({
    // origin: "*", // Ganti dengan domain frontend kalau di production
    // methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    // allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);

web.use(express.json());

web.use(publicRouter);

web.use(errorMiddleware);
