document.title = "View Students for Grading";
import pix from "../../../assets/pix.jpg";
import Button from "../../../components/reUse/Button";
import LittleHeader from "../../../components/static/LittleHeader";
import { FC, useEffect, useState } from "react";
import {
  useSchoolClassRMDetail,
  useSchoolData,
  useSchoolSessionData,
  useStudentAttendance,
  useViewSchoolClassRM,
} from "../../hook/useSchoolAuth";

import { mutate } from "swr";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useReadOneClassInfo } from "../../../pagesForStudents/hooks/useStudentHook";
import ClipLoader from "react-spinners/ClipLoader";

import {
  useClassStudent,
  useStudentGrade,
  useSujectInfo,
  useTeacherInfo,
} from "@/pagesForTeachers/hooks/useTeacher";
import { useOneExamSubjectStudentPerfomance } from "@/pagesForTeachers/hooks/useQuizHook";
import { createGradeScore } from "@/pagesForTeachers/api/teachersAPI";
import { ConfirmBulkSaveModal } from "@/components/modals/ConfirmBulkSaveModal";
import { Save } from "lucide-react";

interface iProps {
  props?: any;
  id?: string;
  data?: any;
  i?: number;
  teacherID?: number;
  allScores?: any;
  updateScore?: (studentID: string, fields: any) => void;
}

