import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import pix from "../../../assets/pix.jpg";
import { displayDelay, displayStudent } from "../../../global/reduxState";
import { useDispatch, useSelector } from "react-redux";
import { FC } from "react";
import { FaCheckDouble } from "react-icons/fa6";
import {
  useAttendance,
  useClassStudent,
  useSchoolAnnouncement,
  useStudentGrade,
} from "../../../pagesForTeachers/hooks/useTeacher";
import Button from "../../../components/reUse/Button";
import moment from "moment";
import {
  useSchool,
  useSchoolClassRM,
  useSchoolData,
  useStudentAttendance,
} from "../../hook/useSchoolAuth";
import {
  updateSchoolFee,
  updateStudentRestrictMode,
  verifyPayment1st,
  verifyPayment2nd,
  verifyPayment3rd,
  migrateStudent,
} from "../../api/schoolAPIs";
import { clockIn, clockOut, findStudentWidthID, schoolPaymentEndPoint } from "../../../pagesForStudents/api/studentAPI";
import { useStudentInfoData } from "../../../pagesForStudents/hooks/useStudentHook";
import { udatedStudentBulkInfo } from "../../../pagesForTeachers/api/teachersAPI";
import { mutate } from "swr";
import { MdClose } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
interface iProps {
  props?: any;
  id?: string;
  data?: any;
}

const Remark: FC<iProps> = ({ id, data }) => {
  const { attendance } = useAttendance(id!);

  let name2 = data?.studentFirstName;

  let result = attendance?.attendance?.find((el: any) => {
    return el?.studentFirstName === name2;
  });

  let timer = Date.now();

  return (
    <div
      className={`w-[100px] border-r
      ${
        result?.present
          ? "text-green-600"
          : result?.absent
          ? "text-red-600"
          : null
      }`}
    >
      {moment(result?.createdAt).format("ll") === moment(timer).format("ll") &&
      result?.present
        ? "Present"
        : result?.absent
        ? "Absent"
        : null}
    </div>
  );
};

const AttendanceRatio: FC<iProps> = ({ props }) => {
  const { mainStudentAttendance } = useStudentAttendance(props);

  return (
    <div>
      {(mainStudentAttendance?.data?.attendance?.filter(
        (el: any) => el.present === true
      ).length /
        mainStudentAttendance?.data?.attendance?.length) *
      100 ? (
        <div>
          {(
            (mainStudentAttendance?.data?.attendance?.filter(
              (el: any) => el.present === true
            ).length /
              mainStudentAttendance?.data?.attendance?.length) *
            100
          ).toFixed(2)}
          %
        </div>
      ) : (
        <div>0%</div>
      )}
    </div>
  );
};

const Performance: FC<iProps> = ({ props }) => {
  const { mainStudentAttendance } = useStudentAttendance(props);

  return (
    <div>
      {(mainStudentAttendance?.data?.attendance?.filter(
        (el: any) => el.present === true
      ).length /
        mainStudentAttendance?.data?.attendance?.length) *
      100 ? (
        <div>
          {(
            (mainStudentAttendance?.data?.attendance?.filter(
              (el: any) => el.present === true
            ).length /
              mainStudentAttendance?.data?.attendance?.length) *
            100
          ).toFixed(2)}
          %
        </div>
      ) : (
        <div>0%</div>
      )}
    </div>
  );
};

const MigrateStudent: FC<
  iProps & {
    studentId: string;
    onMigrateSuccess?: () => void;
    classes: string[];
  }
