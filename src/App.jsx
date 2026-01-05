import { Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/product-details.jsx";
import Home from "./pages/home.jsx";

const App = () => {
  return (
    <>
      <div
        className="  min-h-screen
  bg-slate-100 text-slate-800
  dark:bg-[#0b132b] dark:text-gray-200
  transition-colors"
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:styleNumber" element={<ProductDetails />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
