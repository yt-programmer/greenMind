import { Link, useParams } from "react-router";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
const ProductPage = () => {
  const api = import.meta.env.VITE_API;
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmitHandler = async (e, id) => {
    e.preventDefault();
    if (e.target.quantity.value <= 0) {
      return toast.error("quantity from 1");
    }
    console.log(e.target.name.value);
    try {
      const res = await fetch(`${api}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          quantity: e.target.quantity.value,
          fullName: e.target.name.value,
          productId: id,
          address: e.target.address.value,
          phone: e.target.tel.value,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("success");
      } else {
        toast.error(data.err || "Something went wrong");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      handleClose();
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsError("");
        const res = await fetch(`${api}/api/products/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await res.json();
        if (!res.ok) {
          setIsError("Something went wrong");
        } else {
          setData(result);
        }
      } catch (err) {
        if (err.message) {
          setIsError(err.message || "Something went wrong");
        } else {
          setIsError("Something went wrong");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const addToCart = async (productId, quantity) => {
    try {
      const res = await fetch(`${api}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
        credentials: "include",
      });
      const result = await res.json();

      if (!res.ok) {
        toast.error(result.err || "Failed to add to cart");
      } else {
        toast.success("Product added to cart");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };
  return (
    <section className="min-h-screen relative bg-gray-50 flex items-center justify-center px-4">
      <Link
        to="/"
        className="absolute z-20 top-4 left-10 h-8 w-8 border rounded-full flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </Link>
      {isLoading && <Loading />}
      {isError && <Error err={isError} />}

      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">
        <div
          className={` ${
            !data?.data?.product.inStock
              ? "bg-red-100"
              : "bg-gradient-to-br from-emerald-100 to-emerald-200"
          } flex items-center justify-center p-10`}
        >
          <img
            loading="lazy"
            src={`${api}${data?.data?.product.image}`}
            alt={data?.data?.product.name}
            className="w-full h-[435px] max-w-sm drop-shadow-xl"
          />
        </div>

        <div className="p-8 md:p-12 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              {data?.data?.product.name}
            </h1>

            <span
              className={`px-4 py-1 text-sm rounded-full font-medium ${
                data?.data?.product.inStock
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {data?.data?.product.inStock ? "In stock" : "Out of stock"}
            </span>
          </div>

          <p className="text-2xl font-semibold text-emerald-600">
            {`${data?.data?.product.price.toLocaleString("en-US", {
              style: "currency",
              currency: "EGP",
            })}`}
          </p>

          <p className="text-gray-600 leading-relaxed">
            {data?.data?.product.description}
          </p>

          <div className="mt-auto flex gap-10  flex-col md:flex-row justify-center items-center">
            <button
              disabled={!data?.data?.product.inStock}
              onClick={() => addToCart(data?.data?.product._id, 1)}
              className="px-5 cursor-pointer py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition disabled:cursor-not-allowed disabled:opacity-40"
            >
              Add to Cart 🛒
            </button>
            <button
              disabled={!data?.data?.product.inStock}
              onClick={handleClickOpen}
              className="px-5 py-4 cursor-pointer bg-green-500  text-white disabled:cursor-not-allowed disabled:opacity-40 rounded-lg hover:bg-green-600 text-sm sm:text-base"
            >
              {" "}
              Order Now{" "}
            </button>
          </div>

          <Dialog fullWidth open={open} onClose={handleClose}>
            <DialogTitle>Buy Now</DialogTitle>
            <DialogContent>
              <DialogContentText>
                please enter you data to Buy.
              </DialogContentText>
              <form
                onSubmit={(e) => onSubmitHandler(e, data?.data?.product._id)}
                id="subscription-form"
              >
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
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="quantity"
                  name="quantity"
                  label="quantity "
                  type="number"
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
      </div>
    </section>
  );
};

export default ProductPage;
