const HandleInput = ({ styleNumber, handleChange, handleSubmit }) => {
  return (
    <div className="theme-box mt-4 p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-700 search-card w-full max-w-md mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-white"> Kerko produktet </h1>
      <form
        id="searchForm"
        className="flex flex-row sm:flex-row gap-3"
        onSubmit={handleSubmit}
      >
        <input
          value={styleNumber}
          onChange={handleChange}
          type="text"
          placeholder="Numri serik ose Barkodi"
          className="flex-1 w-[420px] border border-gray-600 rounded-lg px-4 py-3 bg-gray-900 text-gray-200 focus:border-blue-500 focus:outline-none"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg transition shadow-md sm:mt-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default HandleInput;
