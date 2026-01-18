import dotenv from "dotenv";
dotenv.config({ path: '.env' });


import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import productDetails from "./routes/productDetails-route.js";
import authRoutes from "./routes/authRoutes.js"
import verifyToken from "./middleware/verifyToken.js";


const app = express();

const allowedOrigins = process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',').map(o => o.trim()) : [];

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:allowedOrigins,
        credentials:true,
    })
)

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/products", verifyToken, productRoutes);
app.use("/api/stock", verifyToken, productDetails);

app.listen(5000, "0.0.0.0", () =>  console.log("Server running on port 5000"));