import { Outlet } from "react-router-dom";
import Header from "./Static/Header";
import Footer from "../mainPage/Footer";
import { useEffect } from "react";
import { getStarted } from "../pages/api/schoolAPIs";
import Footer2 from "../LandingPage1/Static/Footer";

const LandingLayout = () => {
  useEffect(() => {
    // getStarted();
  }, []);
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LandingLayout;
