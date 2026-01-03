import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const NotFoundPage = () => {
  const [timer, setTimer] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    if (timer === 0) {
      navigate("/");
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, navigate]);

  return (
    <section className="h-screen md:bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
      <div className="text-center bg-white p-10 rounded-3xl md:shadow-xl max-w-md w-full">
        <h1 className="text-7xl font-extrabold mb-4">404</h1>
        <p className="text-2xl font-semibold mb-2">Page not found</p>
        <p className="text-gray-600">
          Redirecting to home in{" "}
          <span className="font-bold text-black">{timer}</span> seconds
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 bg-black text-white rounded-xl hover:opacity-90 transition"
        >
          Go Home Now
        </button>
      </div>
    </section>
  );
};

export default NotFoundPage;
