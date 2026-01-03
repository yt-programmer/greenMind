import React, { use, useEffect, useState } from "react";
import Loading from "../components/Loading";
import Error from "../components/Error";
import CartData from "../components/cart/CartData";
const CartPage = () => {
  const [cart, setCart] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(`${import.meta.env.VITE_API}/api/cart`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await res.json();

        if (!res.ok) {
          setError(data.err);
        } else {
          setCart(data.data.cart);
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const onUpdateQuantity = async (e, productId, newQuantity) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setError("");
      setIsLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API}/api/cart/${productId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ quantity: newQuantity }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to update quantity");
      } else {
        setCart(data.data.cart);
      }
    } catch (error) {
      setError(error.message || "An error occurred while updating quantity");
    } finally {
      setIsLoading(false);
    }
  };

  const onRemoveItem = async (e, productId) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setError("");
      setIsLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API}/api/cart/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to remove item");
      } else {
        setCart(data.data.cart);
      }
    } catch (error) {
      setError(error.message || "An error occurred while removing item");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="min-h-screen pt-[100px]">
      <div className="flex flex-col justify-center items-center h-full  px-5">
        <h1 className="text-3xl font-bold mb-12 text-center ">My Cart 🛒</h1>

        {isLoading && <Loading />}
        {error && <Error err={error} />}
        {cart && (
          <CartData
            cart={cart}
            setCart={setCart}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveItem={onRemoveItem}
          />
        )}
      </div>
    </section>
  );
};

export default CartPage;
