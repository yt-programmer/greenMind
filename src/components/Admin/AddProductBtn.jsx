import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const AddProductBtn = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const uploadImage = async (file) => {
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "portfolio");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dpzhlzcut/image/upload",
        {
          method: "POST",
          body: data,
        },
      );

      const json = await res.json();

      if (!res.ok) throw new Error("Failed to upload image");

      return json.secure_url;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    console.log(e.target.image);

    try {
      if (e.target.price.value <= 0)
        return toast.error("Price must be at least 1");

      const fileImg = e.target.image.files[0];
      if (!fileImg) return toast.error("Please select an image");
      const img_url = await uploadImage(fileImg);

      const res = await fetch(`${import.meta.env.VITE_API}/api/products`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: e.target.nameProduct.value,
          price: e.target.price.value,
          description: e.target.desc.value,
          inStock: true,
          image: img_url,
        }),
      });

      console.log(res);
      const data = await res.json();

      console.log(data);
      if (res.ok) toast.success("Product added successfully");
      else toast.error(data.err || "please try again later");
    } catch (err) {
      toast.error(err.message || "please try again later");
    } finally {
      handleClose();
    }
  };

  return (
    <>
      <button
        onClick={handleClickOpen}
        className="px-4 py-2 bg-black text-white rounded-lg"
      >
        + Add Product
      </button>

      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            please enter data to add product.
          </DialogContentText>
          <form onSubmit={onSubmitHandler} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              name="nameProduct"
              label="Product name"
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              name="price"
              label="Product price"
              type="number"
              fullWidth
              variant="outlined"
            />

            <TextField
              autoFocus
              required
              margin="dense"
              name="desc"
              label="Product description"
              type="text"
              fullWidth
              variant="outlined"
            />

            <TextField
              autoFocus
              required
              margin="dense"
              name="image"
              type="file"
              fullWidth
              variant="outlined"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Add Product
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddProductBtn;
