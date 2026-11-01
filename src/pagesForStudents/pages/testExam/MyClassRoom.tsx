import { MdBook, MdDelete } from "react-icons/md";
import { FC, useEffect, useState } from "react";

import {
  useClassSubject,
  useExamination,
  useMidTest,
  useSchoolAnnouncement,
  useTeacherInfo,
} from "../../../pagesForTeachers/hooks/useTeacher";
import TimeTableScreen from "./TimeTableScreen";
import { FaCheckDouble, FaStar } from "react-icons/fa6";
import pix from "../../../assets/pix.jpg";
import ReadingClassStudents from "./ReadingClassStudents";
import {
  useReadOneClassInfo,
  useStudentInfo,
} from "../../hooks/useStudentHook";
import { readClassInfo } from "../../api/studentAPI";
import LittleHeader from "../../../components/layout/LittleHeader";
import { Link } from "react-router-dom";
import { useStudentPerfomance } from "@/pagesForTeachers/hooks/useQuizHook";

interface iProps {
  props?: string;
  onTestCountChange?: (count: number) => void;
  dept?: string;
}

// New component to check individual subject test status
const SubjectCard: FC<{ subject: any; dept?: string; classInfo?: any }> = ({
  subject,
  dept,
  classInfo,
}) => {
  const { examination } = useExamination(subject?._id);
  const { midTest } = useMidTest(subject?._id);
  const { studentInfo } = useStudentInfo();
  const { schoolAnnouncement } = useSchoolAnnouncement(studentInfo?.schoolIDs);

  const normalize = (val: any) =>
    String(val || "")
      .trim()
      .toLowerCase();
  const currentTerm = normalize(
    classInfo?.presentTerm || schoolAnnouncement?.presentTerm
  );
  const currentSession = normalize(schoolAnnouncement?.presentSession);

  // Only render if at least one test is active
  const examDept = String(examination?.quiz?.instruction?.dept || "")
    .toLowerCase()
    .trim();
  const midDept = String(midTest?.quiz?.instruction?.dept || "")
    .toLowerCase()
    .trim();
  const normalizedFilter = String(dept || "")
    .toLowerCase()
    .trim();
  const matchesDept =
    !normalizedFilter ||
    examDept === normalizedFilter ||
    midDept === normalizedFilter;

  const isCurrentAssessment = (assessment: any) =>
    Boolean(
      currentTerm &&
        currentSession &&
        normalize(assessment?.term || assessment?.exam?.term) === currentTerm &&
        normalize(assessment?.session || assessment?.exam?.session) ===
          currentSession
    );

  const midMatch =
    !!midTest?.startMidTest &&
    isCurrentAssessment(midTest);

  const examMatch =
    !!examination?.startExam &&
    isCurrentAssessment(examination);

  const shouldDisplay = (midMatch || examMatch) && matchesDept;
  const { performance } = useStudentPerfomance(studentInfo?._id);

  if (!shouldDisplay) return null;

  // derive the most recent quiz IDs for midTest and examination (used in links)
  const midQuizID = midTest?._id || subject?.midTest?.[subject?.midTest?.length - 1];
  const examQuizID = examination?._id || subject?.examination?.[subject?.examination?.length - 1];

  // Only mark done if the student completed THIS TERM's active exam/midTest
  // (examination._id / midTest._id is the DB _id of the current term's document)
  const activeExamID = examination?._id?.toString?.();
  const activeMidTestID = midTest?._id?.toString?.();

  const hasCompletedMidTest = Boolean(
    activeMidTestID &&
      performance?.performance?.some(
        (perf: any) => perf?.quizDone && perf?.quizID === activeMidTestID
      )
  );

  const hasCompletedExam = Boolean(
    activeExamID &&
      performance?.performance?.some(
        (perf: any) => perf?.quizDone && perf?.quizID === activeExamID
      )
  );

  // overall completed (only counts active test types)
  const hasCompletedTest = Boolean(
    (midTest?.startMidTest && hasCompletedMidTest) ||
      (examination?.startExam && hasCompletedExam)
  );

  return (
    <div className="bg-white border flex flex-col rounded-2xl pb-2 min-h-[200px] px-4 pt-4">
      <div className="mt-3 flex justify-between items-center font-bold">
        <p>{subject?.subjectTitle}</p>
        <div className="w-8 h-8 transition-all duration-300 rounded-full hover:bg-slate-50 cursor-pointer flex justify-center items-center">
          <MdBook className="hover:text-blue-900" />
        </div>
      </div>
      <div className="flex gap-2">
        <p className="text-[12px] bg-slate-100 rounded-sm py-2 pl-1 shadow-sm pr-4 mb-5">
          Class Subject
        </p>
        {/* {hasCompletedTest && (
          <p className="text-[12px] bg-green-100 text-green-700 rounded-sm py-2 px-3 shadow-sm flex items-center gap-1">
            <FaCheckDouble size={12} />
            Completed
          </p>
        )} */}
      </div>
      <div className="flex-1" />
      <p className="text-[13px] font-medium">
        Subject Teacher Name: <span></span>
      </p>
      <div className="flex mb-4 gap-2 flex-wrap">
        <div className="text-blue-950 rounded-mlg mt-1 px-0 border-t font-medium py-2 text-[17px]">
          {subject?.subjectTeacherName}
        </div>
      </div>
      {(examMatch || midMatch) && (
        <div className="flex gap-2 mb-2">
          {examMatch && (
            <div className="text-[10px] bg-purple-50 text-purple-700 px-2 py-1 rounded border border-purple-100">
              Exam: {examination.term} {examination.session ? `(${examination.session})` : ""}
            </div>
          )}
          {midMatch && (
            <div className="text-[10px] bg-orange-50 text-orange-700 px-2 py-1 rounded border border-orange-100">
              Mid: {midTest.term} {midTest.session ? `(${midTest.session})` : ""}
            </div>
          )}
        </div>
      )}
      {/* suuuuu */}
      <div className="text-blue-950 rounded-mlg mt-1 px-0 border-t font-medium py-2 text-[17px] flex items-center gap-2">
        {midMatch &&
          (hasCompletedMidTest ? (
            <p className="text-[13px] text-green-600 border px-6 py-2 rounded-md border-green-400 bg-green-50 cursor-not-allowed">
              Test Done
            </p>
          ) : (
            <Link
              to={`/mid-test/details/${subject?._id}/${
                midTest?._id ||
                subject?.midTest[subject?.midTest?.length - 1]?._id ||
                subject?.midTest[subject?.midTest?.length - 1]
              }`}
              className="text-white bg-orange-500 rounded-md px-4 py-2 text-[13px] cursor-pointer hover:bg-orange-600 transition-colors"
            >
              Start Mid Test
            </Link>
          ))}

        {examMatch &&
          (hasCompletedExam ? (
            <p className="text-[13px] text-green-600 border px-6 py-2 rounded-md border-green-400 bg-green-50 cursor-not-allowed">
              Examination Done
            </p>
          ) : (
            <Link
              to={`/examination/details/${
                examination?._id ||
                subject?.examination[subject?.examination?.length - 1]?._id ||
                subject?.examination[subject?.examination?.length - 1]
              }`}
              className="text-white bg-purple-600 rounded-md px-4 py-2 text-[13px] cursor-pointer hover:bg-purple-700 transition-colors"
            >
              Start Examination
            </Link>
          ))}
      </div>
    </div>
  );
};

