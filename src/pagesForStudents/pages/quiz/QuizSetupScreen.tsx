import pix from "../../../assets/pix.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdPlayCircle } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import LittleHeader from "../../../components/layout/LittleHeader";
import {
  useExamination,
  useMidTest,
  useSujectQuiz,
} from "../../../pagesForTeachers/hooks/useTeacher";
import { useStudentInfo } from "../../hooks/useStudentHook";
import { useState, useEffect } from "react";
import _ from "lodash";
import { GoGoal } from "react-icons/go";

const QuizSetupScreen = () => {
  const { subjectID } = useParams();
  const navigate = useNavigate();
  const { studentInfo } = useStudentInfo();
  const { subjectQuiz } = useSujectQuiz(subjectID!);
  const { examination } = useExamination(subjectID!);

  const { midTest } = useMidTest(subjectID!);
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);

  const [loadingTest, setLoadingTest] = useState<boolean>(false);

  const handleViewRecords = () => {
    if (studentInfo && studentInfo._id) {
      navigate(`/quiz-record/${studentInfo._id}`);
    } else {
      alert("Student ID not found!");
    }
  };

  const handleQuizCompleted = (quizId: string) => {
    setCompletedQuizzes((prev) => [...prev, quizId]);
  };

  let readQuiz = _.filter(subjectQuiz?.quiz, (el: any) => el.status === "quiz");
