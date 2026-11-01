import pix from "../../../assets/pix.jpg";
import Button from "../../../components/reUse/Button";
import LittleHeader from "../../../components/static/LittleHeader";
import moment from "moment";
import { FC, useState } from "react";
import {
  useSchoolSessionData,
  useStudentAttendance,
  useViewSessionTerm,
} from "../../../pages/hook/useSchoolAuth";
import {
  useClassStudent,
  useClassSubject,
  useStudentGrade,
  useTeacherInfo,
} from "../../../pagesForTeachers/hooks/useTeacher";
import {
  readClassInfo,
  remark,
  reportCardRemark,
  viewStudentGrade,
} from "../../../pagesForTeachers/api/teachersAPI";
import { mutate } from "swr";
import toast, { Toaster } from "react-hot-toast";
import {
  useReadMyClassInfoData,
  useStudentInfo,
} from "../../../pagesForStudents/hooks/useStudentHook";
import lodash from "lodash";
import { useParams } from "react-router-dom";

interface iProps {
  props?: any;
  id?: string;
  el?: any;
  data?: any;
  i?: number;
  stateValue?: string;
  teacherInfo?: any;
  mainData?: any;
}

const ButtonReport: FC<iProps> = ({ stateValue, props, teacherInfo }) => {
  const { gradeData } = useStudentGrade(props?._id);
  const { schoolInfo } = useSchoolSessionData(props?.schoolIDs);

  // SS 1A session: 2024/2025(Second Term)

  // let result = gradeData?.reportCard
  //   .find((el: any) => {
  //     return el.classInfo ===  `${props?.classAssigned} session: ${schoolInfo[0]?.year}(${schoolInfo[0]?.presentTerm})`;
  //   })
  //   ?.result?.find((data: any) => {
  //     return data.subject === el?.subjectTitle;
  //   });

  let result = gradeData?.reportCard.find((el: any) => {
    return (
      el.classInfo ===
      `${props?.classAssigned} session: ${schoolInfo[0]?.year}(${schoolInfo[0]?.presentTerm})`
    );
  });

  return (
    <div className="w-[180px] border-r">
      <Button
        name="Add Comment"
        className="pl-4 py-3 w-[85%] bg-black text-white  hover:bg-neutral-800 transition-all duration-300"
        onClick={() => {
          if (stateValue !== "") {
            reportCardRemark(teacherInfo?._id, props?._id, {
              teacherComment: stateValue,
            }).then((res: any) => {
              if (res.status === 201) {
                mutate(`api/student-report-card/${props?._id}`);
                toast.success("Report Card Report Noted");
              } else {
                toast.error(`${res?.response?.data?.message}`);
              }
            });
          } else {
            toast.error("Please give a REMARK");
          }
        }}
      />
    </div>
  );
};

const SubjectScore: FC<iProps> = ({ props, el }) => {
  const { gradeData } = useStudentGrade(props?._id);
  const { schoolInfo } = useSchoolSessionData(props?.schoolIDs);

  let result = gradeData?.reportCard
    .find((el: any) => {
      return (
        el.classInfo ===
        `${props?.classAssigned} session: ${schoolInfo[0]?.year}(${schoolInfo[0]?.presentTerm})`
      );
    })
    ?.result?.find((data: any) => {
      return data.subject === el?.subjectTitle;
    });

  return (
    <div className="w-[260px] border-r-2 border-blue-950 py-3 ">
      <div>
        <div className=" flex ">
          <div className="w-[260px]  ">
            <p className="pl-3 font-bold text-[15px]">{el?.subject}</p>
            <div className="pl-1 flex gap-1 mt-2 text-[10px] ">
              <p className="w-[30px] border-r">1st</p>
              <p className="w-[30px] border-r">2nd</p>
              <p className="w-[30px] border-r">3rd</p>
              <p className="w-[30px] border-r">4th</p>
              <p className="w-[35px] border-r">Exam</p>
              <p className="w-[35px] ">Total</p>
              <p className="w-[35px] ">Grade</p>
            </div>
          </div>
        </div>
      </div>
      <div className="pl-1 flex gap-1 mt-2 text-[12px] ">
        <p className="w-[30px] border-r">{el?.test1 ? el?.test1 : 0}</p>
        <p className="w-[30px] border-r">{el?.test2 ? el?.test2 : 0}</p>
        <p className="w-[30px] border-r">{el?.test3 ? el?.test3 : 0}</p>
        <p className="w-[30px] border-r">{el?.test4 ? el?.test4 : 0}</p>
        <p className="w-[35px] border-r">{el?.exam ? el?.exam : 0}</p>
        <p className="w-[35px] font-bold border-r">{el?.mark ? el?.mark : 0}</p>
        <p className="w-[35px] font-bold">{el?.grade ? el?.grade : "Nill"}</p>
      </div>
    </div>
  );
};

