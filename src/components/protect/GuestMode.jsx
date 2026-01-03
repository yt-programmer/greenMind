import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const GuestMode = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user) return <Navigate to="/" replace />;

  return children;
};

export default GuestMode;
