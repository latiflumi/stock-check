import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";

const MONGO_URL = 'mongodb://localhost:27017';
const DB_NAME = 'stockapp';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(MONGO_URL); // exactly like your code
let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("stockapp"); // choose your DB name
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Mongo Error:", err);
  }
}

connectDB();

// Example route using your native driver
app.post("/getStockByStyle", async (req, res) => {
  const { styleNumber } = req.body;
  if (!styleNumber) return res.status(400).json({ error: "Missing styleNumber" });

  const client = new MongoClient(MONGO_URL);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const productsCol = db.collection("products");

    const matchingProducts = await productsCol.find({ NumriSerik: styleNumber }).toArray();
    if (matchingProducts.length === 0) {
      return res.status(404).json({ error: "No products found for this style number" });
    }
    res.json({
      products: matchingProducts,
    });
  } catch (err) {
    console.error("Error in /getStockByStyle:", err);
    res.status(500).json({ error: "Server error" });
  } finally {
    await client.close();
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
