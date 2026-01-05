import { Link } from "react-router-dom";

const ProductCard = ({ product, onSelect }) => {
    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.src = `/images/default.jpg`;
    };

    return (
      <Link to={ `/product/${product.NumriSerik}?color=${product.Ngjyra}&colorCode=${product.KodiNgjyres}`} onClick={onSelect}>
      <div className="productCard theme-box border border-gray-700 rounded-xl shadow-lg p-4 hover:bg-gray-700 
         transition-all duration-500 ease-out">
          <img 
            src={ `/images/${product.NumriSerik}_${product.KodiNgjyres}_1.jpg` }
            alt="Product Image"
            width="100"
            onError={handleImageError}
          />
          <div className="productInfo">
            <h2 className="text-m font-bold mb-6 text-start">{product.Pershkrimi}</h2>
            <p>Brand: {product.PershkrimiBrendit}</p>
            <p>Color: {product.Ngjyra}</p>
            <p>Gender: {product.Gender}</p>
            <p>Category: {product.Kategoria}</p>
          </div>
        </div>
        </Link>
     );
}

 
export default ProductCard;