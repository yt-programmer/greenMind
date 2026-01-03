import React, { useEffect, useState } from "react";

const FilterBar = ({ setPrice, setSearch }) => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const num = e.target.num.value;
    const search = e.target.search.value;
    setPrice(num);
    setSearch(search);
  };
  return (
    <div className="bg-[#C1DCDC] py-8">
      <div className="container mx-auto px-5">
        <form
          onSubmit={(e) => onSubmitHandler(e)}
          className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between"
        >
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <div className="flex items-center gap-2">
              <label
                htmlFor="num"
                className="text-gray-700 font-medium hidden md:block"
              >
                Price
              </label>
              <input
                type="number"
                min="0"
                name="num"
                id="num"
                placeholder="Max"
                className="
              h-10 w-28 rounded-lg px-3
              bg-white border border-gray-300
              placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-[#5FAFB0]
              transition
            "
              />
            </div>

            <div className="flex items-center gap-2">
              <label
                htmlFor="search"
                className="text-gray-700 font-medium hidden md:block"
              >
                Search
              </label>
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search products..."
                className="
              h-10 w-full md:w-64 rounded-lg px-3
              bg-white border border-gray-300
              placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-[#5FAFB0]
              transition
            "
              />
            </div>
          </div>

          <button
            type="submit"
            className=" cursor-pointer
          h-10 rounded-lg px-6 font-semibold
          bg-[#5FAFB0] text-white
          hover:bg-[#4aa3a4] active:scale-[0.97]
          transition
        "
          >
            Filter
          </button>
        </form>
      </div>
    </div>
  );
};

export default FilterBar;
