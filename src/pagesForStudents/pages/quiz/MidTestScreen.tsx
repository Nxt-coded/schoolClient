import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isAnswerMatched } from "../../../lib/utils";
import Button from "../../../components/reUse/Button";
import LittleHeader from "../../../components/layout/LittleHeader";
import { useMidTest } from "../../../pagesForTeachers/hooks/useTeacher";
import { performanceMidTest } from "../../api/studentAPI";
import { useMidTestStudent, useStudentInfo } from "../../hooks/useStudentHook";
import toast, { Toaster } from "react-hot-toast";
import oops from "../../../assets/socials/oops-transformed-removebg-preview.png";
import { MdPlayCircle } from "react-icons/md";
import CountdownTimer from "../../../components/static/CountdownTimer";
import { MdOutlineTimer } from "react-icons/md";
import { useStudentPerfomance } from "../../../pagesForTeachers/hooks/useQuizHook";
import lodash from "lodash";
// import { useSchoolClassRMDetail } from "@/pages/hook/useSchoolAuth";

import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { FaSpinner } from "react-icons/fa6";
import { useAssessmentProtection } from "../../hooks/useAssessmentProtection";

const MidTestScreen = () => {
  const enterAssessmentMode = useAssessmentProtection();

  const navigate = useNavigate();
  const { midTestID, subjectID } = useParams();

  //   const { quizData } = useQuiz(midTestID!);
  const { midTest: quizData } = useMidTestStudent(subjectID!);
  const { studentInfo } = useStudentInfo();
  const { performance } = useStudentPerfomance(studentInfo?._id);

  // const { midTest } = useMidTest(midTestID!);
  // const { classroom } = useSchoolClassRMDetail(studentInfo?.schoolIDs);

  const [state, setState] = useState<any>(
    JSON.parse(localStorage.getItem("midTest")!)?.state || {}
  );
  const [start, setStart] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [activate, setActivate] = useState<boolean>(false);
  const [timeUp, setTimeUp] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const courseID = quizData?.subjectID;

  const handleStateChange = (questionIndex: any, optionValue: any) => {
    console.log("Selected answer:", {
      questionIndex,
      optionValue: optionValue.trim(),
      originalValue: optionValue,
    });

    setState((prev: any) => {
      const newState = {
        ...prev,
        [questionIndex]: optionValue.trim(),
      };
      console.log("Updated state:", newState);
      return newState;
    });
  };

  const getRemark = (genPointScore: number) => {
    return genPointScore >= 0 && genPointScore <= 5
      ? "This is a very poor result."
      : genPointScore >= 6 && genPointScore <= 11
      ? "This result is poor; it's not satisfactory."
      : genPointScore >= 11 && genPointScore <= 15
      ? "Below average; needs significant improvement."
      : genPointScore >= 16 && genPointScore <= 21
      ? "Below average; more effort required."
      : genPointScore >= 21 && genPointScore <= 25
      ? "Fair but not satisfactory; strive harder."
      : genPointScore >= 26 && genPointScore <= 31
      ? "Fair performance; potential for improvement."
      : genPointScore >= 31 && genPointScore <= 35
      ? "Average; a steady effort is needed."
      : genPointScore >= 36 && genPointScore <= 41
      ? "Average; showing gradual improvement."
      : genPointScore >= 41 && genPointScore <= 45
      ? "Slightly above average; keep it up."
      : genPointScore >= 46 && genPointScore <= 51
      ? "Decent work; shows potential."
      : genPointScore >= 51 && genPointScore <= 55
      ? "Passable; satisfactory effort."
      : genPointScore >= 56 && genPointScore <= 61
      ? "Satisfactory; good progress."
      : genPointScore >= 61 && genPointScore <= 65
      ? "Good work; keep striving for excellence."
      : genPointScore >= 66 && genPointScore <= 71
      ? "Commendable effort; very good."
      : genPointScore >= 71 && genPointScore <= 75
      ? "Very good; consistent effort is visible."
      : genPointScore >= 76 && genPointScore <= 81
      ? "Excellent performance; well done!"
      : genPointScore >= 81 && genPointScore <= 85
      ? "Exceptional result; keep up the great work!"
      : genPointScore >= 86 && genPointScore <= 91
      ? "Outstanding achievement; impressive work!"
      : genPointScore >= 91 && genPointScore <= 95
      ? "Brilliant performance; you’re a star!"
      : genPointScore >= 96 && genPointScore <= 100
      ? "Outstanding achievement; impressive work!"
      : ``;
  };

  const getGrade = (exam: number) => {
    if (exam >= 0 && exam <= 39) return "F9";
    if (exam >= 39 && exam <= 44) return "E8";
    if (exam >= 44 && exam <= 49) return "D7";
    if (exam >= 49 && exam <= 54) return "C6";
    if (exam >= 54 && exam <= 59) return "C5";
    if (exam >= 59 && exam <= 64) return "C4";
    if (exam >= 64 && exam <= 69) return "B3";
    if (exam >= 69 && exam <= 74) return "B2";
    if (exam >= 74 && exam <= 100) return "A1";
    return null;
  };

  const myQuizData: any = quizData?.quiz;

  const isQuizDone = performance?.performance?.find(
    (el: any) => el?.quizID === midTestID && el?.quizDone
  );

  const timer = parseFloat(quizData?.quiz?.instruction?.duration);

  let timerInSeconds = timer * 3600;

  const countdownKey = midTestID
    ? `midTest-${midTestID}-countdown`
    : `midTest-countdown`;

  const handleSubmit = () => {
    if (isSubmitted) return;
    setIsSubmitted(true);
    setLoading(true);

    const correctAnswers = (readQuestion || myQuizData?.question || []).map(
      (q: any) =>
        typeof q?.answer === "string"
          ? q.answer.trim()
          : q?.answer?.toString?.() || ""
    );

    let score = 0;
    readQuestion?.forEach((question: any, index: number) => {
      const correctAnswer = question.answer;
      const studentAnswer = state[index];
      if (isAnswerMatched(studentAnswer, correctAnswer)) {
        score++;
      }
    });

    const totalForCalc = correctAnswers.length || 1;
    const percentage = Math.ceil((score / totalForCalc) * 100);
    let remark = getRemark(percentage);
    let grade = getGrade(percentage);

    const markPerQuest = quizData?.quiz?.instruction?.mark;
    const getQuizData = quizData?.quiz;

    const totalquest = getQuizData?.question?.length;

    timerInSeconds = 0;

    performanceMidTest(studentInfo?._id, midTestID!, courseID, {
      studentScore: score,
      studentGrade: grade,
      remark,
      totalQuestions: totalquest,
      markPerQuestion: markPerQuest,
      status: quizData.status,
    })
      .then((res) => {
        if (res.status === 201) {
          toast.success(
            `${
              quizData?.status?.charAt(0).toUpperCase() +
              quizData?.status.slice(1)
            } submitted successfully`
          );
          navigate(`/confirm-quiz-take/${studentInfo?._id}`, {
            state: {
              correctAnswers,
              studentAnswers: state,
              score,
              total: correctAnswers.length,
            },
          });
        } else {
          toast.error("Something went wrong");
        }
      })
      .finally(() => {
        setLoading(false);
        try {
          localStorage.removeItem(countdownKey);
        } catch (e) {}
        localStorage.removeItem("midTest");
        localStorage.removeItem("midTestQuestions");
        setTimeUp(false);
        // keep isSubmitted true to avoid retrying
      });
  };
  let score = 0;

  const [readQuestion, setReadQuestion] = useState(
    JSON.parse(localStorage.getItem("midTestQuestions")!)
  );

  let savedSeconds = null;
  try {
    const raw = localStorage.getItem(countdownKey);
    savedSeconds = raw ? JSON.parse(raw) : null;
  } catch (e) {
    savedSeconds = null;
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey && event.key === "r") || event.key === "F5") {
        event.preventDefault();
        toast.error(
          `This action can't be done, while ${
            quizData?.status?.charAt(0).toUpperCase() +
            quizData?.status.slice(1)
          } is ongoing!`
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    localStorage.setItem("midTest", JSON.stringify({ score, state }));

    const question = JSON.parse(localStorage.getItem("midTestQuestions")!);

    if (question === null) {
      const sourceQuestions = myQuizData?.question ?? [];
      const questionsToStore = !quizData?.randomize
        ? lodash.shuffle([...sourceQuestions])
        : sourceQuestions;
      localStorage.setItem(
        "midTestQuestions",
        JSON.stringify(questionsToStore)
      );
      // localStorage.setItem(

      // localStorage.setItem(
      //   "midTestQuestions",
      //   JSON.stringify(lodash.shuffle(myQuizData?.question))
      // );
      setReadQuestion(JSON.parse(localStorage.getItem("midTestQuestions")!));
    } else if (question?.length === 0) {
      localStorage.setItem(
        "midTestQuestions",
        JSON.stringify(lodash.shuffle(myQuizData?.question))
      );
      setReadQuestion(JSON.parse(localStorage.getItem("midTestQuestions")!));
    }

    if (timeUp && !isSubmitted) {
      // small delay to allow UI update and any pending state flush
      const autoSubmit = setTimeout(() => {
        handleSubmit();
      }, 1000);
      return () => clearTimeout(autoSubmit);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [state, readQuestion, myQuizData, timeUp]);

  useEffect(() => {
    // keep countdown persisted across refreshes; only clear midTest metadata/questions on fresh mount
    localStorage.removeItem("midTest");
    localStorage.removeItem("midTestQuestions");
  }, []);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [_score, setScore] = useState(0);

  const handleAnswerSelect = (optionIndex) => {
    setAnswers({
      ...answers,
      [currentQuestion]: optionIndex,
    });
  };

  const handleNext = () => {
    if (currentQuestion < readQuestion?.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const getAnsweredCount = () => {
    return Object.keys(answers).length;
  };

  const getShuffledOptions = (question, questionIndex) => {
    // Ensure options exist
    if (!question?.options) return [];

    // Deterministic shuffle using a seeded PRNG based on questionIndex and question text
    function seededRandom(seed) {
      let x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    }

    // Create a unique seed per question (using questionIndex and question text)
    const seed =
      questionIndex * 1000 +
      (typeof question.question === "string"
        ? question.question
            .split("")
            .reduce((acc, c) => acc + c.charCodeAt(0), 0)
        : 0);

    // Copy options with original indices
    const optionsWithIndices = question.options.map((option, index) => ({
      option,
      originalIndex: index,
    }));

    // Fisher-Yates shuffle with seeded random
    const arr = [...optionsWithIndices];
    for (let i = arr.length - 1; i > 0; i--) {
      // Use a different seed for each swap
      const rand = seededRandom(seed + i);
      const j = Math.floor(rand * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  return (
    <div className="assessment-protected select-none">
      <Toaster position="top-center" reverseOrder={true} />
      <LittleHeader
        name={`
          ${quizData?.subjectTitle} ${quizData?.status} Screen`}
      />

      {isQuizDone ? (
        <div className="flex justify-center items-center flex-col">
          <img
            src={oops}
            alt="Oops"
            className="w-[250px] h-[250px] object-contain animate-pulse"
          />
          <h1 className="font-semibold text-purple-700">
            You have already attempted and Completed this Test
          </h1>
        </div>
      ) : (
        <div className="relative">
          {!start && (
            <div className="absolute top-20 left-1/3 z-10  flex flex-col justify-center items-center gap-5">
              <MdPlayCircle
                size={200}
                className="cursor-pointer text-red-500 hover:text-red-600 transition-all duration-300"
                onClick={() => {
                  enterAssessmentMode();
                  // initialize per-test countdown so refresh continues the timer
                  try {
                    const existing = localStorage.getItem(countdownKey);
                    if (!existing) {
                      localStorage.setItem(
                        countdownKey,
                        String(timerInSeconds)
                      );
                    }
                  } catch (e) {}

                  if (!document.startViewTransition) {
                    setStart(true);
                    setActivate(true);
                  } else {
                    document.startViewTransition(() => {
                      setStart(true);
                      setActivate(true);
                    });
                  }
                }}
              />
              <p className="font-medium text-[18px]">
                Push Play to start your{" "}
                <span className="font-bold capitalize">{quizData?.status}</span>
              </p>
            </div>
          )}
          {/* Timer */}
          <div className="fixed right-10 flex top-[70px] justify-end items-center z-50 pointer-events-none">
            <div className="pointer-events-auto min-w-[230px] p-3 bg-blue-50 border shadow-sm rounded-lg flex justify-center items-end flex-col">
              <h1 className="mb-1 text-blue-950 font-semibold flex items-center justify-start gap-2">
                Test Count Down Timer <MdOutlineTimer />
              </h1>
              {activate && timerInSeconds ? (
                <div>
                  <CountdownTimer
                    initialSeconds={timerInSeconds}
                    onTimeUp={() => setTimeUp(true)}
                    storageKey={countdownKey}
                  />
                </div>
              ) : null}
            </div>
          </div>

          {/* Quiz Content */}
          <div className="bg-slate-50 justify-center flex min-h-[100vh] z-[1000]">
            {start && (
              <div className="min-h-screen md-full lg:min-w-[800px]  flex items-center justify-center p-2">
                <div className="bg-white rounded-lg shadow-xl p-4 max-w-2xl w-full">
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h1 className="text-sm font-bold text-gray-800">
                        CBT Test Progress
                      </h1>
                      <span className="text-sm text-gray-600">
                        Answered: {getAnsweredCount()}/{readQuestion?.length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div
                        className="bg-blue-950 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${
                            ((currentQuestion + 1) / readQuestion?.length) * 100
                          }%`,
                        }}
                      ></div>
                    </div>

                    {/* Question Number Navigator */}
                    <div className="flex flex-wrap gap-2">
                      {readQuestion?.map((q, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentQuestion(index)}
                          className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                            currentQuestion === index
                              ? "bg-blue-950 text-white ring-2 ring--blue-900"
                              : answers[index] !== undefined
                              ? "bg-green-500 text-white hover:bg-green-600"
                              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                          }`}
                          title={
                            answers[index] !== undefined
                              ? "Answered"
                              : "Not answered"
                          }
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-semibold text-blue-950">
                        Question {currentQuestion + 1} of {readQuestion?.length}
                      </span>
                      {answers[currentQuestion] !== undefined && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          Answered
                        </span>
                      )}
                    </div>
                    <h2 
                      className="text-xl font-semibold text-gray-800 mb-6"
                      dangerouslySetInnerHTML={{
                        __html: typeof readQuestion[currentQuestion]?.question === 'string' 
                          ? readQuestion[currentQuestion]?.question?.replace(/^\d+\.\s*/, "") 
                          : ""
                      }}
                    />

                    {readQuestion[currentQuestion]?.images && (
                      <div>
                        <br />
                        {readQuestion[currentQuestion]?.images?.map(
                          (img: string, i: number) => (
                            <img src={img} key={i} className="h-60" />
                          )
                        )}
                        <br />
                      </div>
                    )}
                    {/* 
                    <div className="space-y-3">
                      {readQuestion[currentQuestion]?.options.map(
                        (option, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              // Update local UI selection and the main answer state
                              handleAnswerSelect(index);
                              handleStateChange(currentQuestion, option);
                            }}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                              answers[currentQuestion] === index
                                ? "border-blue-950 bg-blue-50"
                                : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                            }`}
                          >
                            <div className="flex items-center">
                              <div
                                className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                                  answers[currentQuestion] === index
                                    ? "border-blue-950 bg-blue-950"
                                    : "border-gray-300"
                                }`}
                              >
                                {answers[currentQuestion] === index && (
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                )}
                              </div>
                              <span className="text-gray-700">{option}</span>
                            </div>
                          </button>
                        )
                      )}
                    </div>
                    <hr className="my-4" /> */}
                    <div className="space-y-3">
                      {getShuffledOptions(
                        readQuestion[currentQuestion],
                        currentQuestion
                      ).map(({ option, originalIndex }, displayIndex) => (
                        <button
                          key={displayIndex}
                          onClick={() => {
                            // Use originalIndex to maintain correct answer tracking
                            handleAnswerSelect(originalIndex);
                            handleStateChange(currentQuestion, option);
                          }}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                            answers[currentQuestion] === originalIndex
                              ? "border-blue-950 bg-blue-50"
                              : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center">
                            <div
                              className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                                answers[currentQuestion] === originalIndex
                                  ? "border-blue-950 bg-blue-950"
                                  : "border-gray-300"
                              }`}
                            >
                              {answers[currentQuestion] === originalIndex && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              )}
                            </div>
                            <span className="text-gray-700" dangerouslySetInnerHTML={{ __html: typeof option === "string" ? option : JSON.stringify(option) }} />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={handlePrevious}
                      disabled={currentQuestion === 0}
                      className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                        currentQuestion === 0
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      <ChevronLeft className="w-5 h-5 mr-1" />
                      Previous
                    </button>

                    {currentQuestion === readQuestion.length - 1 ? (
                      <button
                        onClick={handleSubmit}
                        disabled={getAnsweredCount() !== readQuestion?.length}
                        className={`px-6 py-2 rounded-lg transition-colors ${
                          getAnsweredCount() === readQuestion?.length
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        {loading ? (
                          <p className="flex gap-2 items-center justify-center">
                            <FaSpinner className="text-white animate-spin " />{" "}
                            <span>Submitting</span>{" "}
                          </p>
                        ) : (
                          "Submit Test"
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={handleNext}
                        className="flex items-center px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 transition-colors"
                      >
                        Next
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </button>
                    )}
                  </div>

                  {currentQuestion === readQuestion?.length - 1 &&
                    getAnsweredCount() !== readQuestion?.length && (
                      <p className="text-center text-sm text-amber-600 mt-4">
                        Please answer all question before submitting
                      </p>
                    )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MidTestScreen;
