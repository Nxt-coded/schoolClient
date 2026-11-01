document.title = "View  Result History";
import pix from "../../../assets/pix.jpg";
import LittleHeader from "../../../components/static/LittleHeader";
import { FC, useState } from "react";
import {
  useSchoolData,
  useSchoolSessionData,
  useStudentAttendance,
  useViewSessionTerm,
  useViewStudentHistory,
} from "../../../pages/hook/useSchoolAuth";

import { Toaster } from "react-hot-toast";
import {
  useReadMyClassInfoData,
  useReadOneClassInfo,
  useStudentInfoData,
} from "../../../pagesForStudents/hooks/useStudentHook";
import lodash from "lodash";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  useClassAcademicHistory,
  useClassSubject,
  useStudentGrade,
  useTeacherInfo,
} from "../../../pagesForTeachers/hooks/useTeacher";
import { FaCheckDouble } from "react-icons/fa6";
import {
  createStudentHistory,
  deleteStudentHistory,
} from "@/pages/api/schoolAPIs";

interface iProps {
  props?: any;
  id?: string;
  el?: any;
  data?: any;
  i?: number;
  stateValue?: string;
  teacherInfo?: any;
  getClass?: any;
  mutate?: any;
}

const SubjectScore: FC<iProps> = ({ props }) => {
  return (
    <div className="w-[200px] border-r-2 border-blue-950 ">
      <p>{props?.subject}</p>
      <div className="pl-1 flex gap-1 mt-2 text-[12px] ">
        <p className="w-[40px] border-r">{props?.test4 ? props?.test4 : 0}</p>
        <p className="w-[45px] border-r">{props?.exam ? props?.exam : 0}</p>
        <p className="w-[45px] font-bold border-r">
          {props?.mark ? props?.mark : 0}
        </p>
        <p className="w-[45px] font-bold">
          {props?.grade ? props?.grade : "Nill"}
        </p>
      </div>
    </div>
  );
};

const MainStudentRow: FC<iProps> = ({ props, i, mutate }) => {
  const { studentID } = useParams();
  console.log("props", props);

  return (
    <div
      className={`w-full flex items-center gap-2 text-[12px] font-medium  h-16 px-4 my-2  overflow-hidden ${
        i % 2 === 0 ? "bg-slate-50" : "bg-white"
      }`}
    >
      <div className={`w-[150px] border-r font-semibold flex flex-col`}>
        <p className="text-[18px]">{props?.classInfo.split(" session:")[0]}</p>

        <div>
          <p className="gap-1 flex items-center  font-[400] -mt-1 text-[10px]">
            {props?.term} <div className="h-1 w-1 rounded-full bg-blue-950" />{" "}
            {props?.session}
          </p>
        </div>
      </div>
      {/* name */}

      {/* <div className="uppercase">
        {term === "1st-Term" ? (
          props?.feesPaid1st ? (
            <div className="w-[100px] border-r">Paid</div>
          ) : (
            <div className="w-[100px] border-r text-red-500 uppercase">
              Unpaid
            </div>
          )
        ) : term === "2nd-Term" ? (
          props?.feesPaid2nd ? (
            <div className="w-[100px] border-r">Paid</div>
          ) : (
            <div className="w-[100px] border-r text-red-500">UnPaid</div>
          )
        ) : term === "3rd-Term" ? (
          props?.feesPaid3rd ? (
            <div className="w-[100px] border-r">Paid</div>
          ) : (
            <div className="w-[100px] border-r text-red-500">UnPaid</div>
          )
        ) : null}
      </div> */}

      <div className="w-[100px] border-r">
        <AttendanceRatio props={props} />
      </div>

      <div className="w-[100px] border-r">{props?.totalPoints}</div>
      <div className="w-[100px] border-r text-[18px]">{props?.mainGrade}</div>

      <div className={`  border-r items-center flex`}>
        <div className="flex gap-4 ">
          {lodash
            .sortBy(props?.results, "subject")
            ?.map((el: any, i: number) => (
              <SubjectScore props={el} el={el} key={i} />
            ))}
        </div>
      </div>
      <div className="w-2 border-r"></div>
      <div className="w-[300px] border-r">{props?.classTeacherComment}</div>
      <div className="w-[300px] border-r">{props?.adminComment}</div>
      <div
        className="w-[180px] border-r"
        onClick={() => {
          //   valueStored.push(props?._id);
        }}
      >
        <Link
          to={`/print-students-historical-report-card/${studentID}/${props?._id}`}
        >
          <label className="py-3 px-1 w-[85%] border rounded-md bg-blue-950 text-[12px] text-white transition-all duration-300 hover:scale-105 cursor-pointer inline-block text-center">
            Print Result
          </label>
        </Link>
      </div>
      <div
        className="w-[180px] border-r"
        onClick={() => {
          //   valueStored.push(props?._id);
        }}
      >
        <label
          className="py-3 px-1 w-[85%] border rounded-md bg-red-500 text-[12px] text-white transition-all duration-300 hover:scale-105 cursor-pointer inline-block text-center"
          onClick={() => {
            deleteStudentHistory(studentID, props?._id).then((res) => {
              mutate(
                async (currentData: any) => {
                  // Filter out the deleted result from the current data
                  const updatedData = (currentData || []).filter(
                    (item: any) => item._id !== props?._id
                  );
                  return updatedData;
                },
                { revalidate: true } // Revalidate to ensure the cache is updated
              );
            });
          }}
        >
          Delete Result
        </label>
      </div>
    </div>
  );
};