console.log(subjectQuiz?.quiz)

  return (
    <div className="text-blue-950 relative">
      <LittleHeader name={`Viewing ${subjectQuiz?.subjectTitle} Quiz`} />

      <div className="mt-10" />

      <div>
        {examination?.startExam ? (
          <div>
            <div className="border p-6 rounded-md min-h-[300px] flex flex-col relative overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="absolute top-0 right-0 text-[200px] opacity-5 font-bold text-red-300">
                {1}
              </div>
              <div className="mt-4 text-center relative bottom-4"></div>

              <div className="flex justify-between items-center">
                <div className="flex flex-col ">
                  <p className="font-semibold italicmt-0 text-[12px]">
                    {examination?.session}
                  </p>
                  <p className="font-bold text-[20px]">
                    {examination?.term} {examination?.subjectTitle}
                  </p>
                </div>
                <Link
                  to={`/examination/details/${examination?._id}`}
                  onClick={() => {
                    localStorage.removeItem("countdown");
                  }}
                >
                  <MdPlayCircle
                    size={80}
                    className="opacity-60 text-red-600 hover:text-red-400 transition-all duration-300"
                  />
                </Link>
              </div>

              <div className="flex flex-col mb-3">
                <div className="flex">
                  <p className="px-4 py-1 rounded-md text-[12px] border bg-blue-50">
                    Examination
                  </p>
                </div>
                <p className="font-semibold text-[12px] mt-2">
                  {/* {new Date(examination?.createdAt).toLocaleDateString()} */}
                </p>
              </div>

              <div>
                <p className="text-[14px] my-5 italic">
                  Students can't access this Examination Questions yet, <br />{" "}
                  change the accessibility of students to take test!{" "}
                </p>
              </div>

              <div className="flex-1" />

              <div className="flex justify-between text-[13px]">
                <div>
                  Questions:{" "}
                  <span className="font-bold">
                    {examination?.quiz?.question
                      ? examination?.quiz?.question.length
                      : 0}
                  </span>
                </div>
                <div>
                  Mark/Question:{" "}
                  <span className="font-bold">
                    {examination?.quiz?.instruction
                      ? examination?.quiz?.instruction.mark
                      : 0}
                  </span>
                </div>
              </div>
              <div className="text-[12px] mt-2 font-bold">
                Instruction:{" "}
                <span className="font-normal">
                  {examination?.quiz?.instruction?.instruction
                    ? `${examination?.quiz?.instruction.instruction}`.slice(
                        0,
                        70
                      ) + "..."
                    : "..."}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div>Examination isn't out yet</div>
        )}
      </div>

      <div>
        {midTest?.startMidTest ? (
          <div className="mt-10 bg-slate-50">
            {midTest && (
              <div className="">
                <div className=" py-8 border p-6 rounded-md min-h-[300px] flex flex-col relative overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <div className="absolute top-0 right-0 text-[200px] opacity-5 font-bold text-red-300">
                    {1}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex flex-col ">
                      <p className="font-semibold italicmt-0 text-[12px]">
                        {midTest?.session}
                      </p>
                      <p className="font-bold text-[20px]">
                        {" "}
                        {midTest?.subjectTitle}
                      </p>
                    </div>
                    <Link
                      to={`/mid-test/details/${subjectID}/${midTest?._id}`}
                      onClick={() => {
                        localStorage.removeItem("countdown");
                      }}
                    >
                      <MdPlayCircle
                        size={80}
                        className="opacity-60 text-red-600 hover:text-red-400 transition-all duration-300"
                      />
                    </Link>
                  </div>

                  <div className="flex flex-col mb-3">
                    <div className="flex">
                      <p className="px-4 tracking-widest font-semibold capitalize py-1 rounded-md text-[12px] border bg-purple-200">
                        {midTest?.term} mid Term Test
                      </p>
                    </div>
                    <p className="font-semibold text-[12px] mt-2">
                      {/* {new Date(midTest?.createdAt).toLocaleDateString()} */}
                    </p>
                  </div>

                  <div>
                    <p className="text-[14px] my-5 italic">
                      Students can't access this midTest Questions yet, <br />{" "}
                      change the accessibility of students to take test!{" "}
                    </p>
                  </div>

                  <div className="flex-1" />

                  <div className="flex justify-between text-[13px]">
                    <div>
                      Questions:{" "}
                      <span className="font-bold">
                        {midTest?.quiz?.question
                          ? midTest?.quiz?.question.length
                          : 0}
                      </span>
                    </div>
                    <div>
                      Mark/Question:{" "}
                      <span className="font-bold">
                        {midTest?.quiz?.instruction
                          ? midTest?.quiz?.instruction.mark
                          : 0}
                      </span>
                    </div>
                  </div>
                  <div className="text-[14px] mt-2 font-bold">
                    Instruction:{" "}
                    <span className="font-normal line-clamp-3">
                      {/* {midTest?.quiz?.instruction?.instruction
                    ? `${midTest?.quiz?.instruction.instruction}`.slice(0, 70) +
                      "..."
                    : "..."} */}

                      {midTest?.quiz?.instruction.instruction}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>Mid Test isn't out yet</div>
        )}
      </div>

      <div className="my-10">
        <hr />
      </div>

      <div className="mb-16 flex justify-between items-center ">
        <p>View Test</p>
        <div
          className="font-bold text-blue-550 cursor-pointer"
          onClick={handleViewRecords}
        >
          Test Record
        </div>
      </div>

      {subjectQuiz?.quiz?.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
          {readQuiz
            ?.filter((quiz: any) => !completedQuizzes.includes(quiz._id))
            .map((props: any, i: number) => (
              <div key={i}>
                <div className="border p-4 rounded-md h-[270px] flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 text-[300px] opacity-5 font-bold">
                    {i + 1}
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold mt-0 text-[20px] ">
                      {subjectQuiz?.subjectTitle} Test {i + 1}
                    </p>
                    <Link
                      to={`/quiz/details/${props._id}`}
                      onClick={() => {
                        localStorage.removeItem("countdown");
                      }}
                    >
                      <MdPlayCircle
                        size={90}
                        className="rotate-0 opacity-60 text-red-600 hover:text-red-400 transition-all duration-300 absolute right-0 top-2"
                        onClick={() => handleQuizCompleted(props._id)}
                      />
                    </Link>
                  </div>

                  <div className="flex">
                    <p className="px-4 py-1 rounded-md text-[12px] border bg-blue-50 ">
                      Test
                    </p>
                  </div>

                  <div className="flex-1" />

                  <div className="text-[12px] my-4">
                    <p className="font-medium mb-2">Top Performing Student</p>
                    {props?.performance?.length > 0 ? (
                      <div className="flex gap-2">
                        <img
                          src={pix}
                          alt="Student"
                          className="w-[50px] h-[50px] border rounded-xl object-cover"
                        />
                        <div>
                          <p className="font-bold capitalize">Name</p>
                          <p>Points</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <GoGoal size={20} />
                        <p className="font-semibold text-[12px]">
                          No student has Attented this test yet.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <div>
                      Questions:{" "}
                      <span className="font-bold">
                        {props?.quiz?.question?.length}
                      </span>
                    </div>
                    <div>
                      Mark/Question:{" "}
                      <span className="font-bold">
                        {props?.quiz?.instruction?.mark}
                      </span>
                    </div>
                  </div>
                  <div className="text-[12px] mt-2 font-bold">
                    Instruction:{" "}
                    <span className="font-normal">
                      {`${props?.quiz?.instruction?.instruction ? props?.quiz?.instruction?.instruction : "" }`.slice(
                        0,
                        Math.ceil(Math.random() * (100 - 70)) + 70
                      )}
                      ...
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center px-4 py-1 mt-3">
          <FaCheckDouble size={13} />
          <p className="mt-3 text-[12px] font-medium">No Test set yet</p>
        </div>
      )}

      <div className="absolute top-0"></div>
    </div>
  );
};

export default QuizSetupScreen;
