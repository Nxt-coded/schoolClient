import {
  FaAngleDown,
  FaArrowDown,
  FaBarsProgress,
  FaCalendar,
  FaCertificate,
  FaPhotoFilm,
  FaStore,
  FaTable,
} from "react-icons/fa6";
import pic from "../../assets/pix.jpg";
import { useDispatch, useSelector } from "react-redux";

import {
  MdAccountCircle,
  MdAssignmentAdd,
  MdClass,
  MdClose,
  MdMenu,
  MdOutlineArticle,
  MdPeople,
  MdQueryStats,
  MdQuiz,
  MdRadio,
  MdReport,
  MdSettings,
  MdStadium,
} from "react-icons/md";
import {
  changeMenuState,
  changeToggleMenuState,
  displaySessioned,
} from "../../global/reduxState";
import { useEffect, useState } from "react";
import Session from "./Session";
import SmallPiece from "./SmallPiece";
import { useStudentInfo } from "../hooks/useStudentHook";
import { useSchoolSessionData } from "../../pages/hook/useSchoolAuth";
import ClipLoader from "react-spinners/ClipLoader";
import { CgProfile } from "react-icons/cg";
import { readSchool } from "../../pages/api/schoolAPIs";
import { BsCash } from "react-icons/bs";

const Header = () => {
  const dispatch = useDispatch();
  const toggle = useSelector((state: any) => state.toggle);
  const toggleMenu = useSelector((state: any) => state.toggleMenu);
  const toggleSession = useSelector((state: any) => state.sessionToggled);

  const toggleImage = useSelector((state: any) => state.imageToggle);

  const { studentInfo } = useStudentInfo();
  const { schoolInfo } = useSchoolSessionData(studentInfo?.schoolIDs);
  const [sess, setSess] = useState<boolean>(false);
  const initials =
    studentInfo?.studentFirstName.charAt(0).toUpperCase() +
    studentInfo?.studentLastName.charAt(0).toUpperCase();

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
  const [schoolData, setSchoolData] = useState(null);
  useEffect(() => {
    const fetchSchoolData = async () => {
      if (studentInfo?.schoolIDs) {
        try {
          const data = await readSchool(studentInfo?.schoolIDs);

          setSchoolData(data);
        } catch (error) {
          return error;
        }
      }
    };

    fetchSchoolData();
  }, [studentInfo?.schoolIDs]);

  return (
    <div
      className="h-[50px] bg-blue-50 border-b w-full flex justify-center items-center  z-10 fixed top-0 left-0 text-blue-950"
      onClick={() => {}}
    >
      {/* <div>  */}
      <div className="flex items-center  justify-end w-[90%]">
        <div className="mr-4 font-medium cursor-pointer flex items-center bg-slate-200 px-4 py-2 rounded-sm z-30">
          {" "}
          <FaCalendar />
          <span className="text-[12px] mx-1">
            Session: <span>{schoolInfo && schoolInfo[0]?.year}</span>
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
          className="flex items-center px-2 py-1 border rounded-full gap-3 duration-300 transition-all cursor-pointer z-10 bg-white shadow-sm"
          onClick={() => {
            setSess(false);

            dispatch(changeMenuState(!toggle));
            dispatch(changeToggleMenuState(false));
          }}
        >
          <div className="w-8 h-8 rounded-full border flex justify-center items-center">
            {toggleImage ? (
              <ClipLoader color="#172554" size={13} />
            ) : (
              <img
                className="w-full h-full rounded-full border object-cover"
                src={studentInfo?.avatar ? studentInfo?.avatar : pic}
              />
            )}
          </div>
          <div className="py-[5px] px-2 rounded-md border text-[13px] bg-white font-extrabold">
            {initials}
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
          toggle ? "right-6 top-14  " : "right-6 -top-56  "
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
      {/* <div className="h-[500px] overflow-y-scroll"> */}
      {toggleMenu && (
        <div
          className={`absolute md:hidden duration-300  transition-all overflow-y-auto  ${
            toggleMenu ? "right-6 top-14" : "right-6 -top-24"
          }`}
        >
          {schoolData?.data?.categoryType === "Secondary" ? (
            <div>
              <SmallPiece
                propName="navs"
                name={[
                  {
                    title: "Dashboard",
                    icon: <MdQueryStats />,
                    to: "/dashboard",
                  },
                  {
                    title: "My ClassRoom",
                    icon: <MdStadium />,
                    to: "my-classroom",
                  },
                  {
                    title: "My Subject",
                    icon: <FaTable />,
                    to: "your-subjects",
                  },
                  {
                    title: "My Profile",
                    icon: <CgProfile />,
                    to: "your-profile",
                  },
                  {
                    title: "My Financials",
                    icon: <BsCash />,
                    to: "my-finances",
                  },
                  {
                    title: "NEXT Teach",
                    icon: <MdQuiz />,
                    to: "/learning",
                  },
                  {
                    title: `CBT (For SSS 3 Only)`,
                    icon: <MdQuiz />,
                    to: studentInfo?.classAssigned?.includes("SSS 3")
                      ? "CBT"
                      : "/",
                  },
                  {
                    title: "Lessons",
                    icon: <MdClass />,
                    to: "lesson",
                  },
                  {
                    title: "Articles",
                    icon: <MdOutlineArticle />,
                    to: "articles",
                  },
                  {
                    title: "Assignments",
                    icon: <MdAssignmentAdd />,
                    to: "assignment",
                  },
                  {
                    title: "Gallaries",
                    icon: <FaPhotoFilm />,
                    to: "gallary",
                  },
                  {
                    title: "Reports",
                    icon: <MdReport />,
                    to: "report",
                  },
                  {
                    title: "Store",
                    icon: <FaStore />,
                    to: "store",
                  },
                  {
                    title: "Complain",
                    icon: <MdRadio />,
                    to: "complain",
                  },
                  {
                    title: "Result History",
                    icon: <FaCertificate />,
                    to: "result",
                  },
                  {
                    title: "Settings",
                    icon: <MdSettings />,
                    to: "your-settings",
                  },
                ]}
                but
              />
            </div>
          ) : (
            <div>
              <SmallPiece
                propName="navs"
                name={[
                  {
                    title: "Dashboard",
                    icon: <MdQueryStats />,
                    to: "/dashboard",
                  },
                  {
                    title: "My ClassRoom",
                    icon: <MdStadium />,
                    to: "my-classroom",
                  },
                  {
                    title: "My Subject",
                    icon: <FaTable />,
                    to: "your-subjects",
                  },
                  {
                    title: "My Profile",
                    icon: <CgProfile />,
                    to: "your-profile",
                  },
                  {
                    title: "My Financials",
                    icon: <BsCash />,
                    to: "my-finances",
                  },
                  {
                    title: "Articles",
                    icon: <MdOutlineArticle />,
                    to: "articles",
                  },
                  {
                    title: "Lessons",
                    icon: <MdClass />,
                    to: "lesson",
                  },
                  {
                    title: "Assignments",
                    icon: <MdAssignmentAdd />,
                    to: "assignment",
                  },
                  {
                    title: "Gallery",
                    icon: <FaPhotoFilm />,
                    to: "gallary",
                  },
                  {
                    title: "Reports",
                    icon: <MdReport />,
                    to: "report",
                  },
                  {
                    title: "Store",
                    icon: <FaStore />,
                    to: "store",
                  },
                  {
                    title: "Complain",
                    icon: <MdRadio />,
                    to: "complain",
                  },
                  {
                    title: "Result History",
                    icon: <FaCertificate />,
                    to: "result",
                  },
                  {
                    title: "Settings",
                    icon: <MdSettings />,
                    to: "your-settings",
                  },
                ]}
                but
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