const AttendanceRatio: FC<iProps> = ({ props }) => {
  const { mainStudentAttendance } = useStudentAttendance(props?._id);

  return (
    <div>
      {isNaN(
        (mainStudentAttendance?.data?.attendance?.filter(
          (el: any) => el.present === true
        ).length /
          mainStudentAttendance?.data?.attendance?.length) *
          100
      )
        ? 0
        : (
            (mainStudentAttendance?.data?.attendance?.filter(
              (el: any) => el.present === true
            ).length /
              mainStudentAttendance?.data?.attendance?.length) *
            100
          ).toFixed(2)}
      %
    </div>
  );
};

const SubjectMap: FC<iProps> = ({ props }) => {
  return (
    <div className="w-[200px] border-r ">
      <p className="pl-3 font-bold text-[15px]">{props?.subjectTitle}</p>
      <div className="pl-1 flex gap-1 mt-2 text-[10px] ">
        <p className="w-[40px] border-r">CA</p>
        <p className="w-[45px] border-r">Exam</p>
        <p className="w-[45px] ">Total</p>
        <p className="w-[45px] ">Grade</p>
      </div>
    </div>
  );
};

const StudentResultsDetail = () => {
  const { teacherInfo } = useTeacherInfo();
  const { termID, ID, term, session, studentID } = useParams();
  const { studentResults: resultArray, mutate } =
    useViewStudentHistory(studentID);
  const { pathname } = useLocation();

  const { sessionTermData } = useViewSessionTerm(termID);
  document.title = `Viewing Historical Result Query`;

  const getResult = sessionTermData?.data?.classResult?.find((el: any) => {
    return el._id === ID;
  });
  const { data: schoolInfo } = useSchoolData();
  const { classAcademicHistory } = useClassAcademicHistory(getResult?._id);
  const { subjectData } = useClassSubject(classAcademicHistory?._id);
  const { studentInfoData } = useStudentInfoData(studentID);

  let data = lodash.groupBy(classAcademicHistory?.classHistory, "session");
  const dataX = Object.values(data).flat();

  const readStudent = dataX.find((el: any) => {
    return (
      el.term === term.replace("-", " ") &&
      el.session === session.replace("-", "/")
    );
  });
  const [showForm, setShowForm] = useState(false);
  // const [resultArray, setResultArray] = useState([]);
  const [resultArray1, setResultArray1] = useState([]);

  const [formData, setFormData] = useState({
    classInfo: "",
    term: "",
    session: "",
    studentAttendance: "",
    totalPoints: "",
    classTeacherComment: "",
    adminComment: "",
    mainGrade: "",
    results: [
      {
        subject: "",
        test1: "",

        exam: "",
        grade: "",
        mark: 0,
      },
    ],
  });

  // const {pathname} = useLocation()


  return (
    <div className="">
      <Toaster position="top-center" reverseOrder={true} />
      {/* header */}
      <div className="mb-0" />
      {!pathname?.includes("view-students/student-details") && (
        <LittleHeader name={`Viewing Student's Historical Result Query`} />
      )}

      <div>
        Quering{" "}
        <span className="font-[600] italic">
          {studentInfoData?.studentFirstName} {" "}
          {studentInfoData?.studentLastName}
        </span>{" "}
        historical Results
      </div>
      <p className="text-[22px] text-black/40 font-[600]">
        <span className="text-[18px] font-[400]">EnrollmentID:</span>
        {studentInfoData?.enrollmentID}
      </p>

      <div className="mt-10" />

      <div className="flex w-full justify-end"></div>
      <div className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden ">
        <div
          className={`text-[gray] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4  min-w-[2000px]`}
          style={{
            width: `${
              1372 +
              (resultArray && resultArray[0]?.results?.length > 0
                ? resultArray[0].results.length * 260
                : 4 * 260)
            }px`,
          }}
        >
          <div className="w-[150px] border-r">Class Info/Term</div>
          {/* <div className="w-[100px] border-r">
            SchoolFee <br />
            Info
          </div> */}
          <div className="w-[100px] border-r">Student's Attendance Ratio</div>

          <div className="w-[100px] border-r">Total Points</div>
          <div className="w-[100px] border-r">Grade</div>

          <div className={` border-r`}>
            <div
              className=" flex flex-col "
              style={
                {
                  // width: `${resultArray[0]?.results?.length * 260}px`,
                }
              }
            >
              <div className="mb-2 font-bold  text-blue-950">Grades</div>
              <div className="flex gap-4  ">
                {lodash
                  .sortBy(resultArray && resultArray[0]?.results, "subject")
                  ?.map((props: any, i: number) => (
                    <SubjectMap key={i} props={props} />
                  ))}
              </div>
            </div>
          </div>
          <div className="w-[300px] border-r">Class Teacher's Comment</div>
          <div className="w-[300px] border-r">
            Principal's Teacher's Comment
          </div>
          <div className="w-[180px] border-r">Print Result</div>
          <div className="w-[180px] border-r">Delete Result</div>
        </div>

        <div
          className={`overflow-hidden w-[2000px] `}
          style={{
            width: `${
              1372 +
              (resultArray && resultArray[0]?.results?.length > 0
                ? resultArray[0].results.length * 260
                : 4 * 260)
            }px`,
          }}
        >
          {resultArray?.length > 0 ? (
            <div>
              {resultArray &&
                resultArray?.map((props: any, i: number) => {
                  return (
                    <div key={i}>
                      <MainStudentRow
                        props={props}
                        i={i}
                        mutate={mutate}
                        //   getClass={getResult?.className}
                      />
                      {}
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="flex items-center justify-center flex-col w-[20%] font-semibold">
              <FaCheckDouble className="my-2" />
              <p>No student Result Data Captured yet</p>
            </div>
          )}
        </div>
      </div>

      {!showForm &&
        !pathname.includes("viewing") &&
        !pathname?.includes("view-students/student-details") && (
          <div className="flex">
            <p
              className="font-[400] border rounded-md mt-4 px-4 py-2 bg-blue-950 text-white cursor-pointer hover:bg-blue-800 uppercase text-[12px] "
              onClick={() => setShowForm(true)}
            >
              Click To Add
            </p>
          </div>
        )}
      {showForm && (
        <EnterResult
          setShowForm={setShowForm}
          formData={formData}
          setFormData={setFormData}
          setResultArray={setResultArray1}
          schoolInfo={schoolInfo?._id}
          studentID={studentID}
          mutate={mutate}
        />
      )}
    </div>
  );
};

export default StudentResultsDetail;

const EnterResult: React.FC<any> = ({
  setShowForm,
  formData,
  setFormData,
  setResultArray,
  studentID,
  schoolInfo,
  mutate,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    const { name, value } = e.target;

    if (index !== undefined) {
      const updatedResults = [...formData.results];
      updatedResults[index][name] = value;
      setFormData({ ...formData, results: updatedResults });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddSubject = () => {
    setFormData({
      ...formData,
      results: [
        ...formData.results,
        { subject: "", test1: "", exam: "", grade: "", mark: 0 },
      ],
    });
  };

  const handleSubmit = () => {
    const updatedResults = formData.results.map((result) => {
      const totalScore = parseFloat(result.test1) + parseFloat(result.exam);
      const grade =
        totalScore >= 0 && totalScore <= 39
          ? "F9"
          : totalScore >= 39 && totalScore <= 44
          ? "E8"
          : totalScore >= 44 && totalScore <= 49
          ? "D7"
          : totalScore >= 49 && totalScore <= 54
          ? "C6"
          : totalScore >= 54 && totalScore <= 59
          ? "C5"
          : totalScore >= 59 && totalScore <= 64
          ? "C4"
          : totalScore >= 64 && totalScore <= 69
          ? "B3"
          : totalScore >= 69 && totalScore <= 74
          ? "B2"
          : totalScore >= 74 && totalScore <= 100
          ? "A1"
          : null;

      return { ...result, grade, mark: totalScore };
    });

    const totalPoints =
      updatedResults.reduce((sum, result) => sum + result.mark, 0) /
      updatedResults.length;

    const mainGrade =
      totalPoints >= 0 && totalPoints <= 39
        ? "F9"
        : totalPoints >= 40 && totalPoints <= 44
        ? "E8"
        : totalPoints >= 45 && totalPoints <= 49
        ? "D7"
        : totalPoints >= 50 && totalPoints <= 54
        ? "C6"
        : totalPoints >= 55 && totalPoints <= 59
        ? "C5"
        : totalPoints >= 60 && totalPoints <= 64
        ? "C4"
        : totalPoints >= 65 && totalPoints <= 69
        ? "B3"
        : totalPoints >= 70 && totalPoints <= 74
        ? "B2"
        : totalPoints >= 75 && totalPoints <= 100
        ? "A1"
        : null;

    let x =
      totalPoints >= 0 && totalPoints <= 5
        ? "This is a very poor result."
        : totalPoints >= 6 && totalPoints <= 11
        ? "This result is poor; it's not satisfactory."
        : totalPoints >= 11 && totalPoints <= 15
        ? "Below average; needs significant improvement."
        : totalPoints >= 16 && totalPoints <= 21
        ? "Below average; more effort required."
        : totalPoints >= 21 && totalPoints <= 25
        ? "Fair but not satisfactory; strive harder."
        : totalPoints >= 26 && totalPoints <= 31
        ? "Fair performance; potential for improvement."
        : totalPoints >= 31 && totalPoints <= 35
        ? "Average; a steady effort is needed."
        : totalPoints >= 36 && totalPoints <= 41
        ? "Average; showing gradual improvement."
        : totalPoints >= 41 && totalPoints <= 45
        ? "Slightly above average; keep it up."
        : totalPoints >= 46 && totalPoints <= 51
        ? "Decent work; shows potential."
        : totalPoints >= 51 && totalPoints <= 55
        ? "Passable; satisfactory effort."
        : totalPoints >= 56 && totalPoints <= 61
        ? "Satisfactory; good progress."
        : totalPoints >= 61 && totalPoints <= 65
        ? "Good work; keep striving for excellence."
        : totalPoints >= 66 && totalPoints <= 71
        ? "Commendable effort; very good."
        : totalPoints >= 71 && totalPoints <= 75
        ? "Very good; consistent effort is visible."
        : totalPoints >= 76 && totalPoints <= 81
        ? "Excellent performance; well done!"
        : totalPoints >= 81 && totalPoints <= 85
        ? "Exceptional result; keep up the great work!"
        : totalPoints >= 86 && totalPoints <= 91
        ? "Outstanding achievement; impressive work!"
        : totalPoints >= 91 && totalPoints <= 95
        ? "Brilliant performance; you’re a star!"
        : totalPoints >= 96 && totalPoints <= 100
        ? "Outstanding achievement; impressive work!"
        : ``;

    let xx =
      totalPoints >= 0 && totalPoints <= 5
        ? "The submission demonstrates a lack of understanding of the topic. Please see me for guidance"
        : totalPoints >= 6 && totalPoints <= 11
        ? "Very minimal effort is evident in the work. It's essential to review the material thoroughly."
        : totalPoints >= 11 && totalPoints <= 15
        ? "This effort does not meet the basic requirements. Please focus on the foundational concepts."
        : totalPoints >= 16 && totalPoints <= 21
        ? "The response is incomplete and lacks critical understanding. Improvement is needed in future submissions."
        : totalPoints >= 21 && totalPoints <= 25
        ? "Some attempt is evident, but significant gaps in understanding remain. More effort is required."
        : totalPoints >= 26 && totalPoints <= 31
        ? "The work shows minimal understanding of the topic. Focus on building your foundational knowledge."
        : totalPoints >= 31 && totalPoints <= 35
        ? "A basic attempt is made, but it falls short of expectations. Review the feedback to improve"
        : totalPoints >= 36 && totalPoints <= 41
        ? "You are starting to grasp the material, but more depth and accuracy are needed."
        : totalPoints >= 41 && totalPoints <= 45
        ? "An acceptable effort, but there is room for improvement in clarity and depth"
        : totalPoints >= 46 && totalPoints <= 51
        ? "Some understanding is demonstrated, but key concepts are missing or incorrect."
        : totalPoints >= 51 && totalPoints <= 55
        ? "You are making progress but need to develop your analysis further to meet the standard"
        : totalPoints >= 56 && totalPoints <= 61
        ? "A decent attempt that meets some expectations but lacks polish and depth in certain areas"
        : totalPoints >= 61 && totalPoints <= 65
        ? "Good work; keep striving for excellence."
        : totalPoints >= 66 && totalPoints <= 71
        ? "A solid understanding is evident, though there are areas to refine."
        : totalPoints >= 71 && totalPoints <= 75
        ? "This work meets expectations and demonstrates clear effort. Great job, but there's room for more depth."
        : totalPoints >= 76 && totalPoints <= 81
        ? "Strong work overall! A little more attention to detail could make it exceptional!"
        : totalPoints >= 81 && totalPoints <= 85
        ? "Well done! You have a good grasp of the material. Aim for more critical analysis next time!"
        : totalPoints >= 86 && totalPoints <= 91
        ? "Excellent work! You’ve exceeded expectations. Keep up the fantastic effort!"
        : totalPoints >= 91 && totalPoints <= 95
        ? "Outstanding! Your understanding and presentation are impressive. A near-perfect submission!"
        : totalPoints >= 96 && totalPoints <= 100
        ? "Perfect! Flawless work that reflects deep understanding and careful attention to detail. Congratulation!"
        : ``;

    const updatedFormData = {
      ...formData,
      totalPoints: totalPoints.toFixed(2),
      mainGrade,
      results: updatedResults,
      classTeacherComment: x,
      adminComment: xx,
    };

    setResultArray((prev) => [...prev, updatedFormData]);
    createStudentHistory(schoolInfo, studentID, updatedFormData).then((res) => {
      // mutate(`api/view-student-historical-result/${studentID}`);
      mutate(
        async (currentData: any) => {
          const updatedData = [...(currentData || []), updatedFormData];
          return updatedData;
        },
        { revalidate: true }
      );
    });
    setShowForm(false);
  };

  return (
    <div className="py-6 px-2 min-w-[300px] overflow-y-hidden ">
      <div className="p-4 border rounded-md bg-gray-100 ">
        <h3 className="text-lg font-bold mb-4">Add Student Result</h3>
        <div className="grid gap-4 grid-col-1 xl:grid-cols-3">
          <div className="mb-4">
            <label className="block font-semibold">Class Info</label>
            <input
              type="text"
              name="classInfo"
              value={formData.classInfo}
              onChange={handleInputChange}
              className="w-full border rounded-md px-2 py-1 outline-none bg-white"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Term</label>
            <input
              type="text"
              name="term"
              value={formData.term}
              onChange={handleInputChange}
              className="w-full border rounded-md px-2 py-1 outline-none bg-white"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Session</label>
            <input
              type="text"
              name="session"
              value={formData.session}
              onChange={handleInputChange}
              className="w-full border rounded-md px-2 py-1 outline-none bg-white"
            />
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-bold mt-5 uppercase">Subjects Field</h4>
          {formData.results.map((result, index) => (
            <div
              key={index}
              className="mb-2 grid gap-4 grid-col-1 xl:grid-cols-3"
            >
              <div>
                <label className="block font-[200] text-[14px] mt-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={result.subject}
                  onChange={(e) => handleInputChange(e, index)}
                  className="w-full border rounded-md px-2 py-1 outline-none "
                />
              </div>
              <div>
                <label className="block font-[200] text-[14px] mt-2">CA</label>
                <input
                  type="number"
                  name="test1"
                  placeholder="CA score"
                  value={result.test1}
                  onChange={(e) => handleInputChange(e, index)}
                  className="w-full border rounded-md px-2 py-1 outline-none "
                />
              </div>
              <div>
                <label className="block font-[200] text-[14px] mt-2">
                  Exams
                </label>
                <input
                  type="number"
                  name="exam"
                  placeholder="Exam score"
                  value={result.exam}
                  onChange={(e) => handleInputChange(e, index)}
                  className="w-full border rounded-md px-2 py-1 outline-none "
                />
              </div>
            </div>
          ))}
          <button
            onClick={handleAddSubject}
            className="px-4 py-2 bg-blue-950 text-white rounded-md uppercase font-[500] text-[14px] mt-5"
          >
            Add Another Subject
          </button>
        </div>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-500 text-white rounded-md uppercase font-[500] text-[14px]"
        >
          Submit
        </button>
        <button
          onClick={() => setShowForm(false)}
          className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md uppercase font-[500] text-[14px]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
