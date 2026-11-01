import { Link } from "react-router-dom";
import Button from "../reUse/Button";

import { useDispatch, useSelector } from "react-redux";

import pix from "../../../assets/pix.jpg";
import { useSchoolAnnouncement, useTeacherInfo } from "../../hooks/useTeacher";
import { useSchoolSessionData } from "../../../pages/hook/useSchoolAuth";
import ClipLoader from "react-spinners/ClipLoader";
import { readSchool } from "../../../pages/api/schoolAPIs";
import { useEffect, useState } from "react";
import SecondaryScreen from "./SecondaryScreen";
import Primary from "./Primary";
import {
  findStudentWidthID,
  clockIn,
  clockOut,
} from "../../../pagesForStudents/api/studentAPI";
import toast, { Toaster } from "react-hot-toast";
import { mutate } from "swr";

const Sider = () => {
  const dispatch = useDispatch();
  const toggleImage = useSelector((state: any) => state.imageToggle);
  const showing = useSelector((state: any) => state.showStaffComp);
  const { teacherInfo } = useTeacherInfo();
  const { schoolInfo } = useSchoolSessionData(teacherInfo?.schoolIDs);
  const user = useSelector((state: any) => state.schoolInfo);

  const [schoolData, setSchoolData] = useState(null);

  useEffect(() => {
    const fetchSchoolData = async () => {
      if (teacherInfo?.schoolIDs) {
        try {
          const data = await readSchool(teacherInfo.schoolIDs);

          setSchoolData(data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchSchoolData();
  }, [teacherInfo?.schoolIDs]);

  const { schoolAnnouncement } = useSchoolAnnouncement(teacherInfo?.schoolIDs);

  const [enrollmentID, setEnrollmentID] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="overflow-y-auto w-full border-r bg-white text-blue-900 flex flex-col text-[15px]">
      <div className="w-full flex px-2 mt-6 ">
        <div className=" w-16 h-16 object-cover flex border rounded-full items-center justify-center ">
          <div className=" w-16 h-16 object-cover flex border rounded-full items-center justify-center ">
            {toggleImage ? (
              <div className="flex justify-center items-center w-full h-full object-cover rounded-full border">
                <ClipLoader size={20} color="#172554" />
              </div>
            ) : (
              <img
                className="w-full h-full object-cover rounded-full border"
                src={teacherInfo?.avatar ? teacherInfo?.avatar : pix}
              />
            )}
          </div>
        </div>
        <div className="ml-2">
          {/* TODO: Add tooltip */}
          <p className="break-words font-bold">
            {teacherInfo?.schoolName.length > 16 ? (
              <p>{schoolAnnouncement?.schoolName.substring(0, 16)}...</p>
            ) : (
              // <Tooltip tip={schoolAnnouncement?.schoolName}>
              // </Tooltip>
              schoolAnnouncement?.schoolName
            )}
          </p>
          <p className="break-words font-medium text-slate-400 text-[14px] mt-2">
            ID: {teacherInfo?.enrollmentID}
          </p>
          <p className="break-words font-medium text-slate-400  text-[14px] -mt-1">
            Session:{" "}
            <span>
              {schoolAnnouncement && schoolAnnouncement?.presentSession}
            </span>
          </p>
          <p className="break-words font-medium text-[12px] my-2 -mt-1">
            Term:{" "}
            <span className="text-[12px]">
              {schoolAnnouncement && schoolAnnouncement?.presentTerm}
            </span>
          </p>
          <div className="text-[12px] font-bold">
            {teacherInfo?.staffName?.length > 16
              ? `${teacherInfo?.staffName.substring(0, 16)}...`
              : teacherInfo?.staffName}
          </div>
        </div>
      </div>

      {/* top box */}

      <div className="my-6 mx-2">
        <hr />
      </div>

      <div className="mt- px-2 text- center flex flex-col border mx-2 rounded-md py-1">
        <div className="mb-4 text-[13px] font-medium ">
          Mark students Attendance with the Button below{" "}
        </div>
        <div className="flex w-full justify-center">
          {/* <NavLink to="upgrade"> */}
          <Link to="/attendance">
            <Button
              name="Attendance"
              className="bg-black text-white border-none font-medium py-4 px-9 leading-tight"
              onClick={() => {
                // handleDisplayStaff();
              }}
            />
          </Link>

          {/* </NavLink> */}
        </div>
      </div>
      <div className="mt-2 px-2 text- center flex flex-col border mx-2 rounded-md py-1">
        <div className="mb-4 text-[12px] font-medium uppercase">
          Clocking Students
        </div>
        <div className="flex w-full justify-center">
          {/* <NavLink to="upgrade"> */}
          <div className="flex flex-col">
            <input
              className="border rounded-md h-[45px] outline-none mx-2 pl-2"
              placeholder="Student ID"
              value={enrollmentID}
              onChange={(e) => setEnrollmentID(e.target.value)}
            />
            <Button
              name={loading ? "clocking student..." : "Clock-in/Clock-Out"}
              disabled={loading}
              className={`${
                loading
                  ? "bg-red-400 cursor-not-allowed animate-pulse "
                  : "bg-red-500"
              } text-white border-none font-medium py-4 px-4 text-[12px] uppercase leading-tight`}
              onClick={() => {
                setLoading(true);

                findStudentWidthID(enrollmentID)
                  .then((res) => {
                    if (res.status === 201) {
                      if (!res.data?.data?.clockIn) {
                        clockIn(
                          res.data?.data?.schoolIDs,
                          res.data?.data?._id
                        ).then((res) => {
                          if (res.status === 201) {
                            mutate(
                              `api/view-student-info/${res.data?.data?._id}`
                            );
                            toast.success(
                              `${res.data?.studentFirstName}, has been clock in`
                            );
                          } else {
                            toast.error(
                              "student has been clocked in yet, Please try again!"
                            );
                          }
                        });
                      } else {
                        clockOut(
                          res.data?.data?.schoolIDs,
                          res.data?.data?._id
                        ).then((res) => {
                          if (res.status === 201) {
                            mutate(
                              `api/view-student-info/${res.data?.data?._id}`
                            );
                            toast.success(
                              `${res.data?.studentFirstName}, has been clock out`
                            );
                          } else {
                            toast.error(
                              "student has been clocked out yet, Please try again!"
                            );
                          }
                        });
                      }
                    } else {
                      toast.error("something went wrong");
                    }
                  })
                  .finally(() => {
                    setLoading(false);
                    setEnrollmentID("");
                  });
              }}
            />
          </div>

          {/* </NavLink> */}
        </div>
      </div>

      {/* top box */}

      {/* Settings */}
      <div>
        <Toaster />
        {schoolData?.data?.categoryType === "Secondary" ||
        schoolData?.data?.schoolTags[0]?.val === "Secondary School." ? (
          <SecondaryScreen />
        ) : (
          <Primary />
        )}
      </div>
    </div>
  );
};

export default Sider;
