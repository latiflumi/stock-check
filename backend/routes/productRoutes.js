// routes/productRoutes.js
import express, { application } from "express";
import { Product } from "../models/Product.js";

const router = express.Router();

// GET /api/products/by-style

router.get("/by-style", async (req, res) => {
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

router.get("/by-identity", async (req, res) => {
  try {
    const { styleNumber, colorCode, color } = req.query;

    if(!styleNumber || !colorCode || !color){
      return res.status(404).json({ message: "Missing query params"});
    }

    const product = await Product.findOne({
      NumriSerik: styleNumber,
      KodiNgjyres: colorCode,
      Ngjyra: color
    })
    if(!product){
      return res.status(404).json({ message: "Product not found"})
    }

    res.json(product)
  } catch (err) {
      console.log(err)
    res.status(505).json({message: "Server error"});
  }
})

export default router;
