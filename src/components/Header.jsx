import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const api = import.meta.env.VITE_API;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const logout = () => {
    fetch(`${api}/api/users/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    navigate("/");
  };
  const LINKS = !user
    ? [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Contact", path: "/contact" },
      ]
    : user && user.role === "admin"
    ? [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Contact", path: "/contact" },
        { name: "Admin", path: "/grdhb26" },
      ]
    : [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Contact", path: "/contact" },
      ];

  const userLinks = user
    ? [{ name: "Logout", action: logout }]
    : [
        { name: "Login", path: "/login" },
        { name: "Register", path: "/register" },
      ];

  const openMenu = () => {
    setOpen((prev) => !prev);
    setIsOpen(false);
  };

  const openUserMenu = () => {
    setIsOpen((prev) => !prev);
    setOpen(false);
  };

  return (
    <header className="h-[80px] bg-white ">
      <div className="container h-full items-center px-[20px] mx-auto flex justify-between items-center h-[60px]">
        <div className="flex items-center justify-center gap-[80px]">
          <Link to="/" className="font-italic">
            GreenMind
          </Link>
          <ul className="hidden gap-3 md:flex">
            {LINKS.map((link) => (
              <li key={link.name}>
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-center gap-6">
          <div className="pt-1  md:hidden">
            <button className="cursor-pointer" onClick={openMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            <div>
              {open && (
                <div className="absolute z-50 animate-fade  top-[80px] right-[20px] w-[200px] bg-white shadow-2xl rounded-md py-4 px-6">
                  <ul>
                    {LINKS.map((link) => (
                      <li
                        key={link.name}
                        className="mb-4 border-b pb-4 border-b-gray-300"
                      >
                        <Link to={link.path}>{link.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <Link to="cart" className="">
            <svg
              width="20"
              height="20"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0.75C0 0.551088 0.0790176 0.360322 0.21967 0.21967C0.360322 0.0790176 0.551088 0 0.75 0H3C3.1673 4.62172e-05 3.32977 0.056026 3.4616 0.159037C3.59342 0.262048 3.68701 0.406176 3.7275 0.5685L4.335 3H21.75C21.8601 3.0001 21.9689 3.02445 22.0685 3.07133C22.1682 3.1182 22.2563 3.18644 22.3266 3.27121C22.3969 3.35597 22.4477 3.45518 22.4753 3.56178C22.5029 3.66838 22.5068 3.77976 22.4865 3.888L20.2365 15.888C20.2043 16.0599 20.1131 16.2151 19.9786 16.3268C19.8442 16.4386 19.6749 16.4998 19.5 16.5H6C5.82515 16.4998 5.65585 16.4386 5.52137 16.3268C5.38688 16.2151 5.29567 16.0599 5.2635 15.888L3.015 3.9105L2.415 1.5H0.75C0.551088 1.5 0.360322 1.42098 0.21967 1.28033C0.0790176 1.13968 0 0.948912 0 0.75ZM4.653 4.5L6.6225 15H18.8775L20.847 4.5H4.653ZM7.5 16.5C6.70435 16.5 5.94129 16.8161 5.37868 17.3787C4.81607 17.9413 4.5 18.7044 4.5 19.5C4.5 20.2956 4.81607 21.0587 5.37868 21.6213C5.94129 22.1839 6.70435 22.5 7.5 22.5C8.29565 22.5 9.05871 22.1839 9.62132 21.6213C10.1839 21.0587 10.5 20.2956 10.5 19.5C10.5 18.7044 10.1839 17.9413 9.62132 17.3787C9.05871 16.8161 8.29565 16.5 7.5 16.5ZM18 16.5C17.2043 16.5 16.4413 16.8161 15.8787 17.3787C15.3161 17.9413 15 18.7044 15 19.5C15 20.2956 15.3161 21.0587 15.8787 21.6213C16.4413 22.1839 17.2043 22.5 18 22.5C18.7956 22.5 19.5587 22.1839 20.1213 21.6213C20.6839 21.0587 21 20.2956 21 19.5C21 18.7044 20.6839 17.9413 20.1213 17.3787C19.5587 16.8161 18.7956 16.5 18 16.5ZM7.5 18C7.89782 18 8.27936 18.158 8.56066 18.4393C8.84196 18.7206 9 19.1022 9 19.5C9 19.8978 8.84196 20.2794 8.56066 20.5607C8.27936 20.842 7.89782 21 7.5 21C7.10217 21 6.72064 20.842 6.43934 20.5607C6.15804 20.2794 6 19.8978 6 19.5C6 19.1022 6.15804 18.7206 6.43934 18.4393C6.72064 18.158 7.10217 18 7.5 18ZM18 18C18.3978 18 18.7794 18.158 19.0607 18.4393C19.342 18.7206 19.5 19.1022 19.5 19.5C19.5 19.8978 19.342 20.2794 19.0607 20.5607C18.7794 20.842 18.3978 21 18 21C17.6022 21 17.2206 20.842 16.9393 20.5607C16.658 20.2794 16.5 19.8978 16.5 19.5C16.5 19.1022 16.658 18.7206 16.9393 18.4393C17.2206 18.158 17.6022 18 18 18Z"
                fill="#1E1E1E"
              />
            </svg>
          </Link>
          <div>
            <button onClick={openUserMenu} className="cursor-pointer">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 12C13.1935 12 14.3381 11.5259 15.182 10.682C16.0259 9.83807 16.5 8.69347 16.5 7.5C16.5 6.30653 16.0259 5.16193 15.182 4.31802C14.3381 3.47411 13.1935 3 12 3C10.8065 3 9.66193 3.47411 8.81802 4.31802C7.97411 5.16193 7.5 6.30653 7.5 7.5C7.5 8.69347 7.97411 9.83807 8.81802 10.682C9.66193 11.5259 10.8065 12 12 12ZM15 7.5C15 8.29565 14.6839 9.05871 14.1213 9.62132C13.5587 10.1839 12.7956 10.5 12 10.5C11.2044 10.5 10.4413 10.1839 9.87868 9.62132C9.31607 9.05871 9 8.29565 9 7.5C9 6.70435 9.31607 5.94129 9.87868 5.37868C10.4413 4.81607 11.2044 4.5 12 4.5C12.7956 4.5 13.5587 4.81607 14.1213 5.37868C14.6839 5.94129 15 6.70435 15 7.5ZM21 19.5C21 21 19.5 21 19.5 21H4.5C4.5 21 3 21 3 19.5C3 18 4.5 13.5 12 13.5C19.5 13.5 21 18 21 19.5ZM19.5 19.494C19.4985 19.125 19.269 18.015 18.252 16.998C17.274 16.02 15.4335 15 12 15C8.565 15 6.726 16.02 5.748 16.998C4.731 18.015 4.503 19.125 4.5 19.494H19.5Z"
                  fill="#1E1E1E"
                />
              </svg>
            </button>
            {isOpen && (
              <div className="absolute animate-fade  bg-white z-50  top-[80px] right-[20px] w-[200px] bg-white shadow-2xl rounded-md py-4 px-6">
                <ul>
                  {userLinks.map((link) => (
                    <li
                      key={link.name}
                      className="mb-4 border-b pb-4 border-b-gray-300"
                    >
                      {link.path ? (
                        <Link to={link.path}>{link.name}</Link>
                      ) : (
                        <button
                          className="cursor-pointer"
                          onClick={link.action}
                        >
                          {link.name}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
