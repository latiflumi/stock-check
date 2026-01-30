import { Link } from "react-router-dom";

const ProductCard = ({ product, onSelect, layout = "grid" }) => {
    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.src = `/images/default.jpg`;
    };

      const isRow = layout === "row";

    return (
    <Link
  to={`/product/${product.NumriSerik}?color=${product.Ngjyra}&colorCode=${product.KodiNgjyres}`}
  onClick={onSelect}
  className="block"
>
  <div
    className={`
      theme-box
      transition-all
      rounded-xl
      p-4
      flex
      ${isRow ? "flex-row gap-4" : "flex-col"}
      hover:bg-slate-200/60
      dark:hover:bg-gray-700
    `}
  >
    {/* IMAGE */}
    <div
      className={`
        overflow-hidden
        rounded-lg
        bg-black/5
        ${isRow ? "w-24 h-32 flex-shrink-0" : "w-full aspect-[3/4] mb-3"}
      `}
    >
      <img
        src={`/images/${product.NumriSerik}_${product.KodiNgjyres}_1.jpg`}
        onError={handleImageError}
        className="w-full h-full object-contain"
      />
    </div>

    {/* INFO */}
    <div className="flex flex-col gap-1 text-sm">
      <h2 className="font-semibold leading-tight line-clamp-2">
        {product.Pershkrimi}
      </h2>

      <p className="opacity-70">Brand: {product.PershkrimiBrendit}</p>
      <p>Color: {product.Ngjyra}</p>
      <p>Gender: {product.Gender}</p>
      <p className="font-medium">Category: {product.Kategoria}</p>
    </div>
  </div>
</Link>
  );
};

 
export default ProductCard;