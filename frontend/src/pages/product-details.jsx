import { useParams, useSearchParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import ProductCard from "../components/ProductCard";
import StockTable from "../components/StockTable";
import ProductHeader from "../components/ProductHeader";
import ThemeToggle from "../components/ThemeToggle";
import OnBoardingTip from "../components/OnBoardingTip.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import api from "../api/axios.js";

const ProductDetails = () => {
  const { styleNumber } = useParams();
  const [searchParams] = useSearchParams();
  const color = searchParams.get("color");
  const colorCode = searchParams.get("colorCode");

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [data, setData] = useState(null);
  const [variantLoading, setVariantLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const stockRef = useRef(null);

  /* =========================
     Fetch stock details
     ========================= */
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);

        const res = await api.get("/stock/details", {
          params: { styleNumber, color, colorCode },
        });

        setData(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
        setVariantLoading(false);
      }
    };

    fetchDetails();
  }, [styleNumber, color, colorCode]);

  /* =========================
     Fetch single product (Mongo)
     ========================= */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const res = await api.get("/products/by-identity", {
          params: { styleNumber, color, colorCode },
        });

        setProduct(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [styleNumber, color, colorCode]);

  /* =========================
     Fetch all variants
     ========================= */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products/by-style", {
          params: { styleNumber },
        });

        setProducts(res.data.variants);
      } catch (err) {
        console.error(err);
      } finally {
        setVariantLoading(false);
      }
    };

    fetchProducts();
  }, [styleNumber]);

  /* =========================
     Scroll to stock table
     ========================= */
  useEffect(() => {
    if (!stockRef.current) return;

    const yOffset = -80;
    const y =
      stockRef.current.getBoundingClientRect().top +
      window.pageYOffset +
      yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  }, [color, colorCode]);

  if (!data) {
    return (
      <div className="w-full">
        <div className="min-h-screen flex items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-600 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  /* =========================
     Remove duplicate colors
     ========================= */
  const seenColors = new Set();
  const uniqueProducts = [];

  products.forEach((p) => {
    if (!seenColors.has(p.Ngjyra) && p.Ngjyra?.trim() !== color?.trim()) {
      seenColors.add(p.Ngjyra);
      uniqueProducts.push(p);
    }
  });

  return (
    <>
      {/* Nav Bar */}
      <nav className="sticky top-0 z-40 h-12 bg-white/90 border-b border-gray-200 dark:bg-[#0b132b]/90 dark:border-white/10 backdrop-blur">
        <div className="max-w-screen-xl mx-auto px-4 h-full flex items-center justify-end">
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="relative">
              <Link
                to="/"
                className="
                  flex items-center gap-2
                  text-sm font-medium
                  px-3 py-1.5
                  rounded-md
                  bg-green-500/60
                  hover:bg-green-500/40
                  dark:bg-blue-500/50
                  dark:hover:bg-blue-500/40
                  text-white
                  transition
                "
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xs" />
                <span>New Search</span>
              </Link>
              <OnBoardingTip
                text={"You can search new products by pressing this button"}
                storageKey={"onboarding_product_search_tip_seen"}
              />
            </div>
          </div>
        </div>
      </nav>

      <div className="p-2">
        <ProductHeader product={product} />

        <div className="relative">
          {variantLoading && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/30 rounded-xl">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-600 border-t-transparent"></div>
            </div>
          )}

          <div ref={stockRef}>
            <StockTable data={data} />
          </div>
        </div>

        <div className="productsContainer w-full gap-6 mt-10">
          {uniqueProducts.map((p) => (
            <ProductCard
              key={p.ArtikulliId}
              product={p}
              onSelect={() => setVariantLoading(true)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
