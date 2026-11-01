import { Outlet } from "react-router-dom";
import Header from "../static/Header";
import Sider from "../static/Sider";
import { useDispatch, useSelector } from "react-redux";
import AddNewStaff from "../../pages/page/staff/AddNewStaff";
import { FC, useState } from "react";
import AddNewStudent from "../../pages/page/student/AddNewStudent";

import AddAnyItem from "../static/AddAnyItems";
import { displayClass } from "../../global/reduxState";
import { createSchoolClassroom } from "../../pages/api/schoolAPIs";
import toast from "react-hot-toast";
import {
  useSchoolClassRM,
  useSchoolData,
} from "../../pages/hook/useSchoolAuth";
import { mutate } from "swr";
import BlockPaymentScreen from "../../pagesForStudents/BlockPaymentScreen";
import AddSession from "../static/AddSession";

const Layout: FC = () => {
  const { data } = useSchoolData();
  const show = useSelector((state: any) => state.showStaffComp);
  const showII = useSelector((state: any) => state.showStudent);

  const classroom = useSelector((state: any) => state.classroomToggled);
  const dispatch = useDispatch();

  const [classRM, setClassRM] = useState<string>("");
  const [num1, setNumb1] = useState<number>(0);
  const [num2, setNumb2] = useState<number>(0);
  const [num3, setNumb3] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(false);
  const [approved, setApproved] = useState<boolean>(false);

  const handleDisplaySubjectOff = () => {
    if (!document.startViewTransition) {
      dispatch(displayClass(false));
    } else {
      document.startViewTransition(() => {
        dispatch(displayClass(false));
      });
    }
  };

  //createSchoolClassroom

  const handleCreateClassRoom = () => {
    const validateClass = (input: string): string => {
      const classPattern =
        /^(JSS|SSS|KG|Nursery|kindergarten|Basic|BASIC|Primary)\s[1-6][A-Z]$|^Nur\s[1-6]$|^Pry\s[1-6]$|^KG\s[1-6]$|^SSS\s[1-3](SCIENCE|ART|COMMERCIAL|TECHNICAL)$/;

      if (classPattern.test(input)) {
        setApproved(true);

        toast.success(
          `${input} has been successfully added to your class list`
        );
        return input.toUpperCase();
      } else {
        setApproved(false);
        console.log(classRM, approved);
        toast.error(
          "Invalid class format. Example: 'JSS 2A' or 'SSS 1E' or 'JSS 2'!"
        );
        return input.toUpperCase();
      }
    };

    try {
      // if (approved) {
      setLoading(true);
      createSchoolClassroom(data?._id, {
        className: validateClass(classRM.toUpperCase()),
        // className: classRM,
        class1stFee: num1,
        class2ndFee: num2,
        class3rdFee: num3,
      })
        .then((res: any) => {
          if (res.status === 201) {
            mutate(`api/view-classrooms/`);
            setLoading(false);
            handleDisplaySubjectOff();
          } else {
            setLoading(false);
            toast.error(`${res.response.data.message}`);
          }
        })
        .finally(() => {
          setLoading(false);
        });
      // }
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="flex w-[100%] ">
      <div
        className={`md:flex w-[250px] h-[100vh] fixed hidden  transition-all duration-300 z-50 
          ${
            data?.categoryType === "Secondary"
              ? "text-blue-900"
              : "text-green-900"
          }`}
      >
        <Sider />
      </div>

      <div className="flex w-[calc(100%)] justify-end">
        <div className="flex flex-col w-[100%] transition-all duration-300 md:w-[calc(100%-250px)] justify-end">
          <Header />
          <div
            className={`min-h-[calc(100vh-72px)] p-4 m-2 border rounded-md mt-16 relative `}
            onClick={() => {
              // dispatch(changeToggleToFalse());
            }}
          >
            <Outlet />

            {show && (
              //   <div className="relative  ">
              <div
                className="top-0 w-full h-full left-0 absolute overflow-hidden rounded-md "
                style={{
                  background: `${
                    data?.categoryType === "Secondary"
                      ? "rgba(73, 154, 255, 0.2)"
                      : "bg-red-200"
                  }`,
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(5px)",
                  border: "1px solid rgba(73, 154, 255, 0.3)",
                }}
              >
                <AddNewStaff />
              </div>
            )}

            {showII && (
              //   <div className="relative  ">
              <div
                className="-top-0 w-full h-full left-0 absolute rounded-md overflow-hidden"
                style={{
                  background: "rgba(73, 154, 255, 0.2)",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(5px)",
                  border: "1px solid rgba(73, 154, 255, 0.3)",
                }}
              >
                <AddNewStudent />
              </div>
            )}

            {classroom && (
              <div
                className="-top-0 w-full h-full left-0 absolute rounded-md overflow-hidden"
                style={{
                  background: "rgba(73, 154, 255, 0.2)",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(5px)",
                  border: "1px solid rgba(73, 154, 255, 0.3)",
                }}
              >
                <AddAnyItem
                  // select
                  upper
                  fee
                  base
                  titleCall="Creating new classroom"
                  offFn={handleDisplaySubjectOff}
                  text="Place the name this would be generally called across the life-span of the school's existance!"
                  placeStart="JSS 1A"
                  placeEnd="JSS 1A"
                  startTitle="Enter Class Name"
                  endTitle="Class Assigned"
                  setStart={setClassRM}
                  start={classRM}
                  handleFn={handleCreateClassRoom}
                  loading={loading}
                  num1={num1}
                  num2={num2}
                  num3={num3}
                  setNumb1={setNumb1}
                  setNumb2={setNumb2}
                  setNumb3={setNumb3}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
