import React, { useEffect } from "react";
import Error from "../Error";
import Loading from "../Loading";
import toast from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState("");
  const [page, setPage] = React.useState(1);

  const pageHandler = (type) => {
    setPage((prev) => {
      if (type === "next" && orders.length > 0) return prev + 1;
      if (type === "prev" && prev > 1) return prev - 1;
      return prev;
    });
  };

  const deleteOrder = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API}/api/orders/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Order deleted successfully");
      } else {
        toast.error(data.err || "Something went wrong");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API}/api/orders?page=${page}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setIsError(data.err);
        } else {
          setOrders(data?.data?.orders);
        }
      } catch (error) {
        setIsError(error.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [page]);
  return (
    <section className="flex flex-col gap-6 p-4">
      <h2 className="text-2xl font-bold">Orders</h2>
      {isLoading && <Loading />}
      {isError && <Error err={isError} />}

      {orders?.length === 0 && (
        <p className="text-gray-500 text-center">No orders yet</p>
      )}

      {orders?.map((order, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow p-4 flex flex-col gap-4"
        >
          <div className="border-b pb-3">
            <h3 className="font-semibold text-lg">
              {order.personData.fullName}
            </h3>
            <p className="text-sm text-gray-600">📞 {order.personData.phone}</p>
            <p className="text-sm text-gray-600">
              📍 {order.personData.address}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {order?.items.map((item) => (
              <div key={item.productId} className="flex gap-4 items-center">
                <img
                  src={`${import.meta.env.VITE_API}${item.image}`}
                  alt={item.name}
                  className="w-14 h-14 object-cover rounded-lg border"
                />

                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>

                <p className="font-semibold">
                  {item.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "EGP",
                  })}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center border-t pt-3">
            <span className="font-semibold">Total</span>
            <span className="text-lg font-bold text-green-700">
              {order.totalPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "EGP",
              })}
            </span>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              onClick={() => deleteOrder(order._id)}
              className="px-4 py-2 rounded-lg bg-black text-white hover:opacity-90"
            >
              Accept and Delete
            </button>
          </div>
        </div>
      ))}
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
          disabled={orders?.length === 0}
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

export default Orders;
