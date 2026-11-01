import Header from "./Header";
import { Outlet } from "react-router-dom";
import WelcomePage from "../Pages/WelcomePage";
import Teachers from "../Pages/Teachers";
import Footer2 from "../Pages/Footer2";
import Scroll from "./Scroll";
import Contact from "../Pages/Contact";
// import Gallery from "../Pages/Gallery";
const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <WelcomePage />
      <Teachers />
      {/* <Gallery/> */}
      <Contact />
      <Scroll />
      <Footer2 />
    </div>
  );
};

export default Layout;
