import ProductCard from "../components/ProductCard.jsx";
import { useEffect, useState } from "react";
import api from "../api/axios.js";

const [products, setProducts] = useSatet([]);

  useEffect(() => {
    const fetchProducts = async () => {
   try {
      setLoading(true);
      setProducts([]);
      setError("");

      const res = await api.get("/details", {
        params,
      });

      // axios already parses JSON
      setProducts(res.data.variants);
    } catch (err) {
      console.error(err);
      setError("This product does not exist");
      setTimeout(() => setError(""), 2000);
    } finally {
      setLoading(false);
    }
    fetchProducts();
  }
}, []);

 const warehouseOnlyProducts = products.filter(
  product => product.isOnlyInWarehouse
);


  // remove duplicate colors
  const seenColors = new Set();
  const uniqueProducts = [];

  products.forEach((p) => {
    if (!seenColors.has(p.Ngjyra)) {
      seenColors.add(p.Ngjyra);
      uniqueProducts.push(p);
    }
  });