import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

// Layout wrapper that applies a global background, includes the Navbar and renders the current route content using <Outlet />
const Layout = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