const ClassSubjectScreen: FC<iProps & { classInfo?: any }> = ({
  props,
  onTestCountChange,
  dept,
  classInfo,
}) => {
  const { subjectData } = useClassSubject(props!);
  console.log("subjectData", subjectData);
  const [visibleSubjectCount, setVisibleSubjectCount] = useState(0);

  // Do not clear localStorage on mount to avoid wiping in-progress exams for users

  const hasSubjects = subjectData?.classSubjects?.length > 0;

  // Component to track visible subjects and count total tests
  const SubjectCardWithCounter: FC<{
    subject: any;
    onTestCountChange: (count: number) => void;
  }> = ({ subject, onTestCountChange }) => {
    const { examination } = useExamination(subject?._id);
    const { midTest } = useMidTest(subject?._id);
    const { studentInfo } = useStudentInfo();
    const { schoolAnnouncement } = useSchoolAnnouncement(
      studentInfo?.schoolIDs
    );
    const normalize = (val: any) =>
      String(val || "")
        .trim()
        .toLowerCase();
    const currentTerm = normalize(
      classInfo?.presentTerm || schoolAnnouncement?.presentTerm
    );
    const currentSession = normalize(schoolAnnouncement?.presentSession);

    const examDept = String(examination?.quiz?.instruction?.dept || "")
      .toLowerCase()
      .trim();
    const midDept = String(midTest?.quiz?.instruction?.dept || "")
      .toLowerCase()
      .trim();
    const normalizedFilter = String(dept || "")
      .toLowerCase()
      .trim();

    const matchesDept =
      !normalizedFilter ||
      examDept === normalizedFilter ||
      midDept === normalizedFilter;

    const isCurrentAssessment = (assessment: any) =>
      Boolean(
        currentTerm &&
          currentSession &&
          normalize(assessment?.term || assessment?.exam?.term) ===
            currentTerm &&
          normalize(assessment?.session || assessment?.exam?.session) ===
            currentSession
      );

    const midMatch =
      !!midTest?.startMidTest &&
      isCurrentAssessment(midTest);

    const examMatch =
      !!examination?.startExam &&
      isCurrentAssessment(examination);

    const shouldDisplay = (midMatch || examMatch) && matchesDept;

    const { performance } = useStudentPerfomance(studentInfo?._id);

    // Only mark done if the student completed THIS TERM's active exam/midTest
    const activeExamID = examination?._id?.toString?.();
    const activeMidTestID = midTest?._id?.toString?.();

    // Check specific completion flags for this subject by quizID
    const hasCompletedMidTest = Boolean(
      activeMidTestID &&
        performance?.performance?.some(
          (perf: any) => perf?.quizDone && perf?.quizID === activeMidTestID
        )
    );

    const hasCompletedExam = Boolean(
      activeExamID &&
        performance?.performance?.some(
          (perf: any) => perf?.quizDone && perf?.quizID === activeExamID
        )
    );

    const hasCompletedTest = Boolean(
      (midTest?.startMidTest && hasCompletedMidTest) ||
        (examination?.startExam && hasCompletedExam)
    );

    useEffect(() => {
      if (shouldDisplay) {
        setVisibleSubjectCount((prev) => prev + 1);

        // compute remaining tests individually: mid + exam
        const midRemaining = midMatch && !hasCompletedMidTest ? 1 : 0;
        const examRemaining = examMatch && !hasCompletedExam ? 1 : 0;

        const testCount = midRemaining + examRemaining;

        onTestCountChange(testCount);
      }
      return () => {
        if (shouldDisplay) {
          setVisibleSubjectCount((prev) => prev - 1);

          const midRemaining = midMatch && !hasCompletedMidTest ? 1 : 0;
          const examRemaining = examMatch && !hasCompletedExam ? 1 : 0;
          const testCount = midRemaining + examRemaining;

          onTestCountChange(-testCount);
        }
      };
    }, [
      shouldDisplay,
      midTest?.startMidTest,
      examination?.startExam,
      hasCompletedMidTest,
      hasCompletedExam,
      dept,
      currentTerm,
      currentSession,
      examination?.quiz?.instruction?.dept,
      midTest?.quiz?.instruction?.dept,
    ]);

    return <SubjectCard subject={subject} dept={dept} classInfo={classInfo} />;
  };

  useEffect(() => {
    setVisibleSubjectCount(0);
  }, [subjectData]);

  const handleTestCountChange = (count: number) => {
    if (onTestCountChange) {
      onTestCountChange(count);
    }
  };

  return (
    <div>
      {hasSubjects ? (
        <>
          <div className="mt-1 w-full gap-2 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {subjectData.classSubjects.map((subject: any) => (
              <SubjectCardWithCounter
                key={subject?._id}
                subject={subject}
                onTestCountChange={handleTestCountChange}
              />
            ))}
          </div>
          {visibleSubjectCount === 0 && (
            <div className="flex flex-col items-center justify-center px-4 py-1 mt-3">
              <FaCheckDouble size={13} />
              <p className="mt-3 text-[12px] font-medium">
                No Test or Examination Available
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center px-4 py-1 mt-3">
          <FaCheckDouble size={13} />
          <p className="mt-3 text-[12px] font-medium">No Subject added yet</p>
        </div>
      )}
    </div>
  );
};

