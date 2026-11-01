// import { FC, useEffect, useRef, useState, useMemo } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import moment from "moment";
// import lodash from "lodash";
// import toast, { Toaster } from "react-hot-toast";
// import { FaSpinner } from "react-icons/fa6";
// import { usePDF } from "react-to-pdf";

// import LittleHeader from "../../../components/static/LittleHeader";
// import {
//   useSchoolData,
//   useSchoolSessionData,
// } from "../../../pages/hook/useSchoolAuth";
// import { useReadOneClassInfo } from "../../../pagesForStudents/hooks/useStudentHook";
// import {
//   useClassStudent,
//   useClassSubject,
//   useStudentGrade,
// } from "../../../pagesForTeachers/hooks/useTeacher";

// // Types
// interface Student {
//   _id: string;
//   studentFirstName: string;
//   studentLastName: string;
//   gender: string;
//   classAssigned: string;
//   schoolIDs: string;
//   gradeData?: any;
// }

// interface Subject {
//   subjectTitle: string;
//   _id: string;
// }

// interface SubjectScoreProps {
//   student: Student;
//   subject: Subject;
//   classInfo: string;
// }

// interface StudentRowProps {
//   student: Student;
//   index: number;
//   subjects: Subject[];
//   classInfo: string;
//   position?: number | null;
// }

// interface SubjectHeaderProps {
//   subject: Subject;
// }

// // Utility Functions
// const calculateGrade = (averageScore: number): string => {
//   if (averageScore >= 74) return "A1";
//   if (averageScore >= 69) return "B2";
//   if (averageScore >= 64) return "B3";
//   if (averageScore >= 59) return "C4";
//   if (averageScore >= 54) return "C5";
//   if (averageScore >= 49) return "C6";
//   if (averageScore >= 44) return "D7";
//   if (averageScore >= 39) return "E8";
//   return "F9";
// };

// const getStudentResult = (student: Student, classInfo: string) => {
//   return student?.gradeData?.reportCard?.find(
//     (el: any) => el.classInfo === classInfo
//   );
// };

// // Sub-Components
// const SubjectScore: FC<SubjectScoreProps> = ({
//   student,
//   subject,
//   classInfo,
// }) => {
//   const { gradeData } = useStudentGrade(student?._id);
//   const { data } = useSchoolData();
//   const { schoolInfo } = useSchoolSessionData(student?.schoolIDs);

//   const result = gradeData?.reportCard?.find((el: any) => {
//     return el.classInfo === classInfo || ` ${classInfo}`;
//   });

//   const subjectResult = result?.result?.find(
//     (data: any) => data.subject === subject.subjectTitle
//   );

//   const test1 = subjectResult?.test1 || 0;
//   const test2 = subjectResult?.test2 || 0;
//   const test3 = subjectResult?.test3 || 0;
//   const test4 = subjectResult?.test4 || 0;

//   const caScore = test1 + test2 + test3 + test4;
//   const examScore = subjectResult?.exam || 0;
//   const totalScore = subjectResult?.mark || 0;

//   return (
//     <div className="w-[120px] border-r-2 border-blue-950">
//       <div className="pl-1 flex gap-1 mt-2 text-[10px]">
//         <p className="w-[30px] border-r">CA</p>
//         <p className="w-[35px] border-r">Exam</p>
//         <p className="w-[35px]">Total</p>
//       </div>
//       <div className="pl-1 flex gap-1 mt-2 text-[12px]">
//         <p className="w-[30px] border-r">{caScore}</p>
//         <p className="w-[35px] border-r">{examScore}</p>
//         <p className="w-[35px] font-bold border-r">{totalScore}</p>
//       </div>
//     </div>
//   );
// };

// const SubjectHeader: FC<SubjectHeaderProps> = ({ subject }) => {
//   return (
//     <div className="w-[120px] border-r h-[150px] flex flex-col relative justify-start items-start">
//       <div className="absolute top-[60%] left-3 transform -translate-x-[90%] -translate-y-[70%] rotate-90 text-start h-[180px] w-[150px] mt-10 break-words text-[14px] font-[500] text-black">
//         {subject.subjectTitle}
//       </div>
//     </div>
//   );
// };

