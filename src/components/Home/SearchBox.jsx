import Loading from "../Loading";
import Error from "../Error";
import SearchResult from "./SearchResult";

const SearchBox = ({ page, setPage, refdiv, data, isLoading, error }) => {
  return (
    <div
      ref={refdiv}
      className="h-40 animate-fade hidden relative  overflow-y-scroll no-scrollbar transition-all duration-300 trans  bg-white mt-3 rounded-xl "
    >
      <div className="flex  absolute top-2 right-2 gap-2.5">
        <button
          className=" cursor-pointer"
          onClick={() => (refdiv.current.style.display = "none")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Error err={error} />
      ) : data ? (
        <SearchResult
          pageN={page}
          setPage={setPage}
          data={data?.data?.products}
        />
      ) : null}
    </div>
  );
};

export default SearchBox;