const MyClassRoomTestExamScreen = () => {
  const { studentInfo } = useStudentInfo();
  const [classInfo, setClassInfo] = useState<any>();
  const [totalAvailableTests, setTotalAvailableTests] = useState(0);
  const { oneClass } = useReadOneClassInfo(studentInfo?.presentClassID);

  const [dept, setDept] = useState<string>("");

  return (
    <div className="text-blue-950">
      <LittleHeader name="My ClassRoom Details" />
      <div>
        Class:{" "}
        <span className="font-semibold italic">{oneClass?.className}</span>
      </div>

      <div className="w-full text-blue-950 h-[90px] rounded-lg border flex justify-between overflow-hidden">
        <div className="text-[15px] bg-blue-950 text-white w-[160px] md:w-[300px] px-4 py-2 rounded-lg">
          <div>Total Mid-Tests and Examinations</div>
          <div className="text-[35px] font-medium">
            {totalAvailableTests} <span className="text-[20px]">Available</span>
          </div>
        </div>
        <div className="px-4 py-1 rounded-lg text-center flex items-end flex-col">
          <div className="flex-1" />
          <div className="mr-0">Next Recommended action:</div>
          <p className="font-medium">
            Complete available tests and examinations
          </p>
        </div>
      </div>
      <div className="my-6 border-t" />

      <div className="w-full min-h-[180px] pb-10 bg-slate-50 rounded-lg border py-2 px-4">
        <p>Class Subject for {oneClass?.className} for Test and Examination</p>
        <p className="text-[13px] font-bold mb-">
          Below are all the subject this CLASS That are now Available!
        </p>

        <div className="flex items-center gap-2 mb-5">
          <p
            className={`text-[12px] mt-5 
                          ${
                            dept === ""
                              ? "bg-blue-950 text-white"
                              : "bg-gray-200 text-black"
                          }
                          rounded-md px-4 py-1
                        cursor-pointer`}
            onClick={() => {
              setDept("");
            }}
          >
            Show All
          </p>
          <p
            className={`text-[12px] mt-5 
                          ${
                            dept === "Art"
                              ? "bg-blue-950 text-white"
                              : "bg-gray-200 text-black"
                          }
                          rounded-md px-4 py-1
                        cursor-pointer`}
            onClick={() => {
              setDept("Art");
            }}
          >
            Art
          </p>
          <p
            className={`text-[12px] mt-5 
                          ${
                            dept === "Commercial"
                              ? "bg-blue-950 text-white"
                              : "bg-gray-200 text-black"
                          }
                          rounded-md px-4 py-1
                        cursor-pointer`}
            onClick={() => {
              setDept("Commercial");
            }}
          >
            Commercial
          </p>
          <p
            className={`text-[12px] mt-5 
                          ${
                            dept === "Science"
                              ? "bg-blue-950 text-white"
                              : "bg-gray-200 text-black"
                          }
                          rounded-md px-4 py-1
                        cursor-pointer`}
            onClick={() => {
              setDept("Science");
            }}
          >
            Science
          </p>
        </div>

        <ClassSubjectScreen
          dept={dept}
          props={oneClass?._id}
          classInfo={oneClass}
          onTestCountChange={(count) => {
            setTotalAvailableTests((prev) => prev + count);
          }}
        />
      </div>
    </div>
  );
};

export default MyClassRoomTestExamScreen;
