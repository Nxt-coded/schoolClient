import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import logo from "../assets/mainLogoW.png";
import fb from "../assets/fb.png";
import ig from "../assets/ig.png";
import twitter from "../assets/twitter.png";
import linkden from "../assets/linkden.png";
import { FaArrowUp } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full bg-[#1e1e1e] flex justify-center items-center flex-col relative">
      <div className="w-[85%] py-[20px] text-white grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4">
        <div className="flex justify-center items-center">
          <div className="p-[20px] flex justify-center items-center flex-col gap-3">
            <img
              src={logo}
              alt=""
              className="w-[150px] h-[100px] object-contain"
            />
            <div className="text-center">
              Innovating Education, Just for you!
            </div>
          </div>
        </div>
        <div className="py-[20px] col-span-3 grid grid-cols-2 md:grid-cols-3">
          <div className="h-full p-[30px]">
            <div className="mb-[10px] font-semibold text-[22px]">Socials</div>
            <ul>
              <li>Instagram</li>
              <li>Linkden</li>
              <li>X</li>
              <li>Facebook</li>
              <li>Discord</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-[80%] py-[30px] flex flex-col md:justify-between">
        <p>
          Copyright © 2024 &nbsp; <span className="font-bold">NEXT</span> &nbsp;
          - All rights reserved
        </p>
        <div className="flex">
          <div className="py-1 px-2 rounded-full hover:cursor-pointer hover:hoverbounce">
            <img src={fb} alt="" className="w-[35px] h-[35px] object-cover" />
          </div>
          <div className="py-1 px-2 rounded-full hover:cursor-pointer hover:hoverbounce">
            <img
              src={linkden}
              alt=""
              className="w-[35px] h-[35px] object-cover"
            />
          </div>
          <div className="py-1 px-2 rounded-full hover:cursor-pointer hover:hoverbounce">
            <img src={ig} alt="" className="w-[35px] h-[35px] object-cover  " />
          </div>
          <div className="py-1 px-2 rounded-full hover:cursor-pointer hover:hoverbounce">
            <img
              src={twitter}
              alt=""
              className="w-[35px] h-[35px] object-cover "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
