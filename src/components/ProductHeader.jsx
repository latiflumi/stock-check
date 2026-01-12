import ProductImage from "./ProductImage";
import ProductMeta from "./ProductMeta";



const ProductHeader = ({ product }) => {
    return ( 
     <>
       <div className="flex flex-col items-center md:flex-row justify-center gap-8 w-full">
  <ProductImage product={product} />
  <ProductMeta product={product} />
</div>

</>
     );
}

 
export default ProductHeader;