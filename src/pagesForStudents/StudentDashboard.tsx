import { MdPlaylistAddCheck } from "react-icons/md";
import Personal from "./pages/Chart/Personal";
import {
  useReadOneClassInfo,
  useStudentInfo,
  useStudentInfoData,
} from "./hooks/useStudentHook";
import StudentPerformance from "./pages/Chart/PerformingStudent";
import Calendar from "./pages/Chart/Calendar";
import pix from "./../assets/pix.jpg";
import MakeActiveClass from "./pages/complain/MarkActiveClass";
import { GoVerified } from "react-icons/go";
import {
  useSchoolDataByName,
  useSchoolSessionData,
  useViewTermDetail,
} from "../pages/hook/useSchoolAuth";
import BlockPaymentScreen from "./BlockPaymentScreen";
import PerformanceRecord from "./pages/screens/PerformanceRecord";
import { Link } from "react-router-dom";

import MakeComplains from "./pages/report/MarkCOmplains";
import {
  useSchoolAnnouncement,
  useStudentGrade,
  useStudentMidGrade,
} from "../pagesForTeachers/hooks/useTeacher";
import ArticleHolderScreen from "./pages/screens/ArticleHolderScreen";
import StudentDetail from "./pages/class/StudentDetail";
import SelectTrack from "./pages/track/SelectTrack";

