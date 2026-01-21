import ProductImage from "./ProductImage";
import ProductMeta from "./ProductMeta";



const ProductHeader = ({ product, data }) => {
    return ( 
     <>
       <div className="flex flex-col items-center md:flex-row justify-center gap-8 w-full">
  <ProductImage product={product} />
  <ProductMeta data={data} product={product} />
</div>

</>
     );
}

 
export default ProductHeader;