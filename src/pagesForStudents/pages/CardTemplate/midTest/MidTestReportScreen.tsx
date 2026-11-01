import React, { useState, useRef, useEffect, FC } from "react";
import lodash from "lodash";
import { usePDF } from "react-to-pdf";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa6";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  useMidTestStudentPerformance,
  useReadOneClassInfo,
  useStudentInfo,
} from "@/pagesForStudents/hooks/useStudentHook";
import {
  useSchoolDataByName,
  useSchoolSessionData,
} from "@/pages/hook/useSchoolAuth";
import {
  useClassSubject,
  useSchoolAnnouncement,
  useStudentGrade,
  useStudentMidGrade,
  useSujectInfo,
  useTeacherDetail,
} from "@/pagesForTeachers/hooks/useTeacher";

const MidTestReportScreen: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const preprocessContent = () => {
    const content = contentRef.current;
    if (!content) return;

    // Traverse the DOM and replace "oklch" color functions with a fallback color
    const elementsWithUnsupportedColors = content.querySelectorAll("*");
    elementsWithUnsupportedColors.forEach((element: any) => {
      const computedStyles = window.getComputedStyle(element);
      if (computedStyles.color.includes("oklch")) {
        element.style.color = "#000000"; // Replace with a fallback color
      }
    });
  };

  const { studentInfo } = useStudentInfo();
  const { gradeMidData } = useStudentMidGrade(studentInfo?._id);
  const { schoolAnnouncement }: any = useSchoolAnnouncement(
    studentInfo?.schoolIDs
  );

  const { gradeData } = useStudentGrade(studentInfo?._id);

  let school: any = schoolAnnouncement;

  let grade = gradeData?.reportCard?.find((el: any) => {
    return (
      el.classInfo ===
      `${studentInfo?.classAssigned} session: ${school?.presentSession}(${school?.presentTerm})`
    );
  });
  // console.log(gradeMidData);
  const { oneClass: classDetails } = useReadOneClassInfo(
    studentInfo?.presentClassID
  );

  const { teacherDetail } = useTeacherDetail(classDetails?.teacherID);

  const { subjectData }: any = useClassSubject(studentInfo?.presentClassID);
  const { schoolInfo } = useSchoolSessionData(studentInfo?.schoolIDs);
  const { midTestPerformace } = useMidTestStudentPerformance(studentInfo?._id);

  const schoolName = school?.schoolName!;
  const schoolAddress = school?.address;

  // let numbPassed =
  //   gradeMidData?.midReportCard[0]?.result?.length -
  //   lodash.filter(gradeMidData?.midReportCard[0]?.result, { grade: "F" })
  //     ?.length;

  // Filter out unoffered subjects (where all marks are 0)
  const filteredMidResult = (gradeMidData?.midReportCard[0]?.result || []).filter((el: any) => {
    const total = (el.test1 || 0) + (el.test2 || 0) + (el.test3 || 0) + (el.test4 || 0) + (isNaN(el.exam) ? 0 : el.exam);
    return total > 0;
  });

  let commulationScore =
    (filteredMidResult
      ?.map((el: any) => {
        return isNaN(el.exam) ? 0 : el.exam;
      })
      .reduce((a: number, b: number) => {
        return a + b;
      }, 0) /
      (filteredMidResult.length * 100)) *
    100;

  let holdeAll = [];

  let result = {};
  let resultLow = {};

  for (let i of subjectData?.students || []) {
    const { gradeMidData: details } = useStudentMidGrade(i);

    let reportData = details?.midReportCard?.find((el: any) => {
      return (
        el.classInfo ===
        `${studentInfo?.classAssigned} session: ${schoolInfo[0]?.year}(${schoolInfo[0]?.presentTerm})`
      );
    });

    holdeAll.push(
      reportData?.result?.map((el: any) => {
        return {
          [`${el?.subject}`]:
            el?.test2 + el?.test1 + el?.test3 + el?.test4 + el?.exam,
        };
      })
    );
  }

  lodash.sortBy(holdeAll, "subject")?.forEach((innerArray) => {
    innerArray?.forEach((obj: any) => {
      for (let key in obj) {
        let trimmedKey = key.trim();
        if (!result[trimmedKey] || result[trimmedKey] < obj[key]) {
          result[trimmedKey] = obj[key];
        }
      }
    });
  });

  lodash.sortBy(holdeAll, "subject")?.forEach((innerArray) => {
    innerArray?.forEach((obj: any) => {
      for (let key in obj) {
        let trimmedKey = key.trim();
        if (!resultLow[trimmedKey] || resultLow[trimmedKey] > obj[key]) {
          resultLow[trimmedKey] = obj[key];
        }
      }
    });
  });

  let resultMax: any = lodash.sortBy(
    Object.entries(result).map(([subject, score]) => ({
      subject,
      score,
    })),
    "subject"
  );

  let resultMin: any = lodash.sortBy(
    Object.entries(resultLow).map(([subject, score]) => ({
      subject,
      score,
    })),
    "subject"
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey && event.key === "r") || event.key === "F5") {
        event.preventDefault();
        alert("Refresh is disabled on this page.");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [loading, setLoading] = useState<boolean>(false);

  const { toPDF, targetRef }: any = usePDF({
    filename: `${studentInfo?.studentFirstName}-${studentInfo?.classAssigned}-${
      school?.presentSession
    }-${school?.presentTerm}-${moment(Date.now()).format("lll")}.pdf`,
  });

  const handleDownloadPdf = async () => {
    const element = contentRef.current;
    if (!element) {
      return;
    }

    const canvas = await html2canvas(element, {
      scale: 2,
    });
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("examplepdf.pdf");
  };
  const { oneClass } = useReadOneClassInfo(studentInfo?.presentClassID);
  const { schoolInfo: schl } = useSchoolDataByName(studentInfo?.schoolName);
  let midResultData = gradeMidData?.midReportCard?.find((el: any) => {
    return (
      el?.classInfo ===
      `${oneClass?.className} session: ${schl?.presentSession}(${oneClass?.presentTerm})`
    );
  });

  useEffect(() => {
    preprocessContent();
  }, []);

  // Filter out unoffered subjects for mid-result data
  const filteredMidResultData = (midResultData?.result || []).filter((el: any) => {
    const total = (el.test1 || 0) + (el.test2 || 0) + (el.test3 || 0) + (el.test4 || 0) + (isNaN(el.exam) ? 0 : el.exam);
    return total > 0;
  });

  const numbPassed =
    filteredMidResultData.filter((item: any) => {
      // Count all grades that are not "F"
      return item.grade !== "F" && item.grade !== "F9";
    })?.length || 0;

  // Calculate percentage of passed subjects
  const passPercentage = filteredMidResultData.length
    ? ((numbPassed / filteredMidResultData.length) * 100).toFixed(1)
    : 0;

  console.log(numbPassed, passPercentage);
  return (
    <div ref={contentRef} className="overflow-hidden">
      <Toaster />
      <button
        disabled={loading}
        className={`text-[12px] tracking-widest transistion-all duration-300 hover:bg-red-100 px-8 py-2 rounded-md bg-red-50 ${
          loading && "cursor-not-allowed bg-red-200 animate-pulse"
        }`}
        onClick={() => {
          setLoading(true);

          toPDF().finally(() => {
            setLoading(false);
            toast.success("Result downloaded");
          });
        }}
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
      {/* <Link
        to="/download-result"
        className={`text-[12px] tracking-widest transistion-all duration-300 hover:bg-slate-100 px-8 py-2 rounded-md ${
          loading && "cursor-not-allowed bg-slate-200 animate-pulse"
        }`}
      >
        {loading ? (
          <div className="flex gap-2 items-center">
            <FaSpinner className="animate-spin" />
            <span>downloading...</span>
          </div>
        ) : (
          "Go to Download Result"
        )}
      </Link> */}
      <div ref={targetRef}>
        <h1 className="text-[10px] md:text-[12px] text-center mt-10 uppercase font-medium mb-10 italic">
          {studentInfo?.classAssigned} {school?.presentSession}
          <span className="mx-1">{school?.presentTerm}</span> Mid Report
        </h1>
        {/* <main className="min-h-[30vh] border rounded-sm p-2">jj</main> */}
        <div className="relative ">
          <main className="flex justify-center mt-10">
            <div
              className="p-4 overflow-hidden border"
              style={{
                width: `${
                  school?.presentTerm === "1st Term"
                    ? "994px"
                    : school?.presentTerm === "2nd Term"
                    ? "1072px"
                    : school?.presentTerm === "3rd Term"
                    ? "1150px"
                    : null
                }`,
              }}
            >
              <div
                className="absolute overflow-hidden inset-0 text-gray-300 text-opacity-20 text-[5vw] font-bold tracking-widest uppercase flex justify-center items-center"
                style={{
                  lineHeight: "5.5em",
                  whiteSpace: "pre-wrap",
                  userSelect: "none",
                  pointerEvents: "none",
                  rotate: "30deg",
                }}
              >
                {school?.schoolName} {school?.schoolName} {school?.schoolName}{" "}
                {school?.schoolName} <br />
                {school?.schoolName} {school?.schoolName} {school?.schoolName}{" "}
                {school?.schoolName} <br />
                {school?.schoolName} {school?.schoolName} {school?.schoolName}{" "}
                {school?.schoolName} <br />
                {school?.schoolName} {school?.schoolName}
                {school?.schoolName} <br />
                {school?.schoolName} {school?.schoolName}
              </div>
              <div
                className="absolute overflow-hidden inset-0 text-gray-300 text-opacity-100 text-[5vw] font-bold tracking-widest uppercase flex justify-center items-center z-10 opacity-50"
                style={{
                  lineHeight: "5.5em",
                  whiteSpace: "pre-wrap",
                  userSelect: "none",
                  pointerEvents: "none",
                  rotate: "0deg",
                }}
              >
                <div className="w-[160px] h-[150px] absolute left-[40%] bottom-[5%] ">
                  <img
                    src={school?.stamp}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* full */}
              <div className="hidden md:flex items-center justify-between w-auto">
                {/* logo */}
                <div className="border h-28 w-28 ">
                  {school?.avatar ? (
                    <img
                      src={school?.avatar}
                      className=" w-full h-full object-contain"
                    />
                  ) : (
                    <div className="bg-blue-50 font-semibold uppercase text-[30px] w-full h-full flex justify-center items-center">
                      {school?.schoolName?.charAt(0)}
                    </div>
                  )}
                </div>
                {/* school info */}
                <div className="flex justify-center items-center flex-col">
                  <h1 className="font-bold uppercase text-[25px]">
                    {schoolName}
                  </h1>
                  <h1 className="text-[12px] font-semibold tracking-[0.6rem]">
                    {schoolAddress}
                  </h1>
                </div>
                {/* avatar */}
                <div className="border h-28 w-28 ">
                  {studentInfo?.avatar ? (
                    <img
                      src={studentInfo?.avatar}
                      className="bg-blue-50 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="bg-blue-50 font-semibold uppercase text-[30px] w-full h-full flex justify-center items-center">
                      {studentInfo?.studentFirstName?.charAt(0)}
                    </div>
                  )}
                </div>
              </div>
              {/* Mobile */}
              <div className="flex flex-col md:hidden ">
                <div className="flex items-center justify-between w-auto">
                  {/* logo */}
                  <div className="border h-28 w-28 ">
                    {school?.avatar ? (
                      <img
                        src={school?.avatar}
                        className=" w-full h-full object-contain"
                      />
                    ) : (
                      <div className="bg-blue-50 font-semibold uppercase text-[30px] w-full h-full flex justify-center items-center">
                        {school?.schoolName?.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* avatar */}
                  <div className="border h-28 w-28 ">
                    {studentInfo?.avatar ? (
                      <img
                        src={studentInfo?.avatar}
                        className="bg-blue-50 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="bg-blue-50 font-semibold uppercase text-[30px] w-full h-full flex justify-center items-center">
                        {studentInfo?.studentFirstName?.charAt(0)}
                      </div>
                    )}
                  </div>
                </div>
                {/* school info */}
                <div className="mt-5 flex justify-center items-center flex-col">
                  <h1 className="font-bold uppercase text-[25px]">
                    {schoolName}
                  </h1>
                  <h1 className="text-[12px] font-semibold tracking-[0.6rem]">
                    {schoolAddress}
                  </h1>
                </div>
              </div>
              {/* end */}
              <div className="text-[12px] md:text-[15px] h-14 my-5 uppercase bg-blue-950 text-white flex justify-center items-center">
                {school?.presentSession}
                <span className="mx-1">{school?.presentTerm}</span> Mid Report
              </div>
              <main className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mb-10">
                <div className=" border p-2 ">
                  <h1 className="uppercase text-[12px] font-semibold">
                    Surname
                  </h1>
                  <h1 className="uppercase text-[12px] font-normal -mt-[2px]">
                    {studentInfo?.studentLastName}
                  </h1>
                </div>
                <div className=" border p-2 ">
                  <h1 className="uppercase text-[12px] font-semibold">
                    Other Names
                  </h1>
                  <h1 className="uppercase text-[12px] font-normal -mt-[2px]">
                    {studentInfo?.studentFirstName}
                  </h1>
                </div>
                <div className=" border p-2 ">
                  <h1 className="uppercase text-[12px] font-semibold">sex</h1>
                  <h1 className="uppercase text-[12px] font-normal -mt-[2px]">
                    {studentInfo?.gender}
                  </h1>
                </div>
                <div className=" border p-2 ">
                  <h1 className="uppercase text-[12px] font-semibold">Class</h1>
                  <h1 className="uppercase text-[12px] font-normal -mt-[2px]">
                    {studentInfo?.classAssigned}
                  </h1>
                </div>
                <div className=" border p-2 ">
                  <h1 className="uppercase text-[12px] font-semibold">
                    Academic Session
                  </h1>
                  <h1 className="uppercase text-[12px] font-normal -mt-[2px]">
                    {school?.presentSession}
                  </h1>
                </div>
                <div className=" border p-2 ">
                  <h1 className="uppercase text-[12px] font-semibold">
                    Student Type
                  </h1>
                  <h1 className="uppercase text-[12px] font-normal -mt-[2px]">
                    Day
                  </h1>
                </div>
                <div className=" border p-2">
                  <h1 className="uppercase text-[12px] font-semibold">
                    Session Number
                  </h1>
                  <h1 className="uppercase text-[12px] font-normal -mt-[2px]">
                    {studentInfo?.enrollmentID}
                  </h1>
                </div>
                <div className=" border p-2 ">
                  <h1 className="uppercase text-[12px] font-semibold">
                    Class Population
                  </h1>
                  <h1 className="uppercase text-[12px] font-normal -mt-[2px]">
                    {classDetails?.students?.length}
                  </h1>
                </div>

                <div className=" border p-2">
                  <h1 className="uppercase text-[12px] font-semibold">
                    Class Teacher
                  </h1>
                  <h1 className="uppercase text-[12px] font-normal -mt-[2px]">
                    {teacherDetail?.staffName}
                  </h1>
                </div>

                <div className=" border p-2">
                  <h1 className="uppercase text-[12px] font-semibold">
                    Report Case
                  </h1>
                  <h1 className="uppercase text-[12px] font-normal -mt-[2px]">
                    Mid Test Report
                  </h1>
                </div>
              </main>

              <main className="overflow-auto uppercase text-[12px]">
                <section
                  className={`min-w-[${
                    school?.presentTerm === "1st Term"
                      ? "994px"
                      : school?.presentTerm === "2nd Term"
                      ? "1072px"
                      : school?.presentTerm === "3rd Term"
                      ? "1150px"
                      : null
                  }] flex flex-col mt-4 `}
                  style={{
                    width: `${
                      school?.presentTerm === "1st Term"
                        ? "994px"
                        : school?.presentTerm === "2nd Term"
                        ? "1072px"
                        : school?.presentTerm === "3rd Term"
                        ? "1150px"
                        : null
                    }`,
                  }}
                >
                  <main className="flex  bg-blue-50">
                    <div className="p-2 w-[40px]">S/N</div>
                    <div className="p-2 w-[180px] border-x ">subject</div>

                    <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                      <p className="text">Exam</p>
                      <p className="text-[12px]">(100)</p>
                    </div>
                    <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                      <p className="text">Total</p>
                      <p className="text-[12px]">(100)</p>
                    </div>

                    <div className=" w-[100px] text-[12px] px-2 leading-tight font-medium border-r flex flex-col justify-center items-center ">
                      <p className="text">Class Highest Score</p>
                    </div>
                    {/* <div className=" w-[78px] text-[12px] px-2 leading-tight font-medium border-r flex flex-col justify-center items-center ">
                      <p className="text">Class lowest Score</p>
                    </div> */}
                    {/* <div className=" w-[78px] text-[12px] px-2 leading-tight font-medium border-r flex flex-col justify-center items-center ">
                      <p className="text">Class AVG. Score</p>
                    </div> */}
                    <div className=" w-[78px] text-[12px] px-2 leading-tight font-medium border-r flex flex-col justify-center items-center ">
                      <p className="text">Grade</p>
                    </div>
                    <div className=" flex-1 text-[12px] px-2 leading-tight font-medium border-r flex flex-col justify-center items-center ">
                      <p className="text">Remark</p>
                    </div>
                  </main>
                  <main className="flex flex-col mt-1">
                    {lodash
                      .sortBy(filteredMidResultData, "subject")
                      ?.map((el: any, i: number) => {
                        const perfRecord = midTestPerformace?.find(
                          (p: any) =>
                            p?.subjectTitle === el?.subject &&
                            p?.studentGrade === el?.grade
                        );
                        return (
                          <section
                            className={`min-w-[${
                              school?.presentTerm === "1st Term"
                                ? "994px"
                                : school?.presentTerm === "2nd Term"
                                ? "1072px"
                                : school?.presentTerm === "3rd Term"
                                ? "1150px"
                                : null
                            }] flex my-1 bg-blue-50 h-[40px]`}
                            key={i}
                            style={{
                              width: `${
                                school?.presentTerm === "1st Term"
                                  ? "994px"
                                  : school?.presentTerm === "2nd Term"
                                  ? "1072px"
                                  : school?.presentTerm === "3rd Term"
                                  ? "1150px"
                                  : null
                              }`,
                            }}
                          >
                            <div className="p-2 w-[40px]">{i + 1}</div>
                            <div className="p-2 w-[180px] border-x ">
                              {el?.subject}
                            </div>

                            <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                              <p className="text-[12px]">
                                {el?.exam ? el?.exam : 0}
                              </p>
                            </div>
                            <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                              <p className="text-[12px]">
                                {el?.mark ? el?.mark : 0}
                              </p>
                            </div>
                            <div className=" w-[100px] border-r flex flex-col justify-center items-center ">
                              <p className="text-[12px]">
                                {" "}
                                {resultMax?.find(
                                  (item: any) => item.subject === el?.subject
                                )?.score || 0}
                              </p>
                            </div>

                            {/* <div className=" w-[78px] text-[12px] px-2 leading-tight font-medium border-r flex flex-col justify-center items-center ">
                              <p className="text">
                                {resultMin?.find(
                                  (item: any) => item.subject === el?.subjectTitle
                                )?.score || 0}
                              </p>
                            </div> */}
                            <div className=" w-[78px] text-[12px] px-2 leading-tight font-medium border-r flex flex-col justify-center items-center ">
                              <p className="text-[18px]">{el?.grade}</p>
                            </div>

                            <div className=" w-[110px]  text-[12px] px-2 leading-tight font-medium border-r flex flex-col justify-center items-center ">
                              <p className="text-[12px] w-[110px] pl-4">
                                {el?.grade === "A1"
                                  ? "Execellent"
                                  : el?.grade === "B2" ||
                                    el?.grade === "B3"
                                  ? "Very Good"
                                  : el?.grade === "C4" ||
                                    el?.grade === "C5" ||
                                    el?.grade === "C6"
                                  ? "Credit"
                                  : el?.grade === "D7"
                                  ? "Pass"
                                  : el?.grade === "E8"
                                  ? "Poor Pass"
                                  : el?.grade === "F9" || el?.grade === "F"
                                  ? "Fail"
                                  : null}
                              </p>
                            </div>
                            <div className=" flex-1 text-[12px] px-2 leading-tight font-medium border-r pt-1 normal-case flex justify-start items-center">
                              <p
                                className={`
                            ${
                              el?.grade === "A1"
                                ? "text-green-600"
                                : el?.grade === "B2" ||
                                  el?.grade === "B3"
                                ? "text-purple-800"
                                : el?.grade === "C4" ||
                                  el?.grade === "C5" ||
                                  el?.grade === "C6"
                                ? "text-gray-600"
                                : el?.grade === "D7"
                                ? "text-purple-600"
                                : el?.grade === "E8"
                                ? "Poor Pass"
                                : el?.grade === "F9" || el?.grade === "F"
                                ? "text-red-500"
                                : null
                            } 
                            `}
                              >
                                {el?.remark || perfRecord?.remark}
                              </p>
                            </div>
                          </section>
                        );
                      })}
                  </main>
                </section>
              </main>

              <main className="grid grid-cols-1 sm:grid-cols-4 my-10">
                <div className=" border p-2 ">
                  <h1 className="uppercase text-[12px] font-semibold">
                    No. of subject taken
                  </h1>
                  <h1 className="uppercase text-[12px] font-normal -mt-[2px]">
                    {gradeMidData?.midReportCard[0]?.result?.length}
                  </h1>
                </div>

                <div className=" border p-2 ">
                  <h1 className="uppercase text-[12px] font-semibold">
                    No. of subject passed
                  </h1>
                  <h1 className="uppercase text-[12px] font-normal -mt-[2px]">
                    {numbPassed} ({passPercentage}%)
                  </h1>
                </div>
                <div className=" border p-2 ">
                  <h1 className="uppercase text-[12px] font-semibold">
                    Attendance Performance
                  </h1>
                  <h1 className="uppercase text-[12px] font-normal -mt-[2px]">
                    {gradeMidData?.midReportCard[0]?.attendance || "95%"}
                  </h1>
                </div>

                <div className=" border p-2 ">
                  <h1 className="uppercase text-[12px] font-semibold">
                    Percenatge score
                  </h1>
                  <h1 className="uppercase text-[12px] font-normal -mt-[2px]">
                    {commulationScore.toFixed(2)}%
                  </h1>
                </div>
              </main>

              <main className="flex justify-center text-[12px] gap-2">
                <div className="border-r pr-2 ">
                  <h1>
                    Class Avarage:{" "}
                    <span className="font-semibold">
                      {(
                        ((resultMax
                          ?.map((el: any) => {
                            return el?.score;
                          })
                          .reduce((a: any, b: any) => {
                            return a + b;
                          }, 0) /
                          (resultMin?.length * 100)) *
                          100 +
                          (resultMin
                            ?.map((el: any) => {
                              return el?.score;
                            })
                            .reduce((a: any, b: any) => {
                              return a + b;
                            }, 0) /
                            (resultMin?.length * 100)) *
                            100) /
                        2
                      ).toFixed(2)}
                      %
                    </span>
                  </h1>
                </div>
                <div className="border-r pr-2 ">
                  <h1>
                    Class Highest:{" "}
                    <span className="font-semibold">
                      {(
                        (resultMax
                          ?.map((el: any) => {
                            return el?.score;
                          })
                          .reduce((a: any, b: any) => {
                            return a + b;
                          }, 0) /
                          (resultMin?.length * 100)) *
                        100
                      ).toFixed(2)}
                      %
                    </span>
                  </h1>
                </div>
                <div className="border-r pr-2 ">
                  <h1>
                    Class lowest:{" "}
                    <span className="font-semibold">
                      {(
                        (resultMin
                          ?.map((el: any) => {
                            return el?.score;
                          })
                          .reduce((a: any, b: any) => {
                            return a + b;
                          }, 0) /
                          (resultMin.length * 100)) *
                        100
                      ).toFixed(2)}
                      %
                    </span>
                  </h1>
                </div>
              </main>

              {/* Psycho */}
              {/* <main className="mt-20">
                <p className="font-semibold uppercase text-[12px] mb-5">
                  Psychometric Test Grading
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                  <div className="bg-slate-50 border min-h-20">
                    <p className="p-4 uppercase font-semibold text-[12px] bg-black text-white">
                      Soft skill
                    </p>
                    <div className="px-2 w-full border-b h-[45px] flex items-center text-[12px] uppercase ">
                      <p className="w-[30px] h-full border-r flex items-center">
                        S/N
                      </p>
                      <p className="flex-1 h-full border-r ml-2 flex items-center">
                        SKill
                      </p>
                      <p className="w-[60px] h-full ml-2 flex items-center">
                        Rating
                      </p>
                    </div>

                    <div className="px-2 w-full h-[45px] flex items-center text-[12px] uppercase border-b border-x">
                      <p className="w-[30px] h-full border-r flex items-center pl-2">
                        1
                      </p>
                      <p className="flex-1 h-full border-r ml-2 flex items-center">
                        communication
                      </p>
                      <p className="w-[60px] h-full ml-2 flex items-center">
                        {grade?.softSkill[0]?.communication}
                      </p>
                    </div>
                    <div className="px-2 w-full h-[45px] flex items-center text-[12px] uppercase border-b border-x">
                      <p className="w-[30px] h-full border-r flex items-center pl-2">
                        2
                      </p>
                      <p className="flex-1 h-full border-r ml-2 flex items-center">
                        leadership
                      </p>
                      <p className="w-[60px] h-full ml-2 flex items-center">
                        {grade?.softSkill[0]?.leadership}
                      </p>
                    </div>
                    <div className="px-2 w-full h-[45px] flex items-center text-[12px] uppercase border-b border-x">
                      <p className="w-[30px] h-full border-r flex items-center pl-2">
                        3
                      </p>
                      <p className="flex-1 h-full border-r ml-2 flex items-center">
                        punctuality
                      </p>
                      <p className="w-[60px] h-full ml-2 flex items-center">
                        {grade?.softSkill[0]?.punctuality}
                      </p>
                    </div>
                    <div className="px-2 w-full h-[45px] flex items-center text-[12px] uppercase border-b border-x">
                      <p className="w-[30px] h-full border-r flex items-center pl-2">
                        4
                      </p>
                      <p className="flex-1 h-full border-r ml-2 flex items-center">
                        empathy
                      </p>
                      <p className="w-[60px] h-full ml-2 flex items-center">
                        {grade?.softSkill[0]?.empathy}
                      </p>
                    </div>
                  </div>
                  <div className="bg-red-50 min-h-20 m-2">
                    <p className="p-4 uppercase font-semibold text-[12px] bg-black text-white">
                      People Skill
                    </p>
                    <div className="px-2 w-full border-b h-[45px] flex items-center text-[12px] uppercase border-x">
                      <p className="w-[30px] h-full border-r flex items-center">
                        S/N
                      </p>
                      <p className="flex-1 h-full border-r ml-2 flex items-center">
                        SKill
                      </p>
                      <p className="w-[60px] h-full ml-2 flex items-center">
                        Rating
                      </p>
                    </div>

                    <div className="px-2 w-full h-[45px] flex items-center text-[12px] uppercase border-b border-x">
                      <p className="w-[30px] h-full border-r flex items-center pl-2">
                        1
                      </p>
                      <p className="flex-1 h-full border-r ml-2 flex items-center">
                        Confidence
                      </p>
                      <p className="w-[60px] h-full ml-2 flex items-center">
                        {grade?.peopleSkill[0]?.confidence}
                      </p>
                    </div>
                    <div className="px-2 w-full h-[45px] flex items-center text-[12px] uppercase border-b border-x">
                      <p className="w-[30px] h-full border-r flex items-center pl-2">
                        2
                      </p>
                      <p className="flex-1 h-full border-r ml-2 flex items-center">
                        hardworking
                      </p>
                      <p className="w-[60px] h-full ml-2 flex items-center">
                        {grade?.peopleSkill[0]?.hardworking}
                      </p>
                    </div>
                    <div className="px-2 w-full h-[45px] flex items-center text-[12px] uppercase border-b border-x">
                      <p className="w-[30px] h-full border-r flex items-center pl-2">
                        3
                      </p>
                      <p className="flex-1 h-full border-r ml-2 flex items-center">
                        presentational
                      </p>
                      <p className="w-[60px] h-full ml-2 flex items-center">
                        {grade?.peopleSkill[0]?.presentational}
                      </p>
                    </div>
                    <div className="px-2 w-full h-[45px] flex items-center text-[12px] uppercase border-b border-x">
                      <p className="w-[30px] h-full border-r flex items-center pl-2">
                        4
                      </p>
                      <p className="flex-1 h-full border-r ml-2 flex items-center">
                        resilient
                      </p>
                      <p className="w-[60px] h-full ml-2 flex items-center">
                        {grade?.peopleSkill[0]?.resilient}
                      </p>
                    </div>
                  </div>
                  <div className="bg-green-50 min-h-20 col-span-1 sm:col-span-3 xl:col-span-1 m-2 ">
                    <p className="p-4 uppercase font-semibold text-[12px] bg-black text-white">
                      Physical Skill
                    </p>
                    <div className="px-2 w-full border-b border-x h-[45px] flex items-center text-[12px] uppercase ">
                      <p className="w-[30px] h-full border-r flex items-center">
                        S/N
                      </p>
                      <p className="flex-1 h-full border-r ml-2 flex items-center">
                        SKill
                      </p>
                      <p className="w-[60px] h-full ml-2 flex items-center">
                        Rating
                      </p>
                    </div>

                    <div className="px-2 w-full h-[45px] flex items-center text-[12px] uppercase border-b border-x">
                      <p className="w-[30px] h-full border-r flex items-center">
                        1
                      </p>
                      <p className="flex-1 h-full border-r ml-2 flex items-center">
                        sportship
                      </p>
                      <p className="w-[60px] h-full ml-2 flex items-center">
                        {grade?.physicalSkill[0]?.sportship}
                      </p>
                    </div>
                  </div>
                </div>
              </main> */}

              {/* Comments */}

              <div className=" grid grid-cols-1 md:grid-cols-2 text-[12px] mt-10 relative">
                <div className="border mr-3 p-2">
                  <p>Principal's Comment</p>

                  <p className="my-2 border h-[120px] p-2 mb-5">
                    {midResultData?.adminComment}
                  </p>
                  <div className="flex w-full">
                    <div className="flex-1 flex flex-col">
                      <p className="font-semibold">
                        {school?.name} {school?.name2}
                      </p>
                      <p className="text-[10px]">Principal</p>
                      <div className="flex-1" />
                      <p>{moment(grade?.createdAt).format("lll")}</p>
                    </div>

                    <div className="w-[160px] h-[80px] border">
                      <img
                        src={school?.signature}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
                <div className="border mr-3 p-2">
                  <p>Class Teacher's Comment</p>

                  <p className="my-2 border h-[120px] p-2 mb-5">
                    {" "}
                    {midResultData?.classTeacherComment}
                  </p>
                  <div className="flex w-full">
                    <div className="flex-1 flex flex-col">
                      <p className="font-semibold">
                        {teacherDetail?.staffName}
                      </p>
                      <p className="text-[10px]">Class Teacher</p>
                      <div className="flex-1" />
                      <p>{moment(midResultData?.createdAt).format("lll")}</p>
                    </div>
                    <div className="w-[160px] h-[80px] border">
                      <img
                        src={teacherDetail?.signature}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MidTestReportScreen;

const ChartPerformance: FC<any> = ({ subject, score, low, max }) => {
  const { studentInfo } = useStudentInfo();
  const { gradeData } = useStudentGrade(studentInfo?._id);
  const { schoolInfo } = useSchoolSessionData(studentInfo?.schoolIDs);
  const { subjectData } = useClassSubject(studentInfo?.presentClassID);
  const { subjectInfo } = useSujectInfo("subjectID");
  // const {  } = useClassStudent(studentInfo?.presentClassID);
  // console.log(subjectData?.students);

  let reportData = gradeData?.reportCard?.find((el: any) => {
    return (
      el.classInfo ===
      `${subjectInfo?.designated} session: ${schoolInfo[0]?.year}(${schoolInfo[0]?.presentTerm})`
    );
  });

  let result = reportData?.result.find((el: any) => {
    return el.subject === subjectInfo?.subjectTitle;
  });

  return (
    <div>
      <div className="flex items-end gap-1 border-r px-6">
        <div
          className="h-[80px] bg-red-500 w-3"
          style={{ height: `${(low / 100) * 70}px` }}
        />
        <div
          className="h-[80px] bg-black w-3"
          style={{ height: `${(score / 100) * 70}px` }}
        />
        <div
          className="h-[80px] bg-green-500 w-3"
          style={{ height: `${(max / 100) * 70}px` }}
        />
      </div>
      <p className="text-[8px] mt-1 font-semibold text-center">
        {subject.slice(0, 20)}
      </p>
    </div>
  );
};
