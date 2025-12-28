import ProductImage from "./ProductImage";
import ProductMeta from "./ProductMeta";



const ProductHeader = ({ product }) => {
    return ( 
     <>
       <div className="flex flex-col md:flex-row justify-center gap-6 w-full">
  <ProductImage product={product} />
  <ProductMeta product={product} />
</div>

</>
     );
}

 
export default ProductHeader;