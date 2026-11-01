document.title = "View  Result History";
import pix from "../../../assets/pix.jpg";
import Button from "../../../components/reUse/Button";
import LittleHeader from "../../../components/static/LittleHeader";
import moment from "moment";
import { FC, useState } from "react";
import {
  useSchoolSessionData,
  useStudentAttendance,
} from "../../../pages/hook/useSchoolAuth";
import {
  useClassAcademicHistory,
  useClassStudent,
  useClassSubject,
  useStudentGrade,
  useTeacherInfo,
} from "../../hooks/useTeacher";
import {
  readClassInfo,
  remark,
  reportCardRemark,
  viewStudentGrade,
} from "../../api/teachersAPI";
import { mutate } from "swr";
import toast, { Toaster } from "react-hot-toast";
import Input from "../../components/reUse/Input";
import { useReadMyClassInfoData } from "../../../pagesForStudents/hooks/useStudentHook";
import lodash from "lodash";
import { useParams } from "react-router-dom";
import { el } from "date-fns/locale";

interface iProps {
  props?: any;
  id?: string;
  el?: any;
  data?: any;
  i?: number;
  stateValue?: string;
  teacherInfo?: any;
}

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
    <div className="w-[260px] border-r-2 border-blue-950 ">
      <div className="pl-1 flex gap-1 mt-2 text-[12px] ">
        <p className="w-[30px] border-r">{result?.test1 ? result?.test1 : 0}</p>
        <p className="w-[30px] border-r">{result?.test2 ? result?.test2 : 0}</p>
        <p className="w-[30px] border-r">{result?.test3 ? result?.test3 : 0}</p>
        <p className="w-[30px] border-r">{result?.test4 ? result?.test4 : 0}</p>
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

const MainStudentRow: FC<iProps> = ({ props, i }) => {
  const { teacherInfo } = useTeacherInfo();
  const { gradeData } = useStudentGrade(props?._id);

  const { state } = useReadMyClassInfoData(teacherInfo?.classesAssigned);

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
      className={`w-full flex items-center gap-2 text-[12px] font-medium  h-16 px-4 my-2  overflow-hidden ${
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

      <div className="w-[100px] border-r">{result?.points}</div>

      <div className="w-[100px] border-r">{result?.grade}</div>

      <div
        className={`w-[${
          subjectData?.classSubjects.length * 260
        }px]  border-r items-center flex`}
      >
        <div className="flex gap-4 ">
          {lodash
            .sortBy(subjectData?.classSubjects, "subjectTitle")
            ?.map((el: any) => (
              <SubjectScore props={props} el={el} />
            ))}
        </div>
      </div>
    </div>
  );
};

const AttendanceRatio: FC<iProps> = ({ props }) => {
  const { mainStudentAttendance } = useStudentAttendance(props?._id);

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

const SubjectMap: FC<iProps> = ({ props }) => {
  return (
    <div className="w-[260px] border-r ">
      <p className="pl-3 font-bold text-[15px]">{props?.subjectTitle}</p>
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
  );
};

const ResultTermDetail = () => {
  const { teacherInfo } = useTeacherInfo();
  const { session, term } = useParams();

  const { state } = useReadMyClassInfoData(teacherInfo?.classesAssigned);

  const { classStudents } = useClassStudent(state?._id!);
  const { subjectData } = useClassSubject(state?._id);

  const { classAcademicHistory } = useClassAcademicHistory(state?._id);

  let data = lodash.groupBy(classAcademicHistory?.classHistory, "session");
  const dataX = Object.values(data).flat();

  const readStudent = dataX.find((el: any) => {
    return (
      el.term === term.replace("-", " ") &&
      el.session === session.replace("-", "/")
    );
  });

  console.log("subject:: ", readStudent);

  return (
    <div className="">
      <Toaster position="top-center" reverseOrder={true} />
      {/* header */}
      <div className="mb-0" />
      <LittleHeader
        name={`${session.replace("-", "/")}: ${term.replace("-", " ")} Result`}
      />

      <div className="mt-10" />

      <div className="flex w-full justify-end"></div>
      <div className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden ">
        <div
          className={`text-[gray] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4`}
          style={{
            width: `${800 + subjectData?.classSubjects.length * 260}px`,
          }}
        >
          <div className="w-[100px] border-r">Sequence</div>
          <div className="w-[250px] border-r">student Info</div>
          <div className="w-[100px] border-r">Student's Attendance Ratio</div>

          <div className="w-[100px] border-r">Total Points</div>
          <div className="w-[100px] border-r">Grade</div>
          {/* 260px */}
          <div
            className={`w-[${
              subjectData?.classSubjects.length * 260
            }px] border-r`}
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
        </div>

        <div
          className={` overflow-hidden`}
          style={{
            width: `${800 + subjectData?.classSubjects.length * 260}px`,
          }}
        >
          {readStudent?.resultHistory?.length > 0 ? (
            <div>
              {readStudent?.resultHistory?.map((props: any, i: number) => (
                <div key={props}>
                  <MainStudentRow props={props} i={i} />
                </div>
              ))}
            </div>
          ) : (
            <div>No student yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultTermDetail;
