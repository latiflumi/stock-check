import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 24;
  const category = searchParams.get("category") || "";
  const gender = searchParams.get("gender") || "";

  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [genders, setGenders] = useState([]);


    useEffect(() => {
      fetchProducts();
    }, [page,limit,category,gender]);

    async function fetchProducts() {
  try {
    setLoading(true);

    const params = new URLSearchParams({
      page,
      limit,
      ...(category && { category }),
      ...(gender && { gender }),
    }); 

    const res = await fetch(`/api/allproducts?${params}`);
    const data = await res.json();

    console.log("API response:", data);
console.log("filters:", data.filters);
console.log("categories:", data.filters?.categories);

    setProducts(data.products);
    setPagination(data.pagination);

   setCategories(data.filters?.categories ?? []);
   setGenders(data.filters?.genders ?? []);
  } catch (err) {
    console.error("Failed to fetch products", err);
  } finally {
    setLoading(false);
  }
}

  // remove duplicate colors
  const seenColors = new Set();
  const uniqueProducts = [];

  products.forEach((p) => {
    if (!seenColors.has(p.Ngjyra)) {
      seenColors.add(p.Ngjyra);
      uniqueProducts.push(p);
    }
  });
  
    return (
      <>
      <select
  value={category}
  onChange={(e) => {
    const next = new URLSearchParams(searchParams);
    const value = e.target.value;

    value ? next.set("category", value) : next.delete("category");
    next.set("page", 1); // reset page when filter changes

    setSearchParams(next);
  }}
>
  <option value="">All categories</option>
  {categories.map(c => (
    <option key={c} value={c}>{c}</option>
  ))}
</select>
<select
  value={gender}
  onChange={(e) => {
    const next = new URLSearchParams(searchParams);
    const value = e.target.value;

    value ? next.set("gender", value) : next.delete("gender");
    next.set("page", 1);

    setSearchParams(next);
  }}
>
  <option value="">All genders</option>
  {genders.map(g => (
    <option key={g} value={g}>{g}</option>
  ))}
</select>
      {loading && <p>Loading…</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {uniqueProducts.map((p) => (
              <ProductCard key={p.ArtikulliId} product={p} />
            ))}
      </div>
     </>   
  )
}