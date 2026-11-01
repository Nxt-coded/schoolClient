document.title = "View Students for Grading";
import pix from "../../../assets/pix.jpg";
import Button from "../../../components/reUse/Button";
import LittleHeader from "../../../components/static/LittleHeader";
import { FC, useState, useEffect } from "react";
import {
  useSchoolSessionData,
  useSchoolClassRMDetail,
  useViewSchoolClassRM,
  useStudentAttendance,
  useSchoolData,
} from "../../../pages/hook/useSchoolAuth";
import { mutate } from "swr";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useReadOneClassInfo } from "../../../pagesForStudents/hooks/useStudentHook";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";
import { ConfirmDeleteModal } from "@/components/modals/ConfirmDeleteModal";

// import {

// } from "../../hooks/useTeacher";

// import { createGradeScore } from "../../api/teachersAPI";

import {
  useExamSubjectPerfomance,
  useOneExamSubjectStudentPerfomance,
} from "@/pagesForTeachers/hooks/useQuizHook";
import { createGradeScore, removeGradeScore } from "@/pagesForTeachers/api/teachersAPI";
import {
  useClassStudent,
  useStudentGrade,
  useSujectInfo,
  useTeacherInfo,
  useSchoolAnnouncement,
} from "@/pagesForTeachers/hooks/useTeacher";
import { ConfirmBulkSaveModal } from "@/components/modals/ConfirmBulkSaveModal";
import { Save } from "lucide-react";

interface iProps {
  props?: any;
  id?: string;
  data?: any;
  i?: number;
  allScores?: any;
  updateScore?: (studentID: string, fields: any) => void;
}

