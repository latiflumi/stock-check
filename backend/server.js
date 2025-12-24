import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import productDetails from "./routes/productDetails-route.js";

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/product", productRoutes);
app.use("/api/product", productDetails);

app.listen(5000, () => console.log("Server running on port 5000"));
