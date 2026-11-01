import React, { useState, useRef, useEffect, FC } from "react";
import {
  useReadOneClassInfo,
  useStudentInfo,
} from "../../hooks/useStudentHook";
import {
  useClassSubject,
  useSchoolAnnouncement,
  useStudentGrade,
  useSujectInfo,
  useTeacherDetail,
} from "../../../pagesForTeachers/hooks/useTeacher";
import { useSchoolSessionData } from "../../../pages/hook/useSchoolAuth";
import lodash from "lodash";
import { usePDF } from "react-to-pdf";
import moment from "moment";
import ReportCardTemplateOne from "./ReportCardTemplateOne";
import toast, { Toaster } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa6";
import { comment } from "./comment";
import { Link, useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import { viewStudentGrade } from "../../../pagesForTeachers/api/teachersAPI";
import jsPDF from "jspdf";
import { checkPromotionStatus } from "../../../utils/promotionUtils";

const PrintReportCard: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const preprocessContent = () => {
    const content = contentRef.current;
    if (!content) return;

    // Traverse the DOM and replace "oklch" color function
    const elementsWithUnsupportedColors = content.querySelectorAll("*");
    elementsWithUnsupportedColors.forEach((element: any) => {
      const computedStyles = window.getComputedStyle(element);
      if (computedStyles.color.includes("oklch")) {
        element.style.color = "#000000"; // Replace with a fallback color
      }
    });
  };

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const classInfoQuery = searchParams.get("classInfo");

  const { studentInfo } = useStudentInfo();
  const { schoolAnnouncement }: any = useSchoolAnnouncement(
    studentInfo?.schoolIDs
  );

  const { gradeData } = useStudentGrade(studentInfo?._id);

  let school: any = schoolAnnouncement;

  let targetSession = school?.presentSession;
  let targetTerm = school?.presentTerm;

  // Extract the class name from the classInfo query (e.g. "SSS 2A session: 2025/2026(1st Term)" -> "SSS 2A")
  const reportClass = classInfoQuery
    ? classInfoQuery.split(" session:")[0].trim()
    : (studentInfo?.classAssigned || "");

  let targetClassInfo = classInfoQuery || `${studentInfo?.classAssigned} session: ${targetSession}(${targetTerm})`;

  if (classInfoQuery) {
    const sessionMatch = classInfoQuery.match(/session:\s*(.*?)\((.*?)\)/);
    if (sessionMatch) {
      targetSession = sessionMatch[1].trim();
      targetTerm = sessionMatch[2].trim();
    }
  }

  let grade = gradeData?.reportCard?.find((el: any) => {
    return el.classInfo === targetClassInfo;
  });

  const { oneClass: classDetails } = useReadOneClassInfo(
    studentInfo?.presentClassID
  );

  const { teacherDetail } = useTeacherDetail(classDetails?.teacherID);

  const { subjectData }: any = useClassSubject(studentInfo?.presentClassID);
  const { schoolInfo } = useSchoolSessionData(studentInfo?.schoolIDs);

  const schoolName = school?.schoolName!;
  const schoolAddress = school?.address;

  const st1 = gradeData?.reportCard.find(
    (el) =>
      el.classInfo ===
      `${reportClass} session: ${targetSession}(1st Term)`
  );

  const st2 = gradeData?.reportCard.find(
    (el) =>
      el.classInfo ===
      `${reportClass} session: ${targetSession}(2nd Term)`
  );

  const st3 = gradeData?.reportCard.find(
    (el) =>
      el.classInfo ===
      `${reportClass} session: ${targetSession}(3rd Term)`
  );

  // Filter out unoffered subjects (where all marks are 0 across all terms)
  const filteredResult = (grade?.result || []).filter((el: any) => {
    const s1 = st1?.result?.find((e: any) => e.subject === el.subject)?.mark || 0;
    const s2 = st2?.result?.find((e: any) => e.subject === el.subject)?.mark || 0;
    const s3 = st3?.result?.find((e: any) => e.subject === el.subject)?.mark || 0;
    const currentTotal = el.mark ?? ((el.test1 ?? 0) + (el.test2 ?? 0) + (el.test3 ?? 0) + (el.test4 ?? 0) + (el.exam ?? 0));
    return currentTotal > 0 || s1 > 0 || s2 > 0 || s3 > 0;
  });

  let numbPassed =
    filteredResult.length -
    lodash.filter(filteredResult, { grade: "F" })?.length;

  let commulationScore =
    (filteredResult
      ?.map((el: any) => {
        return el.exam + el.test1 + el.test2 + el.test3 + el.test4;
      })
      .reduce((a: number, b: number) => {
        return a + b;
      }, 0) /
      (filteredResult
        ?.map((el) => {
          return el.subject !== null;
        })
        ?.filter(Boolean)?.length *
        100)) *
    100;

  let holdeAll = [];
  const studentTotals: any[] = [];

  // }

  let result = {};
  let resultLow = {};

  for (let i of subjectData?.students || []) {
    const { gradeData: details } = useStudentGrade(i);
    let reportData = details?.reportCard?.find((el: any) => {
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

  // Compute per-student totals and derive class positions
  try {
    for (let sid of subjectData?.students || []) {
      const { gradeData: sd } = useStudentGrade(sid);
      const report = sd?.reportCard?.find(
        (el: any) =>
          el.classInfo ===
          `${studentInfo?.classAssigned} session: ${schoolInfo[0]?.year}(${schoolInfo[0]?.presentTerm})`
      );
      if (report && report.result) {
        // Filter out unoffered subjects
        const offeredResults = report.result.filter((r: any) => {
          const total = (r.test1 || 0) + (r.test2 || 0) + (r.test3 || 0) + (r.test4 || 0) + (r.exam || 0);
          return total > 0;
        });
        const total = offeredResults.reduce((acc: number, r: any) => {
          return (
            acc +
            (r.test1 || 0) +
            (r.test2 || 0) +
            (r.test3 || 0) +
            (r.test4 || 0) +
            (r.exam || 0)
          );
        }, 0);
        const subjectCount = offeredResults.length || 0;
        const percent = subjectCount > 0 ? total / subjectCount : 0;
        studentTotals.push({
          id: sid,
          total,
          subjectCount,
          percent,
        });
      }
    }
  } catch (e) { }

  const sortedTotals = studentTotals.sort(
    (a, b) => (b.percent || 0) - (a.percent || 0)
  );
  // assign ranks with standard competition ranking (1,1,3 for a tie) by percent
  let lastPercent: number | null = null;
  let lastRank = 0;
  let countRank = 0;
  const rankedTotals: Array<{
    id: string;
    total: number;
    percent?: number;
    rank: number;
  }> = [];
  for (const t of sortedTotals) {
    countRank += 1;
    const p = t.percent ?? 0;
    if (lastPercent !== null && p === lastPercent) {
      rankedTotals.push({
        id: t.id,
        total: t.total,
        percent: t.percent,
        rank: lastRank,
      });
    } else {
      lastPercent = p;
      lastRank = countRank;
      rankedTotals.push({
        id: t.id,
        total: t.total,
        percent: t.percent,
        rank: lastRank,
      });
    }
  }
  const myRankEntry = rankedTotals.find((r) => r.id === studentInfo?._id);
  const studentPosition = myRankEntry ? myRankEntry.rank : null;
  const studentPercent = myRankEntry ? myRankEntry.percent ?? null : null;

  // If the hook-based computed position is not available (or uses bad hooks), compute using API as a fallback
  useEffect(() => {
    const computeClassPosition = async () => {
      try {
        if (studentPosition) return; // already computed
        if (!subjectData?.students?.length) return;
        setPositionLoading(true);
        const totals: Array<{
          id: string;
          total: number;
          subjectCount?: number;
          percent?: number;
        }> = [];
        const normalize = (s: any) =>
          (s || "")
            .toString()
            .toLowerCase()
            .replace(/[^a-z0-9 ]+/g, " ")
            .replace(/\s+/g, " ")
            .trim();
        const compact = (s: any) =>
          (s || "")
            .toString()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "")
            .trim();
        const classAssignedNorm = normalize(studentInfo?.classAssigned || "");
        const sessionNorm = normalize(
          schoolInfo?.[0]?.year || targetSession || ""
        );
        const targetClassInfo = normalize(
          grade?.classInfo || gradeData?.reportCard?.[0]?.classInfo || ""
        );
        await Promise.all(
          subjectData?.students?.map(async (sid: string) => {
            try {
              const res: any = await viewStudentGrade(sid);
              const reportArray =
                res?.data?.reportCard || res?.reportCard || [];
              if (sid === "691451f061a5371e65809c71") {
                console.log("DEBUG PrintReportCard - raw res for", sid, res);
                console.log(
                  "DEBUG PrintReportCard - reportArray for",
                  sid,
                  reportArray
                );
              }
              const board = (reportArray || []).map((r: any) => r.classInfo);
              console.log(
                "PrintReportCard - sid report classInfo:",
                sid,
                board
              );
              const report = reportArray.find((el: any) => {
                const info = normalize(el?.classInfo || "");
                const matchesClass =
                  (classAssignedNorm && info.includes(classAssignedNorm)) ||
                  (targetClassInfo && info.includes(targetClassInfo)) ||
                  (compact(info) &&
                    compact(info).includes(compact(classAssignedNorm))) ||
                  (targetClassInfo &&
                    compact(info).includes(compact(targetClassInfo)));
                const matchesYearOrTerm =
                  (sessionNorm && info.includes(sessionNorm)) ||
                  (schoolInfo[0]?.presentTerm &&
                    info.includes(normalize(schoolInfo[0]?.presentTerm)));
                const found =
                  matchesClass &&
                  (matchesYearOrTerm ||
                    (targetSession &&
                      info.includes(
                        normalize(String(targetSession))
                      )));
                if (!found)
                  console.log(
                    "PrintReportCard - sid skipped report for ",
                    sid,
                    el?.classInfo
                  );
                return found;
              });
              if (report?.result) {
                // Filter out unoffered subjects
                const offeredResults = report.result.filter((r: any) => {
                  const total = (r.test1 || 0) + (r.test2 || 0) + (r.test3 || 0) + (r.test4 || 0) + (r.exam || 0);
                  return total > 0;
                });
                const tot = offeredResults.reduce((acc: number, r: any) => {
                  return (
                    acc +
                    (r.test1 || 0) +
                    (r.test2 || 0) +
                    (r.test3 || 0) +
                    (r.test4 || 0) +
                    (r.exam || 0)
                  );
                }, 0);
                const subjectCount = offeredResults.length || 0;
                const percent = subjectCount > 0 ? tot / subjectCount : 0;
                totals.push({ id: sid, total: tot, subjectCount, percent });
              }
            } catch (e) {
              // ignore errors for individual students
            }
          }) || []
        );
        totals.sort((a, b) => (b.percent || 0) - (a.percent || 0));
        const myIndex = totals.findIndex((t) => t.id === studentInfo?._id);
        const pos = myIndex >= 0 ? myIndex + 1 : null;
        setComputedStudentPosition(pos);
        // store computed percent if pos available
        if (pos && myIndex >= 0) {
          setComputedStudentPercent(totals[myIndex]?.percent ?? null);
        }
      } catch (e) {
        console.error("Error computing class position in PrintReportCard:", e);
      } finally {
        setPositionLoading(false);
      }
    };
    computeClassPosition();
  }, [studentInfo, subjectData, studentPosition, schoolInfo]);

  const formatOrdinal = (n: number | null | undefined) => {
    if (n == null || n <= 0) return "N/A";
    const s = ["th", "st", "nd", "rd"],
      v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

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
  const [useTemplateOne, setUseTemplateOne] = useState<boolean>(false);
  const [computedStudentPosition, setComputedStudentPosition] = useState<
    number | null
  >(null);
  const [computedStudentPercent, setComputedStudentPercent] = useState<
    number | null
  >(null);
  const [positionLoading, setPositionLoading] = useState<boolean>(false);

  const { toPDF, targetRef }: any = usePDF({
    filename: `${studentInfo?.studentFirstName}-${studentInfo?.classAssigned}-${targetSession
      }-${targetTerm}-${moment(Date.now()).format("lll")}.pdf`,
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

  useEffect(() => {
    preprocessContent();
  }, []);
  console.log(targetTerm);



  console.log(
    "PrintReportCard position debug:",
    { studentPosition, computedStudentPosition, positionLoading },
    "students:",
    subjectData?.students?.length
  );
  return (
    <div ref={contentRef} className="overflow-hidden">
      <Toaster />
      {/* <button
        disabled={loading}
        className={`text-[12px] tracking-widest transistion-all duration-300 hover:bg-slate-100 px-8 py-2 rounded-md ${
          loading && "cursor-not-allowed bg-slate-200 animate-pulse"
        }`}
        onClick={() => {
          setLoading(true);

          toPDF().finally(() => {
            setLoading(false);
            toast.success("Result downloaded.");
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
      </button> */}
      <div className="flex gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold">Position:</span>
          <span className="text-xs font-bold">
            {formatOrdinal(studentPosition ?? computedStudentPosition)} of{" "}
            {subjectData?.students?.length ?? "N/A"}
            {positionLoading ? (
              <span className="text-xs italic ml-2">(computing...)</span>
            ) : null}
            {(studentPercent ?? computedStudentPercent) != null && (
              <span className="text-xs ml-2">
                (
                {((studentPercent ?? computedStudentPercent) as number).toFixed(
                  2
                )}
                %)
              </span>
            )}
          </span>
        </div>

        <Link
          to="/download-result"
          className={`text-[12px] tracking-widest transistion-all duration-300 hover:bg-slate-100 px-8 py-2 rounded-md ${loading && "cursor-not-allowed bg-slate-200 animate-pulse"
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
        </Link>
        <Link
          to="/print-result-one"
          state={{
            studentInfo,
            school,
            grade,
            classDetails,
            teacherDetail,
            subjectData,
            schoolInfo,
            st1,
            st2,
            st3,
            studentPosition: studentPosition ?? computedStudentPosition,
            studentPercent: studentPercent ?? computedStudentPercent,
            classTotals: studentTotals,
          }}
          className={`text-[12px] tracking-widest transistion-all duration-300 hover:bg-slate-100 px-8 py-2 rounded-md bg-white border`}
        >
          View Template One
        </Link>
      </div>
      <div ref={targetRef}>
        <h1 className="text-[10px] md:text-[12px] text-center mt-10 uppercase font-medium mb-10 italic">
          {reportClass || studentInfo?.classAssigned} {targetSession}
          <span className="mx-1">{targetTerm}</span> Student Report
        </h1>
        {/* ===== PROMOTION DECISION BANNER (TOP OF PAGE) ===== */}
        {(() => {
          const percVal = parseFloat(
            targetTerm === "3rd Term"
              ? (() => {
                const p1 = st1?.points || 0;
                const p2 = st2?.points || 0;
                const p3 = st3?.points || 0;
                const active = [p1, p2, p3].filter((p: number) => p > 0);
                return active.length > 0
                  ? (active.reduce((a: number, b: number) => a + b, 0) / active.length).toFixed(2)
                  : "0.00";
              })()
              : commulationScore.toFixed(2)
          );
          const prom = checkPromotionStatus(
            school || (schoolInfo && schoolInfo[0]),
            filteredResult,
            percVal
          );
          return (
            <div
              className={`w-full my-4 p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm border-2 ${prom.isRepeat
                ? "bg-red-50 border-red-400"
                : "bg-green-50 border-green-400"
                }`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-3xl ${prom.isRepeat ? "text-red-500" : "text-green-500"}`}>
                  {prom.isRepeat ? "⚠️" : "✅"}
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                    Recommendation / Decision
                  </p>
                  <p className={`text-[15px] font-extrabold uppercase tracking-wide ${prom.isRepeat ? "text-red-700" : "text-green-700"}`}>
                    {prom.reason}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-gray-500">Percentage Score</p>
                <p className={`text-[18px] font-bold ${prom.isRepeat ? "text-red-600" : "text-green-600"}`}>
                  {percVal.toFixed(2)}%
                </p>
              </div>
            </div>
          );
        })()}
        {/* <main className="min-h-[30vh] border rounded-sm p-2">jj</main> */}
        <div className="relative w-full overflow-x-auto">
          <main className="flex md:justify-center mt-10 w-max min-w-full">
            <div
              className="p-4 overflow-hidden border"
              style={{
                width: `${targetTerm === "1st Term"
                  ? "994px"
                  : targetTerm === "2nd Term"
                    ? "1072px"
                    : targetTerm === "3rd Term"
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
                {targetSession}
                <span className="mx-1">{targetTerm}</span> Student
                Report
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
                    {reportClass || studentInfo?.classAssigned}
                  </h1>
                </div>
                <div className=" border p-2 ">
                  <h1 className="uppercase text-[12px] font-semibold">
                    Academic Session
                  </h1>
                  <h1 className="uppercase text-[12px] font-normal -mt-[2px]">
                    {targetSession}
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

                <div className=" border p-2 ">
                  <h1 className="uppercase text-[12px] font-semibold">
                    Position
                  </h1>
                  <h1 className="uppercase text-[12px] font-normal -mt-[2px]">
                    {studentPosition
                      ? `${formatOrdinal(studentPosition)} of ${classDetails?.students?.length ??
                      subjectData?.students?.length ??
                      "N/A"
                      }`
                      : "N/A"}
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
              </main>
              <main className="overflow-auto uppercase text-[12px]">
                <main className="overflow-auto uppercase text-[12px]">
                  <section className=" flex flex-col mt-4  ">
                    <main
                      className="flex  bg-blue-50"
                      style={{
                        width: `${targetTerm === "1st Term"
                          ? "994px"
                          : targetTerm === "2nd Term"
                            ? "1072px"
                            : targetTerm === "3rd Term"
                              ? "1150px"
                              : null
                          }`,
                      }}
                    >
                      <div className="p-2 w-[40px]">S/N</div>
                      <div className="p-2 w-[120px] border-x ">subject</div>
                      <div className=" w-[58px] border-r flex flex-col justify-center items-center ">
                        <p className="text">CA</p>
                        <p className="text-[12px]">(40)</p>
                      </div>
                      <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                        <p className="text">Exam</p>
                        <p className="text-[12px]">(60)</p>
                      </div>
                      {/* <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                        <p className="text">Total</p>
                        <p className="text-[12px]">
                          {" "}
                          {targetTerm === "3rd Term"
                            ? "(300)"
                            : "(100)"}
                        </p>
                      </div> */}
                      {/* Always show 1st Term if current term is 1st, 2nd, or 3rd */}
                      {(targetTerm === "1st Term" ||
                        targetTerm === "2nd Term" ||
                        targetTerm === "3rd Term") && (
                          <div className="w-[78px] border-r flex flex-col justify-center items-center">
                            <p className="text">1st Term</p>
                            <p className="text-[12px]">(100)</p>
                          </div>
                        )}

                      {/* Show 2nd Term only if current term is 2nd or 3rd */}
                      {(targetTerm === "2nd Term" ||
                        targetTerm === "3rd Term") && (
                          <div className="w-[78px] border-r flex flex-col justify-center items-center">
                            <p className="text">2nd Term</p>
                            <p className="text-[12px]">(100)</p>
                          </div>
                        )}

                      {/* Show 3rd Term only if current term is 3rd */}
                      {targetTerm === "3rd Term" && (
                        <div className="w-[78px] border-r flex flex-col justify-center items-center">
                          <p className="text">3rd Term</p>
                          <p className="text-[12px]">(100)</p>
                        </div>
                      )}

                      {/* <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                                                 <p className="text">Average</p>
                                                 <p className="text-[12px]">(100)</p>
                                               </div> */}
                      <div className=" w-[78px] px-2 border-r flex flex-col justify-center items-center ">
                        <p className="text">COMM. Term Score</p>
                      </div>
                      <div className=" w-[78px] text-[12px] px-2 leading-tight font-medium border-r flex flex-col justify-center items-center ">
                        <p className="text">Class Highest Score</p>
                      </div>
                      <div className=" w-[78px] text-[12px] px-2 leading-tight font-medium border-r flex flex-col justify-center items-center ">
                        <p className="text">Class lowest Score</p>
                      </div>
                      {/* <div className=" w-[78px] text-[12px] px-2 leading-tight font-medium border-r flex flex-col justify-center items-center ">
                                                 <p className="text">Class AVG. Score</p>
                                               </div> */}
                      <div className=" w-[50px] text-[12px] px-2 leading-tight font-medium border-r flex flex-col justify-center items-center ">
                        <p className="text">Grade</p>
                      </div>
                      <div className=" flex-1 text-[12px] px-2 leading-tight font-medium border-r flex flex-col justify-center items-center ">
                        <p className="text">Remark</p>
                      </div>
                    </main>

                    <main className="flex flex-col mt-1">
                      {lodash
                        .sortBy(filteredResult, "subject")
                        ?.map((el: any, i: number) => (
                          <section
                            className="flex my-1 bg-blue-50 min-h-[40px] py-1"
                            key={i - el?._id}
                            style={{
                              width: `${targetTerm === "1st Term"
                                ? "994px"
                                : targetTerm === "2nd Term"
                                  ? "1072px"
                                  : targetTerm === "3rd Term"
                                    ? "1150px"
                                    : null
                                }`,
                            }}
                          >
                            <div className="p-2 w-[40px]">{i + 1}</div>
                            <div className="p-2 w-[120px] border-x ">
                              {el?.subject}
                            </div>
                            {
                              <div className=" w-[58px] border-r flex flex-col justify-center items-center ">
                                <p className="text-[12px]">
                                  {el?.test1 +
                                    el?.test2 +
                                    el?.test3 +
                                    el?.test4}
                                </p>
                              </div>
                            }
                            <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                              <p className="text-[12px]">{el?.exam}</p>
                            </div>
                            {/* <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                              <p className="text-[12px]">
                                {st1?.result?.find(
                                  (e) => e.subject === el?.subject
                                )?.points ||
                                  0 +
                                    st2?.result?.find(
                                      (e) => e.subject === el?.subject
                                    )?.points ||
                                  0 +
                                    st3?.result?.find(
                                      (e) => e.subject === el?.subject
                                    )?.points ||
                                  0}
                              </p>
                            </div> */}
                            {(targetTerm === "1st Term" ||
                              targetTerm === "2nd Term" ||
                              targetTerm === "3rd Term") && (
                                <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                                  <p className="text-[12px]">
                                    {" "}
                                    {/* {el?.test1 +
                                                               el?.test2 +
                                                               el?.test3 +
                                                               el?.test4 +
                                                               el?.exam} */}
                                    {st1?.result?.find(
                                      (e) => e.subject === el?.subject
                                    )?.mark || 0}
                                    {/* {pointsArray[0]} */}
                                    {/*  */}
                                  </p>
                                </div>
                              )}
                            {targetTerm === "2nd Term" ||
                              (targetTerm === "3rd Term" && (
                                <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                                  <p className="text-[12px]">
                                    {/* {el?.test1 +
                                                               el?.test2 +
                                                               el?.test3 +
                                                               el?.test4 +
                                                               el?.exam} */}
                                    {/* {pointsArray[1]} */}
                                    {st2?.result?.find(
                                      (e) => e.subject === el?.subject
                                    )?.mark || 0}
                                  </p>
                                </div>
                              ))}

                            {targetTerm === "3rd Term" && (
                              <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                                <p className="text-[12px]">
                                  {/* {el?.test1 +
                                                               el?.test2 +
                                                               el?.test3 +
                                                               el?.test4 +
                                                               el?.exam} */}
                                  {st3?.result?.find(
                                    (e) => e.subject === el?.subject
                                  )?.mark || 0}
                                </p>
                              </div>
                            )}

                            {/* <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                                                       <p className="text-[12px]">
                                                         {el?.test1 +
                                                           el?.test2 +
                                                           el?.test3 +
                                                           el?.test4 +
                                                           el?.exam}
                                                       </p>
                                                     </div> */}
                            <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                              <p className="text-[12px]">
                                {targetTerm === "3rd Term" ? (() => {
                                  const s1 = st1?.result?.find((e: any) => e.subject === el?.subject)?.mark || 0;
                                  const s2 = st2?.result?.find((e: any) => e.subject === el?.subject)?.mark || 0;
                                  const s3 = st3?.result?.find((e: any) => e.subject === el?.subject)?.mark || 0;
                                  const activeScores = [s1, s2, s3].filter(s => s > 0);
                                  return activeScores.length > 0
                                    ? (activeScores.reduce((a, b) => a + b, 0) / activeScores.length).toFixed(1)
                                    : 0;
                                })() : (el?.mark || 0)}
                              </p>
                            </div>
                            <div className=" w-[78px] text-[12px] px-2 leading-tight font-medium border-r flex flex-col justify-center items-center ">
                              <p className="text">{resultMax[i]?.score}</p>
                            </div>
                            <div className=" w-[78px] text-[12px] px-2 leading-tight font-medium border-r flex flex-col justify-center items-center ">
                              <p className="text">{resultMin[i]?.score}</p>
                            </div>
                            {/* <div className=" w-[78px] text-[12px] px-2 leading-tight font-medium border-r flex flex-col justify-center items-center ">
                                                       <p className="text">67</p>
                                                     </div> */}
                            <div className=" w-[50px] text-[12px] px-2 leading-tight font-medium border-r flex flex-col justify-center items-center ">
                              <p className="text-[18px]">{el?.grade}</p>
                            </div>
                            <div className="w-[80px] text-center flex-1 text-[12px] px-2 leading-tight font-medium border-r pt-1 normal-case flex justify-center items-center">
                              <p
                                className={`
                                                       ${el?.grade === "A1"
                                    ? "text-green-600"
                                    : el?.grade ===
                                      "B2" ||
                                      el?.grade === "B3"
                                      ? "text-purple-800"
                                      : el?.grade ===
                                        "C4" ||
                                        el?.grade ===
                                        "C5" ||
                                        el?.grade === "C6"
                                        ? "text-gray-600"
                                        : el?.grade === "D7"
                                          ? "text-purple-600"
                                          : el?.grade === "E8"
                                            ? "Poor Pass"
                                            : el?.grade ===
                                              "F9" ||
                                              el?.grade === "F"
                                              ? "text-red-500"
                                              : null
                                  }
                                                       `}
                              >
                                {el?.grade === "A1"
                                  ? "Execellent"
                                  : el?.grade === "B2" || el?.grade === "B3"
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
                          </section>
                        ))}
                    </main>
                  </section>
                </main>
              </main>
              {/* <main className="overflow-auto uppercase text-[12px]">
             
            </main> */}
              <main className="grid grid-cols-1 sm:grid-cols-4 my-10">
                <div className=" border p-2 ">
                  <h1 className="uppercase text-[12px] font-semibold">
                    No. of subject taken
                  </h1>
                  <h1 className="uppercase text-[12px] font-normal -mt-[2px]">
                    {filteredResult.length}
                  </h1>
                </div>

                <div className=" border p-2 ">
                  <h1 className="uppercase text-[12px] font-semibold">
                    No. of subject passed
                  </h1>
                  <h1 className="uppercase text-[12px] font-normal -mt-[2px]">
                    {numbPassed}
                  </h1>
                </div>
                <div className=" border p-2 ">
                  <h1 className="uppercase text-[12px] font-semibold">
                    Attendance Performance
                  </h1>
                  <h1 className="uppercase text-[12px] font-normal -mt-[2px]">
                    {grade?.attendance}
                  </h1>
                </div>

                <div className=" border p-2 ">
                  <h1 className="uppercase text-[12px] font-semibold">
                    Percenatge score
                  </h1>
                  <h1 className="uppercase text-[12px] font-normal -mt-[2px]">
                    {targetTerm === "3rd Term"
                      ? (() => {
                        const p1 = st1?.points || 0;
                        const p2 = st2?.points || 0;
                        const p3 = st3?.points || 0;
                        const active = [p1, p2, p3].filter(p => p > 0);
                        return active.length > 0
                          ? (active.reduce((a, b) => a + b, 0) / active.length).toFixed(2)
                          : "0.00";
                      })()
                      : commulationScore.toFixed(2)}%
                  </h1>
                </div>
              </main>

              {/* Promotion Decision / Recommendation */}
              {(() => {
                const percVal = parseFloat(
                  targetTerm === "3rd Term"
                    ? (() => {
                      const p1 = st1?.points || 0;
                      const p2 = st2?.points || 0;
                      const p3 = st3?.points || 0;
                      const active = [p1, p2, p3].filter((p: number) => p > 0);
                      return active.length > 0
                        ? (active.reduce((a: number, b: number) => a + b, 0) / active.length).toFixed(2)
                        : "0.00";
                    })()
                    : commulationScore.toFixed(2)
                );
                const prom = checkPromotionStatus(
                  school || (schoolInfo && schoolInfo[0]),
                  filteredResult,
                  percVal
                );
                return (
                  <div className="my-4 p-3 border rounded bg-slate-50 flex items-center justify-between">
                    <span className="text-[12px] font-bold uppercase tracking-wider text-gray-700">
                      Recommendation / Decision:
                    </span>
                    <span
                      className={`text-[13px] font-extrabold uppercase px-3 py-1 rounded ${prom.isRepeat
                        ? "bg-red-100 text-red-700 border border-red-300"
                        : "bg-green-100 text-green-700 border border-green-300"
                        }`}
                    >
                      {prom.reason}
                    </span>
                  </div>
                );
              })()}

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

              <main className=" flex-col mt-5 ">
                <div className="my-5 px-20">
                  <hr />
                </div>
                <div className="flex flex-col items-center">
                  <p className="font-medium">
                    ACADEMIC PERFORMANCE INSIGHT/SUBJECT
                  </p>

                  <div className="flex gap-4 mt-2">
                    <div className="flex gap-1 items-center">
                      <div className="w-4 h-4 bg-red-500 shadow-inner" />
                      <p className="text-[12px] font-medium">Class Lowest</p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <div className="w-4 h-4 bg-green-500 shadow-inner" />
                      <p className="text-[12px] font-medium">Class Highest</p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <div className="w-4 h-4 bg-black shadow-inner" />
                      <p className="text-[12px] font-medium">My Score</p>
                    </div>
                  </div>
                </div>
              </main>

              <main className="mt-10">
                <div className="bg-slate-50 overflow-auto h-[100px] flex items-end pb-2 ">
                  {grade?.result?.map((el: any, i: number) => (
                    <ChartPerformance
                      low={resultMin[i]?.score}
                      max={resultMax[i]?.score}
                      key={i}
                      subject={el?.subject}
                      score={
                        el?.test1 + el.test2 + el?.test3 + el.test4 + el.exam
                      }
                    />
                  ))}
                </div>
              </main>

              <main className=" flex-col mt-5 ">
                <div className="my-5 px-20">
                  <hr />
                </div>
                <div className="flex flex-col items-center">
                  <p className="font-medium">INSIGHT INTO TERM PERFORMANCE</p>

                  <div className="flex gap-4 mt-2">
                    <div className="flex gap-1 items-center">
                      <div className="w-4 h-4 bg-red-500 shadow-inner" />
                      <p className="text-[12px] font-medium">1st Term</p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <div className="w-4 h-4 bg-green-500 shadow-inner" />
                      <p className="text-[12px] font-medium">2nd Term</p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <div className="w-4 h-4 bg-black shadow-inner" />
                      <p className="text-[12px] font-medium">3rd Term</p>
                    </div>
                  </div>
                </div>
                <main className="mt-10">
                  <div className="bg-slate-50 h-[80px]  flex ">
                    <div className="flex items-end gap-1 border-r px-3">
                      <div
                        className="h-[80px] bg-red-500 w-3"
                        style={{ height: `30px` }}
                      />
                      <div
                        className="h-[80px] bg-black w-3"
                        style={{ height: `70px` }}
                      />
                      <div
                        className="h-[80px] bg-green-500 w-3"
                        style={{ height: `50px` }}
                      />
                    </div>
                    <div className="flex items-end gap-1 border-r px-3">
                      <div
                        className="h-[80px] bg-red-500 w-3"
                        style={{ height: `30px` }}
                      />
                      <div
                        className="h-[80px] bg-black w-3"
                        style={{ height: `70px` }}
                      />
                      <div
                        className="h-[80px] bg-green-500 w-3"
                        style={{ height: `50px` }}
                      />
                    </div>
                  </div>
                </main>
              </main>

              {/* Psycho */}
              <main className="mt-20">
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
              </main>

              {/* Comments */}

              <div className=" grid text-[12px] mt-10">
                <div className="border mr-3 p-2">
                  <p className="font-semibold text-[18px] italic">
                    General Class Comment
                  </p>

                  <p className="my-2  h-[120px] p-2 mb-5">
                    {grade?.adminComment}
                  </p>
                  {/* <div className="flex w-full">
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
                  </div> */}
                </div>
              </div>

              <div className=" grid grid-cols-1 md:grid-cols-2 text-[12px] mt-10">
                <div className="border mr-3 p-2">
                  <p>Principal's Comment</p>

                  <p className="my-2 border h-[120px] p-2 mb-5">
                    {grade?.adminComment}
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
                    {grade?.classTeacherComment}
                  </p>
                  <div className="flex w-full">
                    <div className="flex-1 flex flex-col">
                      <p className="font-semibold">
                        {teacherDetail?.staffName}
                      </p>
                      <p className="text-[10px]">Class Teacher</p>
                      <div className="flex-1" />
                      <p>{moment(grade?.createdAt).format("lll")}</p>
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

export default PrintReportCard;

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
        {subject?.slice(0, 20)}
      </p>
    </div>
  );
};
