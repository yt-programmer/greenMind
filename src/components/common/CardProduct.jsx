import React from "react";
import { Link } from "react-router";

const CardProduct = ({ data }) => {
  const api = import.meta.env.VITE_API;
  return (
    <>
      {data?.data?.products.length !== 0 ? (
        data?.data?.products.map((product) => (
          <li key={product._id} className="h-[435px] w-full md:w-[300px] p-1 ">
            <Link to={`/product/${product._id}`} className="h-full">
              <img
                src={`${api}${product.image}`}
                alt="product img"
                loading="lazy"
                className="h-[80%] w-full contain-content rounded-2xl"
              />
              <h5 className="text-[17px] pt-3 pb-1">{product.name}</h5>
              <span className="  text-gray-600">
                {" "}
                {`${product.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "EGP",
                })}`}
              </span>
            </Link>
          </li>
        ))
      ) : (
        <h1 className="text-3xl font-semibold flex justify-center w-full h-full items-center">
          No result
        </h1>
      )}
    </>
  );
};

export default CardProduct;
