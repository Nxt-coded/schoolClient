import React, { useState, useEffect, useRef } from "react";
import { FaSpinner } from "react-icons/fa6";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
// import {
//   useReadOneClassInfo,
//   useStudentInfo,
// } from "../../hooks/useStudentHook";
import {
  useSchoolAnnouncement,
  useStudentGrade,
  useClassSubject,
  useTeacherDetail,
} from "../../../pagesForTeachers/hooks/useTeacher";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/pagesForStudents/components/ui/label";
import { Input } from "@/pagesForStudents/components/ui/input";
import moment from "moment";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { viewStudentGrade } from "../../../pagesForTeachers/api/teachersAPI";
import toast, { Toaster } from "react-hot-toast";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { usePDF } from "react-to-pdf";
import { checkPromotionStatus } from "../../../utils/promotionUtils";
import {
  useReadOneClassInfo,
  useStudentInfo,
  useStudentInfoData,
} from "@/pagesForStudents/hooks/useStudentHook";

interface ReportCardTemplateOneProps {
  studentInfo?: any;
  school?: any;
  grade?: any;
  classDetails?: any;
  teacherDetail?: any;
  subjectData?: any;
  schoolInfo?: any;
  st1?: any;
  st2?: any;
  st3?: any;
  studentPosition?: number;
}

