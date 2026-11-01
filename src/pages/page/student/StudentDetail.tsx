document.title = "staff Detail's Page";
import { BsThreeDotsVertical } from "react-icons/bs";
import LittleHeader from "../../../components/layout/LittleHeader";
import Button from "../../../components/reUse/Button";
import { FaCheckDouble, FaStar } from "react-icons/fa6";
import {
  useClassAttendance,
  useSchoolClassRM,
  useSchoolStudentDetail,
  useStudentAttendance,
} from "../../hook/useSchoolAuth";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { readClassInfo } from "../../../pagesForTeachers/api/teachersAPI";
import { changeStudentClass } from "../../api/schoolAPIs";
import StudentProfile from "./StudentProfile";
import StudentResultsDetail from "../resultOption/InputStudentsScore";

const StudentDetail = () => {
  const { studentID } = useParams();

  const { mainStudentAttendance } = useStudentAttendance(studentID!);

  const [show, setShow] = useState<boolean>(false);
  const [salary, setSalary] = useState<string>("");
  const [salaryID, setSalaryID] = useState<string>("");

  const attendanceData = Array.from({ length: 59 }, (i: number) => {
    const counted = Math.floor(Math.random() * 1000);
    return { record: counted % 2 === 0 ? true : false, count: counted };
  });

  const { studentDetails } = useSchoolStudentDetail(studentID!);

  const [classHolder, setClassHolder] = useState([]);

  const { schoolClassroom } = useSchoolClassRM();

  // console.log("sec: ", studentDetails);

  useEffect(() => {
    readClassInfo(studentDetails?.data?.classAssigned).then((res: any) => {
      setClassHolder(res?.data?.classSubjects);
    });
  }, [studentDetails]);

  return (
    <div>
      <LittleHeader name="Student Details" back />
      <div className="font-semibold mb-3">
        {studentDetails?.data?.studentLastName}{" "}
        {studentDetails?.data?.studentFirstName}
      </div>
      <div className=" flex-wrap w-full text-blue-950 min-h-[90px] rounded-lg border flex justify-between relative">
        <div className="bg-blue-950 text-white w-[160px] md:w-[300px] px-4 py-2 rounded-lg ">
          <div>Performance Ratio</div>
          <div className="text-[35px] font-bold">
            "A" <span className="text-[20px]">Student</span>
          </div>
        </div>
        <div className="mt-8 md:mt-0 px-4 py-2 rounded-lg items-end">
          <div>Change Student's Class</div>
          <Button
            name="Change Class"
            className="bg-blue-950 mx-0 ml-3 "
            onClick={() => {
              setShow(!show);
            }}
          />
        </div>

        {show && (
          <div className="absolute top-[5.5rem] px-2 right-3 backdrop-blur-sm border rounded-md">
            <p className="text-[12px] py-4 px-3">
              By carring out this action... the class of <br />
              <span className="font-bold">
                {studentDetails?.data?.studentLastName}{" "}
                {studentDetails?.data?.studentFirstName}
              </span>{" "}
              will be change
            </p>
            {/* <Input
              placeholder="Enter new Salary"
              className="bg-white rounded-md"
              value={salary}
              onChange={(e) => {
                setSalary(e.target.value);
              }}
            /> */}
            <select
              className="select select-bordered w-[300px] mb-2"
              value={salary}
              onChange={(e) => {
                setSalary(e.target.value);
              }}
            >
              <option selected>
                change{" "}
                <span className="font-bold">
                  {studentDetails?.data?.studentFirstName}'s'
                </span>{" "}
                class?
              </option>
              {schoolClassroom?.classRooms?.map((el: any) => {
                return (
                  <option key={el?._id} value={el?._id}>
                    {el?.className}
                  </option>
                );
              })}
            </select>

            <Button
              name="Change Class"
              className="bg-blue-950 mx-0"
              onClick={() => {
                setShow(!show);
                changeStudentClass(studentID, { classID: salary }).then(
                  (res) => {}
                );
                // updaetTeacherSalary(teacherDetail?._id, { salary }).then(() => {
                //   mutate(`api/view-teacher-detail/${teacherDetail?._id}`);
                // });
              }}
            />
          </div>
        )}
      </div>

      <div className="my-6 border-t" />
      <StudentProfile />
      <div className="my-6 border-t" />
      <StudentResultsDetail />
      <div className="my-6 border-t" />
      {/* class subject */}
      {/* <div className="w-full min-h-[180px] pb-10 bg-slate-50 rounded-lg border py-2 px-4 ">
        <p>Present Class Details </p>
        <p className="text-[13px]">
          Class Handled:{" "}
          <span className="font-bold">
            {studentDetails?.data?.classAssigned}{" "}
          </span>
        </p>

        <div className="mt-5 text-[13px] font-medium">Subjects </div>

        {classHolder?.length > 0 ? (
          <div>
            <div className="mt-1 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {classHolder?.map((props: any) => (
                <div className="bg-white border flex flex-col rounded-2xl pb-2 min-h-[200px] px-4 pt-4">
                  <div className="mt-3 flex justify-between items-center font-bold">
                    <p>{props.subjectTitle}</p>
                    <div className="w-8 h-8 transition-all duration-300 rounded-full hover:bg-slate-50 cursor-pointer flex justify-center items-center">
                      <BsThreeDotsVertical className="hover:text-blue-900" />
                    </div>
                  </div>
                  <div className="flex">
                    <p className="text-[12px] bg-slate-100 rounded-sm py-2 pl-1 shadow-sm pr-4 mb-5">
                      compulsory
                    </p>
                  </div>
                  <div className="flex-1" />
                  <p className="text-[13px] font-medium">
                    Subject Teacher Name
                  </p>
                  <div className="flex mb-4 gap-2 flex-wrap">
                    <div className="text-blue-950  rounded-mlg mt-1 px-0 border-t font-medium py-2 text-[17px] ">
                      {props?.subjectTeacherName}
                    </div>
                  </div>

                  <div>
                    <p className="text-[12px] mb-2  text-[lightgray]">
                      Records
                    </p>

                    <div className="font-medium text-[12px] flex items-center gap-3">
                      <p className="border rounded-full bg-orange-500 text-white px-4 py-2">
                        Total Quiz:{" "}
                        <span className="font-bold">{props?.quiz?.length}</span>
                      </p>
                      <p className="border rounded-full bg-pink-500 text-white px-4 py-2">
                        Total Test:{" "}
                        <span className="font-bold">{props?.test?.length}</span>
                      </p>
                      <p className="border rounded-full bg-blue-950 text-white px-4 py-2">
                        Assignment:{" "}
                        <span className="font-bold">
                          {props?.assignment?.length}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
      </div> */}
      {/* <div className="mt-6 w-full min-h-[100px] pb-10 bg-slate-50 rounded-lg border py-2 px-4 ">
        <p>student's Performance Detail</p>
        <p className="text-[13px] flex items-center font-medium">
          General Performance Ratings:{" "}
          <span className="font-bold flex items-center gap-1">
            <FaStar className="ml-1 mb-1" />
            5.0
          </span>
        </p>

        <div className="flex gap-4 mt-5">
          <div className="border rounded-md px-4 py-2 bg-blue-50">
            <div className=" text-[16px] font-medium border-b pb-2">
              Report/Record: <span className="font-bold"></span>
            </div>
            <div className="ml-5 text-[13px] font-medium mt-2">
              <span> </span> Mathematics: <span className="font-bold">12</span>
            </div>
          </div>
          <div className="border rounded-md px-4 py-2 bg-blue-50">
            <div className=" text-[16px] font-medium border-b pb-2">
              Test Held: <span className="font-bold">2</span>
            </div>
            <div className="ml-5 text-[13px] font-medium mt-2">
              <span> </span> Mathematics: <span className="font-bold">2</span>
            </div>
          </div>
        </div>
      </div> */}
      {/* Attendance */}
      <div className="mt-6 w-full min-h-[60px] py-5 bg-slate-50 rounded-lg border  px-4 ">
        <p className="mb-2">
          Attendance Heatmap:{" "}
          <span className="font-medium">
            {(
              (mainStudentAttendance?.data?.attendance?.filter(
                (el: any) => el.present === true
              ).length /
                mainStudentAttendance?.data?.attendance?.length) *
              100
            ).toFixed(2)}
            %
          </span>
        </p>
        <div className="w-full flex gap-1">
          {/* <div className="w-3 h-3 border bg-green-300" />
          <div className="w-3 h-3 border bg-white" /> */}

          <div className="flex flex-wrap gap-1 w-full">
            {mainStudentAttendance?.data?.attendance?.map((props: any) => (
              <div
                className="tooltip"
                data-tip={`${props.present ? "present" : "absent"}`}
              >
                <div
                  className={`w-4 h-4 rounded-[3px] border ${
                    props.present ? "bg-green-500" : "bg-white"
                  }`}
                />
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
