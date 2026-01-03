import React from "react";

const Footer = () => {
  return (
    <footer className=" bg-[#C1DCDC] p-10">
      <p className="text-center">
        Copyright &copy; {new Date().getFullYear()} GreenMind
      </p>
    </footer>
  );
};

export default Footer;
