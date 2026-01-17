const ProductImage = ({ product }) => {
  const imageSrc = `/images/${product?.NumriSerik}_${product?.KodiNgjyres}_1.jpg`;

  const handleImageError = (e) => {
    e.currentTarget.src = `/images/default.jpg`;
  };
  return (
<div className="hidden md:flex w-[360px] items-center justify-center">
      <img
        src={imageSrc}
        alt="Product Image"
        onError={handleImageError}
        className="max-h-[520px] object-contain rounded-2xl"
      />
    </div>
  );
};

 
export default ProductImage;