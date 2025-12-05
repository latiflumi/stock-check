// routes/productRoutes.js
import express from "express";
import { Product } from "../models/Product.js";

const router = express.Router();

// GET /api/product/details
router.get("/details", async (req, res) => {
  const { styleNumber, ngjyra } = req.query;

  if (!styleNumber) {
    return res.status(400).json({ error: "Missing styleNumber query" });
  }

  // Build filter
  let filter = { NumriSerik: styleNumber };

  if (ngjyra) {
    const safeColor = ngjyra.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    filter.Ngjyra = new RegExp(`^${safeColor}$`, "i");
  }

  try {
    const variants = await Product.find(filter);

    if (!variants.length) {
      return res.status(404).json({ error: "No variants found" });
    }

    res.json({ variants });
  } catch (error) {
    console.error("Error in /api/product/details:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

export default router;