const MainStudentRow: FC<iProps> = ({ props, i, mainData }) => {
  const { teacherInfo } = useTeacherInfo();
  const { gradeData } = useStudentGrade(props?._id);

  const { state } = useReadMyClassInfoData(teacherInfo?.classesAssigned);
  const { classStudents } = useClassStudent(state?._id!);

  const { subjectData } = useClassSubject(state?._id);
  const { schoolInfo } = useSchoolSessionData(props?.schoolIDs);

  let result = gradeData?.reportCard.find((el: any) => {
    return (
      el.classInfo ===
      `${props?.classAssigned} session: ${schoolInfo![0]!?.year}(${
        schoolInfo![0]!?.presentTerm
      })`
    );
  });

  return (
    <div
      className={`w-full flex items-center gap-2 text-[12px] font-medium  h-24 px-4 my-2  overflow-hidden ${
        i % 2 === 0 ? "bg-slate-50" : "bg-white"
      }`}
    >
      <div className={`w-[100px] border-r font-bold`}>{i + 1}</div>
      {/* name */}
      <div className="w-[250px] flex border-r">
        <div className="flex gap-2">
          <img
            className=" mask mask-squircle w-14 h-14 rounded-md border object-cover"
            src={mainData?.avatar ? mainData?.avatar : pix}
          />

          <div className="w-[180px] ">
            {" "}
            <p className="font-bold text-[13px]">
              {props?.classInfo.split(":")[0].split("session")[0]}
            </p>
            <p className="mt-1">
              session:
              {props?.classInfo.split("session:")[1].split("(")[0]}
            </p>
            <p className="text-[11px] font-bold -mt-1">
              {" "}
              {props?.classInfo
                .split("session:")[1]
                .split("(")[1]
                .replace(")", "")}
            </p>
          </div>
        </div>
      </div>
      <div className="w-[100px] border-r">
        <AttendanceRatio mainData={mainData} />
      </div>
      <div className="w-[100px] border-r">{props?.points}</div>
      <div className="w-[100px] border-r text-[15px] leading-tight font-bold">
        {props?.grade}
      </div>

      <div
        className={`w-[${
          subjectData?.classSubjects.length * 260
        }px]  border-r items-center flex`}
      >
        <div className="flex gap-4 ">
          {lodash.sortBy(props?.result, "subject")?.map((el: any) => (
            <SubjectScore props={props} el={el} />
          ))}
        </div>
      </div>
    </div>
  );
};

const AttendanceRatio: FC<iProps> = ({ mainData }) => {
  const { mainStudentAttendance } = useStudentAttendance(mainData?._id);

  return (
    <div>
      {(
        (mainStudentAttendance?.data?.attendance.filter(
          (el: any) => el.present === true
        ).length /
          mainStudentAttendance?.data?.attendance.length) *
        100
      ).toFixed(2)}
      %
    </div>
  );
};

const StudentResult = () => {
  const { termID } = useParams();
  const { sessionTermData } = useViewSessionTerm(termID);

  document.title = `Viewing ${sessionTermData?.data?.year} session of ${sessionTermData?.data?.presentTerm}`;

  const { studentInfo } = useStudentInfo();

  const { state } = useReadMyClassInfoData(studentInfo?.classAssigned);
  const { subjectData } = useClassSubject(state?._id);

  const { gradeData } = useStudentGrade(studentInfo?._id);

  return (
    <div className="">
      <Toaster position="top-center" reverseOrder={true} />
      {/* header */}
      <div className="mb-0" />
      <LittleHeader
        name={`${sessionTermData?.data?.year} session of ${sessionTermData?.data?.presentTerm} Student's Result History`}
      />

      <div className="mt-10" />

      <div className="flex w-full justify-end"></div>
      <div className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden ">
        <div
          className={`text-[gray] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4`}
          style={{
            width: `${1000 + subjectData?.classSubjects.length * 260}px`,
          }}
        >
          <div className="w-[100px] border-r">Sequence</div>
          <div className="w-[250px] border-r">student Info</div>
          <div className="w-[100px] border-r">Student's Attendance Ratio</div>
          <div className="w-[100px] border-r">Class Performance</div>
          <div className="w-[100px] border-r">Class Grade</div>
          {/* 260px */}
          <div
            className={`w-[${
              subjectData?.classSubjects.length * 260
            }px] border-r`}
          />
        </div>

        <div
          className={` overflow-hidden`}
          style={{
            width: `${1000 + subjectData?.classSubjects.length * 260}px`,
          }}
        >
          {gradeData?.reportCard?.length > 0 ? (
            <div>
              {gradeData?.reportCard?.map((props: any, i: number) => (
                <div key={props}>
                  <MainStudentRow props={props} i={i} mainData={gradeData} />
                </div>
              ))}
            </div>
          ) : (
            <div>No student result yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentResult;
