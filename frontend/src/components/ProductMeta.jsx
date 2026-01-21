const ProductMeta = ({ product, data }) => {
  const imageSrc = `/images/${product?.NumriSerik}_${product?.KodiNgjyres}_1.jpg`;

  const handleImageError = (e) => {
    e.currentTarget.src = `/images/default.jpg`;
  };

  const org = data?.organisations?.[0] ?? null;

  const price = org?.price ?? null;
  const discountPrice = org?.discountPrice ?? null;
  const discount = org?.discount ?? 0;

  const hasDiscount =
    price != null &&
    discountPrice != null &&
    discount > 0 &&
    discountPrice < price;

  return (
    <div
      className=" w-100
      theme-box
      p-4
      hover:bg-slate-200/60
      dark:hover:bg-gray-700
      transition-colors"
    >
      <img
        src={imageSrc}
        onError={handleImageError}
        className="block md:hidden mb-3 rounded-xl w-full object-contain"
      />

      <div>
        <h2 className="text-xl w-full font-bold">{product?.Pershkrimi}</h2>

        <p><strong>Brand:</strong> {product?.PershkrimiBrendit}</p>
        <p><strong>StyleNumber:</strong> {product?.NumriSerik}</p>
        <p><strong>Color:</strong> {product?.Ngjyra}</p>
        <p><strong>Gender:</strong> {product?.Gender}</p>
        <p><strong>Category:</strong> {product?.Kategoria}</p>
        <p className="whitespace-normal break-words">
          <strong>Composition:</strong> {product?.PershkrimiShtes}
        </p>

        <br />

        <p className="text-lg flex items-center gap-2">
          <strong>Price:</strong>

          {price == null ? (
            <span className="text-gray-400 italic">No price available</span>
          ) : hasDiscount ? (
            <>
              <span className="text-gray-400 line-through text-sm">
                {price.toFixed(2)}€
              </span>

              <span className="font-semibold text-red-600">
                {discountPrice.toFixed(2)}€
              </span>

              <span className="text-xs text-green-600 font-medium">
                -{discount}%
              </span>
            </>
          ) : (
            <span className="font-semibold">
              {price.toFixed(2)}€
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default ProductMeta;
