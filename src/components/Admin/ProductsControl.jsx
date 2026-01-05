import React, { useState } from "react";
import { useFetchProducts } from "../../Hooks/useFetchProducts";
import Loading from "../Loading";
import Error from "../Error";
import AddProductBtn from "./AddProductBtn";
import toast from "react-hot-toast";
import EditProductBtn from "./EditProductBtn";

const ProductsControl = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { isLoading, isError, data } = useFetchProducts(page, 10, search, "");

  const pageHandler = (type) => {
    setPage((prev) => {
      if (type === "next" && data?.data?.products?.length > 0) return prev + 1;
      if (type === "prev" && prev > 1) return prev - 1;
      return prev;
    });
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API}/api/products/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Product deleted successfully");
      } else {
        toast.error(data.err || "Something went wrong");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  const products = data?.data?.products || [];

  return (
    <section className="h-full flex flex-col gap-6 p-4 md:p-0">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Products</h2>
        <AddProductBtn />
      </div>

      <div className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row gap-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search product..."
          className="border rounded-lg px-4 py-2 w-full md:w-64"
        />
      </div>

      <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-sm text-gray-600">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Product</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {isLoading && (
              <tr>
                <td colSpan="5" className="p-6 text-center">
                  <Loading />
                </td>
              </tr>
            )}

            {isError && (
              <tr>
                <td colSpan="5" className="p-6 text-center text-red-500">
                  <Error err="Something went wrong" />
                </td>
              </tr>
            )}

            {!isLoading && products.length === 0 && (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            )}

            {products.map((product) => (
              <tr key={product._id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 rounded object-cover"
                  />
                </td>

                <td className="p-4 font-medium">{product.name}</td>

                <td className="p-4">
                  {product.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "EGP",
                  })}
                </td>

                <td className="p-4">
                  {" "}
                  <span
                    className={
                      product.inStock ? "text-green-600" : "text-red-600"
                    }
                  >
                    {product.inStock ? "Available" : "Out"}
                  </span>
                </td>

                <td className="p-4 text-right">
                  <EditProductBtn id={product._id} />
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-600 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden flex flex-col gap-4">
        {isLoading && <Loading />}
        {isError && <Error err="Something went wrong" />}

        {!isLoading && products.length === 0 && (
          <p className="text-center text-gray-500">No products found</p>
        )}

        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow p-4 flex gap-4"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 rounded-lg object-cover"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-lg">{product.name}</h3>

              <p className="text-sm text-gray-600">
                {product.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "EGP",
                })}
              </p>

              <p className="text-sm mt-1">
                Stock:{" "}
                <span
                  className={
                    product.inStock ? "text-green-600" : "text-red-600"
                  }
                >
                  {product.inStock ? "Available" : "Out"}
                </span>
              </p>

              <div className="flex gap-4 mt-3">
                <EditProductBtn id={product._id} />{" "}
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-600 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center md:justify-end gap-4 mt-4">
        <button
          disabled={page === 1}
          onClick={() => pageHandler("prev")}
          className="
            px-5 py-2 rounded-lg font-semibold
            bg-[#C1DCDC] text-gray-800
            hover:bg-[#A8CFCF]
            disabled:bg-gray-300 disabled:!cursor-not-allowed
            transition
          "
        >
          Back
        </button>

        <button
          disabled={products.length === 0}
          onClick={() => pageHandler("next")}
          className="
            px-5 py-2 rounded-lg font-semibold
            bg-[#C1DCDC] text-gray-800
            hover:bg-[#A8CFCF]
            disabled:bg-gray-300 disabled:!cursor-not-allowed
            transition
          "
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default ProductsControl;
