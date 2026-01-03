import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <section className="font-display">
      <Header />
      <Outlet />
      <Footer />
    </section>
  );
};

export default MainLayout;
