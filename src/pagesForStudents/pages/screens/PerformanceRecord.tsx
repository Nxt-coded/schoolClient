import moment from "moment";
import {
  usePurchasedStore,
  useReadOneClassInfo,
  useStudentAttendant,
  useStudentInfo,
  useViewRemark,
} from "../../hooks/useStudentHook";
import lodash from "lodash";

const PerformanceRecord = () => {
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
    <div className="mt-5 border rounded-md p-2 bg-slate-100 text-[12px] w-full overflow-hidden">
      <div
        className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden"
        style={{ color: "var(--secondary)" }}
      >
        <div className="text-[gray] w-[1100px] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4">
          <div className="w-[180px] border-r">Recorded Date</div>

          <div className="w-[100px] border-r">Attendance</div>
          <div className="w-[100px] border-r">Test Taken</div>
          <div className="w-[100px] border-r">Assignment Taken</div>

          <div className="w-[100px] border-r">Quiz Taken</div>

          <div className="w-[400px] border-r">Class Teacher Remarks</div>
        </div>

        {/* Here */}

        <div className=" w-[1100px] overflow-hidden ">
          <div>
            <div>
              <div
                className={`w-full flex items-center gap-2 text-[12px] font-medium  min-h-16 px-4 my-2  overflow-hidden bg-slate-50
                        `}
              >
                <div className="w-[180px] border-r">
                  {moment(remk?.createdAt).format("lll")}
                </div>
                <div className="w-[100px] border-r">
                  {record} / {studentAttendance?.attendance?.length}
                </div>
                <div className="w-[100px] border-r">
                  {studentInfo?.performance?.length}/{lodash.sumBy(recordQuiz)}
                </div>
                <div className="w-[100px] border-r ml-1">
                  {" "}
                  {studentInfo?.assignmentResolve?.length}/
                  {oneClass?.assignment?.length}
                </div>

                <div className="w-[100px] border-r ml-1">
                  {" "}
                  {studentInfo?.performance?.length}
                </div>

                <div className="w-[400px] border-r ">{remk?.remark}</div>

                <div className="w-[10px] border-r ml-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceRecord;
