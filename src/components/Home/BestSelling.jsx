import React, { useEffect } from "react";
import { Link } from "react-router";
import Loading from "../Loading";
import Error from "../Error";
import { useFetchProducts } from "../../Hooks/useFetchProducts";
import CardProduct from "../common/CardProduct";

const BestSelling = () => {
  const { isLoading, isError, data } = useFetchProducts(1, 3, "", "");

  return (
    <section className="my-20 ">
      <div className="container  mx-auto px-[20px] flex flex-col md:flex-row  ">
        <div className="pr-0 md:pr-22">
          <h1 className="font-bold text-3xl leading-11 mb-3">
            Best Selling <br />
            Plants
          </h1>
          <p className="text-gray-600 mb-3 tracking-wide">
            Easiest way to <br /> healthy life by buying <br /> your favorite
            plants{" "}
          </p>
          <Link
            to="/products"
            className="flex bg-[#C1DCDC] items-center w-fit py-2 px-4 gap-2 rounded-md hover:bg-[#074946] hover:text-white transition-all duration-300"
          >
            See more{" "}
            <svg
              width="21"
              height="12"
              viewBox="0 0 21 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 5.62579C0 5.46003 0.0790176 5.30106 0.21967 5.18385C0.360322 5.06664 0.551088 5.00079 0.75 5.00079H18.4395L13.719 1.06829C13.5782 0.950931 13.4991 0.791759 13.4991 0.625789C13.4991 0.45982 13.5782 0.300648 13.719 0.183289C13.8598 0.0659311 14.0508 3.91038e-09 14.25 0C14.4492 -3.91038e-09 14.6402 0.0659311 14.781 0.183289L20.781 5.18329C20.8508 5.24135 20.9063 5.31032 20.9441 5.38625C20.9819 5.46218 21.0013 5.54358 21.0013 5.62579C21.0013 5.708 20.9819 5.7894 20.9441 5.86533C20.9063 5.94126 20.8508 6.01023 20.781 6.06829L14.781 11.0683C14.6402 11.1856 14.4492 11.2516 14.25 11.2516C14.0508 11.2516 13.8598 11.1856 13.719 11.0683C13.5782 10.9509 13.4991 10.7918 13.4991 10.6258C13.4991 10.4598 13.5782 10.3006 13.719 10.1833L18.4395 6.25079H0.75C0.551088 6.25079 0.360322 6.18494 0.21967 6.06773C0.0790176 5.95052 0 5.79155 0 5.62579Z"
                fill="#1E1E1E"
              />
            </svg>
          </Link>
        </div>

        <div className="md:pt-0 pt-10 flex items-center justify-center">
          {isLoading && <Loading />}
          {isError && <Error />}
          {!isLoading &&
            !isError &&
            data &&
            data?.data?.products.length !== 0 && (
              <ul className="flex flex-wrap gap-14 md:items-center  md:justify-center ">
                <CardProduct data={data} />
              </ul>
            )}
        </div>
      </div>
    </section>
  );
};

export default BestSelling;
