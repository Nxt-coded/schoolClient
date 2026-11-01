import { MdBook, MdDelete } from "react-icons/md";
import { FC, useEffect, useState } from "react";

import {
  useClassSubject,
  useExamination,
  useMidTest,
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
import { useSchoolData } from "@/pages/hook/useSchoolAuth";

interface iProps {
  props?: string;
  onTestCountChange?: (count: number) => void;
}

const SubjectCard: FC<any> = ({ subject }) => {
  const { examination } = useExamination(subject?._id);
  const { midTest } = useMidTest(subject?._id);
  const { studentInfo } = useStudentInfo();
  const { data: schoolData } = useSchoolData();

  const normalize = (val: string) => val?.trim()?.toLowerCase();
  const currentTerm = schoolData?.presentTerm;

  const schoolTerm = normalize(currentTerm || "");

  const midMatch =
    midTest?.startMidTest &&
    (schoolTerm === "" || normalize(midTest?.term || "") === schoolTerm);

  const examMatch =
    examination?.startExam &&
    (schoolTerm === "" ||
      normalize(examination?.exam?.term || "") === schoolTerm);

  const shouldDisplay = midMatch || examMatch;
  if (!shouldDisplay) return null;

  const { performance } = useStudentPerfomance(studentInfo?._id);

  const hasCompletedMidTest = performance?.performance?.some(
    (perf: any) =>
      perf.subjectID === subject?._id && perf.testDetails?.type === "mid-test"
  );

  const hasCompletedExam = performance?.performance?.some(
    (perf: any) =>
      perf.subjectID === subject?._id && perf.testDetails?.type === "exam"
  );

  const hasCompletedTest = !!hasCompletedMidTest || !!hasCompletedExam;

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
        {hasCompletedTest && (
          <p className="text-[12px] bg-green-100 text-green-700 rounded-sm py-2 px-3 shadow-sm flex items-center gap-1">
            <FaCheckDouble size={12} />
            Completed
          </p>
        )}
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

      <div className="text-blue-950 rounded-mlg mt-1 px-0 border-t font-medium py-2 text-[17px] flex items-center gap-2">
        {midTest?.startMidTest &&
          (hasCompletedMidTest ? (
            <p className="text-[13px] text-green-600 font-semibold">
              Mid Test Done
            </p>
          ) : (
            <Link
              to={`/mid-test/details/${subject?._id}/${
                subject?.midTest[subject?.midTest?.length - 1]
              }`}
              className="text-white bg-orange-500 rounded-md px-4 py-2 text-[13px] cursor-pointer hover:bg-orange-600 transition-colors"
            >
              Start Mid Test
            </Link>
          ))}

        {examination?.startExam &&
          (hasCompletedExam ? (
            <p className="text-[13px] text-green-600 font-semibold">
              Examination Done
            </p>
          ) : (
            <Link
              to={`/examination/details/${subject?._id}/${
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

const ClassSubjectScreen: FC<iProps> = ({ props, onTestCountChange }) => {
  const { subjectData } = useClassSubject(props!);
  const [visibleSubjectCount, setVisibleSubjectCount] = useState(0);
  const [dept, setDept] = useState<string>("");

  // Avoid clearing in-progress exam or mid-test localStorage on mount.

  const hasSubjects = subjectData?.classSubjects?.length > 0;

  const SubjectCardWithCounter: FC<{
    subject: any;
    onTestCountChange: (count: number) => void;
  }> = ({ subject, onTestCountChange }) => {
    const { examination } = useExamination(subject?._id);
    const { midTest } = useMidTest(subject?._id);
    const { data: schoolData } = useSchoolData();

    const normalize = (val: string) => val?.trim()?.toLowerCase();
    const currentTerm = schoolData?.presentTerm;

    const examDept = String(examination?.exam?.quiz?.instruction?.dept || "")
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

    const schoolTerm = normalize(currentTerm || "");

    const midMatch =
      midTest?.startMidTest &&
      (schoolTerm === "" || normalize(midTest?.term || "") === schoolTerm);

    const examMatch =
      examination?.startExam &&
      (schoolTerm === "" ||
        normalize(examination?.exam?.term || "") === schoolTerm);

    const shouldDisplay = (midMatch || examMatch) && matchesDept;

    const { studentInfo } = useStudentInfo();
    const { performance } = useStudentPerfomance(studentInfo?._id);

    const hasCompletedTest = performance?.performance?.some(
      (perf: any) => perf.subjectID === subject?._id
    );

    useEffect(() => {
      if (shouldDisplay) {
        setVisibleSubjectCount((prev) => prev + 1);
        const testCount = !hasCompletedTest
          ? (midTest?.startMidTest ? 1 : 0) + (examination?.startExam ? 1 : 0)
          : 0;
        onTestCountChange(testCount);
      }
      return () => {
        if (shouldDisplay) {
          setVisibleSubjectCount((prev) => prev - 1);
          const testCount = !hasCompletedTest
            ? (midTest?.startMidTest ? 1 : 0) + (examination?.startExam ? 1 : 0)
            : 0;
          onTestCountChange(-testCount);
        }
      };
    }, [
      shouldDisplay,
      midTest?.startMidTest,
      examination?.startExam,
      hasCompletedTest,
      dept,
      examination?.exam?.quiz?.instruction?.dept,
      midTest?.quiz?.instruction?.dept,
    ]);

    return <SubjectCard subject={subject} dept={dept} />;
  };

  useEffect(() => {
    setVisibleSubjectCount(0);
  }, [subjectData]);

  const handleTestCountChange = (count: number) => {
    if (onTestCountChange) onTestCountChange(count);
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

  useEffect(() => {
    readClassInfo(studentInfo?.classAssigned).then((res: any) => {
      setClassInfo(res?.data);
    });
  }, []);

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
        <p className="text-[13px] font-bold mb-6">
          Below are all the subject this CLASS That are now Available!
        </p>

        <ClassSubjectScreen
          props={oneClass?._id}
          onTestCountChange={(count) =>
            setTotalAvailableTests((prev) => prev + count)
          }
        />
      </div>
    </div>
  );
};

export default MyClassRoomTestExamScreen;
