import { useEffect, useState } from "react";
const api = import.meta.env.VITE_API;
export const useFetchProducts = (page, limit, search, price) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [data, setData] = useState(null);
  const [dataSearch, setDataSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDataSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsError("");
        const params = new URLSearchParams({
          page,
          limit,
        });

        if (dataSearch) params.append("t", dataSearch);
        if (price > 0) params.append("price", price);

        const res = await fetch(`${api}/api/products?${params.toString()}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        if (res.ok) {
          setData(data);
        } else {
          setIsError("Something went wrong");
        }
      } catch (error) {
        setIsError(error.message || error.msg || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, limit, dataSearch, price]);

  return { isLoading, isError, data };
};
