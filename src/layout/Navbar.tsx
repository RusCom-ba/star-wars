import { useState } from "react";
import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";

// Navigation bar component that displays main navigation links, a central logo, and a responsive hamburger menu for mobile devices.
const Navbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  // Toggles the state of the hamburger menu
  const handleNavbarClick = (): void => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <>
      <div className="bg-transparent">
        {/* Desktop navigation (visible on md screens and up) */}
        <div className="hidden md:flex justify-center gap-15 text-white items-center font-medium">
          <NavLink
            to="/upcoming"
            className={({ isActive }) => (isActive ? "text-yellow-300" : "")}
          >
            Upcoming
          </NavLink>
          <NavLink
            to="/legacy"
            className={({ isActive }) => (isActive ? "text-yellow-300" : "")}
          >
            Legacy
          </NavLink>

          {/* Center logo */}
          <div className="h-32 overflow-hidden">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-full w-auto" />
            </Link>
          </div>

          <NavLink
            to="/merch"
            className={({ isActive }) => (isActive ? "text-yellow-300" : "")}
          >
            Merch
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "text-yellow-300" : "")}
          >
            About
          </NavLink>
        </div>

        {/* Mobile navigation (hamburger menu) */}
        <div className="md:hidden p-4 flex justify-between items-center">
          {/* Logo for mobile */}
          <Link to="/">
            <img src={logo} alt="Logo" className="h-13 w-auto" />
          </Link>

          {/* Hamburger button with lightsaber-style lines */}
          <div
            onClick={handleNavbarClick}
            className="cursor-pointer w-8 h-8 flex flex-col justify-between"
          >
            <span
              className={`h-1 w-full rounded bg-green-400 shadow-[0_0_10px_#00ff99] transition-transform duration-300 ${
                isNavbarOpen ? "rotate-45 translate-y-4" : ""
              }`}
            ></span>
            <span
              className={`h-1 w-full rounded bg-yellow-500 shadow-[0_0_10px_#ff0000] transition-opacity duration-300 ${
                isNavbarOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`h-1 w-full rounded bg-blue-400 shadow-[0_0_10px_#00ccff] transition-transform duration-300 ${
                isNavbarOpen ? "-rotate-45 -translate-y-3" : ""
              }`}
            ></span>
          </div>

          {/* Dropdown mobile menu */}
          <div
            onClick={() => setIsNavbarOpen(!isNavbarOpen)}
            className={`h-full absolute top-16 right-0 left-0 bg-black text-white p-8 flex flex-col items-center gap-6 transition-all duration-300 z-50 ${
              isNavbarOpen
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <NavLink to="/">Home</NavLink>
            <NavLink to="/upcoming">Upcoming</NavLink>
            <NavLink to="/legacy">Legacy</NavLink>
            <NavLink to="/merch">Merch</NavLink>
            <NavLink to="/about">About</NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
