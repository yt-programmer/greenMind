import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router";
import toast from "react-hot-toast";

const ProtectRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/register" replace />;
  return children;
};

export default ProtectRoute;
