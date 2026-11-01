import moment from "moment";
import lodash from "lodash";
import LittleHeader from "../../../components/layout/LittleHeader";
import {
  useReadOneClassInfo,
  useStudentAttendant,
  useStudentInfo,
  useViewRemark,
} from "../../hooks/useStudentHook";
import { readClassInfo } from "../../api/studentAPI";

const ViewReportScreen = () => {
  const { studentInfo } = useStudentInfo();
  const { studentAttendance } = useStudentAttendant(studentInfo?._id);

  const { oneClass } = useReadOneClassInfo(studentInfo?.presentClassID);
  let record: number = 0;
  let recordQuiz: any = [];
  let recordAssignment: any = [];

  for (let i = 0; i < studentAttendance?.attendance?.length; i++) {
    if (studentAttendance?.attendance[i].present) {
      record++;
    }
  }

  for (let i = 0; i < oneClass?.classSubjects?.length; i++) {
    let x = oneClass?.classSubjects[i]?.quiz?.length;

    recordQuiz.push(x);
  }

  for (let i = 0; i < oneClass?.classSubjects?.length; i++) {
    let x = oneClass?.assignment.length;

    recordAssignment.push(x);
  }

  const { remarks } = useViewRemark(studentInfo?._id);

  let remk: any = {};
  for (let i = 0; i < remarks?.data.length; i++) {
    remk = remarks?.data[0];
  }

  return (
    <div>
      <LittleHeader name={`${studentInfo?.studentFirstName}'s Weekly Report`} />
      <div className="grid lg:grid-cols-5 grid-cols-1 w-full h-full gap-6">
        <div className=" lg:col-span-3 col-span-1 min-h-[300px] rounded-lg border-slate-300 border pb-4">
          <p className="m-4 text-blue-950 font-semibold text-[22px]">
            Student's Profile
          </p>
          <div className="grid grid-cols-2  min-h-[100px] gap-2 lg:w-[500px]">
            <div className="col-span-1 h-full">
              <p className="p-4 ">Student's Name</p>
              <p className="p-4 ">Year</p>
              <p className="p-4 ">Class</p>
              <p className="p-4 ">Report Type</p>
              <p className="p-4 ">Teacher's Name</p>
            </div>
            <div className="col-span-1 h-full ">
              <div className="p-4 text-slate-500">
                {studentInfo?.studentFirstName} {studentInfo?.studentLastName}
              </div>
              <div className="p-4 text-slate-500">
                {moment(Date.now()).year()}
              </div>
              <div className="p-4 text-slate-500">
                {studentInfo?.classAssigned}
              </div>
              <div className="p-4 text-slate-500">Weekly</div>
              <div className="p-4 text-slate-500">
                {oneClass?.classTeacherName}
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 min-h-[100px] pb-4 rounded-lg  border-slate-300 border ">
          <p className="m-4 text-blue-950 font-semibold text-[22px]">
            Weekly Report
          </p>
          <div className="grid grid-cols-2 min-h-[100px] gap-2">
            <div className="col-span-1  w-[140%]  h-full">
              <p className="p-4">Class Attendance</p>
              <p className="p-4 ">Assignments</p>
              <p className="p-4 "> Quizzes Taken</p>
              <p className="p-4 ">Tests Taken</p>
            </div>
            <div className="col-span-1 h-full ml-10 font-medium ">
              <div className="p-4 text-slate-500">
                {record} / {studentAttendance?.attendance?.length}
              </div>
              <div className="p-4 text-slate-500">
                {studentInfo?.assignmentResolve?.length}/
                {oneClass?.assignment?.length}
              </div>
              {}

              <div className="p-4 text-slate-500">
                {studentInfo?.performance?.length}/{lodash.sumBy(recordQuiz)}
              </div>
              <div className="p-4 text-slate-500">
                {studentInfo?.performance?.length}
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 min-h-[250px] rounded-lg border border-slate-300 ">
          <h1 className="m-4 text-blue-950 font-semibold ">Overview</h1>

          <div className="m-4 mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 min-h-[150px]">
            <div className="col-span-1 border border-blue-200  rounded-xl cursor-pointer hover:shadow-lg flex p-3 items-center transition-all duration-1000">
              {/* {record} */}
              <div>
                <div className="text-[30px]">
                  {(
                    (record / studentAttendance?.attendance?.length) *
                    100
                  ).toFixed(2)}
                  %
                </div>
                <div className="text-slate-400">Attendance Percentage</div>
              </div>
            </div>
            <div className="col-span-1 border border-blue-200  rounded-xl cursor-pointer hover:shadow-lg flex p-3 items-center transition-all duration-1000">
              <div>
                <div className="text-[30px]">
                  {studentInfo?.totalPerformance}%
                </div>
                <div className="text-slate-400">Overall Percentage</div>
              </div>
            </div>
            <div className="col-span-1 border border-blue-200  rounded-xl cursor-pointer hover:shadow-lg flex p-3 items-center transition-all duration-1000">
              <div>
                <div className="text-[30px]">
                  {studentInfo?.totalPerformance >= 0 &&
                  studentInfo?.totalPerformance <= 40
                    ? "F"
                    : studentInfo?.totalPerformance >= 41 &&
                      studentInfo?.totalPerformance <= 50
                    ? "E"
                    : studentInfo?.totalPerformance >= 51 &&
                      studentInfo?.totalPerformance <= 60
                    ? "D"
                    : studentInfo?.totalPerformance >= 61 &&
                      studentInfo?.totalPerformance <= 70
                    ? "C"
                    : studentInfo?.totalPerformance >= 71 &&
                      studentInfo?.totalPerformance <= 80
                    ? "B"
                    : studentInfo?.totalPerformance >= 81 &&
                      studentInfo?.totalPerformance <= 100
                    ? "A"
                    : "Nill"}
                </div>
                <div className="text-slate-400">Grade</div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 h-[200px] rounded-lg border border-slate-300">
          <p className="m-4 text-blue-950 font-semibold">Remarks: </p>
          <p className="px-4">{remk?.remark}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewReportScreen;
