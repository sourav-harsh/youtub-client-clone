import { Link, NavLink } from "react-router-dom";
import ThemeButton from "./ThemeButton.tsx";
import { useContext, useEffect, useState } from "react";
import { ThemeProvider } from "../context/theme.ts";
import { UserContext } from "../context/user.tsx";

export default function Navbar() {
  const [theme, setTheme] = useState("light");

  // @ts-ignore
  const { user , setUser} = useContext(UserContext);

  const toggleTheme = () => {
    const toggleStatus = (theme === "light" ? "dark" : "light");
    setTheme(toggleStatus);
    localStorage.setItem("youtube-toggle:theme", toggleStatus);
  };

  useEffect(() => {
    document.querySelector("html")?.classList.remove("light", "dark");
    document.querySelector("html")?.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const theme = localStorage.getItem("youtube-toggle:theme");
    const cachedUser = localStorage.getItem("youtube-user:user");
    if (theme) {
      setTheme(theme);
    }
    if(cachedUser){
      setUser(JSON.parse(cachedUser));
    }
  }, []);

  return (
    <ThemeProvider value={{ theme, toggleTheme }}>
      <header className="shadow sticky z-50 top-0">
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-600 dark:text-white">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link to="/" className="flex items-center">
              <img
                src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
                className="mr-3 h-12"
                alt="Logo"
              />
            </Link>
            <div className="flex items-center lg:order-2">
              <div className={user ? "hidden" : ""}>
                <Link
                  to="/login"
                  className=" text-gray-700 dark:text-white hover:text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >
                 Sign Up
                </Link>
              </div>
              <div className={user?'':'hidden'}>
                <Link to="/dashboard" className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">
                 Welcome, {user?.fullName}
                </Link>
              </div>
              <ThemeButton />
            </div>
            <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive ? "text-orange-700 dark:text-orange-500" : "text-gray-700 dark:text-white"} hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 dark:hover:text-orange-500 lg:p-0`}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive ? "text-orange-700 dark:text-orange-500" : "text-gray-700 dark:text-white"} hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 dark:hover:text-orange-500 lg:p-0`}
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive ? "text-orange-700 dark:text-orange-500" : "text-gray-700 dark:text-white"} hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 dark:hover:text-orange-500 lg:p-0`}
                  >
                    Contact Us
                  </NavLink>
                </li>
                  <li>
                  <NavLink
                    to="/video"
                    className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive ? "text-orange-700 dark:text-orange-500" : "text-gray-700 dark:text-white"} hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 dark:hover:text-orange-500 lg:p-0`}
                  >
                    Video
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </ThemeProvider>
  );
}
