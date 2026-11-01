import { FaPhone, FaX } from "react-icons/fa6";
import { IoIosTime, IoIosTimer } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import img from "../../assets/favBest.png";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { capitalizeWords } from "./WelcomePage";
import { useSchoolDataByName } from "../../pages/hook/useSchoolAuth";
import moment from "moment";

const Footer = () => {
  const { schoolName } = useParams();
  const { schoolInfo } = useSchoolDataByName(capitalizeWords(schoolName));
  return (
    <div className="w-full bg-white h-[45vh] flex justify-center items-center mt-14">
      <div className="w-[90%] h-full flex justify-around items-center flex-col">
        <div className="text-center grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-[10px] h-[20vh] w-[400px] p-6 ">
            <div className="mb-[15px] flex">
              <div className="mr-[10px] w-[70px] h-[70px] rounded-[50%] shadow-md bg-blue-950 text-[white] font-[700] flex justify-center items-center overflow-hidden ">
                <img
                  src={schoolInfo?.avatar ? schoolInfo?.avatar : img}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="font-[600] ">
                <p className="text-start">{schoolInfo?.schoolName}</p>
                <p className="text-start text-[12px]">The Best for You</p>
              </div>
            </div>
            <div className="font-[400] ">
              <p className="text-start mt-8 opacity-75">
                {schoolInfo?.bio
                  ? schoolInfo?.bio
                  : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur recusandae nostrum dolorem placeat necessitatibus Ipsam!"}
              </p>
            </div>
          </div>
          <div className="rounded-[10px] h-[25vh] p-6 ">
            <div className="mb-[15px] flex">
              <div className="mr-[10px] w-[50px] h-[50px] rounded-[50%] shadow-md bg-blue-900 text-[white] font-[700] flex justify-center items-center">
                <FaPhone className="text-white" />
              </div>
              <div className="font-[200]">
                <p className="text-start mb-2 text-[13px]">Call</p>
                <p className=" font-bold">+23499494949</p>
              </div>
            </div>
            <div className="mb-[15px] flex">
              <div className="mr-[10px] w-[50px] h-[50px] rounded-[50%] shadow-md bg-blue-900 text-[white] font-[700] flex justify-center items-center">
                <IoIosTimer className="text-white" />
              </div>
              <div className="font-[200]">
                <p className="text-start mb-2 text-[13px]">Work Time</p>
                <p className=" font-bold">Mon - Fri 8 AM - 5 PM</p>
              </div>
            </div>
            <div className="mb-[15px] flex">
              <div className="mr-[10px] w-[50px] h-[50px] rounded-[50%] shadow-md bg-blue-900 text-[white] font-[700] flex justify-center items-center">
                <CiLocationOn className="text-white" />
              </div>
              <div className="font-[200]">
                <p className="text-start mb-2 text-[13px]">Address</p>
                <p className="text-start font-bold text-[13px] leading-tight">
                  {schoolInfo?.address}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-[10px] p-6 md:col-span-2 xl:col-span-1">
            <div className="mb-[15px] flex justify-between items-center flex-col">
              <div className="flex items-center gap-4">
                <a
                  className="cursor-pointer text-[20px] text-blue-950 w-[40px] h-[40px] rounded-full bg-slate-100 flex justify-center items-center hover:bg-slate-200 transition-all duration-300 "
                  href={`${schoolInfo?.schoolName}`}
                >
                  <FaFacebookSquare />
                </a>
                <a className="cursor-pointer text-[20px] text-blue-950 w-[40px] h-[40px] rounded-full bg-slate-100 flex justify-center items-center hover:bg-slate-200 transition-all duration-300 ">
                  <FaX />
                </a>
                <a className="cursor-pointer text-[20px] text-blue-950 w-[40px] h-[40px] rounded-full bg-slate-100 flex justify-center items-center hover:bg-slate-200 transition-all duration-300 ">
                  <FaInstagramSquare />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className=" text-start mt-2 text-[12px] text-blue-950 mb-2 ">
          Copyrights ©{" "}
          <span className="font-medium">{moment(Date.now()).year()}</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