const TeacherReportCardTemplateOne: React.FC<ReportCardTemplateOneProps> = ({
  studentInfo: propStudentInfo,
  school: propSchool,
  grade: propGrade,
  classDetails: propClassDetails,
  teacherDetail: propTeacherDetail,
  schoolInfo: propSchoolInfo,
  st1: propSt1,
  st2: propSt2,
  st3: propSt3,
  studentPosition: propStudentPosition,
  subjectData: propSubjectData,
}) => {
  const { studentID } = useParams();
  const { studentInfoData: hookStudentInfo } = useStudentInfoData(studentID);

  const location = useLocation();
  const stateData: any = (location && (location.state as any)) || {};
  const { gradeData: hookGradeData } = useStudentGrade(studentID);

  const studentInfo =
    propStudentInfo || stateData.studentInfo || hookStudentInfo;

  const { schoolAnnouncement }: any = useSchoolAnnouncement(
    studentInfo?.schoolIDs
  );
  let school: any = schoolAnnouncement;

  const [searchParams] = useSearchParams();
  const queryClassInfo = searchParams.get("classInfo");

  const grade =
    propGrade ||
    stateData.grade ||
    hookGradeData?.reportCard?.find((el: any) => {
      if (queryClassInfo) {
        return el.classInfo === queryClassInfo;
      }
      const normalize = (s: string) =>
        s?.trim().replace(/\s+/g, " ").replace(/\n/g, "").trim();

      const expected = normalize(
        `${studentInfo?.classAssigned} session: ${school?.presentSession}(${school?.presentTerm})`
      );

      return normalize(el.classInfo) === expected;
    });

  const positionFromState = stateData?.studentPosition || propStudentPosition;
  const [computedPosition, setComputedPosition] = useState<number | null>(null);
  const [computedTotals, setComputedTotals] = useState<
    Array<{ id: string; total: number; subjectCount?: number }>
  >(() => stateData?.classTotals || []);
  const [isComputingPosition, setIsComputingPosition] =
    useState<boolean>(false);

  const defaultSubjects = [
    "Maximum Obtainable Mark",
    "AGRICULTURAL SCIENCE",
    "FINANCIAL ACCOUNTING",
    "BASIC SCIENCE",
    "CHEMISTRY",
    "CHRISTIAN RELIGIOUS KNOWLEDGE / ISLAMIC STUDY",
    "CIVIC EDUCATION",
    "CLOTHING TEXTILE",
    "COMMERCE",
    "COMPUTER STUDIES",
    "CRS/IRS",
    "ECONOMICS",
    "ELECTIVE LANGUAGE",
    "FOOD AND NUTRITION",
    "FRENCH",
    "GEOGRAPHY",
    "GENERAL MATHEMATICS",
    "GRAPHICAL/TECHNICAL METAL WORK",
    "GOVERNMENT",
    "HEALTH EDUCATION",
    "HISTORY",
    "HOME MANAGEMENT",
    "INSURANCE",
    "LITERATURE IN ENGLISH",
    "MUSIC",
    "NIGERIA LANGUAGE (HAUSA/IGBO/YORUBA)",
    "OFFICE PRACTICE",
    "PHYSICAL EDUCATION",
    "PHYSICS",
    "STORE KEEPING",
    "TECHNICAL DRAWING",
    "TYPEWRITING",
    "VISUAL WORD/WORK",
  ];

  const subjects = propSubjectData?.students || defaultSubjects;

  const { gradeData } = useStudentGrade(studentID);
  const { subjectData: hookSubjectData } = useClassSubject(
    studentInfo?.presentClassID
  );

  // Derive per-term records from gradeData for cumulative display
  const gradeReportCard = gradeData?.reportCard || hookGradeData?.reportCard || [];
  const st1 = propSt1 || gradeReportCard.find((el: any) =>
    el.classInfo === `${studentInfo?.classAssigned} session: ${school?.presentSession}(1st Term)`
  );
  const st2 = propSt2 || gradeReportCard.find((el: any) =>
    el.classInfo === `${studentInfo?.classAssigned} session: ${school?.presentSession}(2nd Term)`
  );
  const st3 = propSt3 || gradeReportCard.find((el: any) =>
    el.classInfo === `${studentInfo?.classAssigned} session: ${school?.presentSession}(3rd Term)`
  );

  const schoolName = school?.schoolName!;
  const schoolAddress = school?.address;

  // Filter out unoffered subjects (where all marks are 0)
  const filteredResult = (grade?.result || []).filter((el: any) => {
    const s1 = st1?.result?.find((e: any) => e.subject === el.subject)?.mark || 0;
    const s2 = st2?.result?.find((e: any) => e.subject === el.subject)?.mark || 0;
    const s3 = st3?.result?.find((e: any) => e.subject === el.subject)?.mark || 0;
    const currentTotal = el.mark ?? ((el.test1 ?? 0) + (el.test2 ?? 0) + (el.test3 ?? 0) + (el.test4 ?? 0) + (el.exam ?? 0));
    return currentTotal > 0 || s1 > 0 || s2 > 0 || s3 > 0;
  });

  const totalScore =
    filteredResult.reduce((acc: number, el: any) => {
      const subjectTotal = el.mark ?? (el.test4 ?? 0) + (el.exam ?? 0);
      return acc + subjectTotal;
    }, 0) ?? 0;

  const subjectsCount =
    filteredResult.filter((el: any) => el?.subject != null)?.length || 0;

  // average score across offered subjects (0-100), safe when no subjects exist
  const commulationScore = subjectsCount > 0 ? totalScore / subjectsCount : 0;

  const formatOrdinal = (n: number | null | undefined) => {
    if (n == null || n <= 0) return "N/A";
    const s = ["th", "st", "nd", "rd"],
      v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  // If position isn't provided via state or props, compute it by asking API for each student's report

  useEffect(() => {
    const computePosition = async () => {
      try {
        // If a position was passed from state/props, don't compute
        if (positionFromState != null) return;
        const studentIDs =
          propSubjectData?.students || hookSubjectData?.students || [];

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
        const targetClassInfo = normalize(
          grade?.classInfo || hookGradeData?.reportCard?.[0]?.classInfo || ""
        );
        const sessionNorm = normalize(school?.presentSession || "");
        const termNorm = normalize(school?.presentTerm || "");
        const totals: Array<{
          id: string;
          total: number;
          subjectCount?: number;
        }> = [];
        setIsComputingPosition(true);
        await Promise.all(
          studentIDs.map(async (sid: string) => {
            try {
              const res: any = await viewStudentGrade(sid);

              // Skip if reportCard doesn't exist
              const reportArray =
                res?.data?.reportCard || res?.reportCard || [];
              // DEBUG: If this student was reported as skipped by user, log full response
              if (sid === "691451f061a5371e65809c71") {
              }
              if (!reportArray || reportArray.length === 0) {
                console.log(
                  "ReportCardTemplateOne - skipped student",
                  sid,
                  "- no reportCard"
                );
                return;
              }

              const infos = (reportArray || []).map((r: any) => r?.classInfo);
              const report = reportArray.find((el: any) => {
                if (!school?.presentSession || !school?.presentTerm) return false;
                const normalize = (s: string) =>
                  s?.trim().replace(/\s+/g, " ").replace(/\n/g, "").trim();

                const expected = normalize(
                  `${studentInfo?.classAssigned} session: ${school?.presentSession}(${school?.presentTerm})`
                );
                return normalize(el.classInfo) === expected;
              });

              // Skip if no matching report found OR if report has no results
              if (!report || !report.result || report.result.length === 0) {
                console.log(
                  "ReportCardTemplateOne - skipped student",
                  sid,
                  "- no matching report or empty results"
                );
                return;
              }

              const tot = report.result.reduce((acc: number, r: any) => {
                return acc + (r.mark ?? (r.test4 || 0) + (r.exam || 0));
              }, 0);
              totals.push({
                id: sid,
                total: tot,
                subjectCount: report.result.length,
              });
              console.log(report.result, "total for student", sid, "is", tot);
            } catch (e) {
              // ignore errors for individual students
            }
          })
        );
        totals.sort((a, b) => b.total - a.total);
        // assign ranks with standard competition ranking (1,1,3 for a tie)
        let lastTotal: number | null = null;
        let lastRank = 0;
        let count = 0;
        const ranked: Array<{ id: string; total: number; rank: number }> = [];
        for (const t of totals) {
          count += 1;
          if (lastTotal !== null && t.total === lastTotal) {
            // same rank as previous
            ranked.push({ id: t.id, total: t.total, rank: lastRank });
          } else {
            lastTotal = t.total;
            lastRank = count;
            ranked.push({ id: t.id, total: t.total, rank: lastRank });
          }
        }
        const myRank = ranked.find((r) => r.id === studentInfo?._id);
        if (myRank) setComputedPosition(myRank.rank);
        else if (totals.length === 0) setComputedPosition(-1);
        setComputedTotals(totals);
      } catch (e) {
        console.error("Error computing class position:", e);
      } finally {
        setIsComputingPosition(false);
      }
    };
    computePosition();
  }, [propSubjectData?.students, positionFromState, studentInfo, school]);

  const positionLabel = positionFromState ?? computedPosition;

  const { subjectData }: any = useClassSubject(studentInfo?.presentClassID);
  console.log("studentID-grade", studentInfo?.presentClassID);
  const printableRef = useRef<HTMLDivElement | null>(null);
  const [pdfLoading, setPdfLoading] = useState<boolean>(false);

  const handleDownloadPdf = async () => {
    const element = printableRef.current;
    if (!element) return;
    setPdfLoading(true);
    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const data = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });
      const imgProps = pdf.getImageProperties(data);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(
        `${studentInfo?.studentFirstName || "student"}-${
          studentInfo?.classAssigned || "class"
        }-report.pdf`
      );
    } catch (e) {
      console.error("Error generating PDF:", e);
    } finally {
      setPdfLoading(false);
    }
  };

  const handlePrint = async () => {
    const element = printableRef.current;
    if (!element) return;
    setPdfLoading(true);
    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const data = canvas.toDataURL("image/png");
      const printWindow = window.open("", "_blank");
      if (!printWindow) return;
      printWindow.document.write(
        `<html><head><title>Print</title></head><body style="margin:0; padding:0;"></body></html>`
      );
      const body = printWindow.document.body;
      const img = printWindow.document.createElement("img");
      img.src = data;
      img.style.width = "100%";
      body.appendChild(img);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      // keep the window open briefly to ensure printing started
      setTimeout(() => printWindow.close(), 500);
    } catch (e) {
      console.error("Error printing report:", e);
    } finally {
      setPdfLoading(false);
    }
  };
  // console.log(studentPosition ?? computedStudentPosition);

  // Compute class stats from computedTotals
  const classStats = React.useMemo(() => {
    if (!computedTotals || computedTotals.length === 0) return null;
    const sumTotals = computedTotals.reduce(
      (acc, t) => acc + (t.total || 0),
      0
    );
    const avgTotal = sumTotals / computedTotals.length;
    const subjectCount =
      grade?.result?.length ||
      computedTotals.find((t) => t.subjectCount)?.subjectCount ||
      0;
    // per-student percent list
    const percents = computedTotals.map((t) => {
      const subs = t.subjectCount || subjectCount || 1;
      return subs > 0 ? (t.total || 0) / subs : 0;
    });
    const avgPercent =
      percents.reduce((a, b) => a + b, 0) / percents.length || 0;
    const highest = Math.max(...computedTotals.map((t) => t.total || 0));
    const lowest = Math.min(...computedTotals.map((t) => t.total || 0));
    const highestPercent = Math.max(...percents);
    const lowestPercent = Math.min(...percents);
    return {
      avgTotal,
      avgPercent,
      highest,
      lowest,
      highestPercent,
      lowestPercent,
      subjectCount,
    } as any;
  }, [computedTotals, grade]);

  const [loading, setLoading] = useState(false);

  const { toPDF, targetRef }: any = usePDF({
    filename: `${studentInfo?.studentFirstName}-${studentInfo?.classAssigned}-${
      school?.presentSession
    }-${school?.presentTerm}-${moment(Date.now()).format("lll")}.pdf`,
  });

  const { oneClass: classDetails } = useReadOneClassInfo(
    studentInfo?.presentClassID
  );

  const { teacherDetail } = useTeacherDetail(classDetails?.teacherID);

  return (
    <main className=" max-w-5xl mx-auto">
      <div className="flex justify-end gap-2 mb-2">
        <button
          className={`px-8 py-1 bg-white border rounded-md text-[12px] tracking-widest  ${
            pdfLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-100"
          }`}
          onClick={handlePrint}
          disabled={pdfLoading}
        >
          Print Result
        </button>

        <button
          disabled={loading}
          className={`text-[12px] tracking-widest transistion-all duration-300 hover:bg-red-100 px-8 py-2 rounded-md bg-white border ${
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
            "Download PDF"
          )}
        </button>
      </div>
      <div className="w-full max-w-5xl mx-auto p-4 bg-gray-50">
        <Toaster position="top-center" reverseOrder={true} />

        <Card className="shadow-lg" ref={targetRef}>
          <CardContent className="px-6 py-2 overflow-hidden">
            {/* Header */}

            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                {/* {computedTotals?.length > 0 && (
                  <div className="ml-6 text-xs text-gray-500">
                    <div className="font-semibold">Top 5 computed totals</div>
                    <ul>
                      {computedTotals.slice(0, 5).map((t, idx) => (
                        <li key={t.id}>
                          {idx + 1}. {t.id} — {t.total}
                        </li>
                      ))}
                    </ul>
                  </div>
                )} */}
              </div>
            </div>

            <div
              className="absolute max-w-[50%] overflow-hidden inset-0 text-gray-300 text-opacity-20 text-[5vw] font-bold tracking-widest uppercase flex justify-center items-center"
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

            <div ref={printableRef} className="border border-black mb-4">
              <div className="flex items-start justify-between px-4 py-2 bg-white">
                <div className="flex items-center gap-4">
                  <div className="w-30 h-30 border border-black flex items-center justify-center  rounded-md overflow-hidden">
                    <div className="border h-32 w-32">
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
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-blue-700 flex justify-start">
                      {school?.schoolName || "Loading..."}
                    </h1>
                    <p className="text-sm">{schoolAddress || "Loading..."}</p>
                    <p className="text-xs font-semibold mt-1">
                      FOR SENIOR SECONDARY SCHOOLS
                    </p>
                  </div>
                </div>
                <div className="border border-black rounded-md overflow-hidden">
                  {/* <div className="text-xs">SS</div>
                <div className="text-xs font-bold">TERM</div> */}

                  <div className="border h-32 w-32 ">
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
              </div>
            </div>

            {/* Student's Personal Data */}
            <div className="mb-4">
              <div className="bg-gray-800 text-white text-center py-1 font-semibold">
                STUDENT'S PERSONAL DATA
              </div>
              <div className="border border-gray-800">
                <div className="grid grid-cols-2 gap-0">
                  {/* Left Column */}
                  <div className="border-r border-gray-800 ">
                    <div className="border-b border-gray-800 p-2 flex items-center gap-2">
                      <Label className="text-xs font-semibold w-24 uppercase">
                        Name
                      </Label>
                      <div className="h-7 text-sm flex-1 flex items-center">{`${
                        studentInfo?.studentFirstName || ""
                      } ${studentInfo?.studentLastName || ""}`}</div>
                    </div>
                    <div className="border-b border-gray-800 px-2 flex items-center gap-2">
                      <Label className="text-xs font-semibold w-24 uppercase">
                        Class
                      </Label>
                      <div className="h-7 text-sm flex-1 flex items-center">
                        {studentInfo?.classAssigned || ""}
                      </div>
                    </div>
                    <div className="border-b border-gray-800 px-2 flex items-center gap-2">
                      <Label className="text-xs font-semibold w-24 uppercase">
                        DOB
                      </Label>
                      <div className="h-7 text-sm flex-1 flex items-center">
                        {studentInfo?.dateOfBirth || ""}
                      </div>
                    </div>
                    <div className="border-b border-gray-800 px-2 flex items-center gap-2">
                      <Label className="text-xs font-semibold w-24 uppercase">
                        School
                      </Label>
                      <div className="h-7 text-sm flex-1 flex items-center">
                        {propSchool?.schoolName ||
                          studentInfo?.schoolName ||
                          ""}
                      </div>
                    </div>
                    <div className="border-b border-gray-800 px-2 flex items-center gap-2">
                      <Label className="text-xs font-semibold w-24 uppercase">
                        Class
                      </Label>
                      <div className="h-7 text-sm flex-1 flex items-center">
                        {studentInfo?.classAssigned || ""}
                      </div>
                    </div>
                    <div className="px-2 flex items-center gap-2">
                      <Label className="text-xs font-semibold w-24 uppercase">
                        LG/District
                      </Label>
                      <div className="h-7 text-sm flex-1 flex items-center">
                        {studentInfo?.lga || ""}
                      </div>
                    </div>
                  </div>

                  {/* Middle Column - Attendance */}
                  <div className="border-r border-gray-800 h-full ">
                    <div className="bg-gray-200 text-center  border-b border-gray-800">
                      <span className="text-xs font-semibold ">ATTENDANCE</span>
                    </div>
                    <div className="grid grid-cols-3 text-center text-xs">
                      <div className="border-r border-b border-gray-800 p-1">
                        <div className="font-semibold">No. Of Days</div>
                        <div>School Opened</div>
                      </div>
                      <div className="border-r border-b border-gray-800 p-1">
                        <div className="font-semibold">No. Of</div>
                        <div>Days Present</div>
                      </div>
                      <div className="border-b border-gray-800 p-1">
                        <div className="font-semibold">No. Of</div>
                        <div>Days Absent</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 h-[30px]">
                      <div className="border-r border-gray-800 p-2 text-center text-sm font-medium">
                        {school?.NumberOfDays || ""}
                      </div>
                      <div className="border-r border-gray-800 p-2 text-center text-sm font-medium">
                        {grade?.attendance || ""}%
                      </div>
                      <div className="p-2 text-center text-sm font-medium">
                        {100 - grade?.attendance || ""}%
                      </div>
                    </div>
                    <div className="bg-gray-200 text-center  border-t border-b border-gray-800">
                      <span className="text-xs font-semibold">
                        TERMINAL DURATION
                      </span>
                    </div>
                    <div className="grid grid-cols-3 text-center text-xs">
                      <div className="border-r border-b border-gray-800 p-1">
                        <div className="font-semibold">No. Of Days</div>
                        <div>School Opened</div>
                      </div>
                      <div className="border-r border-b border-gray-800 p-1">
                        <div className="font-semibold">School</div>
                        <div>Resumption Date</div>
                      </div>
                      <div className="border-b border-gray-800 p-1">
                        <div className="font-semibold">School</div>
                        <div>Closing Date</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 h-[30px]">
                      <div className="border-r border-gray-800 p-2 text-center text-sm font-medium">
                        {school?.NumberOfDays || ""}
                      </div>
                      <div className="border-r border-gray-800 p-2 text-center text-sm font-medium">
                        {moment(school?.SchoolTeamResumption).format(
                          "Do MMM, YYYY"
                        ) || ""}
                      </div>
                      <div className="p-2 text-center text-sm font-medium">
                        {moment(school?.SchoolTeamCloses).format(
                          "Do MMM, YYYY"
                        ) || ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Performance */}
            <div className="mb-4">
              <div className="bg-gray-800 text-white text-center py-1 font-semibold">
                ACADEMIC PERFORMANCE
              </div>
              <div className="border border-gray-800 overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-800 p-1 text-left text-md">
                        Subject
                      </th>
                      <th className="border border-gray-800 p-1 w-[80px]">
                        Cont. Ass.
                      </th>
                      <th className="border border-gray-800 p-1 w-[90px]">
                        Exam Marks
                      </th>
                      <th className="border border-gray-800 p-1 w-[110px]">
                        Total MKS
                      </th>
                      {(school?.presentTerm === "1st Term" || school?.presentTerm === "2nd Term" || school?.presentTerm === "3rd Term") && (
                        <th className="border border-gray-800 p-1 w-[80px]">1st Term</th>
                      )}
                      {(school?.presentTerm === "2nd Term" || school?.presentTerm === "3rd Term") && (
                        <th className="border border-gray-800 p-1 w-[80px]">2nd Term</th>
                      )}
                      {school?.presentTerm === "3rd Term" && (
                        <th className="border border-gray-800 p-1 w-[80px]">3rd Term</th>
                      )}
                      {school?.presentTerm === "3rd Term" && (
                        <th className="border border-gray-800 p-1 w-[90px]">Cumul. Avg</th>
                      )}
                      <th className="border border-gray-800 p-1 w-20">GRADE</th>
                      <th className="border border-gray-800 p-1 w-[250px]">
                        Teacher's Comment
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(filteredResult && filteredResult.length
                      ? filteredResult
                      : subjects
                    ).map((subject: any, index: number) => (
                      <tr key={index} className={index === 0 ? "" : ""}>
                        <td className="border border-gray-800 p-1 text-[15px] font-semibold">
                          {typeof subject === "string"
                            ? subject
                            : subject.subject}
                        </td>
                        <td className="border border-gray-800 p-1 text-center">
                          {typeof subject === "string"
                            ? ""
                            : (subject.test4 || subject.test1 )?? ""}
                        </td>
                        <td className="border border-gray-800 p-1 text-center">
                          {typeof subject === "string"
                            ? ""
                            : subject.exam ?? ""}
                        </td>
                        <td className="border border-gray-800 p-1 text-center">
                          {typeof subject === "string"
                            ? ""
                            : (subject.test1 ?? 0) +
                              (subject.test2 ?? 0) +
                              (subject.test3 ?? 0) +
                              (subject.test4 ?? 0) +
                              (subject.exam ?? 0)}
                        </td>
                        {(school?.presentTerm === "1st Term" || school?.presentTerm === "2nd Term" || school?.presentTerm === "3rd Term") && (
                          <td className="border border-gray-800 p-1 text-center">
                            {typeof subject === "string" ? "" : (st1?.result?.find((e: any) => e.subject === subject.subject)?.mark || 0)}
                          </td>
                        )}
                        {(school?.presentTerm === "2nd Term" || school?.presentTerm === "3rd Term") && (
                          <td className="border border-gray-800 p-1 text-center">
                            {typeof subject === "string" ? "" : (st2?.result?.find((e: any) => e.subject === subject.subject)?.mark || 0)}
                          </td>
                        )}
                        {school?.presentTerm === "3rd Term" && (
                          <td className="border border-gray-800 p-1 text-center">
                            {typeof subject === "string" ? "" : (st3?.result?.find((e: any) => e.subject === subject.subject)?.mark || 0)}
                          </td>
                        )}
                        {school?.presentTerm === "3rd Term" && (
                          <td className="border border-gray-800 p-1 text-center font-semibold">
                            {typeof subject === "string" ? "" : (() => {
                              const s1 = st1?.result?.find((e: any) => e.subject === subject.subject)?.mark || 0;
                              const s2 = st2?.result?.find((e: any) => e.subject === subject.subject)?.mark || 0;
                              const s3 = st3?.result?.find((e: any) => e.subject === subject.subject)?.mark || 0;
                              const activeScores = [s1, s2, s3].slice(0, school?.presentTerm === "1st Term" ? 1 : school?.presentTerm === "2nd Term" ? 2 : 3).filter((s: number) => s > 0);
                              return activeScores.length > 0
                                ? (activeScores.reduce((a: number, b: number) => a + b, 0) / activeScores.length).toFixed(1)
                                : 0;
                            })()}
                          </td>
                        )}
                        <td className="border border-gray-800 p-1 text-center">
                          {typeof subject === "string"
                            ? ""
                            : subject.grade ?? ""}
                        </td>
                        <td className="border border-gray-800 p-1">
                          {typeof subject === "string"
                            ? ""
                            : subject.comment || subject.teacherComment || ""}
                        </td>
                        {/* <td className="border border-gray-800 p-1"></td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mb-4">
              <div className="bg-gray-800 text-white text-center py-1 font-semibold text-sm">
                GRADING SCALE & PERFORMANCE SUMMARY
              </div>
              <div className="border border-gray-800">
                <table className="w-full text-xs table-fixed">
                  <tbody>
                    <tr>
                      <td className=" border-gray-800 px-2 w-1/3  gap-2">
                        <span className="">
                          <span className="font-bold">A1</span> 75-100
                          (EXCELLENT)
                        </span>
                      </td>
                      <td className="border border-gray-800 p-2 w-1/3">
                        <span className="">
                          <span className="font-bold">B2</span> 70-74 (VERY
                          GOOD)
                        </span>
                        <span className="ml-4">
                          <span className="font-bold">B3</span> 65-69 (GOOD)
                        </span>
                      </td>

                      <td className="border border-gray-800 p-2 w-1/3">
                        <span className="">
                          <span className="font-bold">C4</span> 60-64 (UPPER
                          CREDIT)
                        </span>
                        <span className="ml-4">
                          <span className="font-bold">C5</span> 55-59 (CREDIT)
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-800 p-2 w-1/3">
                        <span className="">
                          <span className="font-bold">C6</span> 50-54 (LOWER
                          CREDIT)
                        </span>
                      </td>
                      <td className="border border-gray-800 p-2 w-1/3">
                        <span className="">
                          <span className="font-bold">D7</span> 45-49 (PASS)
                        </span>
                        <span className="ml-4">
                          <span className="font-bold">E8</span> 40-44 (PASS)
                        </span>
                      </td>
                      <td className="border border-gray-800 p-2 w-1/3">
                        <span className="">
                          <span className="font-bold">F9</span> 0-39 (FAIL)
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-800 p-2 font-semibold w-1/3">
                        <Label className="text-xs">
                          Position:{" "}
                          <span className="text-sm font-semibold mt-1">
                            <span className="text-xs font-bold">
                               {formatOrdinal(positionLabel)} of{" "}
                              {subjectData?.students?.length ?? "N/A"}
                              {!positionLabel ? (
                                <span className="text-xs italic ml-2">
                                  (computing...)
                                </span>
                              ) : null}
                            </span>
                          </span>
                        </Label>
                      </td>
                      <td className="border border-gray-800 p-2 w-1/3">
                        <div>
                          <Label className="text-xs">
                            Total Score:{" "}
                            <span className="text-sm font-semibold mt-1">
                              {totalScore}
                            </span>
                          </Label>
                        </div>
                      </td>
                      <td className="border border-gray-800 p-2 w-1/3">
                        <div>
                          <Label className="text-xs">
                            No. Of Subjects Offered:{" "}
                            <span className="text-sm font-semibold mt-1">
                              {filteredResult.length}
                            </span>
                          </Label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-800 p-2 font-semibold w-1/3">
                        Percentage Score
                      </td>
                      <td
                        className="border border-gray-800 p-2 w-2/3"
                        colSpan={2}
                      >
                        <p className="text-sm font-semibold">
                          {commulationScore.toFixed(2)}%
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Clubs Section */}
            <div className="mb-4">
              <div className="bg-gray-800 text-white text-center py-1 font-semibold">
                CLUBS, YOUTH ORGANIZATION, ETC
              </div>

              <div className="border border-gray-800 grid grid-cols-5 font-medium">
                <div className="border-r border-gray-800 px-2">
                  <Label className="text-ms font-bold flex justify-between items-center mt-1.5">
                    SKILL
                  </Label>
                </div>
                <div className="border-r border-gray-800 p-2">
                  <Label className="text-xs flex justify-between">
                    <span>COMMUNICATION </span>
                    <span className="border-l px-5">
                      {grade?.softSkill[0]?.communication}
                    </span>
                  </Label>
                </div>
                <div className="p-2 border-r border-gray-800 ">
                  <Label className="text-xs  flex justify-between">
                    LEADERSHIP
                    <span className="border-l px-5">
                      {grade?.softSkill[0]?.leadership}
                    </span>
                  </Label>
                </div>
                <div className="border-r border-gray-800 p-2">
                  <Label className="text-xs flex justify-between">
                    PUNCIALITY
                    <span className="border-l px-5">
                      {" "}
                      {grade?.softSkill[0]?.punctuality}
                    </span>
                  </Label>
                </div>
                <div className="p-2">
                  <Label className="text-xs flex justify-between">
                    EMPATHY
                    <span className="border-l px-5">
                      {grade?.softSkill[0]?.empathy}
                    </span>
                  </Label>
                </div>
              </div>

              <div className="border-x border-gray-800 grid grid-cols-5 font-medium">
                <div className="border-r border-gray-800 px-2">
                  <Label className="text-sm font-bold flex justify-between items-center mt-1.5">
                    PEOPLE SKILL
                  </Label>
                </div>
                <div className="border-r border-gray-800 p-2">
                  <Label className="text-xs flex justify-between">
                    <span>CONFIDENCE </span>
                    <span className="border-l px-5">
                      {" "}
                      {grade?.peopleSkill[0]?.confidence}
                    </span>
                  </Label>
                </div>
                <div className="p-2 border-r border-gray-800 ">
                  <Label className="text-xs  flex justify-between">
                    HARDWORKING
                    <span className="border-l px-5">
                      {grade?.peopleSkill[0]?.hardworking}
                    </span>
                  </Label>
                </div>
                <div className="border-r border-gray-800 p-2">
                  <Label className="text-xs flex justify-between">
                    PRESENTATIONAL
                    <span className="border-l px-5">
                      {grade?.peopleSkill[0]?.presentational}
                    </span>
                  </Label>
                </div>
                <div className="p-2">
                  <Label className="text-xs flex justify-between">
                    RESILIENT
                    <span className="border-l px-5">
                      {grade?.peopleSkill[0]?.resilient}
                    </span>
                  </Label>
                </div>
              </div>

              <div className="border border-gray-800 grid grid-cols-5 font-medium">
                <div className="border-r border-gray-800 px-2">
                  <Label className="text-sm font-bold flex justify-between items-center mt-1.5">
                    PHYSICAL SKILL
                  </Label>
                </div>
                <div className="border-r border-gray-800 p-2">
                  <Label className="text-xs flex justify-between">
                    <span>SPORT </span>
                    <span className="border-l px-5">
                      {grade?.physicalSkill[0]?.sportship}
                    </span>
                  </Label>
                </div>
                <div className="p-2 border-r border-gray-800 ">
                  <Label className="text-xs  flex justify-between">
                    <span className="border-l px-5"></span>
                  </Label>
                </div>
                <div className="border-r border-gray-800 p-2">
                  <Label className="text-xs flex justify-between">
                    <span className="border-l px-5"></span>
                  </Label>
                </div>
                <div className="p-2">
                  <Label className="text-xs flex justify-between">
                    <span className="border-l px-5"></span>
                  </Label>
                </div>
              </div>
            </div>

            {/* Promotion Decision / Recommendation */}
            {(() => {
              const prom = checkPromotionStatus(
                school,
                filteredResult,
                commulationScore
              );
              return (
                <div className="my-2 p-2 border border-gray-800 rounded bg-slate-50 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Recommendation / Decision:
                  </span>
                  <span
                    className={`text-xs font-extrabold uppercase px-3 py-1 rounded ${
                      prom.isRepeat
                        ? "bg-red-100 text-red-700 border border-red-300"
                        : "bg-green-100 text-green-700 border border-green-300"
                    }`}
                  >
                    {prom.reason}
                  </span>
                </div>
              );
            })()}

            {/* Comments and Signatures */}
            <div className="border-t my-1" />
            <div className="space-y-1">
              <div className="grid grid-cols-2 gap-12 ">
                <div>
                  <Label className="text-xs font-semibold">
                    Class Teacher's Comment:
                    <p>
                      <span className="font-semibold">
                        {teacherDetail?.staffName}
                      </span>
                    </p>
                  </Label>
                  <div className="w-full  border-gray-300 rounded leading-5 text-sm italic mt-1 h-10">
                    {grade?.classTeacherComment}
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-semibold">
                    Signature & Date (
                    <span className="h-7 text-xs mt-1">
                      <span>{moment(grade?.createdAt).format("ll")}</span>
                    </span>
                    )
                  </Label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-12">
                <div>
                  <Label className="text-xs font-semibold">
                    Principal's Comment:{" "}
                    <p className="capitalize">
                      {school?.name} {school?.name2}
                    </p>
                  </Label>
                  <div className="w-full border-gray-300 rounded leading-5 text-sm italic mt-1 h-10 ">
                    {" "}
                    {grade?.adminComment}
                  </div>
                </div>
                <div>
                  <Label className="text-xs font-semibold  ">
                    Signature & Date (
                    <span className="h-7 text-xs mt-1">
                      <span>{moment(grade?.createdAt).format("ll")}</span>
                    </span>
                    )
                  </Label>
                  <div className="w-[120px] h-[40px] border mt-1">
                    <img
                      src={school?.signature}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-semibold">
                  Parent's Signature
                </Label>
                <Input className="h-7 text-xs mt-1" />
              </div>
              <div>
                <Label className="text-xs font-semibold">Date</Label>
                <Input className="h-7 text-xs mt-1" type="date" />
              </div>
            </div> */}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default TeacherReportCardTemplateOne;
