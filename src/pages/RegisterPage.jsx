import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const RegisterPage = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const api = import.meta.env.VITE_API;

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (e.target.password.value !== e.target.confirmPassword.value) {
        toast.error("Passwords do not match");
        return;
      }
      const res = await fetch(`${api}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: e.target.name.value,
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.err);
      } else {
        setUser(data.data.newUser);
        toast.success(data.status);
        navigate("/");
        console.log(data);
      }
    } catch (error) {
      toast.error(error.message || error.msg || "Something went wrong");
    }

    e.target.reset();
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#C1DCDC] px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Create your account
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Welcome! Please fill in your details
          </p>
        </div>

        <form className="space-y-4" onSubmit={(e) => onSubmitHandler(e)}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full name
            </label>
            <input
              required
              name="name"
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5FAFB0]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              required
              name="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5FAFB0]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              required
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5FAFB0]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              required
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5FAFB0]"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer  bg-[#5FAFB0] hover:bg-[#4aa3a4] text-white py-2 rounded-md font-semibold transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-sm text-gray-700 text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#5FAFB0] hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default RegisterPage;
