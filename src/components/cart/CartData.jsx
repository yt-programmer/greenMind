import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "react-hot-toast";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
const CartData = ({ cart, setCart, onUpdateQuantity, onRemoveItem }) => {
  const [open, setOpen] = useState(false);
  const api = import.meta.env.VITE_API;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${api}/api/orders/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          fullName: e.target.name.value,
          phone: e.target.tel.value,
          address: e.target.address.value,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Order placed successfully");
        setCart(null);
      } else {
        toast.error(data.message || "Checkout failed");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      handleClose();
    }
  };

  const totalPrice = cart?.items?.reduce((acc, item) => {
    const price = Number(item.product?.price) || 0;
    const qty = Number(item.quantity) || 0;
    return acc + price * qty;
  }, 0);

  useEffect(() => {
    if (cart?.items?.length === 0) {
      return (
        <h1 className="text-2xl font-semibold flex justify-center w-full h-40 items-center text-center px-4">
          No items in cart
        </h1>
      );
    }
  }, [cart]);

  return (
    <>
      <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 flex flex-col gap-6">
        {cart?.items?.map((item) => (
          <Link
            to={`/product/${item.product._id}`}
            key={item.product._id}
            className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4 w-full sm:w-2/3">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
              />
              <div className="flex flex-col flex-1">
                <span className="font-semibold text-md sm:text-lg">
                  {item.product.name}
                </span>
                <span className="text-gray-500 text-sm sm:text-base">
                  {item?.product?.price?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "EGP",
                  })}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 sm:mt-0 w-full sm:w-auto justify-between">
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  className="px-3 cursor-pointer py-1 bg-gray-100 hover:bg-gray-200 text-sm sm:text-base"
                  onClick={(e) => {
                    if (item.quantity > 1) {
                      onUpdateQuantity(e, item.product._id, item.quantity - 1);
                    }
                  }}
                >
                  -
                </button>
                <span className="px-4 py-1 text-sm sm:text-base">
                  {item.quantity}
                </span>
                <button
                  className="px-3 py-1 cursor-pointer bg-gray-100 hover:bg-gray-200 text-sm sm:text-base"
                  onClick={(e) =>
                    onUpdateQuantity(e, item.product._id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>

              <div className="flex gap-3 flex-col items-center justify-center">
                <button
                  className="px-3 py-1 cursor-pointer bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm sm:text-base"
                  onClick={(e) => onRemoveItem(e, item.product._id)}
                >
                  Remove
                </button>
              </div>

              <span className="font-bold text-base sm:text-lg">
                {(
                  Number(item.product.price) * Number(item.quantity)
                ).toLocaleString("en-US", {
                  style: "currency",
                  currency: "EGP",
                })}
              </span>
            </div>
          </Link>
        ))}

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 font-bold text-lg sm:text-xl">
          <span>
            Total:{" "}
            {totalPrice.toLocaleString("en-US", {
              style: "currency",
              currency: "EGP",
            })}
          </span>
          <button
            onClick={handleClickOpen}
            className="px-5 py-1 cursor-pointer bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm sm:text-base"
          >
            {" "}
            Checkout{" "}
          </button>
        </div>

        <Dialog fullWidth open={open} onClose={handleClose}>
          <DialogTitle>Buy Now</DialogTitle>
          <DialogContent>
            <DialogContentText>please enter you data to Buy.</DialogContentText>
            <form onSubmit={(e) => onSubmitHandler(e)} id="subscription-form">
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="name"
                label="Full name"
                type="name"
                fullWidth
                variant="outlined"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="tel"
                name="tel"
                label="Your Phone Num"
                type="tel"
                fullWidth
                variant="outlined"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="address"
                name="address"
                label="Your Address"
                type="text"
                fullWidth
                variant="outlined"
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" form="subscription-form">
              Buy
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default CartData;
