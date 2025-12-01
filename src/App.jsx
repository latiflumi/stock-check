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


    return (
  <> <HandleInput 
  styleNumber={styleNumber} 
  handleChange={handleChange} 
  handleSubmit={handleSubmit} /> 
  {products.map((p) => (
    <ProductCard key={p.ArtikulliId} product={p} />
))}
  </>
    );
  };

  export default App;
