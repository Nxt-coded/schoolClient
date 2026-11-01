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
import { Link, NavLink } from "react-router-dom";
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
import {
  useSchoolAnnouncement,
  useStudentGrade,
} from "../../pagesForTeachers/hooks/useTeacher";
import { readSchool } from "../../pages/api/schoolAPIs";
import SecondaryStudentScreen from "./SecondaryStudentScreen";
import PrimaryStudentScreen from "./PrimaryStudentScreen";
import MakeOtherPayment from "../pages/report/MakeOtherPayment";
import toast, { Toaster } from "react-hot-toast";

const Sider = () => {
  const dispatch = useDispatch();

  const toggleImage = useSelector((state: any) => state.imageToggle);
  const toggleText = useSelector((state: any) => state.toggleText);
  const showing = useSelector((state: any) => state.showStaffComp);
  const { studentInfo } = useStudentInfo();
  const { schoolInfo } = useSchoolSessionData(studentInfo?.schoolIDs);
  const { schoolAnnouncement } = useSchoolAnnouncement(studentInfo?.schoolIDs);
  const { data } = useSchoolData();
  const user = useSelector((state: any) => state.user);
  const { gradeData } = useStudentGrade(studentInfo?._id);
  const { oneClass } = useReadOneClassInfo(studentInfo?.presentClassID);

  const handleToggleMenuFalse = () => {
    if (!document.startViewTransition) {
      dispatch(changeMenuState(false));
    } else {
      document.startViewTransition(() => {
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

  let termRead: string = oneClass?.presentTerm!;

  const [payment, setPayment] = useState<boolean>(false);

  return (
    <div className="overflow-y-auto w-full border-r bg-white text-blue-900 flex flex-col ">
      <Toaster />
      <div className="w-full flex px-2 mt-6 ">
        <div className=" w-16 h-16 object-cover flex border rounded-full items-center justify-center ">
          {toggleImage ? (
            <div className="flex justify-center items-center w-full h-full object-cover rounded-full border">
              <ClipLoader size={20} color="#172554" />
            </div>
          ) : (
            <img
              className="w-full h-full object-cover rounded-full border"
              src={studentInfo?.avatar ? studentInfo?.avatar : pix}
            />
          )}
        </div>
        <div className="ml-2">
          {/* TODO: Add tooltip */}
          <p className="font-bold text-left flex justify-start w-full">
            {schoolAnnouncement?.schoolName.length > 14 ? (
              <p>{schoolAnnouncement?.schoolName.substring(0, 14)}...</p>
            ) : (
              // <Tooltip tip={schoolAnnouncement?.schoolName}>
              // </Tooltip>
              schoolAnnouncement?.schoolName
            )}
          </p>
          <p className="break-words font-medium text-slate-400 text-[14px] mt-2">
            ID: {studentInfo?.enrollmentID}
          </p>
          <p className="break-words font-medium text-slate-400  text-[14px] -mt-1">
            Session:{" "}
            <span>
              {schoolAnnouncement && schoolAnnouncement?.presentSession}
            </span>
          </p>
          <p className="break-words font-bold  text-slate-400  text-[12px] mt-1">
            Term:{" "}
            <span>{schoolAnnouncement && schoolAnnouncement.presentTerm}</span>
          </p>
          <div className="text-[12px] font-bold">
            {(
              studentInfo?.studentFirstName +
              " " +
              studentInfo?.studentLastName
            )?.length > 16
              ? `${(
                  studentInfo?.studentFirstName +
                  " " +
                  studentInfo?.studentLastName
                ).substring(0, 16)}...`
              : studentInfo?.studentFirstName +
                " " +
                studentInfo?.studentLastName}
          </div>
        </div>
      </div>

      {/* top box */}

      {/* top box */}
      <div className="mt-10 px-2  center flex flex-col border mx-2 rounded-md py-4">
        <div className="mb-4 text-[13px] font-medium ">
          Never stress yourself anymore with the quest of wanting to pay your
          child's schoolfees. You can do it here at your convience!{" "}
        </div>
        <div className="flex flex-col w-full justify-center">
          {/* <NavLink to="upgrade"> */}

          <Button
            icon={
              payment && (
                <ClipLoader
                  color="white"
                  size={10}
                  className="absolute -mt-1 -ml-2"
                />
              )
            }
            name={
              <div>
                Pay School Fees
                <br />
                <p className="text-[12px]">
                  ({payment ? "Processing Request" : "Make Payment Now"})
                </p>
              </div>
            }
            className="bg-black hover:bg-neutral-800 transition-all duration-300 text-white border-none font-medium py-2  px-5 leading-tight"
            onClick={() => {
              // handleDisplayStaff();
              if (studentInfo?.parentEmail) {
                setPayment(true);

                schoolFeePayment({
                  email: studentInfo?.parentEmail,
                  // amount:
                  //   termRead === "1st Term"
                  //     ? oneClass?.class1stFee
                  //     : // oneClass?.class1stFee
                  //     termRead === "2nd Term"
                  //     ? oneClass?.class2ndFee
                  //     : termRead === "3rd Term"
                  //     ? oneClass?.class3rdFee
                  //     : null,
                  amount: gradeData?.classTermFee,
                  subAccountCode:
                    schoolInfo?.bankDetails?.schoolFeeAccountPaymentCode,
                }).then((res) => {
                  if (res.status === 200) {
                    // dispatch(paymentRef(res?.data?.data?.data?.reference));
                    // console.log(res);
                    location.replace(res?.data?.data?.data?.authorization_url);
                    setPayment(false);
                  }
                });
              } else {
                toast.error("parent email hasn't provided yet");
              }
            }}
          />
          {/* <Link to="/make-other-payments">
            <Button
              icon={
                payment && (
                  <ClipLoader
                    color="white"
                    size={10}
                    className="absolute -mt-2 -ml-2"
                  />
                )
              }
              name={
                <div>
                  Other Payments
                  <br />
                </div>
              }
              
            />
          </Link> */}
          <MakeOtherPayment />
          {/* </NavLink> */}
        </div>
      </div>
      <div className="mt-5 px-2  center flex flex-col border mx-2 rounded-md py-4">
        <div className="mb- text-[13px] font-medium "></div>
        <div className="flex w-full justify-center">
          {/* <NavLink to="upgrade"> */}

          <Button
            // icon={
            //   payment && (
            //     <ClipLoader
            //       color="white"
            //       size={10}
            //       className="absolute -mt-1 -ml-2"
            //     />
            //   )
            // }
            name={
              <div className="uppercase">
                {studentInfo?.clockIn ? "Clock In" : "Clock Out"}

                <br />
                <p className="text-[12px] normal-case">
                  (
                  {studentInfo?.clockIn
                    ? studentInfo?.clockInTime
                    : studentInfo?.clockOutTime}
                  )
                </p>
              </div>
            }
            className={`${
              studentInfo?.clockIn ? "bg-green-500" : "bg-red-500"
            }  hover:bg-red-600 transition-all duration-300 text-white border-none font-medium py-2 pl-2 pr-3 leading-tight`}
          />

          {/* </NavLink> */}
        </div>
      </div>

      {/* Nav Links */}
      <div className="w-full flex justify-center">
        <div className="transition-all duration-300 text-center text-[12px] font-medium mt-3 w-[90%] ">
          {toggleText ? (
            <div>A new staff has been added to your staff list</div>
          ) : (
            <div></div>
          )}
        </div>
      </div>

      {/* Settings */}
      <div>
        {schoolData?.data?.categoryType === "Secondary" ||
        schoolData?.data?.schoolTags[0]?.val === "Secondary School." ? (
          <SecondaryStudentScreen />
        ) : (
          <PrimaryStudentScreen />
        )}
      </div>
    </div>
  );
};

export default Sider;
