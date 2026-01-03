import React from "react";
import { Link } from "react-router";
const SearchResult = ({ pageN, setPage, data }) => {
  const pageHandler = (type) => {
    setPage((prev) => {
      if (type === "next" && data?.length > 0) return prev + 1;
      if (type === "prev" && prev > 1) return prev - 1;
      return prev;
    });
  };

  return (
    <div className="flex flex-col gap-2 mt-3.5">
      {data?.length !== 0 ? (
        data?.map((product) => (
          <div key={product._id}>
            <Link
              to={`/product/${product._id}`}
              className="text-xl p-3 font-semibold border-b h-fit flex justify-center border-[#074946] "
            >
              {product.name}
            </Link>
          </div>
        ))
      ) : (
        <h1 className="text-2xl font-semibold flex justify-center ">
          No result{" "}
        </h1>
      )}
      <div className="flex justify-center gap-4 mb-5 mt-2">
        <button
          className="
        px-5 py-2 rounded-lg font-semibold cursor-pointer
        bg-[#C1DCDC] text-gray-800
        hover:bg-[#A8CFCF] active:scale-[0.97]
        disabled:bg-gray-300 disabled:cursor-not-allowed
        transition
      "
          disabled={pageN === 1}
          onClick={() => pageHandler("prev")}
        >
          Back
        </button>

        <button
          className="
        px-5 py-2 rounded-lg font-semibold cursor-pointer
        bg-[#C1DCDC] text-gray-800
        hover:bg-[#A8CFCF] active:scale-[0.97]
        disabled:bg-gray-300 disabled:cursor-not-allowed
        transition
      "
          disabled={data.length === 0}
          onClick={() => pageHandler("next")}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchResult;
