import { Link } from "react-router-dom";
import pix from "../../../assets/pix.jpg";

import { FC } from "react";
import { FaCheckDouble } from "react-icons/fa6";
import Button from "../../../components/reUse/Button";
import {
  useAttendance,
  useClassStudent,
} from "../../../pagesForTeachers/hooks/useTeacher";
import moment from "moment";
import { useStudentAttendance } from "../../../pages/hook/useSchoolAuth";

interface iProps {
  props?: any;
  id?: any;
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
        "No Record Yet"
      )}
    </div>
  );
};

const ReadingClassStudents: FC<iProps> = ({ props }) => {
  const { classStudents } = useClassStudent(props);

  return (
    <div>
      <div className="mt-4">
        <div className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden ">
          <div className="text-[gray] w-[1920px] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4 border-b pb-3">
            <div className="w-[130px] border-r">Reg. Date</div>
            <div className="w-[100px] border-r">Today's Attendance</div>
            <div className="w-[100px] border-r">This team Attendance Ratio</div>
            <div className="w-[220px] border-r">Session Fee</div>

            <div className="w-[150px] border-r">student Image</div>
            <div className="w-[200px] border-r">student Name</div>

            <div className="w-[100px] border-r">student Class</div>

            <div className="w-[150px] border-r">Parent Contact</div>
            <div className="w-[200px] border-r">Address </div>

            <div className="w-[200px] border-r">Performance Ratio</div>

            <div className="w-[80px] border-r">Rate</div>
            <div className="w-[180px] border-r">View Detail</div>
          </div>

          <div>
            {classStudents?.students.length > 0 ? (
              <div className=" w-[1920px] overflow-hidden">
                {classStudents?.students?.map((props: any, i: number) => (
                  <div>
                    <div>
                      <div
                        key={props}
                        className={`w-full flex items-center gap-2 text-[12px] font-medium  h-16 px-4 my-2  overflow-hidden ${
                          i % 2 === 0 ? "bg-slate-50" : "bg-white"
                        }`}
                      >
                        <div className="w-[130px] border-r">
                          {moment(props?.createdAt).format("ll")}
                        </div>

                        <Remark data={props} id={classStudents?._id} />

                        <div className="w-[100px] border-r">
                          <AttendanceRatio props={props?._id} />
                        </div>
                        <div className="w-[220px] border-r flex gap-4 ">
                          <div className="flex flex-col items-center">
                            <label>1st Term</label>
                            <input
                              type="checkbox"
                              className={`
                              toggle toggle-sm mt-2  ${
                                props?.feesPaid1st
                                  ? "bg-blue-950 border-blue-950"
                                  : "bg-neutral-500 border-neutral-500"
                              }
                              `}
                              checked={props?.feesPaid1st}
                              // checked={false}
                            />
                          </div>
                          <div className="flex flex-col items-center">
                            <label>2nd Term</label>
                            <input
                              type="checkbox"
                              className={`
                              toggle toggle-sm mt-2  ${
                                props?.feesPaid2nd
                                  ? "bg-blue-950 border-blue-950"
                                  : "bg-neutral-500 border-neutral-500"
                              }
                              `}
                              checked={props?.feesPaid2nd}
                            />
                          </div>
                          <div className="flex flex-col items-center">
                            <label>3rd Term</label>
                            <input
                              type="checkbox"
                              className={`
                              toggle toggle-sm mt-2  ${
                                props?.feesPaid3rd
                                  ? "bg-blue-950 border-blue-950"
                                  : "bg-neutral-500 border-neutral-500"
                              }
                              `}
                              checked={props?.feesPaid3rd}
                            />
                          </div>
                        </div>
                        {/* name */}
                        <div className="w-[150px] flex justify-center border-r">
                          <img
                            className="w-14 h-14 rounded-md border object-cover"
                            src={pix}
                          />
                        </div>
                        <div className="w-[200px] border-r">
                          {props?.studentFirstName} {props?.studentLastName}
                        </div>
                        <div className="w-[100px] border-r  ">
                          {classStudents?.className}
                        </div>
                        <div className="w-[150px] border-r  ">
                          {props?.phone ? props.phone : "no phone yet"}
                        </div>
                        <div className="w-[200px] border-r  ">
                          {props?.studentAddress
                            ? props.studentAddress
                            : "no Address yet"}
                        </div>

                        <div className="w-[200px] border-r">
                          {props?.totalPerformance
                            ? props?.totalPerformance
                            : 0}
                          %
                        </div>

                        <div className="w-[80px] border-r">
                          {props?.totalPerformance
                            ? Math.floor(props?.totalPerformance / 20)
                            : 0}{" "}
                          of 5
                        </div>

                        <Link
                          to={`student-details/:studentID`}
                          className="w-[180px] border-r"
                        >
                          <Button
                            name="View Detail"
                            className="py-3 w-[85%] bg-black text-white  hover:bg-neutral-800 transition-all duration-300"
                            onClick={() => {}}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <div className="flex flex-col items-center justify-center px-4 py-1 mt-3">
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

export default ReadingClassStudents;
