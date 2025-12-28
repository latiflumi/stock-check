  import { Routes, Route } from "react-router-dom";
  import ProductDetails from "./pages/product-details.jsx";
  import Home from './pages/home.jsx'


  const App = () => {
    return (
<>      
<Routes>
  <Route
    path="/"
    element={
      <Home />
    }
  />
  <Route path="/product/:styleNumber" element={<ProductDetails />} />
</Routes>
</>
    );
  };

  export default App;
