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

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (e.target.price.value <= 0)
      return toast.error("Price must be at least 1");

    const file = e.target.image.files[0];
    if (!file) return toast.error("Please select an image");

    const form = new FormData();
    form.append("name", e.target.name.value);
    form.append("price", e.target.price.value);
    form.append("description", e.target.desc.value);
    form.append("inStock", true);
    form.append("image", file);

    try {
      const res = await fetch(`${import.meta.env.VITE_API}/api/products`, {
        method: "POST",
        credentials: "include",
        body: form,
      });

      const data = await res.json();

      console.log(res, data);
      if (res.ok) {
        toast.success("Product added successfully");
      } else {
        toast.error(data.err || "Something went wrong");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
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
          <form onSubmit={(e) => onSubmitHandler(e)} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              name="name"
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
