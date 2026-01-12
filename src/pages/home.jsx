import { useState } from "react";
import HandleInput from "../components/handleInput.jsx";
import ProductCard from "../components/ProductCard.jsx";
import ThemeToggle from "../components/ThemeToggle.jsx";


const Home = () => {
    
     const [searchValue, setSearchValue] = useState("");
        const [products, setProducts] = useState([]);
        const API = import.meta.env.VITE_API_URL;
    
        // handles typing
        const handleChange = (e) => {
          setSearchValue(e.target.value);
        };
    
        // handles form submit
       const handleSubmit = async (e) => {
      e.preventDefault();
    
      let queryString = "";
      if(searchValue.length >= 13){
          queryString = `productBarcode=${searchValue}`
      }else {
          queryString = `styleNumber=${searchValue}`
      }
      setSearchValue('');
    
      if (!queryString) return;
    
      try {
        const res = await fetch(`${API}/api/products/by-style?${queryString}`);
    
        if (!res.ok) throw new Error("Failed to fetch product info from MongoDB");
    
        const data = await res.json();
        setProducts(data.variants);
    
      } catch (err) {
        alert('This product does not exist');
      }
    };
      const seenColors = new Set();
      const uniqueProducts = [];
    
      products.forEach(p=>{
        if(!seenColors.has(p.Ngjyra)) {
          seenColors.add(p.Ngjyra); 
          uniqueProducts.push(p); 
        }
      });
    
  return (
    <>
          {/* Nav Bar */}
          <nav
            className="sticky top-0 z-40 h-12 bg-white/90 border-b border-gray-200 dark:bg-[#0b132b]/90 dark:border-white/10 backdrop-blur"
          >
            <div className="max-w-screen-xl mx-auto px-4 h-full flex items-center justify-end">
              <div className="flex items-center gap-4">
                <ThemeToggle />
              </div>
            </div>
          </nav>
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <HandleInput
        searchValue={searchValue}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <div className="productsContainer w-full gap-6 mt-10">
        {uniqueProducts.map((p) => (
          <ProductCard key={p.ArtikulliId} product={p} />
        ))}
      </div>
    </div>
    </>
  );
}
 
export default Home;