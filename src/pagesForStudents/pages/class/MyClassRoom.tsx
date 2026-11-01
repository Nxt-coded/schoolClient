document.title = "class room Detail's Page";
import { MdBook, MdDelete } from "react-icons/md";
import { FC, useEffect, useState } from "react";

import {
  useClassSubject,
  useExamination,
  useMidTest,
  useTeacherInfo,
} from "../../../pagesForTeachers/hooks/useTeacher";
import { useSchoolData } from "@/pages/hook/useSchoolAuth";
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

interface iProps {
  props?: string;
}

const ClassSubjectScreen: FC<iProps & { classInfo?: any }> = ({
  props,
  classInfo,
}) => {
  const { subjectData } = useClassSubject(props!);

  // Do not clear localStorage here — this would reset in-progress exams for other pages

  return (
    <div>
      {subjectData?.classSubjects?.length > 0 ? (
        <div className="mt-1 w-full gap-2 grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-3">
          {subjectData?.classSubjects?.map((props: any) => (
            <div
              key={props?._id}
              className="bg-white border flex flex-col rounded-2xl pb-2 min-h-[200px] px-4 pt-4"
            >
              <div className="mt-3 flex justify-between items-center font-bold">
                <p>{props?.subjectTitle}</p>
                <div className="w-8 h-8 transition-all duration-300 rounded-full hover:bg-slate-50 cursor-pointer flex justify-center items-center">
                  <MdBook className="hover:text-blue-900" />
                </div>
              </div>
              <div className="flex">
                <p className="text-[12px] bg-slate-100 rounded-sm py-2 pl-1 shadow-sm pr-4 mb-5">
                  Class Subject
                </p>
              </div>
              <div className="flex-1" />
              <p className="text-[13px] font-medium">
                Subject Teacher Name: <span></span>
              </p>
              <div className="flex mb-4 gap-2 flex-wrap">
                <div className="text-blue-950  rounded-mlg mt-1 px-0 border-t font-medium py-2 text-[17px] ">
                  {props?.subjectTeacherName}
                </div>
              </div>

              <StartTestComp
                props={props}
                subjectID={props?._id}
                classInfo={classInfo}
              />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className="flex flex-col items-center justify-center px-4 py-1 mt-3">
            <FaCheckDouble size={13} />
            <p className="mt-3 text-[12px] font-medium">No Subject added yet</p>
          </div>
        </div>
      )}
    </div>
  );
};

const StartTestComp: any = ({ props, subjectID, classInfo }) => {
  const { examination } = useExamination(subjectID!);
  const { midTest } = useMidTest(subjectID!);
  const { data: schoolData } = useSchoolData();

  const normalize = (val: string) => val?.trim()?.toLowerCase();
  const currentTerm = schoolData?.presentTerm || classInfo?.presentTerm;

  const schoolTerm = normalize(currentTerm || "");
  const schoolSession = normalize(schoolData?.presentSession || "");

  const matchesCurrentTerm = (termValue: any) => {
    const term = normalize(termValue || "");
    return schoolTerm === "" || term === schoolTerm || term === "";
  };

  const matchesCurrentSession = (sessionValue: any) => {
    const session = normalize(sessionValue || "");
    return schoolSession === "" || session === schoolSession || session === "";
  };

  const isRelevantTest = (termValue: any, sessionValue: any) => {
    const termMatches = matchesCurrentTerm(termValue);
    const sessionMatches = matchesCurrentSession(sessionValue);
    return termMatches && sessionMatches
      ? true
      : termMatches || sessionMatches;
  };

  const midMatch =
    !!midTest?.startMidTest &&
    isRelevantTest(midTest?.term || midTest?.exam?.term, midTest?.session || midTest?.exam?.session);

  const examMatch =
    !!examination?.startExam &&
    isRelevantTest(
      examination?.exam?.term || examination?.term,
      examination?.exam?.session || examination?.session
    );

  const activeMidTestID =
    midTest?._id ||
    props?.midTest?.[props?.midTest?.length - 1]?._id ||
    props?.midTest?.[props?.midTest?.length - 1];

  const activeExamID =
    examination?.exam?._id ||
    examination?._id ||
    props?.examination?.[props?.examination?.length - 1]?._id ||
    props?.examination?.[props?.examination?.length - 1];

  return (
    <div className="text-blue-950 rounded-mlg mt-1 px-0 border-t font-medium py-2 text-[17px] flex items-center gap-2">
      {midMatch && (
        <Link
          to={`/mid-test/details/${props?._id}/${activeMidTestID}`}
          className="text-white bg-orange-500 rounded-md px-4 py-2 text-[13px] cursor-pointer hover:bg-orange-600 transition-colors"
        >
          Start Mid Test
        </Link>
      )}

      {examMatch && (
        <Link
          to={`/examination/details/${activeExamID}`}
          className="text-white bg-purple-600 rounded-md px-4 py-2 text-[13px] cursor-pointer hover:bg-purple-700 transition-colors"
        >
          Start Examination
        </Link>
      )}

      {!examMatch && !midMatch && (
        <div className="text-white bg-red-500 rounded-md px-4 py-2 text-[13px] cursor-pointer">
          No Mid-Test/Examination Available yet
        </div>
      )}
    </div>
  );
};

const StaffDetail: FC<iProps> = ({ props }: any) => {
  const { teacherInfo } = useTeacherInfo();

  return (
    <div className="flex gap-2 mt-1 items-start  ">
      <img
        className="w-10 h-10 object-cover rounded-full"
        src={teacherInfo?.avatar ? teacherInfo?.avatar : pix}
      />
      <p>
        <p className="m-0 leading-tight text-[14px] font-bold">
          {props?.classTeacherName
            ? props?.classTeacherName
            : "Hasn't been assigned"}
        </p>
        <p className="text-[12px] mt-2 flex items-center gap-1">
          <span className="font-bold text-[15px]">
            {teacherInfo?.staffRating}
          </span>{" "}
          <FaStar />
        </p>
      </p>
    </div>
  );
};

const MyClassRoomScreen = () => {
  const { studentInfo } = useStudentInfo();

  const [classInfo, setClassInfo] = useState<any>();

  const { oneClass } = useReadOneClassInfo(studentInfo?.presentClassID);

  useEffect(() => {
    readClassInfo(studentInfo?.classAssigned).then((res: any) => {
      setClassInfo(res?.data);
    });
  }, []);

  return (
    <div className="text-blue-950">
      <LittleHeader name="My ClassRoom Details" />
      <div>Class: {studentInfo?.classesAssigned}</div>

      <div className="w-full text-blue-950 h-[90px] rounded-lg border flex justify-between overflow-hidden ">
        <div className="bg-blue-950 text-white w-[160px] md:w-[300px] px-4 py-2 rounded-lg ">
          <div>Total Number of Students</div>
          <div className="text-[35px] font-medium">
            {oneClass?.students?.length}{" "}
            <span className="text-[20px]">Students</span>
          </div>
        </div>
        <div className=" px-4 py-1 rounded-lg text-center flex items-end flex-col">
          <div className="flex-1" />
          <div className="mr-0 ">Next Recommended action:</div>
          <p className="font-medium">Add Teacher to supervise this class</p>
        </div>
      </div>
      <div className="my-6 border-t" />
      <div className="mt-6 w-full min-h-[80px] pb-4 bg-slate-50 rounded-lg border pt-2 px-4 ">
        <div className=" px-3  opacity-100 rounded-md bg-orange-400 text-white mb-2 py-2 flex justify-between items-center ">
          <div className="flex gap-2 font-normal">
            <p className="text-[12px]">
              <p className="font-normal">First Term</p>
              <p className="font-bold">
                ₦{oneClass?.class1stFee?.toLocaleString()}
              </p>
            </p>
            <p className="text-[12px]">
              <p className="font-normal">Second Term</p>
              <p className="font-bold">
                ₦{oneClass?.class2ndFee?.toLocaleString()}
              </p>
            </p>
            <p className="text-[12px]">
              <p className="font-normal">Third Term</p>
              <p className="font-bold">
                ₦{oneClass?.class3rdFee?.toLocaleString()}
              </p>
            </p>
          </div>
        </div>

        <p>Manage Class Teacher: </p>
        <p className="text-[13px] flex items-center font-bold">
          Class teacher is responsible for day to day activities of the class{" "}
          <span className="font-bold flex items-center gap-1"></span>
        </p>
        {/* + Assign class Teacher{ */}
        <div className="mt-8" />
        <div className="text-[12px]"> class Teacher Assigned</div>
        <StaffDetail props={oneClass} />
      </div>
      <div className="my-6 border-t" />

      {/* SUbjects */}

      <div className="w-full min-h-[180px] pb-10 bg-slate-50 rounded-lg border py-2 px-4 ">
        <p>Class Subject for {oneClass?.className} </p>
        <p className="text-[13px] font-bold">
          Below are all the subject this CLASS offers!
        </p>

        <ClassSubjectScreen props={oneClass?._id} classInfo={classInfo} />
      </div>

      {/* Top Students */}
      <div className="mt-6 w-full min-h-[100px] pb-10 bg-slate-50 rounded-lg border py-2 px-4 ">
        <p>Top Performing student </p>
        <p className="text-[13px]  flex items-center font-bold">
          Here is the list of the top 5 performing student:{" "}
        </p>
        <div className="flex gap-4 mt-5">
          <div className="flex justify-center w-full">
            <div className="flex flex-col items-center justify-center px-4 py-1 mt-3">
              <FaCheckDouble size={13} />
              <p className="mt-3 text-[12px] font-medium">
                No Student rated yet
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* viewing Students */}
      <div className="mt-6 w-full min-h-[100px] pb-10 bg-slate-50 rounded-lg border py-2 px-4 ">
        <div className="flex items-center w-full justify-between">
          <div>
            <p>Viewing Class TimeTable</p>
            <p className="text-[13px]  flex items-center font-bold">
              Here are all the students in this class:{" "}
            </p>
          </div>
        </div>
        <div className="flex gap-4 mt-5">
          {" "}
          <TimeTableScreen props={oneClass?._id} />{" "}
        </div>
      </div>

      {/* Attendance */}
    </div>
  );
};

export default MyClassRoomScreen;