const MainStudentRow: FC<iProps> = ({ props, i, data, teacherID, allScores, updateScore }) => {
  const { subjectID } = useParams();

  const { subjectInfo } = useSujectInfo(subjectID);

  const { oneStudentPerformanceExam: oneStudentPerformance } =
    useOneExamSubjectStudentPerfomance(
      subjectID,
      subjectInfo?.examination[subjectInfo?.examination.length - 1]
    );

  const { schoolInfo } = useSchoolSessionData(data?._id);
  const { data: schoolData } = useSchoolData();

  // Force refresh school data on mount to ensure presentTerm is current (not stale cached)
  useEffect(() => {
    mutate(`api/view-school/${schoolData?._id}/seconded-data`);
  }, []);

  const [loading, setLoading] = useState<boolean>(false);

  const { gradeData } = useStudentGrade(props?._id);

  // Use lifted state
  const studentScores = allScores?.[props?._id] || {};

  // Use schoolInfo (freshly fetched per-school session) as primary source of term/session,
  // falling back to schoolData to ensure we always match the CURRENT term's report card entry.
  const currentSession = schoolData?.presentSession || schoolInfo?.[0]?.presentSession;
  const currentTerm = schoolData?.presentTerm || schoolInfo?.[0]?.presentTerm;

  let reportData = gradeData?.reportCard?.find((el: any) => {
    const x = el.classInfo
      ?.trim()
      ?.replace(/\s+/g, " ")
      ?.replace(/\n/g, "")
      .trim();
    const y = `${subjectInfo?.designated} session: ${currentSession}(${currentTerm})`
      ?.trim()
      ?.replace(/\s+/g, " ")
      ?.replace(/\n/g, "")
      .trim();

    return x === y;
  });

  let result = reportData?.result.find((el: any) => {
    return el.subject === subjectInfo?.subjectTitle;
  });

  const [test4, setTest4] = useState<string>(
    studentScores.test4 !== undefined ? studentScores.test4 : ""
  );
  const [exam, setExam] = useState<string>(
    studentScores.exam !== undefined ? studentScores.exam : ""
  );

  // Sync with parent
  useEffect(() => {
    if (updateScore) {
       const rd = readResultData(props);
       const computedExam = rd?.performanceRating ? ((rd.performanceRating / 100) * 60).toFixed(0) : "";
       updateScore(props?._id, { 
         test4, 
         exam,
         computedExam,
         existingTest4: result?.test4,
         existingExam: result?.exam
       });
    }
  }, [test4, exam, result?.test4, result?.exam]);

  // Sync inputs when DB data loads asynchronously after mount
  useEffect(() => {
    if (result) {
      // Use != null so 0 values are correctly set (0 is falsy but a valid score)
      if (result.test4 != null) setTest4(result.test4.toString());
      if (result.exam != null) setExam(result.exam.toString());
    }
  }, [result?.test4, result?.exam]);

  const readResultData = (props: any) => {
    let readData: any = oneStudentPerformance?.find((el: any) => {
      return (
        el.studentName ===
        `${props?.studentFirstName} ${props?.studentLastName}`
      );
    });

    return readData;
  };

  const makeGrade = async () => {
    try {
      if (!test4 && !exam) {
        toast.error("Please enter at least one score");
        return;
      }

      setLoading(true);
      const res = await createGradeScore(props?._id, {
        subject: subjectInfo?.subjectTitle,
        test4: test4 ? parseInt(test4) : result?.test4 || 0,
        exam: exam ? parseInt(exam) : result?.exam || 0,
      });

      if (res.status === 200) {
        await mutate(`api/student-report-card/${props?._id}`);
        toast.success("Grade updated successfully");

        // Refresh the data
        mutate(`api/view-student-grade/${props?._id}`);
      } else {
        toast.error("Failed to update grade");
      }
    } catch (error: any) {
      toast.error("An error occurred while updating grade");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  console.log("Result: ", gradeData?.reportCard);

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
            src={pix}
          />

          <div className="w-[180px] ">
            {" "}
            {props?.studentFirstName} {props?.studentLastName}
          </div>
        </div>
      </div>
      <div className="w-[100px] border-r pl-2">
        {result?.mark} /{result?.score} -{" "}
        <span className="font-bold text-[12px]">{result?.grade}</span>
      </div>
      <div className="w-[100px] border-r">
        <AttendanceRatio props={props} />
      </div>

      <div className="w-[100px] border-r">
        <input
          className="w-[70px] h-8 outline-none border rounded-md px-2"
          type="number"
          min="0"
          max="40"
          placeholder={`${
            result?.test4 !== undefined ? result?.test4 : "Test /40"
          }`}
          value={test4}
          onChange={(e: any) => {
            const value = parseInt(e.target.value);
            if (!isNaN(value) && value >= 0 && value <= 40) {
              setTest4(e.target.value);
            }
          }}
        />
      </div>

      <div className="w-[100px] border-r">
        <input
          className="w-[80px] h-8 outline-none border rounded-md px-2"
          type="number"
          min="0"
          max="60"
          placeholder={`${
            readResultData(props)?.performanceRating
              ? ((readResultData(props)?.performanceRating / 100) * 60).toFixed(
                  0
                )
              : result?.exam !== undefined
              ? result?.exam
              : "Exam /60"
          }`}
          value={exam}
          onChange={(e: any) => {
            const value = parseInt(e.target.value);
            if (!isNaN(value) && value >= 0 && value <= 60) {
              setExam(e.target.value);
            } else if (readResultData(props)) {
              const calculatedScore =
                (readResultData(props)?.performanceRating / 100) * 60;
              setExam(calculatedScore.toFixed(0));
            }
          }}
        />
      </div>

      <div className="w-[180px] border-r relative">
        <Button
          name={loading ? "Loading" : "Add Score"}
          icon={
            loading && (
              <ClipLoader
                color="white"
                size={12}
                className="py-0 my-0 absolute bottom-6 z-10 left-10"
              />
            )
          }
          className="pl-4 py-3 w-[85%] bg-black text-white  hover:bg-neutral-800 transition-all duration-300"
          onClick={makeGrade}
        />
      </div>
    </div>
  );
};

const AttendanceRatio: FC<iProps> = ({ props }) => {
  const { mainStudentAttendance } = useStudentAttendance(props?._id);

  return (
    <div>
      {(mainStudentAttendance?.data?.attendance?.filter(
        (el: any) => el.present === true
      ).length /
        mainStudentAttendance?.data?.attendance?.length) *
      100 ? (
        <div>
          {(
            (mainStudentAttendance?.data?.attendance?.filter(
              (el: any) => el.present === true
            ).length /
              mainStudentAttendance?.data?.attendance?.length) *
            100
          ).toFixed(2)}
          %
        </div>
      ) : (
        <p>0%</p>
      )}
    </div>
  );
};

const AdminSubjectGradeCard = () => {
  const { data } = useSchoolData();
  const { teacherInfo } = useTeacherInfo();
  const { subjectID } = useParams();
  const { subjectInfo } = useSujectInfo(subjectID);

  const [allScores, setAllScores] = useState<Record<string, any>>({});
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkLoading, setBulkLoading] = useState(false);

  const updateScore = (studentID: string, fields: any) => {
    setAllScores((prev) => ({
      ...prev,
      [studentID]: { ...prev[studentID], ...fields },
    }));
  };

  const { classroom } = useSchoolClassRMDetail(subjectInfo?.subjectClassID);
  const { viewClasses } = useViewSchoolClassRM(data?._id);

  let mainClass = viewClasses?.classRooms?.find((el: any) => {
    return el?.classSubjects?.find((el: any) => {
      return el === subjectID;
    });
  });

  const { oneClass } = useReadOneClassInfo(mainClass?._id);
  const { classStudents } = useClassStudent(oneClass?._id!);
  const allStudents = classStudents?.students;
  const sortedStudents = allStudents?.sort((a, b) =>
    a.studentFirstName?.localeCompare(b.studentFirstName)
  );

  useEffect(() => {
    mutate(`api/view-classrooms/`);
  }, [teacherInfo, subjectInfo, viewClasses]);

  const studentsWithInput = sortedStudents?.filter((student: any) => {
    const score = allScores[student._id];
    return score && (score.test4 || score.exam);
  }) || [];

  const handleBulkSave = async () => {
    try {
      setBulkLoading(true);
      
      const promises = sortedStudents.map(async (student: any) => {
        const score = allScores[student._id] || {};

        const test4Score = score.test4 && score.test4 !== "" ? parseInt(score.test4) : score.existingTest4 || 0;
        
        let examScore = 0;
        if (score.exam && score.exam !== "") {
          examScore = parseInt(score.exam, 10);
        } else if (score.existingExam !== undefined && score.existingExam !== null && score.existingExam !== 0) {
          examScore = score.existingExam;
        } else if (score.computedExam !== undefined && score.computedExam !== "" && !isNaN(Number(score.computedExam))) {
          examScore = Math.round(Number(score.computedExam));
        }

        return createGradeScore(student._id, {
          subject: subjectInfo?.subjectTitle,
          test4: test4Score,
          exam: examScore,
        });
      });

      await Promise.all(promises);
      
      const mutatePromises = sortedStudents.map((student: any) => 
        mutate(`api/student-report-card/${student._id}`)
      );
      await Promise.all(mutatePromises);

      toast.success(`Successfully added scores for ${sortedStudents.length} students`);
      setIsBulkModalOpen(false);
      setBulkLoading(false);
      setAllScores({});
    } catch (error) {
      setBulkLoading(false);
      toast.error("An error occurred during bulk save.");
      console.error(error);
    }
  };

  return (
    <div className="">
      <Toaster position="top-center" reverseOrder={true} />
      {/* header */}
      <div className="mb-0" />
      <LittleHeader name={`Entry ${subjectInfo?.subjectTitle} Grades`} />
      <div className="mt-10" />

      <div className="flex w-full justify-end"></div>
      <div className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden ">
        <div className="text-[gray] w-[1300px] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4">
          <div className="w-[100px] border-r">Sequence</div>
          <div className="w-[250px] border-r">student Info</div>
          <div className="w-[100px] border-r">Student's Grade</div>
          <div className="w-[100px] border-r">Student's Attendance Ratio</div>

          <div className="w-[100px] border-r">
            General Test
            <br />
            Score
          </div>
          <div className="w-[100px] border-r">Examination Score</div>

          <div className="w-[180px] border-r">Submit Report</div>
        </div>

        <div className=" w-[1300px] overflow-hidden">
          {sortedStudents?.length > 0 ? (
            <div>
              {sortedStudents?.map((props: any, i: number) => (
                <div key={props}>
                  <MainStudentRow
                    props={props}
                    i={i}
                    data={data}
                    teacherID={oneClass?.teacherID}
                    allScores={allScores}
                    updateScore={updateScore}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div>No student yet</div>
          )}
        </div>
      </div>

      {sortedStudents?.length > 0 && (
        <div className="mt-8 flex justify-end pb-10 px-4">
          <Button
            name="Add All Scores"
            onClick={() => setIsBulkModalOpen(true)}
            className="bg-neutral-950 text-white hover:bg-neutral-900 transition-all font-bold px-10 py-2 rounded-xl shadow-lg hover:shadow-neutral-500/30 flex items-center gap-2 text-lg"
            icon={<Save size={20} />}
          />
        </div>
      )}

      <ConfirmBulkSaveModal 
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        onConfirm={handleBulkSave}
        count={sortedStudents?.length || 0}
        loading={bulkLoading}
        message={`This will add grades for all ${sortedStudents?.length || 0} students.`}
      />
    </div>
  );
};

export default AdminSubjectGradeCard;
