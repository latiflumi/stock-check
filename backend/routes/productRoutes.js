// routes/productRoutes.js
import express from "express";
import { Product } from "../models/Product.js";

const router = express.Router();

// GET /api/product/details
router.get("/getproductbystyle", async (req, res) => {
  const { styleNumber, ngjyra, productBarcode} = req.query;

  if (!styleNumber && !productBarcode) {
    return res.status(400).json({ error: "Missing styleNumber or EAN query" });
  }

  // Build filter
 let productConditions = [];

 if (styleNumber) {
    const style = { NumriSerik: styleNumber };
    productConditions.push(style);
  }
  if (productBarcode) {
    const ean = { ShifraProdhuesit: productBarcode }
    productConditions.push(ean);
  }


  let filter = 
  {
    $or: productConditions
  };

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
