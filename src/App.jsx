  import { useState } from "react";
  import HandleInput from "./components/handleInput";
  import ProductCard from "./components/ProductCard";


  const App = () => {
    const [searchValue, setSearchValue] = useState("");
    const [products, setProducts] = useState([]);
    const API = 'http://localhost:5000';

    // handles typing
    const handleChange = (e) => {
      setSearchValue(e.target.value);
    };

    // handles form submit
   const handleSubmit = async (e) => {
  e.preventDefault();

  // const query = searchValue.trim();
  let queryString = "";
  if(searchValue.length >= 13){
      queryString = `productBarcode=${searchValue}`
  }else {
      queryString = `styleNumber=${searchValue}`
  }
  setSearchValue('');

  if (!queryString) return;

  console.log("FETCHING:", `${API}/api/product/getproductbystyle?${queryString}`); // debug

  try {
    const res = await fetch(`${API}/api/product/getproductbystyle?${queryString}`);

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
   <HandleInput 
  searchValue ={searchValue} 
  handleChange={handleChange} 
  handleSubmit={handleSubmit} /> 
  <div className="productsContainer w-full gap-6 mt-10">{uniqueProducts.map((p) => (
    <ProductCard key={p.ArtikulliId} product={p} />
))}
</div>
</>
    );
  };

  export default App;
