import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js"
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

connectDB(); // Connect MongoDB ONCE at startup

app.use(express.json());

// ROUTES
app.use("/api/product", productRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
