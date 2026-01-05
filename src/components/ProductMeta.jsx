const ProductMeta = ({ product }) => {
      const imageSrc = `/images/${product?.NumriSerik}_${product?.KodiNgjyres}_1.jpg`;

       const handleImageError = (e) => {
    e.currentTarget.src = `/images/default.jpg`;
  };

    return ( 
  <div className="w-100 border border-gray-700 rounded-xl shadow-lg p-4 bg-[#111b34] transition duration-200 hover:bg-gray-700">
  
  {/* MOBILE IMAGE */}
  <img
    src={imageSrc}
    onError={handleImageError}
    className="block md:hidden mb-3 rounded-xl w-full object-contain"
  />

  {/* PRODUCT INFO */}
  <div>
    <h2 className="text-xl pb-4 font-bold">{product?.Pershkrimi}</h2>

    <p><strong>Brand:</strong> {product?.PershkrimiBrendit}</p>
    <p><strong>StyleNumber:</strong> {product?.NumriSerik}</p>
    <p><strong>Color:</strong> {product?.Ngjyra}</p>
    <p><strong>Gender:</strong> {product?.Gender}</p>
    <p><strong>Category:</strong> {product?.Kategoria}</p>
    <p className="whitespace-normal break-words"><strong>Composition:</strong> {product?.PershkrimiShtes}</p>
    {/* TO DO add price later */}
    {/* <p>
      <strong>Çmimi:</strong>
      <s className="ml-2">€69.99</s>
      <span className="ml-2">€39.99 (-43%)</span>
    </p> */}
  </div>
</div>
     );
}
 
export default ProductMeta;