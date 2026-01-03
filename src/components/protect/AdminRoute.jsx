import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/not-found" replace />;

  return children;
};

export default AdminRoute;
