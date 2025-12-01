const ProductCard = ({ product }) => {
    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.src = `/src/images/default.jpg`;
    };

    return (
         <div className="productCard theme-box border border-gray-700 rounded-xl shadow-lg p-4 hover:bg-gray-700 
         transition-all duration-500 ease-out">
          <img 
            src={ `/src/images/${product.NumriSerik}_${product.KodiNgjyres}_1.jpg` }
            alt="Product Image"
            width="100"
            onError={handleImageError}
          />
          <div className="productInfo">
            <h2 className="text-m font-bold mb-6 text-start">{product.Pershkrimi}</h2>
            <p>Brendi: {product.PershkrimiBrendit}</p>
            <p>Ngjyra: {product.Ngjyra}</p>
            <p>Gjinia: {product.Gender}</p>
            <p>Kategoria: {product.Kategoria}</p>
          </div>
        </div>
     );
}
 
export default ProductCard;