// const StudentRow: FC<StudentRowProps> = ({
//   student,
//   index,
//   subjects,
//   classInfo,
//   position = null,
// }) => {
//   const { gradeData } = useStudentGrade(student?._id);

//   const studentResult = gradeData?.reportCard?.find((el: any) => {
//     return el.classInfo.trim() === classInfo || ` ${classInfo}`;
//   });

//   const results = studentResult?.result || [];

//   const totalScore = results.reduce(
//     (sum: number, el: any) => sum + (el?.mark || 0),
//     0
//   );
//   const numberOfSubjects = results.length;
//   const averageScore = numberOfSubjects > 0 ? totalScore / numberOfSubjects : 0;
//   const grade = calculateGrade(averageScore);

//   const isEvenRow = index % 2 === 0;

//   return (
//     <div
//       className={`w-full flex items-center gap-2 text-[12px] font-medium h-28 px-4 my-2 overflow-hidden ${
//         isEvenRow ? "bg-slate-50" : "bg-white"
//       }`}
//     >
//       <div className="w-[40px] border-r font-bold">{index + 1}</div>

//       <div className="w-[220px] flex border-r">
//         <div className="w-[220px] break-words">
//           {student.studentLastName} {student.studentFirstName}
//         </div>
//       </div>

//       <div className="w-[40px] border-r">
//         {student.gender?.charAt(0) || "-"}
//       </div>

//       <div className="border-r items-center flex">
//         <div className="flex gap-4">
//           {subjects.map((subject) => (
//             <SubjectScore
//               key={subject._id}
//               student={student}
//               subject={subject}
//               classInfo={classInfo}
//             />
//           ))}
//         </div>
//       </div>

//       <div className="w-[40px] border-r">{numberOfSubjects}</div>
//       <div className="w-[40px] border-r">{totalScore}</div>
//       <div className="w-[60px] border-r">{averageScore.toFixed(2)}</div>
//       <div className="w-[40px] border-r">{grade}</div>
//       <div className="w-[40px] border-r">{propsPositionToString(position)}</div>
//     </div>
//   );
// };

// // Helper: format position as ordinal (1 -> 1st, 2 -> 2nd)
// function propsPositionToString(n?: number | null) {
//   if (n == null) return "-";
//   const s = ["th", "st", "nd", "rd"];
//   const v = n % 100;
//   return n + (s[(v - 20) % 10] || s[v] || s[0]);
// }

// const RotatedHeader: FC<{ text: string; width: string }> = ({
//   text,
//   width,
// }) => {
//   return (
//     <div
//       className={`${width} border-r h-[150px] flex flex-col relative justify-start items-start`}
//     >
//       <div className="absolute top-[60%] left-1 transform -translate-x-[100%] -translate-y-[70%] rotate-90 text-start h-[180px] w-[150px] mt-10 break-words">
//         {text}
//       </div>
//     </div>
//   );
// };

// // Component to fetch grade data for a single student
// const StudentGradeDataFetcher: FC<{
//   student: Student;
//   classInfo: string;
//   onDataFetched: (data: {
//     id: string;
//     student: Student;
//     totalPoints: number;
//   }) => void;
// }> = ({ student, classInfo, onDataFetched }) => {
//   const { gradeData } = useStudentGrade(student?._id);

//   useEffect(() => {
//     if (!gradeData) return;

//     const result = gradeData?.reportCard?.find((el: any) => {
//       const elClassInfo = el.classInfo?.toString().trim();
//       const targetClassInfo = classInfo?.toString().trim();

//       return elClassInfo === targetClassInfo;
//     });

//     const totalPoints =
//       result?.result?.reduce(
//         (sum: number, el: any) => sum + (el?.mark || 0),
//         0
//       ) || 0;

//     onDataFetched({ id: student._id, student, totalPoints });
//   }, [gradeData, student, classInfo, onDataFetched]);

//   return null;
// };

// // Main Component
// const BroadSheetReportCardApproved: FC = () => {
//   const navigate = useNavigate();
//   const { classID } = useParams<{ classID: string }>();

//   const { oneClass } = useReadOneClassInfo(classID);
//   const { classStudents } = useClassStudent(oneClass?._id);
//   const { subjectData } = useClassSubject(oneClass?._id);
//   const { data } = useSchoolData();
//   const [loading, setLoading] = useState(false);
//   const [loadingView, setLoadingView] = useState(false);
//   const [studentTotals, setStudentTotals] = useState<
//     Record<string, { id: string; student: Student; totalPoints: number }>
//   >({});

