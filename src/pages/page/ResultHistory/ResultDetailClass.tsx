document.title = "View  Result History";
import pix from "../../../assets/pix.jpg";
import LittleHeader from "../../../components/static/LittleHeader";
import { FC } from "react";
import { Link } from "react-router-dom";
import {
  useSchoolSessionData,
  useStudentAttendance,
  useViewSessionTerm,
} from "../../../pages/hook/useSchoolAuth";

import { Toaster } from "react-hot-toast";
import {
  useReadMyClassInfoData,
  useReadOneClassInfo,
} from "../../../pagesForStudents/hooks/useStudentHook";
import lodash from "lodash";
import { useParams } from "react-router-dom";
import {
  useClassAcademicHistory,
  useClassSubject,
  useStudentGrade,
  useTeacherInfo,
} from "../../../pagesForTeachers/hooks/useTeacher";
import { FaCheckDouble } from "react-icons/fa6";

interface iProps {
  props?: any;
  id?: string;
  el?: any;
  data?: any;
  i?: number;
  stateValue?: string;
  teacherInfo?: any;
  getClass?: any;
}

const SubjectScore: FC<iProps> = ({ props, el }) => {
  const { gradeData } = useStudentGrade(props?._id);
  const { session, term } = useParams();

  let result = gradeData?.reportCard
    ?.find((el: any) => {
      return (
        el.classInfo ===
        `${props?.classAssigned} session: ${session.replace(
          "-",
          "/"
        )}(${term.replace("-", " ")})`
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

const MainStudentRow: FC<iProps> = ({ props, i, getClass }) => {
  const { gradeData } = useStudentGrade(props?._id);

  const { oneClass } = useReadOneClassInfo(props?.presentClassID);

  const { subjectData } = useClassSubject(oneClass?._id);

  const { session, term, id } = useParams();

  let result = gradeData?.reportCard.find((el: any) => {
    return (
      el.classInfo ===
      `${getClass} session: ${session.replace("-", "/")}(${term.replace(
        "-",
        " "
      )})`
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
      <div className="uppercase">
        {term === "1st-Term" ? (
          props?.feesPaid1st ? (
            <div className="w-[100px] border-r">Paid</div>
          ) : (
            <div className="w-[100px] border-r text-red-500 uppercase">
              Unpaid
            </div>
          )
        ) : term === "2nd-Term" ? (
          props?.feesPaid2nd ? (
            <div className="w-[100px] border-r">Paid</div>
          ) : (
            <div className="w-[100px] border-r text-red-500">UnPaid</div>
          )
        ) : term === "3rd-Term" ? (
          props?.feesPaid3rd ? (
            <div className="w-[100px] border-r">Paid</div>
          ) : (
            <div className="w-[100px] border-r text-red-500">UnPaid</div>
          )
        ) : null}
      </div>

      <div className="w-[100px] border-r">
        <AttendanceRatio props={props} />
      </div>

      <div className="w-[100px] border-r">{result?.grade}</div>

      <div
        className={`w-[${
          subjectData?.classSubjects.length * 260
        }px]  border-r items-center flex`}
      >
        <div className="flex gap-4 ">
          {lodash
            .sortBy(subjectData?.classSubjects, "subjectTitle")
            ?.map((el: any, i: number) => (
              <SubjectScore props={props} el={el} key={i} />
              // <div>Great</div>
            ))}
        </div>
      </div>
      <div className="w-2 border-r"></div>
      <div className="w-[300px] border-r">{result?.classTeacherComment}</div>
      <div className="w-[300px] border-r">{result?.adminComment}</div>
      <div className="w-[150px] border-r">
        <Link to={`/view-students-report-card-historical/${props?._id}`}>
          <button className="rounded-md bg-blue-950 text-white px-10 py-3 text-[12px] leading-5 tracking-widest cursor-pointer hover:bg-blue-900 transition-all duration-300 uppercase">
            Print
          </button>
        </Link>
      </div>
    </div>
  );
};

const AttendanceRatio: FC<iProps> = ({ props }) => {
  const { mainStudentAttendance } = useStudentAttendance(props?._id);

  return (
    <div>
      {isNaN(
        (mainStudentAttendance?.data?.attendance?.filter(
          (el: any) => el.present === true
        ).length /
          mainStudentAttendance?.data?.attendance?.length) *
          100
      )
        ? 0
        : (
            (mainStudentAttendance?.data?.attendance?.filter(
              (el: any) => el.present === true
            ).length /
              mainStudentAttendance?.data?.attendance?.length) *
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

const ResultDetailClass = () => {
  const { teacherInfo } = useTeacherInfo();
  const { termID, ID, term, session } = useParams();

  const { sessionTermData } = useViewSessionTerm(termID);
  document.title = `Viewing ${sessionTermData?.data?.year} session of ${sessionTermData?.data?.presentTerm}`;

  const getResult = sessionTermData?.data?.classResult?.find((el: any) => {
    return el._id === ID;
  });

  const { classAcademicHistory } = useClassAcademicHistory(getResult?._id);
  const { subjectData } = useClassSubject(classAcademicHistory?._id);

  let data = lodash.groupBy(classAcademicHistory?.classHistory, "session");
  const dataX = Object.values(data).flat();

  const readStudent = dataX.find((el: any) => {
    return (
      el.term === term.replace("-", " ") &&
      el.session === session.replace("-", "/")
    );
  });

  return (
    <div className="">
      <Toaster position="top-center" reverseOrder={true} />
      {/* header */}
      <div className="mb-0" />
      <LittleHeader
        name={`Viewing ${getResult?.className} ${sessionTermData?.data?.year} session of ${sessionTermData?.data?.presentTerm}`}
      />

      <div className="mt-10" />

      <div className="flex w-full justify-end"></div>
      <div className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden ">
        <div
          className={`text-[gray] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4`}
          style={{
            width: `${1472 + subjectData?.classSubjects.length * 260}px`,
          }}
        >
          <div className="w-[100px] border-r">Sequence</div>
          <div className="w-[250px] border-r">student Info</div>
          <div className="w-[100px] border-r">
            SchoolFee <br />
            Info
          </div>
          <div className="w-[100px] border-r">Student's Attendance Ratio</div>

          <div className="w-[100px] border-r">Total Points</div>
          {/* <div className="w-[100px] border-r">Grade</div> */}
          {/* 260px */}
          <div
            className={`w-[${
              subjectData?.classSubjects?.length * 260
            }px] border-r`}
          >
            <div className=" flex flex-col">
              <div className="mb-2 font-bold text-blue-950">Grades</div>
              <div className="flex gap-4">
                {lodash
                  .sortBy(subjectData?.classSubjects, "subjectTitle")
                  ?.map((props: any, i: number) => (
                    <SubjectMap key={i} props={props} />
                  ))}
              </div>
            </div>
          </div>
          <div className="w-2 "></div>
          <div className="w-[300px] border-r">Class Teacher's Comment</div>
          <div className="w-[300px] border-r">
            Principal's Teacher's Comment
          </div>
          <div className="w-[150px] border-r">Print</div>
        </div>

        <div
          className={` overflow-hidden w-[2000px] `}
          style={{
            width: `${1472 + subjectData?.classSubjects.length * 260}px`,
          }}
        >
          {readStudent?.resultHistory?.length > 0 ? (
            <div>
              {readStudent?.resultHistory?.map((props: any, i: number) => {
                return (
                  <div key={i}>
                    <MainStudentRow
                      props={props}
                      i={i}
                      getClass={getResult?.className}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center flex-col w-[20%] font-semibold">
              <FaCheckDouble className="my-2" />
              <p>No student Data Captured yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultDetailClass;
