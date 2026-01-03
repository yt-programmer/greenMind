import React, { useEffect, useState } from "react";
import FilterBar from "../components/Products/FilterBar";
import ProductsData from "../components/Products/ProductsData";
import { useFetchProducts } from "../Hooks/useFetchProducts";

const ProductsPage = () => {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [price, setPrice] = useState(0);

  const { isLoading, isError, data } = useFetchProducts(
    page,
    10,
    search,
    price
  );

  return (
    <section className="mt-[50px]">
      <FilterBar setPrice={setPrice} setSearch={setSearch} />
      <ProductsData
        setPage={setPage}
        pageN={page}
        data={data}
        loading={isLoading}
        error={isError}
      />
    </section>
  );
};

export default ProductsPage;
