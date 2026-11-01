import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isAnswerMatched } from "../../../lib/utils";
import LittleHeader from "../../../components/layout/LittleHeader";
import { performanceMidTest } from "../../api/studentAPI";
import { useMidTestStudent, useStudentInfo } from "../../hooks/useStudentHook";
import toast, { Toaster } from "react-hot-toast";
import oops from "../../../assets/socials/oops-transformed-removebg-preview.png";
import { MdPlayCircle } from "react-icons/md";
import CountdownTimer from "../../../components/static/CountdownTimer";
import { MdOutlineTimer } from "react-icons/md";
import { useStudentPerfomance } from "../../../pagesForTeachers/hooks/useQuizHook";
import lodash from "lodash";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaSpinner } from "react-icons/fa6";
import { useAssessmentProtection } from "../../hooks/useAssessmentProtection";

interface MidTestQuestion {
  answer?: unknown;
  question?: unknown;
  options?: unknown[];
  images?: string[];
}

interface MidTestData {
  subjectID?: string;
  subjectTitle?: string;
  status?: string;
  randomize?: boolean;
  quiz?: {
    question?: MidTestQuestion[];
    instruction?: {
      duration?: string;
      mark?: string | number;
    };
  };
}

interface MidTestSubmission {
  payload: {
    studentScore: number;
    studentGrade: string | null;
    remark: string;
    totalQuestions: number;
    markPerQuestion?: string | number;
    status?: string;
  };
  result: {
    correctAnswers: string[];
    studentAnswers: Record<number, string>;
    score: number;
    total: number;
  };
}

interface MidTestSession {
  state?: Record<number, string>;
  started?: boolean;
  timeUp?: boolean;
  offlineAtDeadline?: boolean;
  questions?: MidTestQuestion[];
  questionOrder?: number[];
  currentQuestion?: number;
  answers?: Record<number, number>;
  pendingSubmission?: MidTestSubmission | null;
}

