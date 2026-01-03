import React from "react";
import Loading from "../Loading";
import Error from "../Error";
import CardProduct from "../common/CardProduct";

const ProductsData = ({ loading, error, data, setPage, pageN }) => {
  const pageHandler = (type) => {
    setPage((prev) => {
      if (type === "next" && data?.data?.products?.length > 0) return prev + 1;
      if (type === "prev" && prev > 1) return prev - 1;
      return prev;
    });
  };

  const btn =
    "border border-[#074946] py-2 px-4 rounded-lg hover:bg-[#074946] hover:text-white transition-all duration-300 w-fit";

  return (
    <section className="min-h-screen px-5">
      {loading ? (
        <Loading />
      ) : error ? (
        <Error err={error} />
      ) : (
        <ul className="container justify-center mx-auto gap-6 mt-10 flex flex-wrap ">
          <CardProduct data={data} />
        </ul>
      )}

      <div className="flex justify-center  mb-6 gap-4 mt-10">
        <button
          className=" cursor-pointer
        px-5 py-2 rounded-lg font-semibold 
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
          disabled={data?.data?.products.length === 0}
          onClick={() => pageHandler("next")}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default ProductsData;
