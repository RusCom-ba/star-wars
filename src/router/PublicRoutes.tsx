import { Routes, Route } from "react-router-dom";
import Upcoming from "../pages/Upcoming";
import Legacy from "../pages/Legacy";
import Merch from "../pages/Merch";
import About from "../pages/About";
import Home from "../pages/Home";
import Layout from "../layout/Layout";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/legacy" element={<Legacy />} />
        <Route path="/merch" element={<Merch />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