const MidTestScreen = () => {
  const enterAssessmentMode = useAssessmentProtection();

  const navigate = useNavigate();
  const { midTestID, subjectID } = useParams();

  const { midTest: quizData } = useMidTestStudent(subjectID!);
  const { studentInfo } = useStudentInfo();
  const { performance } = useStudentPerfomance(studentInfo?._id);

  const [cachedStudentID] = useState(() => {
    try {
      return localStorage.getItem(`midTestStudent_${midTestID}`) || "";
    } catch (error) {
      console.error("Unable to read the saved mid-test student:", error);
      return "";
    }
  });
  const studentID = studentInfo?._id || cachedStudentID;
  const sessionKey = `midTestSession_${studentID}_${midTestID}`;
  const quizCacheKey = `midTestQuiz_${midTestID}`;
  const [cachedQuiz, setCachedQuiz] = useState<MidTestData | null>(() => {
    try {
      const saved = localStorage.getItem(quizCacheKey);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error("Unable to read the saved mid-test questions:", error);
      return null;
    }
  });
  const activeQuizData = quizData || cachedQuiz;
  const [state, setState] = useState<Record<number, string>>({});
  const [start, setStart] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [activate, setActivate] = useState<boolean>(false);
  const [timeUp, setTimeUp] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineAtDeadline, setOfflineAtDeadline] = useState(false);
  const [sessionLoaded, setSessionLoaded] = useState(false);
  const [readQuestion, setReadQuestion] = useState<MidTestQuestion[]>([]);
  const [questionOrder, setQuestionOrder] = useState<number[] | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [pendingSubmission, setPendingSubmission] =
    useState<MidTestSubmission | null>(null);
  const submittingRef = useRef(false);

  const courseID = activeQuizData?.subjectID;

  useEffect(() => {
    if (!studentInfo?._id) return;
    try {
      localStorage.setItem(`midTestStudent_${midTestID}`, studentInfo._id);
    } catch (error) {
      console.error("Unable to save the mid-test student ID:", error);
    }
  }, [studentInfo?._id, midTestID]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!quizData?.quiz?.question?.length) return;
    const snapshot: MidTestData = {
      subjectID: quizData.subjectID,
      subjectTitle: quizData.subjectTitle,
      status: quizData.status,
      randomize: quizData.randomize,
      quiz: {
        question: quizData.quiz.question,
        instruction: quizData.quiz.instruction,
      },
    };
    setCachedQuiz(snapshot);
    try {
      localStorage.setItem(quizCacheKey, JSON.stringify(snapshot));
    } catch (error) {
      console.error("Unable to cache mid-test questions:", error);
      toast.error("Unable to save the test questions for offline recovery");
    }
  }, [quizData, quizCacheKey]);

  const saveSession = useCallback(
    (updates: Partial<MidTestSession>) => {
      if (!studentID || !midTestID) return;
      try {
        const saved = localStorage.getItem(sessionKey);
        const session: MidTestSession = saved ? JSON.parse(saved) : {};
        localStorage.setItem(
          sessionKey,
          JSON.stringify({ ...session, ...updates })
        );
      } catch (error) {
        console.error("Unable to save mid-test progress:", error);
        toast.error("Your test progress could not be saved on this device");
      }
    },
    [studentID, midTestID, sessionKey]
  );

  useEffect(() => {
    if (!studentID || !midTestID) return;
    setSessionLoaded(false);
    try {
      const saved = localStorage.getItem(sessionKey);
      const session: MidTestSession = saved ? JSON.parse(saved) : {};
      setState(session.state || {});
      setStart(Boolean(session.started));
      setActivate(Boolean(session.started));
      setTimeUp(Boolean(session.timeUp));
      setOfflineAtDeadline(Boolean(session.offlineAtDeadline));
      const restoredQuestions = Array.isArray(session.questions)
        ? session.questions
        : [];
      setReadQuestion(restoredQuestions);
      setQuestionOrder(
        Array.isArray(session.questionOrder) ? session.questionOrder : null
      );
      setCurrentQuestion(
        Math.min(
          Math.max(0, session.currentQuestion || 0),
          Math.max(0, restoredQuestions.length - 1)
        )
      );
      setAnswers(session.answers || {});
      setPendingSubmission(session.pendingSubmission || null);
      setSessionLoaded(true);
    } catch (error) {
      console.error("Unable to restore mid-test progress:", error);
      toast.error("Saved test progress could not be restored");
      setSessionLoaded(true);
    }
  }, [studentID, midTestID, sessionKey]);

  useEffect(() => {
    if (
      !sessionLoaded ||
      readQuestion.length ||
      !activeQuizData?.quiz?.question?.length
    ) {
      return;
    }
    const sourceQuestions = activeQuizData.quiz.question;
    const order =
      questionOrder?.length === sourceQuestions.length
        ? questionOrder
        : activeQuizData.randomize
          ? sourceQuestions.map((_, index) => index)
          : lodash.shuffle(sourceQuestions.map((_, index) => index));
    const questions = order
      .map((index) => sourceQuestions[index])
      .filter((question): question is MidTestQuestion => Boolean(question));
    setReadQuestion(questions);
    setQuestionOrder(order);
    saveSession({ questionOrder: order });
  }, [
    activeQuizData,
    questionOrder,
    readQuestion.length,
    sessionLoaded,
    saveSession,
  ]);

  useEffect(() => {
    if (!sessionLoaded) return;
    saveSession({
      state,
      started: start,
      timeUp,
      offlineAtDeadline,
      questionOrder,
      currentQuestion,
      answers,
      pendingSubmission,
    });
  }, [
    state,
    start,
    timeUp,
    offlineAtDeadline,
    questionOrder,
    currentQuestion,
    answers,
    pendingSubmission,
    sessionLoaded,
    saveSession,
  ]);

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

  const myQuizData = activeQuizData?.quiz;

  const isQuizDone = performance?.performance?.find(
    (el: { quizID?: string; quizDone?: boolean }) =>
      el?.quizID === midTestID && el?.quizDone
  );

  const timer = Number.parseFloat(
    activeQuizData?.quiz?.instruction?.duration || "0"
  );
  const timerInSeconds = Math.max(0, timer * 3600);
  const countdownKey = `midTest-${studentID}-${midTestID}-countdown`;

  const handleStateChange = (questionIndex: number, optionValue: string) => {
    const newState = { ...state, [questionIndex]: optionValue.trim() };
    setState(newState);
    saveSession({ state: newState });
  };

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = { ...answers, [currentQuestion]: optionIndex };
    setAnswers(newAnswers);
    saveSession({ answers: newAnswers });
  };

  const handleSubmit = async () => {
    if (isSubmitted || submittingRef.current) return;
    if (!studentID || !midTestID || !courseID) {
      toast.error("Unable to identify this test. Your saved answers are safe.");
      return;
    }

    if (!navigator.onLine) {
      setIsOnline(false);
      toast.error("You are offline. Your answers are saved; reconnect to submit.");
      return;
    }

    submittingRef.current = true;
    setLoading(true);
    let submission = pendingSubmission;
    try {
      if (!submission) {
        const questions = readQuestion.length
          ? readQuestion
          : myQuizData?.question || [];
        const correctAnswers = questions.map(
          (question) =>
            typeof question?.answer === "string"
              ? question.answer.trim()
              : question?.answer?.toString?.() || ""
        );
        const score = questions.reduce(
          (total: number, question: MidTestQuestion, index: number) =>
            total +
            (isAnswerMatched(state[index], question.answer) ? 1 : 0),
          0
        );
        const percentage = Math.ceil(
          (score / (correctAnswers.length || 1)) * 100
        );
        submission = {
          payload: {
            studentScore: score,
            studentGrade: getGrade(percentage),
            remark: getRemark(percentage),
            totalQuestions: questions.length,
            markPerQuestion: activeQuizData?.quiz?.instruction?.mark,
            status: activeQuizData?.status,
          },
          result: {
            correctAnswers,
            studentAnswers: state,
            score,
            total: correctAnswers.length,
          },
        };
        setPendingSubmission(submission);
        saveSession({ pendingSubmission: submission });
      }

      const response = await performanceMidTest(
        studentID,
        midTestID,
        courseID,
        submission.payload
      );
      if (response?.status !== 201) {
        throw new Error(
          response?.response?.data?.message ||
            response?.message ||
            "The test could not be submitted. Please retry."
        );
      }

      setIsSubmitted(true);
      toast.success(
        `${String(activeQuizData?.status || "Mid-test")
          .charAt(0)
          .toUpperCase()}${String(activeQuizData?.status || "Mid-test").slice(
          1
        )} submitted successfully`
      );
      try {
        localStorage.removeItem(sessionKey);
        localStorage.removeItem(`${countdownKey}-deadline`);
        localStorage.removeItem(quizCacheKey);
        localStorage.removeItem(`midTestStudent_${midTestID}`);
      } catch (error) {
        console.error("Unable to clear completed mid-test progress:", error);
      }
      navigate(`/confirm-quiz-take/${studentID}`, {
        state: submission.result,
      });
    } catch (error) {
      console.error("Mid-test submission failed:", error);
      setIsOnline(navigator.onLine);
      toast.error(
        navigator.onLine
          ? error instanceof Error
            ? error.message
            : "Submission failed. Your answers are saved; please retry."
          : "Connection lost. Your answers are saved; reconnect to submit."
      );
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
  };
  const handleSubmitRef = useRef(handleSubmit);
  handleSubmitRef.current = handleSubmit;

  useEffect(() => {
    if (!sessionLoaded || !timeUp || isSubmitted || loading) return;
    if (!isOnline) {
      if (!offlineAtDeadline) {
        setOfflineAtDeadline(true);
        saveSession({ timeUp: true, offlineAtDeadline: true });
        toast.error(
          "Time is up, but you are offline. Your answers are saved; reconnect to submit."
        );
      }
      return;
    }
    if (!offlineAtDeadline) void handleSubmitRef.current();
  }, [
    sessionLoaded,
    timeUp,
    isOnline,
    offlineAtDeadline,
    isSubmitted,
    loading,
    saveSession,
  ]);

  const handleNext = () => {
    if (currentQuestion < readQuestion?.length - 1) {
      const nextQuestion = currentQuestion + 1;
      setCurrentQuestion(nextQuestion);
      saveSession({ currentQuestion: nextQuestion });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      const previousQuestion = currentQuestion - 1;
      setCurrentQuestion(previousQuestion);
      saveSession({ currentQuestion: previousQuestion });
    }
  };

  const getAnsweredCount = () => {
    return Object.keys(answers).length;
  };

  const getShuffledOptions = (
    question: MidTestQuestion,
    questionIndex: number
  ) => {
    // Ensure options exist
    if (!question?.options) return [];

    // Deterministic shuffle using a seeded PRNG based on questionIndex and question text
    function seededRandom(seed) {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    }

    // Create a unique seed per question (using questionIndex and question text)
    const seed =
      questionIndex * 1000 +
      (typeof question.question === "string"
        ? question.question
            .split("")
            .reduce((acc: number, c: string) => acc + c.charCodeAt(0), 0)
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
  const currentQuestionData = readQuestion[currentQuestion];
  const currentQuestionText =
    typeof currentQuestionData?.question === "string"
      ? currentQuestionData.question.replace(/^\d+\.\s*/, "")
      : "";

  return (
    <div className="assessment-protected select-none">
      <Toaster position="top-center" reverseOrder={true} />
      <LittleHeader
        name={`
          ${activeQuizData?.subjectTitle} ${activeQuizData?.status} Screen`}
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
          <div
            className={`mx-4 mt-4 rounded-lg border px-4 py-3 text-sm ${
              isOnline
                ? "border-green-200 bg-green-50 text-green-800"
                : "border-amber-300 bg-amber-50 text-amber-900"
            }`}
            role="status"
          >
            {isOnline
              ? "Connected. Your answers are saved on this device."
              : "You are offline. Keep answering; your progress is saved on this device. Submission will be available when you reconnect."}
          </div>
          {timeUp && offlineAtDeadline && (
            <div className="mx-4 mt-3 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900">
              Time is up. Your answers are safe. Reconnect to enable submission.
            </div>
          )}
          {!start && (
            <div className="absolute top-20 left-1/3 z-10  flex flex-col justify-center items-center gap-5">
              <MdPlayCircle
                size={200}
                className={`transition-all duration-300 ${
                  sessionLoaded && readQuestion.length
                    ? "cursor-pointer text-red-500 hover:text-red-600"
                    : "cursor-not-allowed text-gray-300"
                }`}
                onClick={() => {
                  if (!sessionLoaded || !readQuestion.length) {
                    toast.error("Wait for the test questions to load before starting");
                    return;
                  }
                  enterAssessmentMode();
                  try {
                    const deadlineKey = `${countdownKey}-deadline`;
                    if (!localStorage.getItem(deadlineKey)) {
                      localStorage.setItem(
                        deadlineKey,
                        String(Date.now() + timerInSeconds * 1000)
                      );
                    }
                  } catch (error) {
                    console.error("Unable to start the mid-test timer:", error);
                    toast.error("The test timer could not be saved");
                  }
                  saveSession({ started: true });

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
                <span className="font-bold capitalize">
                  {activeQuizData?.status}
                </span>
              </p>
            </div>
          )}
          {/* Timer */}
          <div className="fixed right-10 flex top-[70px] justify-end items-center z-50 pointer-events-none">
            <div className="pointer-events-auto min-w-[230px] p-3 bg-blue-50 border shadow-sm rounded-lg flex justify-center items-end flex-col">
              <h1 className="mb-1 text-blue-950 font-semibold flex items-center justify-start gap-2">
                Test Count Down Timer <MdOutlineTimer />
              </h1>
              {activate && timerInSeconds > 0 ? (
                <div>
                  <CountdownTimer
                    initialSeconds={timerInSeconds}
                    onTimeUp={() => setTimeUp(true)}
                    storageKey={countdownKey}
                    persistDeadline
                  />
                </div>
              ) : null}
            </div>
          </div>

          {/* Quiz Content */}
          <div className="bg-slate-50 justify-center flex min-h-[100vh] z-[1000]">
            {start && sessionLoaded && readQuestion.length > 0 && (
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
                      {readQuestion?.map((q: MidTestQuestion, index: number) => (
                        <button
                          key={index}
                          onClick={() => {
                            setCurrentQuestion(index);
                            saveSession({ currentQuestion: index });
                          }}
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
                        __html: currentQuestionText,
                      }}
                    />

                    {currentQuestionData?.images && (
                      <div>
                        <br />
                        {currentQuestionData.images.map(
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
                        currentQuestionData,
                        currentQuestion
                      ).map(({ option, originalIndex }, displayIndex) => (
                        <button
                          key={displayIndex}
                          onClick={() => {
                            if (pendingSubmission) return;
                            // Use originalIndex to maintain correct answer tracking
                            handleAnswerSelect(originalIndex);
                            handleStateChange(
                              currentQuestion,
                              typeof option === "string"
                                ? option
                                : JSON.stringify(option) || ""
                            );
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

                    {currentQuestion === readQuestion.length - 1 ||
                    timeUp ||
                    pendingSubmission ? (
                      <button
                        onClick={handleSubmit}
                        disabled={
                          loading ||
                          !isOnline ||
                          (!timeUp &&
                            !pendingSubmission &&
                            getAnsweredCount() !== readQuestion.length)
                        }
                        className={`px-6 py-2 rounded-lg transition-colors ${
                          loading ||
                          !isOnline ||
                          (!timeUp &&
                            !pendingSubmission &&
                            getAnsweredCount() !== readQuestion.length)
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                      >
                        {loading ? (
                          <p className="flex gap-2 items-center justify-center">
                            <FaSpinner className="text-white animate-spin " />{" "}
                            <span>Submitting</span>{" "}
                          </p>
                        ) : !isOnline ? (
                          "Waiting for connection"
                        ) : pendingSubmission ? (
                          "Retry Submission"
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

                  {!timeUp &&
                    currentQuestion === readQuestion?.length - 1 &&
                    getAnsweredCount() !== readQuestion?.length && (
                      <p className="text-center text-sm text-amber-600 mt-4">
                        Please answer all question before submitting
                      </p>
                    )}
                </div>
              </div>
            )}
            {start && sessionLoaded && !readQuestion.length && (
              <div className="m-8 rounded-lg border border-amber-300 bg-amber-50 p-6 text-center text-amber-900">
                {isOnline
                  ? "Loading test questions..."
                  : "Test questions are not available offline on this device."}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MidTestScreen;
