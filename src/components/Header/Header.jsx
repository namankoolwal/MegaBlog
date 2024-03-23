import React, { useEffect, useState } from "react";
import { LogoutBtn, Logo } from "../index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const [userName, setUserName] = useState({});

  useEffect(() => {
    if (userData) {
      setUserName(userData.userData ? userData.userData : userData);
    }
  }, [userData, authStatus]);

  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "About",
      slug: "/about",
      active: true,
    },

    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Posts",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "My Post",
      slug: "/my-post",
      active: authStatus,
    },
  ];

  const navItemSecond = [
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
  ];
  return (
    <>
      <header className="sticky top-0 w-full py-2 bg-white z-40">
        <nav className="mx-auto flex md:max-w-7xl items-baseline justify-between px-2 md:px-4 py-2 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center space-x-2">
            <span>
              <Link to="/">
                <Logo width="70px" />
              </Link>
            </span>
          </div>
          <div className="block">
            <ul className="flex items-center justify-center space-x-3 md:space-x-8">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <NavLink
                      to={item.slug}
                      style={({ isActive }) => ({
                        textDecoration: isActive ? "underline" : null,
                      })}
                      className={`text-[10px] md:text-base font-semibold text-gray-800 hover:text-gray-950 `}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ) : null
              )}
            </ul>
          </div>

          {!authStatus && (
            <div className="block">
              <ul className="inline-flex space-x-4">
                {navItemSecond.map((item) =>
                  item.active ? (
                    <li key={item.name}>
                      <button
                        onClick={() => navigate(item.slug)}
                        className={`bg-black text-white text-sm md:text-base font-semibold py-1 md:py-2 px-2 md:px-4 rounded-md shadow-md transition duration-150 hover:scale-[1.01]`}
                      >
                        {item.name}
                      </button>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          )}

          {authStatus && (
            <div className="block space-x-[2px] md:space-x-2">
              <span
                className={`inline-block rounded-full border px-1 md:px-2 py-1 md:py-2 text-center text-[10px] md:text-sm md:font-semibold text-black  hover:scale-[1.02]`}
                title={userName.email}
              >
                {userName.name?.split(" ")[0]}
              </span>{" "}
              <LogoutBtn />
            </div>
          )}
        </nav>
      </header>

    </>
  );
};

export default Header;
