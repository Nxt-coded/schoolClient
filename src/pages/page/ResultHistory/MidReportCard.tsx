document.title = "View Students Grades";
import pix from "../../../assets/pix.jpg";
import Button from "../../../components/reUse/Button";
import LittleHeader from "../../../components/static/LittleHeader";
import moment from "moment";
import { FC, useState } from "react";
import {
  useSchoolData,
  useSchoolSessionData,
  useStudentAttendance,
} from "../../../pages/hook/useSchoolAuth";

import { mutate } from "swr";
import toast, { Toaster } from "react-hot-toast";
import {
  useReadMyClassInfoData,
  useReadOneClassInfo,
} from "../../../pagesForStudents/hooks/useStudentHook";
import lodash from "lodash";
import {
  useClassStudent,
  useClassSubject,
  useStudentGrade,
  useStudentMidGrade,
} from "../../../pagesForTeachers/hooks/useTeacher";
import { useNavigate, useParams } from "react-router-dom";
import {
  adminMidReport,
  adminReport,
  approveMainReport,
} from "../../api/schoolAPIs";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FaSpinner } from "react-icons/fa6";

interface iProps {
  props?: any;
  id?: string;
  el?: any;
  data?: any;
  i?: number;
  stateValue?: string;
  teacherInfo?: any;
}

// const ButtonReport: FC<iProps> = ({ stateValue, props, teacherInfo }) => {
//   const { gradeData } = useStudentGrade(props?._id);
//   const { schoolInfo } = useSchoolSessionData(props?.schoolIDs);

//   // SS 1A session: 2024/2025(Second Term)

//   // let result = gradeData?.reportCard
//   //   .find((el: any) => {
//   //     return el.classInfo ===  `${props?.classAssigned} session: ${schoolInfo[0]?.year}(${schoolInfo[0]?.presentTerm})`;
//   //   })
//   //   ?.result?.find((data: any) => {
//   //     return data.subject === el?.subjectTitle;
//   //   });

//   let result = gradeData?.reportCard.find((el: any) => {
//     return (
//       el.classInfo ===
//       `${props?.classAssigned} session: ${schoolInfo[0]?.year}(${schoolInfo[0]?.presentTerm})`
//     );
//   });

//   return (
//     <div className="w-[180px] border-r">
//       <Button
//         name="Add Comment"
//         className="pl-4 py-3 w-[85%] bg-black text-white  hover:bg-neutral-800 transition-all duration-300"
//         onClick={() => {
//           if (stateValue !== "") {
//             reportCardRemark(teacherInfo?._id, props?._id, {
//               teacherComment: stateValue,
//             }).then((res: any) => {
//               if (res.status === 201) {
//                 mutate(`api/student-report-card/${props?._id}`);
//                 toast.success("Report Card Report Noted");
//               } else {
//                 toast.error(`${res?.response?.data?.message}`);
//               }
//             });
//           } else {
//             toast.error("Please give a REMARK");
//           }
//         }}
//       />
//     </div>
//   );
// };

const SubjectScore: FC<any> = ({ props, el, gradeMidData }) => {
  // const { gradeData } = useStudentGrade(props?._id);
  // const { schoolInfo } = useSchoolSessionData(props?.schoolIDs);
  // const { subjectData } = useClassSubject(state?._id);
  // const { state } = useReadMyClassInfoData("JSS 1A");

  const { data } = useSchoolData();
  let result = gradeMidData?.midReportCard
    .find((el: any) => {
      return (
        el.classInfo ===
        `${props?.classAssigned} session: ${data?.presentSession}(${data?.presentTerm})`
      );
    })
    ?.result?.find((data: any) => {
      return data.subject === el?.subjectTitle;
    });

  return (
    <div className="w-[260px] border-r-2 border-blue-950 ">
      <div>
        <div className="w-[200px] ">
          <p className="pl-1 font-bold text-[12px]">
            {result?.subject ? result?.subject : "Have't Entered"}
          </p>
          <div className="pl-1 flex gap-1 mt-2 text-[10px] ">
            <p className="w-[35px] border-r">Score</p>
            <p className="w-[35px] ">Total</p>
            <p className="w-[35px] ">Grade</p>
          </div>
        </div>
      </div>
      <div className="pl-1 flex gap-1 mt-2 text-[12px] ">
        <p className="w-[35px] border-r">{result?.exam ? result?.exam : 0}</p>
        <p className="w-[35px] font-bold border-r">
          {result?.mark ? result?.mark : 0}
        </p>
        <p className="w-[35px] font-bold">
          {result?.grade ? result?.grade : "Nill"}
        </p>
      </div>
    </div>
  );
};

