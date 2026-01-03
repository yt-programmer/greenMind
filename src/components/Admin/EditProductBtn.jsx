import React, { useState } from "react";
import { toast } from "react-hot-toast";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const EditProductBtn = ({ id }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleClickOpen = () => setOpen(true);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const { name, price, desc, inStock } = e.target;

    if (!name.value && !price.value && !desc.value && !inStock.value) {
      return toast.error("Please fill at least one field");
    }

    try {
      const body = {};

      if (name.value) body.name = name.value;
      if (price.value) body.price = Number(price.value);
      if (desc.value) body.description = desc.value;
      if (inStock.value) {
        if (inStock.value === "true" || inStock.value === "false")
          body.inStock = inStock.value;
        else return toast.error("inStock must be true or false");
      }

      const res = await fetch(
        `${import.meta.env.VITE_API}/api/products/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(body),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.err || "Failed to update product");
      }

      toast.success("Product updated successfully");
      handleClose();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <button
        onClick={handleClickOpen}
        className="mr-2 text-blue-600 font-medium"
      >
        Edit
      </button>

      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Edit Product</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Update any field you want to edit.
          </DialogContentText>

          <form id="edit-product-form" onSubmit={onSubmitHandler}>
            <TextField
              margin="dense"
              name="name"
              label="Product Name"
              fullWidth
            />

            <TextField
              margin="dense"
              name="price"
              label="Price"
              type="number"
              fullWidth
            />

            <TextField
              margin="dense"
              name="desc"
              label="Description"
              fullWidth
            />

            <TextField
              margin="dense"
              name="inStock"
              label="In Stock (true / false)"
              fullWidth
            />
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="edit-product-form">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditProductBtn;