const MainStudentRow: FC<iProps> = ({ props, i, allScores, updateScore }) => {
  const { subjectID, examID } = useParams();
  const { data } = useSchoolData();
  const { schoolAnnouncement } = useSchoolAnnouncement(data?._id);
  const { subjectInfo } = useSujectInfo(subjectID);

  const activeExamID = examID || (subjectInfo?.examination?.length > 0 
    ? subjectInfo.examination[subjectInfo.examination.length - 1] 
    : undefined);
  
  const { examPerformance } = useExamSubjectPerfomance(activeExamID!);

  const { oneStudentPerformanceExam: oneStudentPerformance } =
    useOneExamSubjectStudentPerfomance(
      subjectID,
      activeExamID
    );

  // console.clear()
  // console.log(examPerformance?.performance)

  const studentFullNameA = `${props?.studentFirstName ?? ""} ${
    props?.studentLastName ?? ""
  }`
    .trim()
    .toLowerCase();
  const studentFullNameB = `${props?.studentLastName ?? ""} ${
    props?.studentFirstName ?? ""
  }`
    .trim()
    .toLowerCase();

  const performanceList: any[] = Array.isArray(oneStudentPerformance)
    ? oneStudentPerformance
    : oneStudentPerformance?.performance ?? [];

  const matchedPerformance =
    performanceList.find((p: any) => {
      const name = (p?.studentName ?? "").trim().toLowerCase();
      return name === studentFullNameA || name === studentFullNameB;
    }) ?? null;

  const performanceRating = matchedPerformance?.performanceRating ?? null;
  const performanceRatingII =
    matchedPerformance?.studentScore *
    parseInt(matchedPerformance?.markPerQuestion);


  const [loading, setLoading] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Local state for immediate display after submission
  const [displayGrade, setDisplayGrade] = useState<any>(null);

  const { gradeData, mutate: updateGradeData } = useStudentGrade(props?._id);

  // Find the current report card entry
  const reportData = gradeData?.reportCard?.find((el: any) => {
    const x = el.classInfo
      ?.trim()
      ?.replace(/\s+/g, " ")
      ?.replace(/\n/g, "")
      .trim();
    const y = `${subjectInfo?.designated} session: ${schoolAnnouncement?.presentSession}(${schoolAnnouncement?.presentTerm})`
      ?.trim()
      ?.replace(/\s+/g, " ")
      ?.replace(/\n/g, "")
      .trim();

    return x === y;
  });

  // Find the subject result
  const result = reportData?.result?.find((el: any) => {
    return el.subject === subjectInfo?.subjectTitle;
  });

  console.log("result: ",result)

  // initialize local input state empty; we'll sync from `result` below so
  // the inputs update when server data changes (e.g. after mutate())
  // Use lifted state if available, otherwise fallback to local/DB
  const studentScores = allScores?.[props?._id] || {};
  
  const [test4, setTest4] = useState(
    studentScores.test4 !== undefined ? studentScores.test4 : (result?.test4 ? result.test4.toString() : "")
  );
  const [exam, setExam] = useState<string>(
    studentScores.exam !== undefined ? studentScores.exam : ""
  );
  const [isEditingExam, setIsEditingExam] = useState<boolean>(false);
  const [teacherComment, setTeacherComment] = useState(
    studentScores.teacherComment !== undefined ? studentScores.teacherComment : (result?.teacherComment ? result.teacherComment : "")
  );

  // Sync with parent state
  useEffect(() => {
    if (updateScore) {
       updateScore(props?._id, { test4, exam, teacherComment });
    }
  }, [test4, exam, teacherComment]);

  // Calculate grade based on total marks
  const calculateGrade = (totalMark: number): string => {
    if (totalMark >= 90) return "A+";
    if (totalMark >= 80) return "A";
    if (totalMark >= 70) return "B";
    if (totalMark >= 60) return "C";
    if (totalMark >= 50) return "D";
    if (totalMark >= 40) return "E";
    return "F";
  };

  const computedExamDefault =
    performanceRatingII !== null && performanceRatingII !== undefined
      ? performanceRatingII.toString()
      : "";

  // Keep the exam input in sync with server data unless the user is
  // actively typing (exam !== ""). When a fresh result arrives (for
  // example after mutate), populate the input so it always shows
  // result.exam.
  useEffect(() => {
    try {
      // If user hasn't typed anything, reflect the server value or
      // the computed default
      if (!isEditingExam && exam === "") {
        if (result?.exam !== undefined && result?.exam !== null) {
          setExam(String(result.exam));
        } else if (computedExamDefault !== "") {
          setExam(computedExamDefault);
        }
      }
    } catch (err) {
      console.error("sync exam effect error:", err);
    }
    // re-run when server value, computed default or user input changes
  }, [result?.exam, computedExamDefault, exam]);

  const makeGrade = async () => {
    try {
      setLoading(true);

      // Use entered values if available, otherwise use existing result data
      const test4Score = test4 ? parseInt(test4) : result?.test4 || 0;
      // const examScore = exam ? parseInt(exam) : result?.exam || 0;
      const examScore =
        exam !== ""
          ? parseInt(exam, 10)
          : result?.exam ??
            (computedExamDefault !== "" && !isNaN(Number(computedExamDefault))
              ? Math.round(Number(computedExamDefault))
              : 0);

      // Calculate total and grade immediately (including test1, test2, test3)
      const totalMark =
        (result?.test1 || 0) +
        (result?.test2 || 0) +
        (result?.test3 || 0) +
        test4Score +
        examScore;
      const grade = calculateGrade(totalMark);

      const response = await createGradeScore(props?._id, {
        subject: subjectInfo?.subjectTitle,
        test1: result?.test1 || 0,
        test2: result?.test2 || 0,
        test3: result?.test3 || 0,
        test4: test4Score,
        exam: examScore,
        teacherComment: teacherComment,
      });

      // Update local display state immediately
      setDisplayGrade({
        mark: totalMark,
        grade: grade,
        test1: result?.test1 || 0,
        test2: result?.test2 || 0,
        test3: result?.test3 || 0,
        test4: test4Score,
        exam: examScore,
        teacherComment: teacherComment,
      });

      // Refresh data from server
      await mutate(`api/student-report-card/${props?._id}`);

      setLoading(false);
      toast.success("Grade added successfully!");

      // Clear input fields
      // Keep exam and test4 showing the submitted value; clear only if you
      // want blank inputs. Mark editing false to allow server sync again.
      setTest4(String(test4Score));
      setExam(String(examScore));
      setIsEditingExam(false);
      setTeacherComment("");
    } catch (error: any) {
      setLoading(false);
      toast.error("Failed to add grade. Please try again.");
      console.error("Error adding grade:", error);
    }
  };

  const handleDeleteClick = () => {
      setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      setIsDeleting(true);
      const res = await removeGradeScore(props?._id, subjectInfo?.subjectTitle);
      
      if (res) {
          // Construct optimistic update
          const updatedGradeData = { ...gradeData };
          const reportIndex = updatedGradeData?.reportCard?.findIndex((r: any) => r._id === res._id);
          
          if (reportIndex !== -1 && updatedGradeData?.reportCard) {
            updatedGradeData.reportCard[reportIndex] = res;
            await updateGradeData(updatedGradeData);
          } else {
             await mutate(`api/student-report-card/${props?._id}`); 
          }
      }

      // Clear local state
      setDisplayGrade(null);
      setTest4("");
      setExam("");
      setTeacherComment("");
      
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      
      toast.success("Grade removed successfully");
    } catch (error) {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      toast.error("Failed to remove grade.");
      console.error(error);
    }
  };

  // Use displayGrade if available, otherwise fall back to result from database
  const currentResult = displayGrade || result;

  console.log("result: ", result);

  return (
    <div
      className={`text-blue-950 flex items-center gap-2 text-[12px] font-medium h-16 px-4 my-2 overflow-hidden whitespace-nowrap ${
        i % 2 === 0 ? "bg-slate-50" : "bg-white"
      }`}
      style={{ width: "1180px" }}
    >
      <div className="w-[100px] border-r font-bold">{i + 1}</div>

      {/* Student Name with Avatar */}
      <div className="w-[250px] flex border-r">
        <div className="flex gap-2 items-center">
          <img
            className="mask mask-squircle w-14 h-14 rounded-md border object-cover"
            src={pix}
            alt={`${props?.studentFirstName} ${props?.studentLastName}`}
          />
          <div className="w-[180px]">
            {props?.studentLastName} {props?.studentFirstName}
          </div>
        </div>
      </div>

      {/* Student Grade Display */}
      <div className="w-[100px] border-r pl-2">
        {currentResult?.mark !== undefined ? (
          <>
            {currentResult.mark} -{" "}
            <span className="font-bold text-[12px]">{currentResult.grade}</span>
          </>
        ) : (
          <span className="text-gray-400">N/A</span>
        )}
      </div>

      {/* Attendance Ratio */}
      <div className="w-[100px] border-r">
        <AttendanceRatio props={props} />
      </div>

      {/* Test Score Input */}
      <div className="w-[100px] border-r">
        <input
          className="w-[70px] h-8 outline-none border rounded-md px-2"
          type="number"
          min="0"
          max="40"
          placeholder={
            result?.test4 !== undefined && result?.test4 !== null
              ? result.test4.toString()
              : "0"
          }
          value={test4}
          onChange={(e: any) => {
            const value = e.target.value;
            if (
              value === "" ||
              (parseInt(value) >= 0 && parseInt(value) <= 40)
            ) {
              setTest4(value);
            }
          }}
        />
      </div>

      {/* Examination Score Input */}
      <div className="w-[100px] border-r mb-1">
        <p>
          <span className="text-[10px] font-medium">CBT Score:</span>{" "}
          {computedExamDefault === "NaN" ? "0" : computedExamDefault}
        </p>
        <input
          className="w-[80px] h-8 outline-none border rounded-md px-2"
          type="number"
          min="0"
          max="60"
          placeholder={
            result?.exam !== undefined && result?.exam !== null
              ? result.exam.toString()
              : "0"
          }
          // show the user-typed value if present, otherwise show the latest
          // server value or computed default
          value={exam !== "" ? exam : ""}
          onChange={(e: any) => {
            const value = e.target.value;
            if (value === "" || (Number(value) >= 0 && Number(value) <= 60)) {
              setIsEditingExam(true);
              setExam(value);
            }
          }}
        />
      </div>

      {/* Teacher Comment Input */}
      <div className="w-[200px] border-r">
        <input
          className="w-[95%] h-8 outline-none border rounded-md px-2 text-[11px]"
          type="text"
          placeholder={`${result?.teacherComment || "Add Comment"}`}
          maxLength={100}
          value={teacherComment}
          onChange={(e: any) => setTeacherComment(e.target.value)}
          title="Teacher's comment for this subject"
        />
      </div>

      {/* Submit Button */}
      <div className="w-[180px] relative flex gap-2">
        <Button
          name={loading ? "Loading..." : "Add Score"}
          icon={
            loading && (
              <ClipLoader color="white" size={12} className="absolute" />
            )
          }
          className="pl-4 py-3 w-[85%] bg-black text-white hover:bg-neutral-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={makeGrade}
          disabled={loading || ((!test4 || test4 === "0") && (!exam || exam === "0") && (!teacherComment || teacherComment.trim() === ""))}
        />
        {result && (
          <div 
            onClick={handleDeleteClick}
            className="w-10 h-10 rounded-md bg-red-50 text-red-600 flex items-center justify-center cursor-pointer hover:bg-red-100 transition-colors mt-2"
            title="Remove Score"
          >
            {isDeleting ? <ClipLoader color="red" size={12} /> : "🗑️"}
          </div>
        )}
      </div>

      <ConfirmDeleteModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Remove Grade Score?"
        message={`Are you sure you want to remove the ${subjectInfo?.subjectTitle} score for ${props?.studentFirstName} ${props?.studentLastName}? This action cannot be undone.`}
        loading={isDeleting}
      />
    </div>
  );
};

