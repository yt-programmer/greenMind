import React from "react";
import Hero from "../components/Home/Hero";
import BestSelling from "../components/Home/BestSelling";
import AboutUs from "../components/Home/AboutUs";
import Categories from "../components/Home/Categories";
import Testimonials from "../components/Home/Testimonials";

const Home = () => {
  return (
    <section>
      <Hero />
      <BestSelling />
      <AboutUs />
      <Categories />
      <Testimonials />
    </section>
  );
};

export default Home;