interface iProps {
  props?: any;
  Data?: any;
  id?: string;
  i?: number;
}

const MainStudentRow: FC<any> = ({ props, i, Data, mutate }) => {
  const { classID } = useParams();
  const { data } = useSchoolData();
  const { gradeData } = useStudentGrade(props?._id);
  const { gradeMidData } = useStudentMidGrade(props?._id);
  const { oneClass } = useReadOneClassInfo(classID!);
  const [loading, setLoading] = useState(false);
  const { subjectData } = useClassSubject(oneClass?._id);
  const { classStudents } = useClassStudent(oneClass?._id!);

  const { schoolInfo } = useSchoolSessionData(props?.schoolIDs);

  let result = gradeMidData?.midReportCard.find((el: any) => {
    return (
      el.classInfo ===
      `${props?.classAssigned} session: ${data?.presentSession}(${
        data!?.presentTerm
      })`
    );
  });

  const [stateValue, setStateValue] = useState(
    `${result?.classTeacherComment ? result?.classTeacherComment : ""}`
  );

  const [stateValue1, setStateValue1] = useState(
    `${result?.adminComment ? result?.adminComment : ""}`
  );

  let resultValue = Data?.find(
    (el: any) =>
      el.studentName === `${props?.studentFirstName} ${props?.studentLastName}`
  )?.performanceRating;

  return (
    <div
      className={`w-full flex items-center gap-2 text-[12px] font-medium  h-28 px-4 my-2  overflow-hidden ${
        i % 2 === 0 ? "bg-slate-50" : "bg-white"
      }`}
    >
      <div className={`w-[100px] border-r font-bold`}>{i + 1}</div>
      {/* name */}
      <div className="w-[250px] flex border-r">
        <div className="flex gap-2">
          <img
            className=" mask mask-squircle w-14 h-14 rounded-md border object-cover"
            src={props?.avatar ? props?.avatar : pix}
          />

          <div className="w-[180px] ">
            {" "}
            {props?.studentFirstName} {props?.studentLastName}
          </div>
        </div>
      </div>
      <div className="w-[100px] border-r">
        <AttendanceRatio props={props} />
      </div>

      <div
        className={` border-r items-center flex`}
        style={{ width: `${subjectData?.classSubjects.length * 280}px` }}
      >
        <div className="flex gap-4 ">
          {lodash
            .sortBy(subjectData?.classSubjects, "subjectTitle")
            ?.map((el: any) => (
              <SubjectScore props={props} el={el} gradeMidData={gradeMidData} />
            ))}
        </div>
      </div>

      <div className="w-[100px] border-r ">{result?.points}</div>

      <div className="w-[100px] border-r">{result?.grade}</div>

      <div className="w-[300px] border-r">
        {result?.classTeacherComment
          ? result?.classTeacherComment
          : "No Comment Yet"}
      </div>

      <div className="w-[220px] border-r">
        <Button
          name={result?.approve ? "Result Approved " : "Approve Result"}
          icon={loading && <FaSpinner className={`animate-spin `} />}
          className={`pl-4 py-3 w-[85%]  text-white ${
            result?.approve
              ? "bg-black hover:bg-neutral-800 "
              : "bg-red-500 hover:bg-red-600 "
          } transition-all duration-300`}
          onClick={() => {
            setLoading(true);

            adminMidReport(data?._id, props?._id, result?.adminComment)
              .then((res: any) => {
                if (res.status === 201) {
                  mutate();
                  toast.success("Report Card Report Noted");
                } else {
                  toast.error(`${res?.response?.data?.message}`);
                }
              })
              .finally(() => {
                setLoading(false);
              });
          }}
        />
      </div>

      <div className="w-[180px] border-r">
        <p className="w-[35px] ">
          {result?.approve ? "Approved" : "Not Approved"}
        </p>
      </div>
    </div>
  );
};

const Remark: FC<iProps> = ({ id, data }) => {
  const { mainStudentAttendance } = useStudentAttendance(id!);

  let name2 = data?.studentFirstName;

  let result = mainStudentAttendance?.data?.attendance?.find((el: any) => {
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
  const { mainStudentAttendance } = useStudentAttendance(props?._id);

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
        <p>0%</p>
      )}
    </div>
  );
};