//   const contentRef = useRef<HTMLDivElement>(null);
//   const { toPDF, targetRef }: any = usePDF({
//     filename: `broadsheet-${oneClass?.className}-${moment().format("lll")}.pdf`,
//     page: {
//       orientation: "landscape",
//     },
//   });

//   const classInfo = `${oneClass?.className?.trim() || ""} session: ${
//     data?.presentSession || ""
//   }(${oneClass?.presentTerm || ""})`.trim();

//   const sortedSubjects = lodash.sortBy(
//     subjectData?.classSubjects || [],
//     "subjectTitle"
//   );

//   const studentsList = classStudents?.students || [];

//   // Handle data fetched from each student
//   const handleDataFetched = useMemo(
//     () => (data: { id: string; student: Student; totalPoints: number }) => {
//       setStudentTotals((prev) => ({
//         ...prev,
//         [data.id]: data,
//       }));
//     },
//     []
//   );

//   // Convert studentTotals object to array
//   const totals = useMemo(() => {
//     const result = studentsList.map((student) => {
//       const data = studentTotals[student._id];
//       return data || { id: student._id, student, totalPoints: 0 };
//     });
//     return result;
//   }, [studentsList, studentTotals]);

//   // Sort by total points descending
//   const totalsSorted = useMemo(() => {
//     const sorted = lodash.orderBy(totals, ["totalPoints"], ["desc"]);
//     return sorted;
//   }, [totals]);

//   // Assign positions with tie-handling - only for students with points > 0
//   const rankMap: Record<string, number | null> = useMemo(() => {
//     const map: Record<string, number | null> = {};

//     // Filter students with points > 0 for ranking
//     const studentsWithPoints = totalsSorted.filter((t) => t.totalPoints > 0);

//     let lastTotal: number | null = null;
//     let lastRank = 0;
//     let currentIndex = 0;

//     for (const t of studentsWithPoints) {
//       currentIndex += 1;

//       // If same score as previous, assign same rank
//       if (lastTotal !== null && t.totalPoints === lastTotal) {
//         map[t.id] = lastRank;
//       } else {
//         // New score, assign current position
//         map[t.id] = currentIndex;
//         lastRank = currentIndex;
//         lastTotal = t.totalPoints;
//       }
//     }

//     // Students with 0 points get null (will display as "-")
//     for (const t of totalsSorted) {
//       if (!(t.id in map)) {
//         map[t.id] = null;
//       }
//     }

//     return map;
//   }, [totalsSorted]);

//   const sortedStudents = totalsSorted.map((t) => t.student);

//   const handlePrintResult = async () => {
//     setLoading(true);
//     setLoadingView(true);

//     setTimeout(() => {
//       toPDF().finally(() => {
//         setLoading(false);
//         setLoadingView(false);
//         toast.success("Result downloaded.");
//       });
//     }, 2000);
//   };

//   const dynamicWidth = loadingView
//     ? `${100 + sortedSubjects.length * 160}px`
//     : "";

//   return (
//     <div className="w-full">
//       <Toaster position="top-center" reverseOrder={true} />

//       {/* Hidden components to fetch grade data */}
//       {studentsList.map((student) => (
//         <StudentGradeDataFetcher
//           key={student._id}
//           student={student}
//           classInfo={classInfo}
//           onDataFetched={handleDataFetched}
//         />
//       ))}

//       <div className="mb-0" />
//       <LittleHeader name="Class Result Broad Sheet" />
//       <div className="mt-10" />

//       <div className="flex justify-end mb-4">
//         <button
//           disabled={loading}
//           className={`text-[12px] tracking-widest transition-all duration-300 hover:bg-red-100 px-8 py-2 rounded-md bg-red-50 ${
//             loading && "cursor-not-allowed bg-red-200 animate-pulse"
//           }`}
//           onClick={handlePrintResult}
//         >
//           {loading ? (
//             <div className="flex gap-2 items-center">
//               <FaSpinner className="animate-spin" />
//               <span>downloading...</span>
//             </div>
//           ) : (
//             "Print Result"
//           )}
//         </button>
//       </div>

