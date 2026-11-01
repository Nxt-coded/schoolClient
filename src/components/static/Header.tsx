import {
  FaAngleDown,
  FaArrowDown,
  FaBarsProgress,
  FaCalendar,
  FaMessage,
  FaNoteSticky,
  FaSchool,
  FaSchoolFlag,
  FaStore,
} from "react-icons/fa6";

import pic from "../../assets/pix.jpg";
import { useDispatch, useSelector } from "react-redux";

import SmallPiece from "./SmallPiece";
import {
  MdAccountCircle,
  MdClose,
  MdDataExploration,
  MdMenu,
  MdPeople,
  MdQueryStats,
  MdReport,
  MdSchool,
  MdSettings,
} from "react-icons/md";
import { RiSchoolLine } from "react-icons/ri";
import {
  changeMenuState,
  changeToggleMenuState,
  displaySessioned,
} from "../../global/reduxState";
import { useState } from "react";
import Session from "./Session";
import AddSession from "./AddSession";
import {
  useComplain,
  useSchoolData,
  useSchoolSessionData,
} from "../../pages/hook/useSchoolAuth";
import ClipLoader from "react-spinners/ClipLoader";
import { FaAddressBook, FaCompressAlt, FaPhotoVideo } from "react-icons/fa";
import AddSessionTerm from "./AddSessionTerm";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const toggle = useSelector((state: any) => state.toggle);
  const toggleMenu = useSelector((state: any) => state.toggleMenu);
  const toggleImage = useSelector((state: any) => state.imageToggle);
  const toggleSession = useSelector((state: any) => state.sessionToggled);

  const session = useSelector((state: any) => state?.sessionToggle);
  const sessionTerm = useSelector((state: any) => state?.sessionTermToggle);

  const [sess, setSess] = useState<boolean>(false);

  const handleMenu = () => {
    if (!document.startViewTransition) {
      dispatch(changeToggleMenuState(!toggleMenu));
      dispatch(changeMenuState(false));
    } else {
      document.startViewTransition(() => {
        dispatch(changeToggleMenuState(!toggleMenu));
        dispatch(changeMenuState(false));
      });
    }
  };

  const { data } = useSchoolData();
  const { schoolInfo } = useSchoolSessionData(data?._id);
  const { complainData } = useComplain(data?._id);

  const complainMessage = complainData
    ?.map((el: any) => {
      return el.resolve && el.seen;
    })
    ?.filter((el: boolean) => {
      return el === false;
    })?.length;

  return (
    <div
      className={`h-[50px] ${
        data?.categoryType === "Secondary" ? "bg-blue-50" : "bg-red-50"
      } border-b w-full flex justify-center items-center  z-10 fixed top-0 left-0 text-inherit`}
      onClick={() => {}}
    >
      {/* <div>  */}
      <div className="flex items-center gap-2 justify-end w-[90%]">
        <div className="mr-4 hidden font-medium cursor-pointer xl:flex items-center justify-end px-4 py-2 gap-2 text-[13px] rounded-sm z-30">
          <RiSchoolLine className="text-[30px]" />
          <div className="xl:mt-1">{data?.categoryType}</div>
        </div>

        <Link to="/report" className="relative ml-[10px]">
          <FaMessage />
          {complainMessage > 0 && (
            <span className="-top-2 left-2 text-[11px] mt-1 bg-red-500 text-white font-bold w-4 h-4 rounded-full absolute flex justify-center items-center">
              {complainMessage >= 10 ? `10+` : complainMessage}
            </span>
          )}
        </Link>
        <div
          className="mx-2 md:mr-5 font-medium cursor-pointer flex items-center bg-slate-200 px-2 md:px-4 h-[35px] py-2 rounded-sm z-30"
          onClick={() => {
            setSess(!sess);
            dispatch(displaySessioned(!toggleSession));
          }}
        >
          {" "}
          <FaCalendar />
          <span className="text-[12px] ml-2">
            Session: <span>{schoolInfo && schoolInfo[0]?.year} </span>
          </span>
          <div className="transition-all duration-300 ">
            {toggleSession ? (
              <FaAngleDown className="-rotate-180 duration-300 transition-all" />
            ) : (
              <FaAngleDown className="-rotate-0 duration-300 transition-all" />
            )}
          </div>
        </div>

        <div
          className="flex items-center px-2 py-1 border rounded-full gap-1 md:gap-3 duration-300 transition-all cursor-pointer z-10 bg-white shadow-sm"
          onClick={() => {
            setSess(false);

            dispatch(changeMenuState(!toggle));
            dispatch(changeToggleMenuState(false));
          }}
        >
          <div className="w-8 h-8  rounded-full border flex justify-center items-center">
            {toggleImage ? (
              <ClipLoader color="#172554" size={13} />
            ) : (
              <img
                className="w-full h-full rounded-full border object-cover"
                src={data?.avatar ? data?.avatar : pic}
              />
            )}
          </div>

          {toggle ? (
            <FaArrowDown className="rotate-180 duration-300 transition-all" />
          ) : (
            <FaArrowDown className="rotate-0 duration-300 transition-all" />
          )}
        </div>

        <div className=" md:hidden text-[30px] cursor-pointer ml-3  duration-300 transition-all">
          {toggleMenu ? (
            <MdClose
              className="duration-500 transition-all"
              onClick={handleMenu}
            />
          ) : (
            <MdMenu
              className="duration-500 transition-all"
              onClick={handleMenu}
            />
          )}
        </div>
      </div>

      {/* </div> */}

      <div
        className={`absolute duration-300 transition-all ${
          toggle ? "right-6 top-14  " : "right-6 -top-80  "
        }`}
      >
        <SmallPiece
          propName="account"
          name={[
            { title: "Account", icon: <MdAccountCircle />, to: "settings" },
          ]}
          log
        />
      </div>

      <div
        className={`absolute duration-300 transition-all ${
          toggleSession ? "right-24 top-14  " : "right-24 -top-56  "
        }`}
      >
        <Session />
      </div>

      {session && (
        <div className=" absolute top-0 right-0 w-full md:w-[calc(100%-250px)] backdrop-blur-md  flex items-center justify-center h-screen">
          <AddSession />
        </div>
      )}
      {data?.session?.length === 0 && (
        <div className=" absolute top-0 right-0 w-full md:w-[calc(100%-250px)] backdrop-blur-md  flex items-center justify-center h-screen">
          <AddSession />
        </div>
      )}

      {sessionTerm && (
        <div className=" absolute top-0 right-0 w-full md:w-[calc(100%-250px)] backdrop-blur-md  flex items-center justify-center h-screen">
          <AddSessionTerm />
        </div>
      )}

      {toggleMenu && (
        <div
          className={`absolute md:hidden duration-300 transition-all ${
            toggleMenu ? "right-6 top-14  " : "right-6 -top-24  "
          }`}
        >
          {data?.categoryType === "Secondary" ? (
            <SmallPiece
              propName="navs"
              name={[
                {
                  title: "Dashboard",
                  icon: <MdQueryStats />,
                  to: "/",
                },
                {
                  title: "View Staffs",
                  icon: <MdPeople />,
                  to: "view-staff",
                },
                {
                  title: "View Students",
                  icon: <FaBarsProgress />,
                  to: "view-students",
                },
                {
                  title: "View Classrooms",
                  icon: <FaSchool />,
                  to: "class-room",
                },
                {
                  title: "View Subjects",
                  icon: <MdSchool />,
                  to: "subjects",
                },
                {
                  title: "Complains",
                  icon: <MdReport />,
                  to: "report",
                },
                {
                  title: "Scheme of Work",
                  icon: <FaSchoolFlag />,
                  to: "schemes",
                },
                {
                  title: "Lesson Notes",
                  icon: <FaNoteSticky />,
                  to: "lesson-note",
                },
                {
                  title: "Gallery",
                  icon: <FaPhotoVideo />,
                  to: "view-gallery",
                },
                {
                  title: "Store",
                  icon: <FaStore />,
                  to: "store",
                },
                {
                  title: "History",
                  icon: <MdDataExploration />,
                  to: "result-history",
                },
                {
                  title: "Result History",
                  icon: <FaAddressBook />,
                  to: "view-student-result-history",
                },
                {
                  title: "Settings",
                  icon: <MdSettings />,
                  to: "settings",
                },
              ]}
              but
            />
          ) : (
            <SmallPiece
              propName="navs"
              name={[
                {
                  title: "Dashboard",
                  icon: <MdQueryStats />,
                  to: "/",
                },
                {
                  title: "View Staffs",
                  icon: <MdPeople />,
                  to: "view-staff",
                },
                {
                  title: "View Students",
                  icon: <FaBarsProgress />,
                  to: "view-students",
                },
                {
                  title: "View Classrooms",
                  icon: <FaSchool />,
                  to: "class-room",
                },
                {
                  title: "View Subjects",
                  icon: <MdSchool />,
                  to: "subjects",
                },
                {
                  title: "Complains",
                  icon: <MdReport />,
                  to: "report",
                },
                {
                  title: "Lesson Notes",
                  icon: <FaNoteSticky />,
                  to: "lesson-note",
                },
                {
                  title: "Gallery",
                  icon: <FaPhotoVideo />,
                  to: "view-gallery",
                },
                {
                  title: "Store",
                  icon: <FaStore />,
                  to: "store",
                },
                {
                  title: "Scheme of Work",
                  icon: <FaSchoolFlag />,
                  to: "schemes",
                },
                {
                  title: "History",
                  icon: <MdDataExploration />,
                  to: "result-history",
                },
                {
                  title: "Result History",
                  icon: <FaAddressBook />,
                  to: "view-student-result-history",
                },
                {
                  title: "Settings",
                  icon: <MdSettings />,
                  to: "settings",
                },
              ]}
              but
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
