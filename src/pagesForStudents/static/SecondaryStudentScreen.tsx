import {
  MdAssignmentAdd,
  MdClass,
  MdOutlineArticle,
  MdQueryStats,
  MdQuiz,
  MdRadio,
  MdReport,
  MdSettings,
  MdStadium,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeMenuState,
  displayDelay,
  displayStaffComp,
} from "../../global/reduxState";
import pix from "../../assets/pix.jpg";
import Tooltip from "./Tooltip";
import Button from "../../components/reUse/Button";
import { CgProfile } from "react-icons/cg";
import { FaCertificate, FaPhotoFilm, FaStore, FaTable } from "react-icons/fa6";
import { useReadOneClassInfo, useStudentInfo } from "../hooks/useStudentHook";
import ClipLoader from "react-spinners/ClipLoader";
import { schoolFeePayment } from "../api/studentAPI";
import { useEffect, useState } from "react";
import {
  useSchoolData,
  useSchoolSessionData,
} from "../../pages/hook/useSchoolAuth";
import { useSchoolAnnouncement } from "../../pagesForTeachers/hooks/useTeacher";
import { readSchool } from "../../pages/api/schoolAPIs";
import { BsCash } from "react-icons/bs";
import { PiExamFill } from "react-icons/pi";

const SecondaryStudentScreen = () => {
  const dispatch = useDispatch();
  const { studentInfo } = useStudentInfo();
  const user = useSelector((state: any) => state.user);
  const showing = useSelector((state: any) => state.showStaffComp);
  const handleToggleMenuFalse = () => {
    if (!document.startViewTransition) {
      dispatch(changeMenuState(false));
    } else {
      document.startViewTransition(() => {
        dispatch(changeMenuState(false));
      });
    }
  };
  const { data } = useSchoolData();

  return (
    <div>
      <div className="mt-8 px-2 flex text-[16px] flex-col h-[90%]">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "duration-500 transition-all p-2 rounded-sm bg-blue-100 text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
              : "duration-500 transition-all p-2 rounded-sm hover:bg-blue-100 hover:text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
          }
          onClick={handleToggleMenuFalse}
        >
          Dashboard
          <MdQueryStats />
        </NavLink>
        <NavLink
          to="/my-classroom"
          className={({ isActive }) =>
            isActive
              ? "duration-500 transition-all p-2 rounded-sm bg-blue-100 text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
              : "duration-500 transition-all p-2 rounded-sm hover:bg-blue-100 hover:text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
          }
          onClick={handleToggleMenuFalse}
        >
          My ClassRoom
          <MdStadium />
        </NavLink>

        <NavLink
          to="/my-classroom-test-exam"
          className={({ isActive }) =>
            isActive
              ? "duration-500 transition-all p-2 rounded-sm bg-blue-100 text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
              : "duration-500 transition-all p-2 rounded-sm hover:bg-blue-100 hover:text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
          }
          onClick={handleToggleMenuFalse}
        >
          Test & Examination
          <PiExamFill />
        </NavLink>

        <NavLink
          to="/your-subjects"
          className={({ isActive }) =>
            isActive
              ? "duration-500 transition-all p-2 rounded-sm bg-blue-100 text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
              : "duration-500 transition-all p-2 rounded-sm hover:bg-blue-100 hover:text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
          }
          onClick={handleToggleMenuFalse}
        >
          My Subjects
          <FaTable />
        </NavLink>
        <NavLink
          to="/your-profile"
          className={({ isActive }) =>
            isActive
              ? "duration-500 transition-all p-2 rounded-sm bg-blue-100 text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
              : "duration-500 transition-all p-2 rounded-sm hover:bg-blue-100 hover:text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
          }
          onClick={handleToggleMenuFalse}
        >
          My Profile
          <CgProfile />
        </NavLink>
        <NavLink
          to="/my-finances"
          className={({ isActive }) =>
            isActive
              ? "duration-500 transition-all p-2 rounded-sm bg-blue-100 text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
              : "duration-500 transition-all p-2 rounded-sm hover:bg-blue-100 hover:text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
          }
          onClick={handleToggleMenuFalse}
        >
          My Financials
          <BsCash />
        </NavLink>
        {/* 
        <NavLink
          to="/lesson"
          className={({ isActive }) =>
            isActive
              ? "duration-500 transition-all p-2 rounded-sm bg-blue-100 text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
              : "duration-500 transition-all p-2 rounded-sm hover:bg-blue-100 hover:text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
          }
          onClick={handleToggleMenuFalse}
        >
          Practice Quiz
          <MdQuiz />
        </NavLink> */}

        <NavLink
          to="/learning"
          className={({ isActive }) =>
            isActive
              ? "duration-500 transition-all p-2 rounded-sm bg-blue-100 text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
              : "duration-500 transition-all p-2 rounded-sm hover:bg-blue-100 hover:text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
          }
          onClick={handleToggleMenuFalse}
        >
          NEXT Teach
          <MdQuiz />
        </NavLink>

        {/* {studentInfo?.classAssigned.includes("SSS 3") ? ( */}
        {studentInfo ? (
          <NavLink
            // to="/CBT"
            to={"/CBT"}
            className={({ isActive }) =>
              isActive
                ? "duration-500 transition-all p-2 rounded-sm bg-blue-100 text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
                : "duration-500 transition-all p-2 rounded-sm hover:bg-blue-100 hover:text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
            }
            onClick={handleToggleMenuFalse}
          >
            <span>
              CBT <span className="text-[11px] font-bold">For SSS 3 Only</span>
            </span>
            <MdQuiz />
          </NavLink>
        ) : (
          <div
            // to="/CBT"
            // to={studentInfo?.classAssigned === "SSS 3" && "/CBT"}
            className={`duration-500 transition-all p-2 rounded-sm hover:bg-blue-100 hover:text-black cursor-pointer font-medium my-[3px] flex items-center justify-between `}
            onClick={handleToggleMenuFalse}
          >
            <span>
              CBT <span className="text-[11px] font-bold">For SSS 3 Only</span>
            </span>
            <MdQuiz />
          </div>
        )}

        <NavLink
          to="/lesson"
          className={({ isActive }) =>
            isActive
              ? "duration-500 transition-all p-2 rounded-sm bg-blue-100 text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
              : "duration-500 transition-all p-2 rounded-sm hover:bg-blue-100 hover:text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
          }
          onClick={handleToggleMenuFalse}
        >
          Lessons
          <MdClass />
        </NavLink>

        <NavLink
          to="/articles"
          className={({ isActive }) =>
            isActive
              ? "duration-500 transition-all p-2 rounded-sm bg-blue-100 text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
              : "duration-500 transition-all p-2 rounded-sm hover:bg-blue-100 hover:text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
          }
          onClick={handleToggleMenuFalse}
        >
          Article
          <MdOutlineArticle />
        </NavLink>

        <NavLink
          to="/assignment"
          className={({ isActive }) =>
            isActive
              ? "duration-500 transition-all p-2 rounded-sm bg-blue-100 text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
              : "duration-500 transition-all p-2 rounded-sm hover:bg-blue-100 hover:text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
          }
          onClick={handleToggleMenuFalse}
        >
          Assignments
          <MdAssignmentAdd />
        </NavLink>

        <NavLink
          to="/gallary"
          className={({ isActive }) =>
            isActive
              ? "duration-500 transition-all p-2 rounded-sm bg-blue-100 text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
              : "duration-500 transition-all p-2 rounded-sm hover:bg-blue-100 hover:text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
          }
          onClick={handleToggleMenuFalse}
        >
          Gallery
          <FaPhotoFilm />
        </NavLink>

        <NavLink
          to="/report"
          className={({ isActive }) =>
            isActive
              ? "duration-500 transition-all p-2 rounded-sm bg-blue-100 text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
              : "duration-500 transition-all p-2 rounded-sm hover:bg-blue-100 hover:text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
          }
          onClick={handleToggleMenuFalse}
        >
          Report
          <MdReport />
        </NavLink>

        <NavLink
          to="/complain"
          className={({ isActive }) =>
            isActive
              ? "duration-500 transition-all p-2 rounded-sm bg-blue-100 text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
              : "duration-500 transition-all p-2 rounded-sm hover:bg-blue-100 hover:text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
          }
          onClick={handleToggleMenuFalse}
        >
          Complain
          <MdRadio />
        </NavLink>

        <NavLink
          to="/result"
          className={({ isActive }) =>
            isActive
              ? "duration-500 transition-all p-2 rounded-sm bg-blue-100 text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
              : "duration-500 transition-all p-2 rounded-sm hover:bg-blue-100 hover:text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
          }
          onClick={handleToggleMenuFalse}
        >
          Result History
          <FaCertificate />
        </NavLink>

        <NavLink
          to="/store"
          className={({ isActive }) =>
            isActive
              ? "duration-500 transition-all p-2 rounded-sm bg-blue-100 text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
              : "duration-500 transition-all p-2 rounded-sm hover:bg-blue-100 hover:text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
          }
          onClick={handleToggleMenuFalse}
        >
          Store
          <FaStore />
        </NavLink>

        <div className="flex-1" />

        <NavLink
          to="/your-settings"
          className={({ isActive }) =>
            isActive
              ? "mt-10 duration-500 transition-all p-2 rounded-sm bg-blue-100 text-black cursor-pointer font-medium my-[4px] flex items-center justify-between "
              : "mt-10 duration-500 transition-all p-2 rounded-sm  flex items-center justify-between hover:bg-blue-100 hover:text-black cursor-pointer font-medium my-[4px]"
          }
          onClick={handleToggleMenuFalse}
        >
          Settings
          <MdSettings />
        </NavLink>
      </div>
    </div>
  );
};

export default SecondaryStudentScreen;
