import React from "react";
import { Link, NavLink } from "react-router";

const Links = [
  {
    label: "Products",
    path: "products",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        viewBox="0 0 122.88 114.58"
      >
        <title>product</title>
        <path d="M118.13,9.54a3.25,3.25,0,0,1,2.2.41,3.28,3.28,0,0,1,2,3l.57,78.83a3.29,3.29,0,0,1-1.59,3L89.12,113.93a3.29,3.29,0,0,1-2,.65,3.07,3.07,0,0,1-.53,0L3.11,105.25A3.28,3.28,0,0,1,0,102V21.78H0A3.28,3.28,0,0,1,2,18.7L43.89.27h0A3.19,3.19,0,0,1,45.63,0l72.5,9.51Zm-37.26,1.7-24.67,14,30.38,3.88,22.5-14.18-28.21-3.7Zm-29,20L50.75,64.62,38.23,56.09,25.72,63.17l2.53-34.91L6.55,25.49V99.05l77.33,8.6V35.36l-32-4.09Zm-19.7-9.09L56.12,8,45.7,6.62,15.24,20l16.95,2.17ZM90.44,34.41v71.12l25.9-15.44-.52-71.68-25.38,16Z" />
      </svg>
    ),
  },
  {
    label: "Orders",
    path: "orders",
    icon: (
      <svg
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 128.12 106.26"
      >
        <title>shopping-basket</title>
        <path d="M6.45,30.68h14a7.88,7.88,0,0,1,1-1.66L41.68,3.23a7.89,7.89,0,1,1,12.44,9.71L40.22,30.68H88.08L74,12.75A7.89,7.89,0,0,1,86.47,3L106.65,28.8a8,8,0,0,1,1.1,1.88h13.92a6.45,6.45,0,0,1,6.45,6.45V51a6.45,6.45,0,0,1-1.89,4.55h0a6.41,6.41,0,0,1-4.54,1.89H117l-2.27,43.13a6.11,6.11,0,0,1-1.74,4h0a5.66,5.66,0,0,1-4,1.68H21.57a5.52,5.52,0,0,1-3.78-1.48l-.2-.17a6.5,6.5,0,0,1-1.79-3.88L11.25,57.47H6.45A6.45,6.45,0,0,1,0,51V37.13a6.45,6.45,0,0,1,6.45-6.45ZM79.34,64.26h8.17a.89.89,0,0,1,.88.89V92.1a.89.89,0,0,1-.88.89H79.34a.88.88,0,0,1-.88-.89V65.15a.88.88,0,0,1,.88-.89ZM60,64.26h8.16a.89.89,0,0,1,.89.89V92.1a.89.89,0,0,1-.89.89H60a.89.89,0,0,1-.89-.89V65.15a.89.89,0,0,1,.89-.89Zm-19.37,0h8.17a.88.88,0,0,1,.88.89V92.1a.88.88,0,0,1-.88.89H40.61a.89.89,0,0,1-.88-.89V65.15a.89.89,0,0,1,.88-.89Zm71.12-6.79H16.54L21,100.2a1.12,1.12,0,0,0,.29.67l.05,0a.31.31,0,0,0,.19.06H109a.43.43,0,0,0,.3-.12h0a.78.78,0,0,0,.22-.52l2.26-42.86ZM121.67,36H6.45a1.18,1.18,0,0,0-1.17,1.17V51a1.2,1.2,0,0,0,1.17,1.17H121.67a1.14,1.14,0,0,0,.82-.34h0a1.14,1.14,0,0,0,.34-.82V37.13A1.18,1.18,0,0,0,121.67,36Z" />
      </svg>
    ),
  },
];

const SlideMenu = () => {
  return (
    <div className="py-10">
      <h1 className="text-3xl text-center font-bold text-black mb-10">
        Green Mind
      </h1>
      <div className="flex flex-col gap-3">
        {Links.map((link) => (
          <NavLink
            to={link.path}
            key={link.path}
            replace
            className={({ isActive }) =>
              `
    block mb-2 text-lg w-[95%] font-semibold p-3
    rounded-tr-xl rounded-br-xl transition duration-300 ease-in-out
    flex items-center
    ${
      isActive
        ? "bg-[#074946] text-white"
        : "bg-[#C1DCDC] text-black hover:bg-[#074946] hover:text-white"
    }
    `
            }
          >
            <span className="mr-4">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SlideMenu;
