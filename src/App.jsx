  import { useState } from "react";
  import { Routes, Route } from "react-router-dom";
  import ProductDetails from "./pages/product-details.jsx";
  import Home from './pages/home.jsx'


  const App = () => {
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

    if (!res.ok) throw new Error("Failed to fetch stock");

    const data = await res.json();
    setProducts(data.variants);

  } catch (err) {
    console.error(err);
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
<Routes>
  <Route
    path="/"
    element={
      <Home
        searchValue={searchValue}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        uniqueProducts={uniqueProducts}
      />
    }
  />
  <Route path="/product/:styleNumber" element={<ProductDetails />} />
</Routes>
</>
    );
  };

  export default App;