> = ({ props, studentId, onMigrateSuccess, id, classes }) => {
  const user = useSelector((el: any) => el.user);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [customClass, setCustomClass] = useState<string>("");
  const [showCustom, setShowCustom] = useState<boolean>(false);
  const [isMigrating, setIsMigrating] = useState<boolean>(false);

  console.log(classes);

  const handleMigrate = async () => {
    const targetClass = showCustom ? customClass.toUpperCase() : selectedClass;

    if (!targetClass) {
      toast.error("Please select or enter a target class");
      return;
    }

    setIsMigrating(true);
    try {
      const migrationData = {
        studentMigrations: [
          {
            studentId: studentId,
            targetClassName: targetClass,
          },
        ],
      };

      const response = await migrateStudent(id, migrationData);

      if (response?.data?.successful === 1) {
        toast.success("Student migrated successfully");
        setSelectedClass("");
        setCustomClass("");
        setShowCustom(false);
        onMigrateSuccess?.();
      } else {
        toast.error(response?.data?.errors[0]?.error);
      }
    } catch (error: any) {
      toast.error(error?.message || "Migration error");
    } finally {
      setIsMigrating(false);
    }
  };

  return (
    <div className="flex gap-1 items-center flex-wrap">
      {!showCustom ? (
        <>
          <select
            value={selectedClass}
            onChange={(e) => {
              if (e.target.value === "custom") {
                setShowCustom(true);
                setSelectedClass("");
              } else {
                setSelectedClass(e.target.value);
              }
            }}
            className="px-2 py-2 border border-gray-300 rounded-md text-[11px] focus:outline-none focus:border-blue-500 flex-1 min-w-[100px]"
          >
            <option value="">Select Class</option>
            {classes?.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
            <option value="custom">+ Custom Class</option>
          </select>
        </>
      ) : (
        <>
          <input
            type="text"
            value={customClass}
            onChange={(e) => setCustomClass(e.target.value)}
            placeholder="Enter class name"
            className="px-2 uppercase py-2 border border-gray-300 rounded-md text-[11px] focus:outline-none focus:border-blue-500 flex-1 min-w-[100px]"
          />
          <button
            onClick={() => {
              setShowCustom(false);
              setCustomClass("");
              setSelectedClass("");
            }}
            className="px-2 py-2 text-[11px] font-medium rounded-md bg-gray-400 text-white hover:bg-gray-500 transition-all duration-300 whitespace-nowrap"
          >
            Cancel
          </button>
        </>
      )}
      <button
        onClick={handleMigrate}
        disabled={isMigrating}
        className={`px-2 py-2 text-[11px] font-medium rounded-md transition-all duration-300 whitespace-nowrap ${
          isMigrating
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-green-600 text-white hover:bg-green-700"
        }`}
      >
        {isMigrating ? (
          <div className="flex items-center gap-1">
            <FaSpinner className="animate-spin text-[12px]" />
          </div>
        ) : (
          "Migrate"
        )}
      </button>
    </div>
  );
};

const ViewClassStudent: FC = () => {
  const { classID } = useParams();
  const user = useSelector((el: any) => el.user);
  const { classStudents } = useClassStudent(classID!);
  const { data } = useSchoolData();
  const { schoolClassroom } = useSchoolClassRM();

  const allStudents = classStudents?.students;

  // Extract class names from schoolClassroom
  const availableClasses =
    schoolClassroom?.classRooms?.map(
      (classroom: any) => classroom?.className
    ) || [];

  const sortedStudents = classStudents?.students?.sort((a: any, b: any) =>
    a.studentLastName?.localeCompare(b.studentLastName)
  );
  let el = classID;
  const [toggle, setToggle] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingValue, setLoadingValue] = useState<string>("");
  const [toggleValue, setToggleValue] = useState<string>("");
  const [migrationClass, setMigrationClass] = useState<{
    [key: string]: string;
  }>({});
  const [migratingStudentId, setMigratingStudentId] = useState<string>("");

  const updated = (id: string) => {
    setToggle(true);
    setToggleValue(id);
  };

  const updatedOff = () => {
    setToggle(false);
    setToggleValue("");
  };
  return (
    <div>
      <Toaster />
      <div className="mt-4">
        <div className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden ">
          <div className="text-[gray] w-[2450px] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4 border-b pb-3">
            <div className="w-[50px] border-r">S/N</div>
            <div className="w-[90px] border-r">student Image</div>
            <div className="w-[200px] border-r">student Name</div>
            <div className="w-[220px] border-r">Session Fee</div>

            <div className="w-[130px] border-r">Reg. Date</div>
            <div className="w-[150px] border-r">Today's Attendance</div>
            <div className="w-[100px] border-r">This team Attendance Ratio</div>

            <div className="w-[100px] border-r">student Present Class</div>

            <div className="w-[150px] border-r">Parent Contact</div>
            <div className="w-[200px] border-r">Address </div>

            <div className="w-[250px] border-r">Migrate Student</div>

            <div className="w-[80px] border-r">Rate</div>
            <div className="w-[180px] border-r">View Detail</div>
            <div className="w-[180px] border-r">View Report Card</div>
            <div className="w-[220px] border-r">Restrict Result</div>
          </div>

          <div>
            {sortedStudents?.length > 0 ? (
              <div className="relative w-[2450px] overflow-hidden">
                {sortedStudents?.map((props: any, i: number) => (
                  <div className="">
                    <div>
                      <div
                        key={props}
                        className={`w-full flex items-center gap-2 text-[12px] font-medium  h-16 px-4 my-2  overflow-hidden ${
                          i % 2 === 0 ? "bg-slate-50" : "bg-white"
                        }`}
                      >
                        <div className="w-[50px] border-r">{i + 1}</div>
                        <div className="w-[90px] flex justify-center border-r">
                          <img
                            className="w-14 h-14 rounded-md border object-cover"
                            src={pix}
                          />
                        </div>
                        <div className="w-[200px] border-r">
                          <p>
                            {props?.studentLastName} {props?.studentFirstName}
                          </p>
                          <p>
                            LoginID:{" "}
                            <span className="font-semibold">
                              {props?.enrollmentID}
                            </span>
                          </p>
                        </div>
                        <div className="w-[220px] border-r flex gap-4">
                          <div className="flex flex-col items-center">
                            <label>1st Term</label>
                            <input
                              type="checkbox"
                              className={`toggle toggle-sm mt-2 ${
                                props?.feesPaid1st
                                  ? `${
                                      data?.categoryType === "Secondary"
                                        ? "bg-blue-950 border-b-blue-950"
                                        : "bg-red-950 border-red-950"
                                    }`
                                  : "bg-neutral-500 border-neutral-500"
                              } `}
                              checked={props?.feesPaid1st}
                              onClick={() => {
                                // verifyPayment1st(user?.id, props?._id);
                                // // updateSchoolFee(props?._id);
                                // schoolPaymentEndPoint(props?._id, {
                                //   date: moment(Date.now()).format("lll"),
                                //   amount: 20000,
                                //   reference: "paid in cash",
                                //   confirm: true,
                                //   purchasedID: uuid().slice(0, 7),
                                // }).then((res) => {
                                //   console.log("done: ", res);
                                // });
                              }}
                            />
                          </div>
                          <div className="flex flex-col items-center">
                            <label>2nd Term</label>
                            <input
                              type="checkbox"
                              className={`toggle toggle-sm mt-2 ${
                                props?.feesPaid2nd
                                  ? `${
                                      data?.categoryType === "Secondary"
                                        ? "bg-blue-950 border-b-blue-950"
                                        : "bg-red-950 border-red-950"
                                    }`
                                  : "bg-neutral-500 border-neutral-500"
                              } `}
                              checked={props?.feesPaid2nd}
                              onClick={() => {
                                verifyPayment2nd(user?.id, props?._id);
                              }}
                            />
                          </div>
                          <div className="flex flex-col items-center">
                            <label>3rd Term</label>
                            <input
                              type="checkbox"
                              className={`toggle toggle-sm mt-2 ${
                                props?.feesPaid3rd
                                  ? `${
                                      data?.categoryType === "Secondary"
                                        ? "bg-blue-950 border-b-blue-950"
                                        : "bg-red-950 border-red-950"
                                    }`
                                  : "bg-neutral-500 border-neutral-500"
                              } `}
                              checked={props?.feesPaid3rd}
                              onClick={() => {
                                verifyPayment3rd(user?.id, props?._id);
                              }}
                            />
                          </div>
                        </div>
                        <div className="w-[130px] border-r">
                          {moment(props.createdAt).format("ll")}
                        </div>
                        <div className="w-[150px] border-r">
                          <Remark data={props} id={classStudents?._id} />

<Button
              name={
                loadingValue === props?._id
                  ? "Clocking..."
                  : props?.clockIn
                  ? "Clock-Out"
                  : "Clock-In"
              }
              icon={
                loadingValue === props?._id && (
                  <FaSpinner className="animate-spin text-[14px]" />
                )
              }
              disabled={loadingValue === props?._id}
              className={`
                ${
                  loadingValue === props?._id
                    ? "bg-red-400 cursor-not-allowed animate-pulse "
                    : props?.clockIn
                    ? "bg-green-500"
                    : "bg-red-500"
                } 
              text-white !text-[12px] uppercase !text-center border-none font-medium py-4 !-pl-0 !mx-1 !px-1 !w-[130px] leading-tight`}
              onClick={() => {
                setLoadingValue(props?._id);
                console.log("props", props);

                findStudentWidthID(props?.enrollmentID)
                  .then((res) => {
                    if (res.status === 201) {
                      console.log("res in", res);
                      if (!res.data?.data?.clockIn) {
                        return clockIn(
                          res.data?.data?.schoolIDs,
                          res.data?.data?._id
                        ).then((res) => {
                          if (res.status === 201) {
                            console.log("res out", res);
                            toast.success(
                              `${res.data?.studentFirstName}, has been clock in`
                            );
                            return mutate(
                              `api/view-all-class-students/${classID}`
                            );
                          } else {
                            toast.error(
                              "student has not been clocked in yet, Please try again!"
                            );
                          }
                        });
                      } else {
                        return clockOut(
                          res.data?.data?.schoolIDs,
                          res.data?.data?._id
                        ).then((res) => {
                          if (res.status === 201) {
                            toast.success(
                              `${res.data?.studentFirstName}, has been clock out`
                            );
                            return mutate(
                              `api/view-all-class-students/${classID}`
                            );
                          } else {
                            toast.error(
                              "student has not been clocked out yet, Please try again!"
                            );
                          }
                        });
                      }
                    } else {
                      toast.error("something went wrong");
                    }
                  })
                  .finally(() => {
                    setLoadingValue("");
                  });
              }}
            />

                        </div>


                        <div className="w-[100px] border-r">
                          <AttendanceRatio props={props?._id} />
                        </div>
                        <div
                          className={`w-[100px] border-r uppercase 
                          ${
                            (props?.classAssigned === "SSS 1Holders" ||
                              props?.classAssigned === "SSS 1") &&
                            "text-red-500 font-bold"
                          }
                          `}
                        >
                          {/* {classStudents?.className} */}
                          {props?.classAssigned}
                        </div>
                        <div className="w-[150px] border-r  ">
                          {props?.phone ? props.phone : "no phone yet"}
                        </div>
                        <div className="w-[200px] border-r  ">
                          {props?.studentAddress
                            ? props.studentAddress
                            : "no Address yet"}
                        </div>
                        <div className="w-[250px] border-r  ">
                          <MigrateStudent
                            id={data?._id}
                            props={props}
                            studentId={props?._id}
                            classes={availableClasses}
                            onMigrateSuccess={() => {
                              mutate(`api/view-all-class-students/${classID}`);
                            }}
                          />
                        </div>
                        <div className="w-[80px] border-r">
                          {Math.ceil(Math.random() * (5 - 1)) + 1} of 5
                        </div>
                        <div className="w-[180px] border-r flex gap-1">
                          <div className="w-[80px] relative">
                            <Button
                              name="Edit"
                              className="pl-5 py-3 w-[92%] bg-blue-950 text-white  hover:bg-blue-900 transition-all duration-300"
                              onClick={() => {
                                updated(props?._id);
                              }}
                            />
                          </div>
                          <Link
                            to={`/view-students/student-details/${props?._id}`}
                            className="w-[80px]"
                          >
                            <Button
                              name="View"
                              className="pl-5 py-3 w-[92%] bg-black text-white  hover:bg-neutral-800 transition-all duration-300"
                              onClick={() => {}}
                            />
                          </Link>
                        </div>

                        <View props={props} />

                        <div className="w-[220px] border-r text-[10px]">
                          <Button
                            name={`${
                              loading && loadingValue === props?._id
                                ? ""
                                : props?.viewReportCard
                                ? "Clear Restriction"
                                : "Hold Back Result"
                            }`}
                            icon={
                              loading &&
                              loadingValue === props?._id && (
                                <FaSpinner className="animate-spin text-[20px]" />
                              )
                            }
                            className={` ${
                              props?.viewReportCard
                                ? "bg-red-500 text-white  hover:bg-red-600"
                                : "bg-neutral-900 text-white  hover:bg-neutral-950"
                            } py-3  w-[85%] transition-all duration-300`}
                            onClick={() => {
                              setLoading(true);
                              setLoadingValue(props?._id);
                              if (props?.viewReportCard) {
                                updateStudentRestrictMode(
                                  data?._id,
                                  props?._id,
                                  false
                                )
                                  .then((res) => {
                                    if (res.status === 201) {
                                      toast.success("Restricted mode disabled");
                                      return mutate(
                                        `api/view-all-class-students/${classID}`
                                      );
                                    }
                                  })
                                  .finally(() => {
                                    setLoading(false);
                                    setLoadingValue("");
                                  });
                              } else {
                                updateStudentRestrictMode(
                                  data?._id,
                                  props?._id,
                                  true
                                )
                                  .then((res) => {
                                    if (res.status === 201) {
                                      toast.success("Restricted mode enabled");
                                      return mutate(
                                        `api/view-all-class-students/${classID}`
                                      );
                                    }
                                  })
                                  .finally(() => {
                                    setLoading(false);
                                    setLoadingValue("");
                                  });
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      {toggle && toggleValue === props?._id && (
                        <div className="absolute z-10 border backdrop-blur-sm top-2 right-96 h-[90%] w-[250px] overflow-auto">
                          <div className="flex flex-col items-center justify-center px-4 py-1 mt-3">
                            <MdClose
                              size={13}
                              onClick={() => {
                                updatedOff();
                              }}
                              className="cursor-pointer text-[25px]"
                            />
                            <p className="mt-3 text-[15px] ">
                              Updating{" "}
                              <span className="font-semibold italic">
                                {props?.studentFirstName}{" "}
                                {props?.studentLastName}{" "}
                              </span>
                              Information
                            </p>

                            <EditStudentDetails
                              el={el}
                              props={props}
                              setToggleValue={setToggleValue}
                              setToggle={setToggle}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex">
                <div className="flex flex-col items-center w-[30%] justify-center px-4 py-1 mt-3">
                  <FaCheckDouble size={13} />
                  <p className="mt-3 text-[12px] font-medium">
                    No Subject added yet
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewClassStudent;

const EditStudentDetails: FC<any> = ({
  props,
  el,
  setToggleValue,
  setToggle,
}) => {
  const [firstName, setFirstName] = useState(props?.studentFirstName);
  const [lastName, setLastName] = useState(props?.studentLastName);
  const [studentAddress, setStudentAddress] = useState(props?.studentAddress);
  const [phone, setPhone] = useState(props?.phone);
  const [parentEmail, setParentEmail] = useState(props?.parentEmail);
  const [parentPhoneNumber, setParentPhoneNumber] = useState(
    props?.parentPhoneNumber
  );

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="flex flex-col h-[] overflow-auto ">
      <div className="flex flex-col mt-5">
        <label className="text-[12px] font-semibold ">First Name</label>
        <input
          type="text"
          className="text-[15px] w-full py-2 px-1 border rounded-md"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div className="flex flex-col mt-2">
        <label className="text-[12px] font-semibold ">Last Name</label>
        <input
          type="text"
          className="text-[15px] w-full py-2 px-1 border rounded-md"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div className="flex flex-col mt-2">
        <label className="text-[12px] font-semibold ">Phone Number</label>
        <input
          type="text"
          className="text-[15px] w-full py-2 px-1 border rounded-md"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="flex flex-col mt-2">
        <label className="text-[12px] font-semibold ">Parent Email</label>
        <input
          type="text"
          className="text-[15px] w-full py-2 px-1 border rounded-md"
          placeholder="Parent Email"
          value={parentEmail}
          onChange={(e) => setParentEmail(e.target.value)}
        />
      </div>

      <div className="flex flex-col mt-2">
        <label className="text-[12px] font-semibold ">
          Parent Phone Number
        </label>
        <input
          type="text"
          className="text-[15px] w-full py-2 px-1 border rounded-md"
          placeholder="Parent Phone"
          value={parentPhoneNumber}
          onChange={(e) => setParentPhoneNumber(e.target.value)}
        />
      </div>

      <div className="flex flex-col mt-2">
        <label className="text-[12px] font-semibold ">Student Address</label>
        <textarea
          className="text-[15px] w-full py-2 px-1 border rounded-md resize-none min-h-[60px]"
          placeholder="Student Address"
          value={studentAddress}
          onChange={(e) => setStudentAddress(e.target.value)}
        />
      </div>

      <div className="mt-3 flex gap-2">
        <Button
          disabled={loading}
          name={loading ? "Loading..." : "Update"}
          className={`py-3 w-[92%] ${
            loading
              ? "bg-red-400 animate-pulse cursor-not-allowed"
              : "bg-red-500"
          } text-white  hover:bg-red-400 transition-all duration-300  `}
          onClick={() => {
            setLoading(true);
            udatedStudentBulkInfo(props?._id, {
              phone,
              studentFirstName: firstName,
              studentLastName: lastName,
              parentEmail,
              parentPhoneNumber,
            })
              .then((res) => {
                if (res.status === 201) {
                  toast.success("Student Information Updated Successfully");
                  mutate(`api/view-all-class-students/${el}`);
                }
              })
              .finally(() => {
                setLoading(false);
                setToggle(false);
                setToggleValue("");
              });
          }}
        />
      </div>
    </div>
  );
};

const View: FC<any> = ({ props }) => {
  const { gradeData } = useStudentGrade(props?._id!);
  const { studentInfoData: studentInfo } = useStudentInfoData(props?._id);
  const { schoolAnnouncement }: any = useSchoolAnnouncement(
    gradeData?.schoolIDs
  );

  let school: any = schoolAnnouncement;

  let grade = gradeData?.reportCard?.find((el: any) => {
    return (
      el.classInfo ===
      `${studentInfo?.classAssigned} session: ${school?.presentSession}(${school?.presentTerm})`
    );
  });

  return (
    <div className="w-[180px] -mt-4">
      {grade?.approve ? (
        <Link
          to={`/view-students-report-card/${props?._id}`}
          className="w-[180px] border-r"
        >
          <Button
            name="Ready to View"
            className="py-3 w-[85%] mt-10 bg-orange-500 text-white  hover:bg-orange-600 transition-all duration-300"
          />
        </Link>
      ) : (
        <div className="w-[180px] border-r">
          <Button
            name="Not yet Ready"
            className="py-3 w-[85%] mt-7 bg-red-500 text-white  hover:bg-red-600 transition-all duration-300"
          />
        </div>
      )}
    </div>
  );
};
