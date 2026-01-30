import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProductDetails from "./pages/product-details.jsx";
import Login from "./pages/login";
import Home from "./pages/home.jsx";
import ProductsPage from "./pages/products-page.jsx"

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
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/products/" element={<ProductsPage />} />
          <Route path="/product/:styleNumber" element={<ProductDetails />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