const AttendanceRatio: FC<iProps> = ({ props }) => {
  const { mainStudentAttendance } = useStudentAttendance(props?._id);

  const calculateAttendanceRatio = () => {
    const attendance = mainStudentAttendance?.data?.attendance;

    if (!attendance || attendance.length === 0) {
      return "0.00";
    }

    const presentCount = attendance.filter(
      (el: any) => el.present === true
    ).length;
    const totalCount = attendance.length;
    const ratio = (presentCount / totalCount) * 100;

    return ratio.toFixed(2);
  };

  return <div>{calculateAttendanceRatio()}%</div>;
};

const SubjectGradeCard = () => {
  const { teacherInfo } = useTeacherInfo();
  const { data } = useSchoolData();
  const { subjectID } = useParams();
  const { subjectInfo } = useSujectInfo(subjectID);
  const { viewClasses } = useViewSchoolClassRM(data?._id);

  const [allScores, setAllScores] = useState<Record<string, any>>({});
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkLoading, setBulkLoading] = useState(false);

  const updateScore = (studentID: string, fields: any) => {
    setAllScores((prev) => ({
      ...prev,
      [studentID]: { ...prev[studentID], ...fields },
    }));
  };

  // Find the class that contains this subject
  const mainClass = viewClasses?.classRooms?.find((el: any) => {
    return el?.classSubjects?.find((subj: any) => subj === subjectID);
  });

  const { oneClass } = useReadOneClassInfo(mainClass?._id);
  const { classStudents } = useClassStudent(oneClass?._id);

  // Sort students by last name
  const sortedStudents =
    classStudents?.students?.sort((a: any, b: any) =>
      a.studentLastName?.localeCompare(b.studentLastName)
    ) || [];

  useEffect(() => {
    if (data?._id) {
      mutate(`api/view-classrooms/`);
    }
  }, [data?._id]);

  const studentsWithInput = sortedStudents.filter((student: any) => {
    const score = allScores[student._id];
    return score && (score.test4 || score.exam || score.teacherComment);
  });

  const handleBulkSave = async () => {
    try {
      setBulkLoading(true);
      
      const promises = studentsWithInput.map(async (student: any) => {
        const score = allScores[student._id];
        return createGradeScore(student._id, {
          subject: subjectInfo?.subjectTitle,
          test4: score.test4 ? parseInt(score.test4) : 0,
          exam: score.exam ? parseInt(score.exam) : 0,
          teacherComment: score.teacherComment || "",
        });
      });

      await Promise.all(promises);
      
      // Refresh all students data
      const mutatePromises = studentsWithInput.map((student: any) => 
        mutate(`api/student-report-card/${student._id}`)
      );
      await Promise.all(mutatePromises);

      toast.success(`Successfully added scores for ${studentsWithInput.length} students`);
      setIsBulkModalOpen(false);
      setBulkLoading(false);
      // Clear inputs that were saved
      setAllScores({});
    } catch (error) {
      setBulkLoading(false);
      toast.error("An error occurred during bulk save.");
      console.error(error);
    }
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={true} />

      <LittleHeader
        name={`Entry ${subjectInfo?.subjectTitle || "Subject"} Grades`}
      />

      <div className="mt-10" />

      <div className="py-6 px-2 border rounded-md min-w-[300px] overflow-x-auto">
        {/* Table Header */}
        <div className="text-gray-600 w-[1180px] flex gap-2 text-[12px] font-medium uppercase mb-10 px-4">
          <div className="w-[100px] border-r">Sequence</div>
          <div className="w-[250px] border-r">Student Info</div>
          <div className="w-[100px] border-r">Student's Grade</div>
          <div className="w-[100px] border-r">Attendance Ratio</div>
          <div className="w-[100px] border-r">Test Score (40)</div>
          <div className="w-[100px] border-r">Exam Score (60)</div>
          <div className="w-[200px] border-r">Teacher Comment</div>
          <div className="w-[180px]">Submit Report</div>
        </div>

        {/* Table Body */}
        <div className="w-[1180px] overflow-hidden">
          {sortedStudents.length > 0 ? (
            sortedStudents.map((student: any, index: number) => (
              <MainStudentRow 
                key={student._id} 
                props={student} 
                i={index} 
                allScores={allScores}
                updateScore={updateScore}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No students enrolled in this class yet
            </div>
          )}
        </div>
      </div>

      {studentsWithInput.length > 0 && (
        <div className="mt-8 flex justify-end pb-10 px-4">
          <Button
            name="Add All Scores"
            onClick={() => setIsBulkModalOpen(true)}
            className="bg-blue-950 text-white hover:bg-blue-900 transition-all font-bold px-10 py-2 rounded-xl shadow-lg hover:shadow-blue-500/30 flex items-center gap-2 text-lg"
            icon={<Save size={20} />}
          />
        </div>
      )}

      <ConfirmBulkSaveModal 
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        onConfirm={handleBulkSave}
        count={studentsWithInput.length}
        loading={bulkLoading}
        message={`This will add grades for all ${studentsWithInput.length} students you have entered scores for. This action will update the report cards for the current session and term.`}
      />
    </div>
  );
};

export default SubjectGradeCard;
