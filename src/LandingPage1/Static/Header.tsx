import { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import logo from "../../assets/mainLogoW.png";
import logo2 from "../../../public/favW.png";
import { Link, NavLink } from "react-router-dom";
import BtnProps from "../Props/BtnProps";
import ThemeButton from "./ThemeButton";

const Header = () => {
  document.title = "Welcome";
  const [drop, setDrop] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setDrop(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="h-[70px] w-full flex justify-center items-center shadow-md fixed top-0 z-50 bg-blue-950">
        <div className="h-[90%] w-[99%] flex justify-between items-center">
          <div className="w-full flex  justify-between items-center ">
            <div className="flex items-center gap-16">
              <div className=" ml-3">
                <img
                  src={logo}
                  alt=""
                  className="hidden md:block  h-[40px] object-contain"
                />
                <img
                  src={logo}
                  alt=""
                  className=" block md:hidden h-[30px] object-contain"
                />
              </div>
              <div className="hidden uppercase font-medium  items-center text-[17px] gap-[30px] text-white md:flex">
                {/* <NavLink to="/" className=" cursor-pointer navhover">
                  <div>Home</div>
                </NavLink> */}
                {/* <NavLink to="/features" className=" cursor-pointer navhover">
                  <div>Features</div>
                </NavLink> */}

                {/* <NavLink
                to=""
                className="flex gap-1 cursor-pointer transition-all duration-500 navhover"
              >
                <div>About Us</div>
                <FaAngleDown className="mt-[6px]" /> 
                {toggleFunction2 ? <FaAngleDown /> : <FaAngleUp />
              </NavLink> */}
              </div>
            </div>
            <Link
              to="/auth/login"
              className="mr-5  text-[12px] md:text-[15px] font-medium"
              style={{ zIndex: "20px" }}
            >
              <button className=" py-2 px-6 bg-white rounded-md">
                Get Started
              </button>
            </Link>
          </div>

          <div className="flex justify-center items-center gap-3">
            <div
              className="text-[18px] font-bold cursor-pointer relative md:hidden"
              onClick={() => {
                setDrop(!drop);
              }}
            >
              {drop ? (
                <FaTimes
                  className="text-[30px] text-white mr-2 transition-all duration-300"
                  onClick={() => {
                    setDrop(true);
                  }}
                />
              ) : (
                <AiOutlineMenu
                  onClick={() => {
                    setDrop(false);
                  }}
                  className="text-[30px] text-white mr-2 transition-all duration-300"
                />
              )}
            </div>

            <div
              className={`md:hidden w-[100%] h-[calc(120px-70px)] text-black absolute bg-blue-950  flex justify-center -z-20 items-center py-[10px] transition-all duration-300 ${
                drop ? "top-[70px] right-0" : "-top-[100px] right-0"
              }`}
            >
              <div
                className={`flex pb-3 items-center text-[18px] gap-[30px] ${
                  drop ? "text-white" : "text-blue-950"
                } md:hidden`}
              >
                <NavLink to="/" className=" cursor-pointer navhover">
                  <div>Home</div>
                </NavLink>
                <NavLink to="/features" className=" cursor-pointer navhover">
                  <div>Features</div>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
