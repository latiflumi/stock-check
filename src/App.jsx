  import { useState } from "react";
  import HandleInput from "./components/handleInput";
  import ProductCard from "./components/ProductCard";


  const App = () => {
    const [styleNumber, setStyleNumber] = useState("");
    const [products, setProducts] = useState([]);

    // handles typing
    const handleChange = (e) => {
      setStyleNumber(e.target.value);
    };

    // handles form submit
    const handleSubmit = async (e) => {
    e.preventDefault();
    setStyleNumber('');

    try {
      const res = await fetch("http://localhost:5000/getStockByStyle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          styleNumber: styleNumber
        }),
      });

      if (!res.ok) throw new Error("Failed to fetch stock");

      const data = await res.json();
      setProducts(data.products);

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
  styleNumber={styleNumber} 
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