const StudentDashboard = () => {
  const readData = Array.from({ length: 2 });

  const { studentInfo } = useStudentInfo();
  document.title = `${studentInfo?.studentFirstName}'s Mid-Term Record and Stats`;

  const { schoolInfo, loading }: any = useSchoolSessionData(
    studentInfo?.schoolIDs,
  );

  let refID = schoolInfo;

  let obj: any = {};

  if (refID?.length > 0) {
    for (let i = 0; i < refID.length; i++) {
      obj = refID[0];
    }
  }

  let termID: string = "";

  if (obj !== null) {
    for (let i = 0; i < obj?.term?.reverse().length; i++) {
      termID = obj?.term[0];
    }
  }

  const { oneClass } = useReadOneClassInfo(studentInfo?.presentClassID);
  const { termData } = useViewTermDetail(termID);
  const { gradeData } = useStudentGrade(studentInfo?._id);
  const { gradeMidData } = useStudentMidGrade(studentInfo?._id);
  const { schoolInfo: schl } = useSchoolDataByName(studentInfo?.schoolName);
  const { studentInfoData } = useStudentInfoData(studentInfo?.studentID);
  const { schoolAnnouncement }: any = useSchoolAnnouncement(
    studentInfo?.schoolIDs
  );

  const normalizeStr = (str: string) =>
    (str || "").toLowerCase().replace(/\s+/g, "").trim();

  const currentClassAssigned =
    studentInfo?.classAssigned || oneClass?.className || "";
  const currentClassName =
    oneClass?.className || studentInfo?.classAssigned || "";
  const currentSession =
    schoolAnnouncement?.presentSession ||
    schoolInfo?.[0]?.year ||
    schl?.presentSession ||
    "";
  const currentTerm =
    schoolAnnouncement?.presentTerm ||
    schoolInfo?.[0]?.presentTerm ||
    oneClass?.presentTerm ||
    "";

  let resultData = gradeData?.reportCard?.find((el: any) => {
    if (!el?.classInfo) return false;
    const ci = normalizeStr(el.classInfo);

    const expectedAssigned = normalizeStr(
      `${currentClassAssigned} session: ${currentSession}(${currentTerm})`
    );
    if (expectedAssigned && ci === expectedAssigned) return true;

    const expectedClass = normalizeStr(
      `${currentClassName} session: ${currentSession}(${currentTerm})`
    );
    if (expectedClass && ci === expectedClass) return true;

    const hasClass =
      (currentClassAssigned && ci.includes(normalizeStr(currentClassAssigned))) ||
      (currentClassName && ci.includes(normalizeStr(currentClassName)));
    const hasSession = currentSession
      ? ci.includes(normalizeStr(currentSession))
      : false;
    const hasTerm = currentTerm
      ? ci.includes(normalizeStr(currentTerm))
      : false;

    return hasClass && hasSession && hasTerm;
  });

  let midResultData = gradeMidData?.midReportCard?.find((el: any) => {
    if (!el?.classInfo) return false;
    const ci = normalizeStr(el.classInfo);

    const expectedAssigned = normalizeStr(
      `${currentClassAssigned} session: ${currentSession}(${currentTerm})`
    );
    if (expectedAssigned && ci === expectedAssigned) return true;

    const expectedClass = normalizeStr(
      `${currentClassName} session: ${currentSession}(${currentTerm})`
    );
    if (expectedClass && ci === expectedClass) return true;

    const hasClass =
      (currentClassAssigned && ci.includes(normalizeStr(currentClassAssigned))) ||
      (currentClassName && ci.includes(normalizeStr(currentClassName)));
    const hasSession = currentSession
      ? ci.includes(normalizeStr(currentSession))
      : false;
    const hasTerm = currentTerm
      ? ci.includes(normalizeStr(currentTerm))
      : false;

    return hasClass && hasSession && hasTerm;
  });

  const isTermResultApproved = Boolean(resultData && resultData?.approve === true);
  const isMidResultApproved = Boolean(midResultData && midResultData?.approve === true);

  return (
    <div className="text-blue-950 flex flex-col h-full">
      <div className=" grid grid-cols-1 lg:grid-cols-5 gap-3 mt-5">
        <div className="min-w-[250px] h-full flex flex-col rounded-md border p-4 col-span-3">
          <div className="flex items-center justify-between mb-1">
            <div className="w-full mb-4 text-medium capitalize font-medium gap-2">
              <div className="mb-2 flex items-center gap-2">
                <div className="text-[12px] md:text-[16px]">My Name: </div>
                <div className="font-bold md:text-[20px] text-[13px]">
                  {studentInfo?.studentFirstName}
                </div>
                <div className="font-bold md:text-[20px] text-[13px]">
                  {studentInfo?.studentLastName}
                </div>
              </div>
              <div className="mb-2 flex items-center gap-3">
                <div className="text-[12px] md:text-[16px]"> My Class:</div>
                <div className="font-bold md:text-[20px] text-[11px] ">
                  {studentInfo?.classAssigned}
                </div>
              </div>
              {studentInfo?.monitor === true && (
                <div className="flex md:text-[18px] text-[11px] font-bold gap-1 items-center">
                  <GoVerified /> Class Representative/Monitor
                </div>
              )}
            </div>

            {/* <div className=" gap-6 font-medium cursor-pointer text-[12px] bg-blue-950 leading-tight text-white px-6 py-4  rounded-md  text-center">
              <MakeActiveClass />
            </div> */}
          </div>
          <div className=" gap-6 font-medium cursor-pointer text-[12px] mb-10 bg-blue-950 leading-tight text-white px-6 py-4  rounded-md  text-center">
            <MakeActiveClass />
          </div>

          <SelectTrack />

          <div className="flex gap-5 text-[12px]">
            <div>
              <p
                className={`capitalize font-medium ${
                  isTermResultApproved ? "text-red-500" : "text-blue-950"
                }`}
              >
                {isTermResultApproved ? (
                  <p>
                    Ready Now <br />
                    {studentInfo?.viewReportCard && (
                      <span className="text-red-500 text-[14px]">
                        {" "}
                        (Please see Admin!)
                      </span>
                    )}
                  </p>
                ) : (
                  "Not Ready"
                )}
              </p>
              <div className="flex ">
                {isTermResultApproved && !studentInfo?.viewReportCard ? (
                  <Link to={`/print-result?classInfo=${encodeURIComponent(resultData?.classInfo || "")}`}>
                    <div className="bg-orange-500 hover:bg-orange-600 p-2 text-white rounded-md cursor-pointer transition-all duration-300 capitalize">
                      view this term's report card
                    </div>
                  </Link>
                ) : (
                  <div className="bg-orange-400 opacity-60 p-2 text-white rounded-md cursor-not-allowed transition-all duration-300 capitalize text-[12px] md:text-[12px]">
                    Term's report card (Not Ready)
                  </div>
                )}
              </div>
            </div>
            <div>
              <p
                className={`capitalize font-medium ${
                  isMidResultApproved ? "text-red-500" : "text-blue-950"
                }`}
              >
                {isMidResultApproved ? (
                  <p>
                    Ready Now <br />
                    {studentInfo?.viewReportCard && (
                      <span className="text-red-500 text-[14px]">
                        {" "}
                        (Please see Admin!)
                      </span>
                    )}
                  </p>
                ) : (
                  "Not Ready"
                )}
              </p>
              <div className="flex ">
                {isMidResultApproved && !studentInfo?.viewReportCard ? (
                  <Link to={`/mid?classInfo=${encodeURIComponent(midResultData?.classInfo || "")}`}>
                    <div className="bg-purple-500 hover:bg-purple-600 p-2 text-white rounded-md cursor-pointer transition-all duration-300 capitalize">
                      view Mid term's report card
                    </div>
                  </Link>
                ) : (
                  <div className="bg-purple-400 opacity-60 p-2 text-white rounded-md cursor-not-allowed transition-all duration-300 capitalize text-[12px] md:text-[12px]">
                    Mid Term's report card (Not Ready)
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="font-semibold text-[13px]">Your Performance</div>
            <p className="text-[20px] text-blue-900">
              {`\u2605`.repeat(Math.round(studentInfo?.totalPerformance / 20))}{" "}
              <span className="text-[12px] font-bold">
                (
                {(studentInfo?.totalPerformance / 20).toFixed(2) !== "NaN"
                  ? (studentInfo?.totalPerformance / 20).toFixed(2)
                  : "No Record Yet"}
                )
              </span>
            </p>
          </div>
          <Personal />

          <div className="flex-1 mt-10" />
          <div className="text-[13px] font-medium mt-4">
            <div className="flex items-center gap-4"></div>
          </div>
        </div>

        <div className="min-w-[300px] overflow-hidden min-h-[3030px] flex flex-col rounded-md border p-4 col-span-2">
          <div>
            <div>
              <div className="gap-2 mb-10">
                <div className="flex gap-2 pb-10">
                  <div className=" gap-6 font-medium cursor-pointer text-[12px] bg-orange-600 leading-tight text-white px-6 py-4  rounded-md  text-center">
                    <MakeComplains />
                  </div>
                </div>
                <div className="font-medium text-[12px] text-blue-950 px-6 py-2 rounded-sm  text-center w-full flex flex-col items-center overflow-hidden">
                  <p className="font-bold text-left pb-3 text-[11px] md:text-[15px] ">
                    Student of the Week for class {studentInfo?.classAssigned}
                  </p>

                  {oneClass?.weekStudent ? (
                    <div className="w-[260px]  rounded-t-md min-h-[320px] border">
                      <img
                        className="w-full h-[300px] object-cover rounded-t-md"
                        src={
                          oneClass?.weekStudent?.student?.avatar
                            ? oneClass?.weekStudent?.student?.avatar
                            : pix
                        }
                      />
                      <p className="flex px-2 justify-start my-2 text-[15px]">
                        Name:{" "}
                        <span className="font-bold ml-2">
                          {oneClass?.weekStudent?.student?.studentFirstName}{" "}
                          {oneClass?.weekStudent?.student?.studentLastName}
                        </span>
                      </p>
                      <p className="text-left px-2 pb-2">
                        {oneClass?.weekStudent?.remark}
                      </p>
                    </div>
                  ) : (
                    "No record yet"
                  )}
                </div>
              </div>
            </div>
            {readData?.length > 0 ? (
              <div className="flex justify-center flex-col gap-3 w-full items-center ">
                {/* from complain */}
                <div className="w-full">
                  <p className="font-bold text-left pb-5 md:text-[15px] text-[12px]">
                    Top 3 Performing Students
                  </p>
                </div>

                <div className=" overflow-hidden">
                  <StudentPerformance />
                </div>
              </div>
            ) : (
              <div className="flex flex-col w-full items-center">
                <MdPlaylistAddCheck size={30} />
                <p className="font-medium text-[13px]">
                  No complains Record yet:{" "}
                </p>
              </div>
            )}
          </div>

          <div className="border-b my-5" />

          <div className="flex flex-col items-center w-full  justify-center">
            <div className=" flex justify-center gap-3 w-full items-center">
              <Calendar />
            </div>
          </div>
          <div className="mb-5">
            <hr />
          </div>
          <p>Last Week Performance</p>
          <PerformanceRecord />

          <div className="my-10">
            <hr />
          </div>

          <div className="mt-2 text-blue-950">
            <div className="flex gap-3 text-[15px]">
              <p>Most Recent Article</p>
              <Link to="/articles">
                <p className="font-bold">View More</p>
              </Link>
            </div>
            <ArticleHolderScreen />
          </div>
        </div>
      </div>
    </div>
  );
};
export default StudentDashboard;
