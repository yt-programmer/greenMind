import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import SlideMenu from "../components/Admin/SlideMenu";

const AdminPage = () => {
  const [open, setOpen] = useState(false);

  const Navgate = useNavigate();

  useEffect(() => {
    Navgate("products");
  }, []);

  return (
    <section className="min-h-screen flex">
      <aside className="hidden md:block w-64 bg-gray-200 ">
        <SlideMenu />
      </aside>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white  z-50
        transform transition-transform duration-300 md:hidden
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <SlideMenu />
      </aside>

      <main className="flex-1 bg-gray-100">
        <div className="md:hidden p-4 bg-white shadow flex items-center">
          <button onClick={() => setOpen(true)} className="text-xl font-bold">
            ☰
          </button>
          <h1 className="ml-4 font-semibold">Admin Panel</h1>
        </div>

        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </section>
  );
};

export default AdminPage;
