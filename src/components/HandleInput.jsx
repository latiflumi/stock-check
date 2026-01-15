const HandleInput = ({ searchValue, handleChange, handleSubmit }) => {
  return (
    <div className="theme-box mt-4 p-6 sm:p-8 w-full max-w-md mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        {" "}
        Search Products{" "}
      </h1>
      <form
        id="searchForm"
        className="flex flex-row sm:flex-row gap-3"
        onSubmit={handleSubmit}
      >
        <input
          value={searchValue}
          onChange={handleChange}
          type="text"
          placeholder="Serial Number or EAN..."
          className="flex-1 w-[420px]
  rounded-lg px-4 py-3
  border
  bg-white text-gray-900 border-gray-300
  focus:border-blue-500 focus:outline-none
  dark:bg-gray-900 dark:text-gray-200 dark:border-gray-600"
        />

        <button
          type="submit"
          className=" bg-green-500/60 hover:bg-green-500 dark:bg-blue-600/60 dark:hover:bg-blue-600
  text-white px-6 py-3 rounded-lg
  transition shadow-md"
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
