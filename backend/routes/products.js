import express from "express";
import { Product } from "../models/Product.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Number(req.query.limit) || 24, 100);
    const skip = (page - 1) * limit;

    const { category, gender } = req.query;

    const filter = {};

    if (category) {
      filter.Kategoria = category;
    }

    if (gender) {
      filter.Gender = gender;
    }

    const [products, total, categories, genders] = await Promise.all([
      Product.find(filter, {
        ArtikulliId: 1,
        NumriSerik: 1,
        Pershkrimi: 1,
        PershkrimiBrendit: 1,
        Kategoria: 1,
        Gender: 1,
        Ngjyra: 1,
        KodiNgjyres: 1,
      })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      Product.countDocuments(filter),

      Product.distinct("Kategoria"),
      Product.distinct("Gender"),
    ]);

    res.json({
      products,
      filters: {
        categories,
        genders,
      },
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET /api/allproducts error", error);
    res.status(500).json({ error: "Server error" });
  }
});


export default router;