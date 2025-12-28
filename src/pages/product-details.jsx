import { useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import StockTable from "../components/StockTable";
import ProductHeader from "../components/ProductHeader";

const ProductDetails = () => {

const { styleNumber } = useParams();
const [ searchParams ] = useSearchParams();
  const color = searchParams.get("color");
  const colorCode = searchParams.get("colorCode");

  const [product, setProduct] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async ()=> {
        try {
            setLoading(true);
            const res = await fetch (
                  `${import.meta.env.VITE_API_URL}/api/stock/details?styleNumber=${styleNumber}&color=${color}&colorCode=${colorCode}`
            );
            if(!res.ok) {
                throw new Error('Failed to fetch product details')
            }
             const json = await res.json();
             setData(json);
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false);
        }
    }
    fetchDetails();
  }, [styleNumber, colorCode, color]);

  useEffect(() => {
    const API = import.meta.env.VITE_API_URL;
    const fetchProduct = async () => {
              try {
        const res = await fetch(`${API}/api/products/by-identity?styleNumber=${styleNumber}&color=${color}&colorCode=${colorCode}`);
    
        if (!res.ok) throw new Error("Failed to fetch product info from MongoDB");
    
        const data = await res.json();
        setProduct(data);
    
      } catch (err) {
        console.error(err);
      }
    }
    fetchProduct();
  }, [styleNumber, colorCode, color])
  console.log(product);

        if (!data) {
        return <div className="w-full">
    <div className="min-h-screen flex items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-600 border-t-transparent"></div>
    </div>
</div>
}

          return (  
            <div className="p-2">
            <ProductHeader product={product}/>
            <StockTable data={data}/>
            </div>
);
}
 
export default ProductDetails;