//       <div
//         ref={targetRef}
//         style={{ width: dynamicWidth, height: "100%" }}
//         className={`py-6 px-2 min-w-[300px] ${
//           !loadingView
//             ? "border rounded-md overflow-x-auto overflow-y-hidden"
//             : ""
//         }`}
//       >
//         {/* Table Header */}
//         <div className="text-[gray] flex gap-2 text-[12px] font-medium uppercase mb-10 px-4 min-w-fit">
//           <div className="w-[40px] border-r">S/N</div>
//           <div className="w-[220px] border-r">Student Info</div>
//           <div className="w-[40px] border-r">Sex</div>

//           <div className="border-r flex gap-4">
//             {sortedSubjects.map((subject: Subject) => (
//               <SubjectHeader key={subject._id} subject={subject} />
//             ))}
//           </div>

//           <RotatedHeader text="No. of Subj." width="w-[40px]" />
//           <RotatedHeader text="Total Score" width="w-[40px]" />
//           <RotatedHeader text="Total Points" width="w-[60px]" />
//           <RotatedHeader text="Grade" width="w-[40px]" />
//           <RotatedHeader text="Position" width="w-[40px]" />
//         </div>

//         {/* Student Rows */}
//         <div className="overflow-hidden min-w-fit">
//           {sortedStudents.length > 0 ? (
//             sortedStudents.map((student: Student, index: number) => (
//               <StudentRow
//                 key={student._id}
//                 student={student}
//                 index={index}
//                 subjects={sortedSubjects}
//                 classInfo={classInfo}
//                 position={rankMap[student._id]}
//               />
//             ))
//           ) : (
//             <div className="text-center py-8">No students yet</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BroadSheetReportCardApproved;
import { FC, useEffect, useRef, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import lodash from "lodash";
import toast, { Toaster } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa6";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import LittleHeader from "../../../components/static/LittleHeader";
import {
  useSchool,
  useSchoolData,
  useSchoolSessionData,
} from "../../../pages/hook/useSchoolAuth";
import { useReadOneClassInfo } from "../../../pagesForStudents/hooks/useStudentHook";
import {
  useClassStudent,
  useClassSubject,
  useStudentGrade,
  useTeacherInfo,
} from "../../../pagesForTeachers/hooks/useTeacher";

// Types
interface Student {
  _id: string;
  studentFirstName: string;
  studentLastName: string;
  gender: string;
  classAssigned: string;
  schoolIDs: string;
  gradeData?: any;
}

interface Subject {
  subjectTitle: string;
  _id: string;
}

interface SubjectScoreProps {
  student: Student;
  subject: Subject;
  classInfo: string;
}

interface StudentRowProps {
  student: Student;
  index: number;
  subjects: Subject[];
  classInfo: string;
  position?: number | null;
}

interface SubjectHeaderProps {
  subject: Subject;
}

// Utility Functions
const calculateGrade = (averageScore: number): string => {
  if (averageScore >= 74) return "A1";
  if (averageScore >= 69) return "B2";
  if (averageScore >= 64) return "B3";
  if (averageScore >= 59) return "C4";
  if (averageScore >= 54) return "C5";
  if (averageScore >= 49) return "C6";
  if (averageScore >= 44) return "D7";
  if (averageScore >= 39) return "E8";
  return "F9";
};

const getStudentResult = (student: Student, classInfo: string) => {
  return student?.gradeData?.reportCard?.find(
    (el: any) => el.classInfo === classInfo
  );
};

// Sub-Components
const SubjectScore: FC<SubjectScoreProps> = ({
  student,
  subject,
  classInfo,
}) => {
  const { gradeData } = useStudentGrade(student?._id);

  const { schoolInfo } = useSchoolSessionData(student?.schoolIDs);

  const result = gradeData?.reportCard?.find((el: any) => {
    return el.classInfo?.trim() === classInfo;
  });

  const subjectResult = result?.result?.find(
    (data: any) => data.subject === subject.subjectTitle
  );

  const test1 = subjectResult?.test1 || 0;
  const test2 = subjectResult?.test2 || 0;
  const test3 = subjectResult?.test3 || 0;
  const test4 = subjectResult?.test4 || 0;

  const caScore = test1 + test2 + test3 + test4;
  const examScore = subjectResult?.exam || 0;
  const totalScore = subjectResult?.mark || 0;

  return (
    <div className="w-[120px] border-r-2 border-blue-950">
      <div className="pl-1 flex gap-1 mt-2 text-[10px]">
        <p className="w-[30px] border-r">CA</p>
        <p className="w-[35px] border-r">Exam</p>
        <p className="w-[35px]">Total</p>
      </div>
      <div className="pl-1 flex gap-1 mt-2 text-[12px]">
        <p className="w-[30px] border-r">{caScore}</p>
        <p className="w-[35px] border-r">{examScore}</p>
        <p className="w-[35px] font-bold border-r">{totalScore}</p>
      </div>
    </div>
  );
};

const SubjectHeader: FC<SubjectHeaderProps> = ({ subject }) => {
  return (
    <div className="w-[120px] border-r h-[150px] flex flex-col relative justify-start items-start">
      <div className="absolute top-[60%] left-3 transform -translate-x-[90%] -translate-y-[70%] rotate-90 text-start h-[180px] w-[150px] mt-10 break-words text-[14px] font-[500] text-black">
        {subject.subjectTitle}
      </div>
    </div>
  );
};

const StudentRow: FC<StudentRowProps> = ({
  student,
  index,
  subjects,
  classInfo,
  position = null,
}) => {
  const { gradeData } = useStudentGrade(student?._id);

  const studentResult = gradeData?.reportCard?.find((el: any) => {
    return el.classInfo?.trim() === classInfo;
  });

  const results = studentResult?.result || [];

  const totalScore = results.reduce(
    (sum: number, el: any) => sum + (el?.mark || 0),
    0
  );
  const numberOfSubjects = results.length;
  const averageScore = numberOfSubjects > 0 ? totalScore / numberOfSubjects : 0;
  const grade = calculateGrade(averageScore);

  const isEvenRow = index % 2 === 0;

  return (
    <div
      className={`w-full flex items-center gap-2 text-[12px] font-medium h-28 px-4 my-2 overflow-hidden ${
        isEvenRow ? "bg-slate-50" : "bg-white"
      }`}
    >
      <div className="w-[40px] border-r font-bold">{index + 1}</div>

      <div className="w-[220px] flex border-r">
        <div className="w-[220px] break-words">
          {student.studentLastName} {student.studentFirstName}
        </div>
      </div>

      <div className="w-[40px] border-r">
        {student.gender?.charAt(0) || "-"}
      </div>

      <div className="border-r items-center flex">
        <div className="flex gap-4">
          {subjects.map((subject) => (
            <SubjectScore
              key={subject._id}
              student={student}
              subject={subject}
              classInfo={classInfo}
            />
          ))}
        </div>
      </div>

      <div className="w-[40px] border-r">{numberOfSubjects}</div>
      <div className="w-[40px] border-r">{totalScore}</div>
      <div className="w-[60px] border-r">{averageScore.toFixed(2)}</div>
      <div className="w-[40px] border-r">{grade}</div>
      <div className="w-[40px] border-r">{propsPositionToString(position)}</div>
    </div>
  );
};

// Helper: format position as ordinal (1 -> 1st, 2 -> 2nd)
function propsPositionToString(n?: number | null) {
  if (n == null) return "-";
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

const RotatedHeader: FC<{ text: string; width: string }> = ({
  text,
  width,
}) => {
  return (
    <div
      className={`${width} border-r h-[150px] flex flex-col relative justify-start items-start`}
    >
      <div className="absolute top-[60%] left-1 transform -translate-x-[100%] -translate-y-[70%] rotate-90 text-start h-[180px] w-[150px] mt-10 break-words">
        {text}
      </div>
    </div>
  );
};

// Component to fetch grade data for a single student
const StudentGradeDataFetcher: FC<{
  student: Student;
  classInfo: string;
  onDataFetched: (data: {
    id: string;
    student: Student;
    totalPoints: number;
  }) => void;
}> = ({ student, classInfo, onDataFetched }) => {
  const { gradeData } = useStudentGrade(student?._id);

  useEffect(() => {
    if (!gradeData) return;

    const result = gradeData?.reportCard?.find((el: any) => {
      const elClassInfo = el.classInfo?.toString().trim();
      const targetClassInfo = classInfo?.toString().trim();

      return elClassInfo === targetClassInfo;
    });

    const totalPoints =
      result?.result?.reduce(
        (sum: number, el: any) => sum + (el?.mark || 0),
        0
      ) || 0;

    onDataFetched({ id: student._id, student, totalPoints });
  }, [gradeData, student, classInfo, onDataFetched]);

  return null;
};

// Main Component
const BroadSheetReportCardApproved: FC = () => {
  const navigate = useNavigate();
  const { classID } = useParams<{ classID: string }>();

  const { oneClass } = useReadOneClassInfo(classID);
  const { classStudents } = useClassStudent(oneClass?._id);
  const { subjectData } = useClassSubject(oneClass?._id);

  const { data } = useSchoolData();

  const [loading, setLoading] = useState(false);
  const [loadingView, setLoadingView] = useState(false);
  const [studentTotals, setStudentTotals] = useState<
    Record<string, { id: string; student: Student; totalPoints: number }>
  >({});

  const contentRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  const classInfo = `${oneClass?.className?.trim() || ""} session: ${
    data?.presentSession || ""
  }(${data?.data?.presentTerm || data?.presentTerm || ""})`.trim();

  const sortedSubjects = lodash.sortBy(
    subjectData?.classSubjects || [],
    "subjectTitle"
  );

  const studentsList = classStudents?.students || [];

  // Handle data fetched from each student
  const handleDataFetched = useMemo(
    () => (data: { id: string; student: Student; totalPoints: number }) => {
      setStudentTotals((prev) => ({
        ...prev,
        [data.id]: data,
      }));
    },
    []
  );

  // Convert studentTotals object to array
  const totals = useMemo(() => {
    const result = studentsList.map((student) => {
      const data = studentTotals[student._id];
      return data || { id: student._id, student, totalPoints: 0 };
    });
    return result;
  }, [studentsList, studentTotals]);

  // Sort by total points descending
  const totalsSorted = useMemo(() => {
    const sorted = lodash.orderBy(totals, ["totalPoints"], ["desc"]);
    return sorted;
  }, [totals]);

  // Assign positions with tie-handling - only for students with points > 0
  const rankMap: Record<string, number | null> = useMemo(() => {
    const map: Record<string, number | null> = {};

    // Filter students with points > 0 for ranking
    const studentsWithPoints = totalsSorted.filter((t) => t.totalPoints > 0);

    let lastTotal: number | null = null;
    let lastRank = 0;
    let currentIndex = 0;

    for (const t of studentsWithPoints) {
      currentIndex += 1;

      // If same score as previous, assign same rank
      if (lastTotal !== null && t.totalPoints === lastTotal) {
        map[t.id] = lastRank;
      } else {
        // New score, assign current position
        map[t.id] = currentIndex;
        lastRank = currentIndex;
        lastTotal = t.totalPoints;
      }
    }

    // Students with 0 points get null (will display as "-")
    for (const t of totalsSorted) {
      if (!(t.id in map)) {
        map[t.id] = null;
      }
    }

    return map;
  }, [totalsSorted]);

  const sortedStudents = totalsSorted.map((t) => t.student);

  const handlePrintResult = async () => {
    setLoading(true);
    try {
      const element = tableRef.current;
      if (!element) throw new Error("Table not found");

      // Clone element and inline computed styles (replacing oklch colors)
      const clone = element.cloneNode(true) as HTMLElement;

      const inlineStyles = (root: HTMLElement) => {
        const nodes = [root, ...Array.from(root.querySelectorAll("*"))];
        nodes.forEach((node: any) => {
          try {
            const cs = window.getComputedStyle(node);
            for (let i = 0; i < cs.length; i++) {
              const prop = cs[i];
              let val = cs.getPropertyValue(prop);
              const prio = cs.getPropertyPriority(prop);
              // Replace oklch with fallbacks
              if (val && val.includes("oklch")) {
                if (prop.includes("color")) val = "#000000";
                else if (prop.includes("background")) val = "#ffffff";
                else val = "#e5e7eb";
              }
              node.style.setProperty(prop, val, prio);
            }
          } catch (e) {
            // ignore
          }
        });
      };

      inlineStyles(clone);

      // Create hidden iframe to render clone with styles
      const iframe = document.createElement("iframe");
      iframe.style.position = "absolute";
      iframe.style.left = "-9999px";
      iframe.style.width = "1600px";
      iframe.style.height = "800px";
      iframe.style.border = "0";
      document.body.appendChild(iframe);

      const idoc = iframe.contentDocument!;
      const head = idoc.head || idoc.getElementsByTagName("head")[0];

      // Copy stylesheets
      const parentLinks = Array.from(
        document.querySelectorAll('link[rel="stylesheet"], style')
      );
      parentLinks.forEach((node) => {
        try {
          head.appendChild(node.cloneNode(true));
        } catch (e) {
          // ignore cross-origin
        }
      });

      // Append clone
      const wrapper = idoc.createElement("div");
      wrapper.style.boxSizing = "border-box";
      wrapper.innerHTML = clone.outerHTML;
      idoc.body.appendChild(wrapper);

      // Wait for fonts
      try {
        if (idoc.fonts && (idoc as any).fonts.ready) {
          await (idoc as any).fonts.ready;
        }
      } catch (e) {}

      // Render to canvas
      const canvas = await html2canvas(wrapper as any, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
      });

      // Clean up iframe
      document.body.removeChild(iframe);

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: "a4",
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Calculate how many pages are needed
      let heightLeft = pdfHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;

      // Add additional pages if content is taller than one page
      while (heightLeft >= 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
      }

      // Save PDF
      pdf.save(
        `broadsheet-${oneClass?.className}-${moment().format("YYYY-MM-DD")}.pdf`
      );
      toast.success("Result downloaded successfully.");
    } catch (err) {
      console.error("PDF generation error:", err);
      toast.error("Failed to generate PDF. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  const dynamicWidth = loadingView
    ? `${100 + sortedSubjects.length * 160}px`
    : "";

  return (
    <div className="w-full">
      <Toaster position="top-center" reverseOrder={true} />

      {/* Hidden components to fetch grade data */}
      {studentsList.map((student) => (
        <StudentGradeDataFetcher
          key={student._id}
          student={student}
          classInfo={classInfo}
          onDataFetched={handleDataFetched}
        />
      ))}

      <div className="mb-0" />
      <LittleHeader name="Class Result Broad Sheet" />
      <div className="mt-10" />

      <div className="flex justify-end mb-4">
        <button
          disabled={loading}
          className={`text-[12px] tracking-widest transition-all duration-300 hover:bg-red-100 px-8 py-2 rounded-md bg-red-50 ${
            loading && "cursor-not-allowed bg-red-200 animate-pulse"
          }`}
          onClick={handlePrintResult}
        >
          {loading ? (
            <div className="flex gap-2 items-center">
              <FaSpinner className="animate-spin" />
              <span>downloading...</span>
            </div>
          ) : (
            "Print Result"
          )}
        </button>
      </div>

      <div
        ref={tableRef}
        style={{ width: dynamicWidth, height: "100%" }}
        className={`py-6 px-2 min-w-[300px] bg-white ${
          !loadingView
            ? "border rounded-md overflow-x-auto overflow-y-hidden"
            : ""
        }`}
      >
        {/* Table Header */}
        <div className="text-[gray] flex gap-2 text-[12px] font-medium uppercase mb-10 px-4 min-w-fit">
          <div className="w-[40px] border-r">S/N</div>
          <div className="w-[220px] border-r">Student Info</div>
          <div className="w-[40px] border-r">Sex</div>

          <div className="border-r flex gap-4">
            {sortedSubjects.map((subject: Subject) => (
              <SubjectHeader key={subject._id} subject={subject} />
            ))}
          </div>

          <RotatedHeader text="No. of Subj." width="w-[40px]" />
          <RotatedHeader text="Total Score" width="w-[40px]" />
          <RotatedHeader text="Total Points" width="w-[60px]" />
          <RotatedHeader text="Grade" width="w-[40px]" />
          <RotatedHeader text="Position" width="w-[40px]" />
        </div>

        {/* Student Rows */}
        <div className="overflow-hidden min-w-fit">
          {sortedStudents.length > 0 ? (
            sortedStudents.map((student: Student, index: number) => (
              <StudentRow
                key={student._id}
                student={student}
                index={index}
                subjects={sortedSubjects}
                classInfo={classInfo}
                position={rankMap[student._id]}
              />
            ))
          ) : (
            <div className="text-center py-8">No students yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BroadSheetReportCardApproved;
