  import HandleInput from "../components/handleInput.jsx";
  import ProductCard from "../components/ProductCard.jsx";

const Home = ({
  searchValue,
  handleChange,
  handleSubmit,
  uniqueProducts}) => {
  return (
    <>
      <HandleInput
        searchValue={searchValue}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      <div className="productsContainer w-full gap-6 mt-10">
        {uniqueProducts.map((p) => (
          <ProductCard key={p.ArtikulliId} product={p} />
        ))}
      </div>
    </>
  );
}
 
export default Home;