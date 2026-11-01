import { CiMenuFries } from "react-icons/ci";
import img from "../../assets/mainLogoW.png";
import { MdRestaurantMenu } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { BsCalendarEvent } from "react-icons/bs";
import { FaBookReader } from "react-icons/fa";
import { SlEvent } from "react-icons/sl";
import { SiGoogleclassroom } from "react-icons/si";
import { GiTeacher } from "react-icons/gi";
import { GrSchedule } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useSchoolDataByName } from "../../pages/hook/useSchoolAuth";
import { useParams } from "react-router-dom";
// import { changeToggle, changeToggleDisplay } from "../../global/reduxState";
const Header = () => {
  const dispatch = useDispatch();
  const toggle = useSelector((state: any) => state.toggle);
  const { schoolName } = useParams();
  const { schoolInfo } = useSchoolDataByName(schoolName!);

  return (
    <div className="border-b h-[70px] justify-center flex items-center w-full relative">
      <div className="w- h-[50px] justify-between flex items-center w-[95%] bg-blue-950]">
        <div className="justify-center items-center flex text-blue-950  font-[700]">
          {schoolInfo?.avatar ? (
            <img src={schoolInfo?.avatar} alt="" />
          ) : (
            <div>{schoolInfo?.schoolName}</div>
          )}
        </div>
        <div className="w-[200px] flex justify-center items-center">
          <button className="mr-[10px] hidden xl:block font-medium border py-3 rounded-md bg-blue-900 text-white sm:none px-8 text-[12px] ">
            Sign In
          </button>
        </div>
        {toggle ? (
          <div className="text-[30px] xl:hidden cursor-pointer text-blue-950">
            <MdRestaurantMenu
              // onClick={handleToggle}
              className={`transition-all duration-300`}
            />
          </div>
        ) : (
          <div className="text-[30px] xl:hidden cursor-pointer text-blue-950 font-[700]">
            <CiMenuFries
              className={`transition-all duration-300`}
              // onClick={handleToggle}
            />
          </div>
        )}
      </div>
      {toggle && (
        <div
          className={`flex w-full fixed top-0 xl:hidden z-30 ${
            toggle ? "left-0" : "-left-[30rem]"
          }`}
        >
          <div
            className={`w-[50%] h-[100vh] justify-center items-center flex absolute ${
              toggle ? "left-0" : "-left-[30rem]"
            }`}
            style={{
              background: "rgba( 143, 200, 355, 0.69 )",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba( 255, 255, 255, 0.18 )",
            }}
          >
            <div className="w-[80%] h-[90%]">
              <div className="h-[90px] w-[90px] bg-white rounded-[50%] flex justify-center items-center shadow-md ml-[60px] font-[700] text-blue-950 text-[25px]  overflow-hidden">
                <img src={img} alt="" />
              </div>
              <div className="mt-[30px] flex justify-center items-center font-[700]">
                <button className="xl:block font-[700] border p-2 rounded-md bg-blue-900 text-white  hover:bg-white hover:text-blue-950 duration-300 transition-all">
                  Register
                </button>
              </div>
              <div className="border mt-[40px] flex justify-between items-center font-[700] p-2 hover:bg-white rounded-[20px] cursor-pointer transition-all duration-300">
                <p>Home</p>
                <FaHome className="text-[25px] text-blue-950" />
              </div>

              <div className="mt-[30px] flex justify-between items-center font-[700] p-2 hover:bg-white rounded-[20px] cursor-pointer transition-all duration-300">
                <p>Events</p>
                <BsCalendarEvent className="text-[25px] text-blue-950" />
              </div>
              <div className="mt-[30px] flex justify-between items-center font-[700] p-2 hover:bg-white rounded-[20px] cursor-pointer transition-all duration-300">
                <p>Event Single</p>
                <SlEvent className="text-[25px] text-blue-950" />
              </div>
              <div className="mt-[30px] flex justify-between items-center font-[700] p-2 hover:bg-white rounded-[20px] cursor-pointer transition-all duration-300">
                <p>Schedule</p>
                <GrSchedule className="text-[25px] text-blue-950" />
              </div>
              <div className="mt-[30px] flex justify-between items-center font-[700] p-2 hover:bg-white rounded-[20px] cursor-pointer transition-all duration-300">
                <p>Classes</p>
                <SiGoogleclassroom className=" text-[25px] text-blue-950" />
              </div>
              <div className="mt-[30px] flex justify-between items-center font-[700] p-2 hover:bg-white rounded-[20px] cursor-pointer transition-all duration-300">
                <p>Teachers</p>
                <GiTeacher className="text-[25px] text-blue-950" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