const SubjectMap: FC<iProps> = ({ props }) => {
  return (
    <div className="w-[260px] border-r ">
      <p>Subject Offered</p>
      <p className="pl-3 font-bold text-[15px]">{props?.subjectTitle}</p>
      {/* <div className="pl-1 flex gap-1 mt-2 text-[10px] ">
        <p className="w-[30px] border-r">1st</p>
        <p className="w-[30px] border-r">2nd</p>
        <p className="w-[30px] border-r">3rd</p>
        <p className="w-[30px] border-r">4th</p>
        <p className="w-[35px] border-r">Exam</p>
        <p className="w-[35px] ">Total</p>
        <p className="w-[35px] ">Grade</p>
      </div> */}
    </div>
  );
};

const MidReportCard = () => {
  const navigate = useNavigate();
  const { classID } = useParams();

  const { oneClass } = useReadOneClassInfo(classID);

  const { state } = useReadMyClassInfoData(oneClass?.className);

  const { classStudents, mutate } = useClassStudent(oneClass?._id!);
  const { subjectData } = useClassSubject(oneClass?._id);
  const [data, setData] = useState([]);

  const [text, setText] = useState("");
  const [resultToggle, setResultToggle] = useState<boolean>(false);

  return (
    <div className="">
      <Toaster position="top-center" reverseOrder={true} />
      {/* header */}
      <div className="mb-0" />
      <LittleHeader name={"Admin's Mid-Result Remark and Approval"} />
      <div className="mt-10" />

      <div className="flex w-full justify-end"></div>
      <div className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden ">
        <div
          className={`text-[gray] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4`}
          style={{
            width: `${1200 + subjectData?.classSubjects.length * 300}px`,
          }}
        >
          <div className="w-[100px] border-r">Sequence</div>
          <div className="w-[250px] border-r">student Info</div>
          <div className="w-[100px] border-r">Student's Attendance Ratio</div>
          {/* 260px */}
          <div
            className={` border-r`}
            style={{ width: `${subjectData?.classSubjects.length * 280}px` }}
          >
            {/* <div>Subject Grade</div> */}
            <div className=" flex ">
              <div className="flex gap-4">
                {lodash
                  .sortBy(subjectData?.classSubjects, "subjectTitle")
                  ?.map((props: any) => (
                    <SubjectMap props={props} />
                  ))}
              </div>
            </div>
          </div>

          <div className="w-[100px] border-r">Total Points</div>
          <div className="w-[100px] border-r">Grade</div>
          <div className="w-[300px] border-r">Class Teacher's Comment</div>
          {/* <div className="w-[300px] border-r">Give Report/Remark</div> */}

          <div className="w-[220px] border-r">Submit Report</div>
          <div className="w-[180px] border-r">
            <p className="w-[35px] ">Approve</p>
          </div>
        </div>

        <div
          className={` overflow-hidde`}
          style={{
            width: `${1200 + subjectData?.classSubjects.length * 300}px`,
          }}
        >
          {classStudents?.students?.length > 0 ? (
            <div>
              {classStudents?.students?.map((props: any, i: number) => (
                <div key={props}>
                  <MainStudentRow props={props} i={i} mutate={mutate} />
                </div>
              ))}
            </div>
          ) : (
            <div>No student yet</div>
          )}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-blue-800 mt-0 font-[500] text-[30px] capitalize">
          General Class Remark
        </p>

        <p className="mt-5 mb-2">
          Please Give a general class remark to approve this result
        </p>

        <div className="w-full h-[300px] border rounded-md resize-none p-2">
          <CKEditor
            editor={ClassicEditor}
            onChange={(event, editor) => {
              const data = editor.getData();
              setText(data);
            }}
          />
        </div>
        {text ? (
          <button
            className={`btn btn-wide ${
              resultToggle ? "bg-neutral-800" : "bg-blue-950"
            } text-white mt-3 hover:bg-blue-900`}
            onClick={() => {
              setResultToggle(true);
              approveMainReport(classID, text)
                .then((res) => {
                  if (res.status === 200) {
                    toast.success("Result will be Published in a minute time");
                    navigate("/dashboard");
                  }
                })
                .finally(() => {
                  setResultToggle(false);
                });
            }}
          >
            {resultToggle ? (
              <p>
                <FaSpinner className="animate-spin text-[20px]" />
              </p>
            ) : (
              "Result Approved"
            )}
          </button>
        ) : (
          <button className="btn  bg-blue-950 text-white mt-8 hover:bg-blue-900 h-[55px] uppercase">
            Input Remark and Result Approved
          </button>
        )}
      </div>
    </div>
  );
};

export default MidReportCard;
