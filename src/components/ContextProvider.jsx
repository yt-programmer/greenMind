import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getMe = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API}/api/users/me`, {
          credentials: "include",
        });
        const data = await res.json();

        if (res.ok) setUser(data.data.user);
      } catch {}
    };
    getMe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default ContextProvider;
