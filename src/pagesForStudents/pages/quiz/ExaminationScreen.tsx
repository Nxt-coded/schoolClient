import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isAnswerMatched } from "../../../lib/utils";
import Button from "../../../components/reUse/Button";
import LittleHeader from "../../../components/layout/LittleHeader";
import { useExam, useQuiz } from "../../../pagesForTeachers/hooks/useTeacher";
import { performanceExamination, performanceTest } from "../../api/studentAPI";
import { useStudentInfo } from "../../hooks/useStudentHook";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import oops from "../../../assets/socials/oops-transformed-removebg-preview.png";
import { MdPlayCircle } from "react-icons/md";
import CountdownTimer from "../../../components/static/CountdownTimer";
import { MdOutlineTimer } from "react-icons/md";
import { useStudentPerfomance } from "../../../pagesForTeachers/hooks/useQuizHook";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { FaSpinner } from "react-icons/fa6";
import lodash from "lodash";
import { useAssessmentProtection } from "../../hooks/useAssessmentProtection";

function MathRenderer({ text }) {
  if (!text) return null;

  const str = String(text);

  function parseMath(input) {
    const result = [];
    let i = 0;
    let currentText = "";

    while (i < input.length) {
      let matched = false;

      // Check for determinant: |a b; c d|
      if (input[i] === "|") {
        let closing = -1;
        for (let j = i + 1; j < input.length; j++) {
          if (input[j] === "|") {
            closing = j;
            break;
          }
        }

        if (closing > i) {
          const content = input.substring(i + 1, closing);
          if (content.includes(";")) {
            if (currentText) {
              result.push({ type: "text", content: currentText });
              currentText = "";
            }
            result.push({ type: "determinant", content: content });
            i = closing + 1;
            matched = true;
          }
        }
      }

      // Check for fraction: (numerator)/(denominator)
      if (!matched && input[i] === "(") {
        let firstClose = findMatchingParen(input, i);

        if (
          firstClose > i &&
          firstClose + 2 < input.length &&
          input[firstClose + 1] === "/" &&
          input[firstClose + 2] === "("
        ) {
          let secondClose = findMatchingParen(input, firstClose + 2);

          if (secondClose > firstClose) {
            if (currentText) {
              result.push({ type: "text", content: currentText });
              currentText = "";
            }
            result.push({
              type: "fraction",
              numerator: input.substring(i + 1, firstClose),
              denominator: input.substring(firstClose + 3, secondClose),
            });
            i = secondClose + 1;
            matched = true;
          }
        }
      }

      // Check for superscript: base^(exponent)
      if (
        !matched &&
        input[i] === "^" &&
        i + 1 < input.length &&
        input[i + 1] === "("
      ) {
        let baseStart = i - 1;

        while (baseStart > 0 && /[a-zA-Z0-9_]/.test(input[baseStart - 1])) {
          baseStart--;
        }

        let close = findMatchingParen(input, i + 1);

        if (close > i && baseStart < i) {
          if (baseStart > 0 && currentText.length > 0) {
            result.push({
              type: "text",
              content: currentText.substring(
                0,
                currentText.length - (i - baseStart)
              ),
            });
          }
          result.push({
            type: "superscript",
            base: input.substring(baseStart, i),
            sup: input.substring(i + 2, close),
          });
          currentText = "";
          i = close + 1;
          matched = true;
        }
      }

      // Check for subscript: base_(subscript) or base₁₀ format
      if (
        !matched &&
        input[i] === "_" &&
        i + 1 < input.length &&
        input[i + 1] === "("
      ) {
        let baseStart = i - 1;

        while (baseStart > 0 && /[a-zA-Z0-9]/.test(input[baseStart - 1])) {
          baseStart--;
        }

        let close = findMatchingParen(input, i + 1);

        if (close > i && baseStart < i) {
          if (baseStart > 0 && currentText.length > 0) {
            result.push({
              type: "text",
              content: currentText.substring(
                0,
                currentText.length - (i - baseStart)
              ),
            });
          }
          result.push({
            type: "subscript",
            base: input.substring(baseStart, i),
            sub: input.substring(i + 2, close),
          });
          currentText = "";
          i = close + 1;
          matched = true;
        }
      }

      // Check for Unicode subscripts like ₁₀
      if (!matched && /[₀₁₂₃₄₅₆₇₈₉]/.test(input[i])) {
        let baseStart = i - 1;
        while (baseStart > 0 && /[a-zA-Z0-9]/.test(input[baseStart - 1])) {
          baseStart--;
        }

        let subEnd = i;
        while (subEnd < input.length && /[₀₁₂₃₄₅₆₇₈₉]/.test(input[subEnd])) {
          subEnd++;
        }

        if (baseStart < i) {
          if (baseStart > 0 && currentText.length > 0) {
            result.push({
              type: "text",
              content: currentText.substring(
                0,
                currentText.length - (i - baseStart)
              ),
            });
          }

          // Convert Unicode subscripts to normal numbers
          const subText = input
            .substring(i, subEnd)
            .replace(/₀/g, "0")
            .replace(/₁/g, "1")
            .replace(/₂/g, "2")
            .replace(/₃/g, "3")
            .replace(/₄/g, "4")
            .replace(/₅/g, "5")
            .replace(/₆/g, "6")
            .replace(/₇/g, "7")
            .replace(/₈/g, "8")
            .replace(/₉/g, "9");

          result.push({
            type: "subscript",
            base: input.substring(baseStart, i),
            sub: subText,
          });
          currentText = "";
          i = subEnd;
          matched = true;
        }
      }

      // Check for square root: √(content)
      if (
        !matched &&
        input[i] === "√" &&
        i + 1 < input.length &&
        input[i + 1] === "("
      ) {
        let close = findMatchingParen(input, i + 1);

        if (close > i) {
          if (currentText) {
            result.push({ type: "text", content: currentText });
            currentText = "";
          }
          result.push({
            type: "sqrt",
            content: input.substring(i + 2, close),
          });
          i = close + 1;
          matched = true;
        }
      }

      if (!matched) {
        currentText += input[i];
        i++;
      }
    }

    if (currentText) {
      result.push({ type: "text", content: currentText });
    }

    return result;
  }

  function findMatchingParen(str, start) {
    let depth = 1;
    for (let j = start + 1; j < str.length; j++) {
      if (str[j] === "(") depth++;
      if (str[j] === ")") {
        depth--;
        if (depth === 0) return j;
      }
    }
    return -1;
  }

  function renderDeterminant(content) {
    const rows = content.split(";").map((r) => r.trim());
    const cells = [];

    for (let r = 0; r < rows.length; r++) {
      const values = rows[r].split(/\s+/).filter((v) => v);
      for (let c = 0; c < values.length; c++) {
        cells.push({ value: values[c], key: `${r}-${c}` });
      }
    }

    const colCount = rows[0].split(/\s+/).filter((v) => v).length;

    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          margin: "0 3px",
          verticalAlign: "middle",
        }}
      >
        <span style={{ fontSize: "1.5em", fontWeight: "100", lineHeight: "1" }}>
          |
        </span>
        <span
          style={{
            display: "inline-grid",
            gridTemplateColumns: `repeat(${colCount}, auto)`,
            gridTemplateRows: `repeat(${rows.length}, auto)`,
            gap: "4px 12px",
            padding: "0 8px",
          }}
        >
          {cells.map((cell) => (
            <span key={cell.key} style={{ textAlign: "center" }}>
              {cell.value}
            </span>
          ))}
        </span>
        <span style={{ fontSize: "1.5em", fontWeight: "100", lineHeight: "1" }}>
          |
        </span>
      </span>
    );
  }

  function renderPart(part) {
    if (part.type === "fraction") {
      return (
        <span
          style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            verticalAlign: "middle",
            margin: "0 2px",
            fontSize: "0.9em",
            lineHeight: "1.2",
          }}
        >
          <span
            style={{ padding: "0 4px", borderBottom: "1px solid currentColor" }}
          >
            <MathRenderer text={part.numerator} />
          </span>
          <span style={{ padding: "0 4px" }}>
            <MathRenderer text={part.denominator} />
          </span>
        </span>
      );
    }

    if (part.type === "superscript") {
      return (
        <span style={{ display: "inline-flex", alignItems: "flex-start" }}>
          <span>
            <MathRenderer text={part.base} />
          </span>
          <span
            style={{
              fontSize: "0.7em",
              marginLeft: "0.1em",
              marginTop: "-0.3em",
            }}
          >
            <MathRenderer text={part.sup} />
          </span>
        </span>
      );
    }

    if (part.type === "subscript") {
      return (
        <span style={{ display: "inline-flex", alignItems: "flex-end" }}>
          <span>
            <MathRenderer text={part.base} />
          </span>
          <span
            className="-mt-4"
            style={{
              fontSize: "0.7em",
              marginLeft: "0.1em",
              marginBottom: "-1em",
            }}
          >
            <MathRenderer text={part.sub} />
          </span>
        </span>
      );
    }

    if (part.type === "sqrt") {
      return (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            margin: "0 2px",
          }}
        >
          <span style={{ fontSize: "1.2em" }}>√</span>
          <span
            style={{ borderTop: "1px solid currentColor", padding: "0 4px" }}
          >
            <MathRenderer text={part.content} />
          </span>
        </span>
      );
    }

    if (part.type === "determinant") {
      return renderDeterminant(part.content);
    }

    return <span dangerouslySetInnerHTML={{ __html: part.content }} />;
  }

  const parsed = parseMath(str);

  return (
    <>
      {parsed.map((part, index) => (
        <span key={index}>{renderPart(part)}</span>
      ))}
    </>
  );
}

const ExaminationTestScreen = () => {
  const enterAssessmentMode = useAssessmentProtection();

  const navigate = useNavigate();
  const { examID } = useParams();

  //   const { quizData } = useQuiz(examID!);
  const { examData: quizData } = useExam(examID!);

  const { studentInfo } = useStudentInfo();
  const { performance } = useStudentPerfomance(studentInfo?._id);
  const roundID = String(quizData?.currentRound || 1);

  // Create a stable guest session id so guest keys don't collide between different sessions
  const [guestSessionId] = useState(() => {
    const key = `examGuestSession_${examID}`;
    try {
      let id = localStorage.getItem(key);
      if (!id) {
        id = `${Date.now().toString(36)}_${Math.random()
          .toString(36)
          .slice(2, 10)}`;
        localStorage.setItem(key, id);
      }
      return id;
    } catch (e) {
      return `guest_${Date.now()}`;
    }
  });
  const storageId = studentInfo?._id || guestSessionId;
  const examQuestionsKey = (id: string) =>
    `examQuestions_${examID}_${roundID}_${id}`;
  const examStartedKey = (id: string) =>
    `examStarted_${examID}_${roundID}_${id}`;
  const examAnswersKey = (id: string) =>
    `examAnswers_${examID}_${roundID}_${id}`;

  const [state, setState] = useState<any>({});
  // Initialize start from localStorage so the play overlay doesn't show after refresh
  const getSavedStarted = () => {
    try {
      const studentKey = examStartedKey(studentInfo?._id || "");
      const guestKey = examStartedKey(guestSessionId);
      const storageKey = examStartedKey(storageId);
      const val =
        localStorage.getItem(studentKey) ||
        localStorage.getItem(guestKey) ||
        localStorage.getItem(storageKey) ||
        "false";
      return val === "true";
    } catch (e) {
      return false;
    }
  };

  const [start, setStart] = useState<boolean>(() => getSavedStarted());
  const [loading, setLoading] = useState<boolean>(false);
  const [activate, setActivate] = useState<boolean>(() => getSavedStarted());
  const [timeUp, setTimeUp] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState(false);

  const courseID = quizData?.subjectID;
  const countdownKey = `countdown_${examID}_${roundID}_${studentInfo?._id}`;

  const handleStateChange = (questionIndex: any, optionValue: any) => {
    setState((prev: any) => ({
      ...prev,
      [questionIndex]: optionValue.trim(),
    }));
  };

  const getRemark = (percentage: number) => {
    if (percentage <= 45) return "Very poor performance!";
    if (percentage <= 55) return "A poor performance!";
    if (percentage <= 65) return "Good performance, can do better!";
    if (percentage <= 75) return "Good performance, keep it up!";
    if (percentage <= 85) return "Very good performance!";
    return "Excellent performance!";
  };

  const getGrade = (percentage: number) => {
    if (percentage <= 45) return "F";
    if (percentage <= 55) return "E";
    if (percentage <= 65) return "D";
    if (percentage <= 75) return "C";
    if (percentage <= 85) return "B";
    return "A";
  };

  const myQuizData: any = quizData?.quiz;

  const isQuizDone = performance?.performance?.find(
    (el: any) =>
      el?.quizID === examID &&
      el?.quizDone &&
      String(el?.roundID || 1) === roundID
  );
  const now = Date.now();
  const isScheduled = Boolean(quizData?.opensAt && quizData?.closesAt);
  const isWithinSchedule =
    !isScheduled ||
    (now >= new Date(quizData.opensAt).getTime() &&
      now <= new Date(quizData.closesAt).getTime());

  const timer = parseFloat(quizData?.quiz?.instruction?.duration || "0.500");
  let timerInSeconds = timer * 3600;

  const handleSubmit = async () => {
    if (isSubmitting || isSubmitted) return;
    setIsSubmitting(true);
    setLoading(true);

    try {
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
        if (isAnswerMatched(studentAnswer, correctAnswer)) score++;
      });

      const totalForCalc = correctAnswers.length || 1;
      const percentage = Math.ceil((score / totalForCalc) * 100);
      const remark = getRemark(percentage);
      const grade = getGrade(percentage);
      const markPerQuest = quizData?.quiz?.instruction?.mark;
      const totalquest = quizData?.quiz?.question?.length;

      timerInSeconds = 0;

      const res = await performanceExamination(
        studentInfo?._id,
        examID!,
        courseID,
        {
          studentScore: score,
          studentGrade: grade,
          remark,
          totalQuestions: totalquest,
          markPerQuestion: markPerQuest,
          status: quizData.status,
          roundID,
        }
      );

      if (res?.status === 201) {
        toast.success(
          `${
            quizData?.status?.charAt(0).toUpperCase() +
            quizData?.status.slice(1)
          } submitted successfully`
        );
        // cleanup storage only after successful submission
        try {
          localStorage.removeItem(countdownKey);
          const answersKeyStudent = examAnswersKey(studentInfo?._id || "");
          const answersKeyGuest = examAnswersKey(guestSessionId);
          localStorage.removeItem(answersKeyStudent);
          localStorage.removeItem(answersKeyGuest);
          const questionsKeyStudent = examQuestionsKey(
            studentInfo?._id || guestSessionId
          );
          const questionsKeyGuest = examQuestionsKey(guestSessionId);
          localStorage.removeItem(questionsKeyStudent);
          localStorage.removeItem(questionsKeyGuest);
          const startedKeyStudent = examStartedKey(
            studentInfo?._id || guestSessionId
          );
          const startedKeyGuest = examStartedKey(guestSessionId);
          localStorage.removeItem(startedKeyStudent);
          localStorage.removeItem(startedKeyGuest);
        } catch (e) {}
        setIsSubmitted(true);
        navigate(`/confirm-quiz-take/${examID}`, {
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
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong, try again");
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };
  // Auto-submit when time is up
  useEffect(() => {
    if (timeUp && !isSubmitted && !isSubmitting) {
      toast.success("Time is up — submitting automatically...");
      setTimeout(() => {
        handleSubmit();
      }, 250);
    }
  }, [timeUp, isSubmitted, isSubmitting]);

  // Get shuffled questions from localStorage
  // const readQuestion = JSON.parse(localStorage.getItem("readQuestion") || "[]");

  const [readQuestion, setReadQuestion] = useState(() => {
    try {
      const stored = localStorage.getItem(examQuestionsKey(storageId));
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    // fallback to original questions until start pressed
    return myQuizData?.question ?? [];
  });
  let score = 0;

  useEffect(() => {
    // This effect rehydrates readQuestion and start state when the
    // quiz data or user changes. Avoid running it on `state` or
    // `readQuestion` changes to prevent accidental resets.
    try {
      const startedVal = localStorage.getItem(
        examStartedKey(studentInfo?._id || guestSessionId)
      );
      const started = startedVal === "true";
      if (started) {
        const saved = localStorage.getItem(examQuestionsKey(storageId));
        if (saved) setReadQuestion(JSON.parse(saved));
        // rehydrate current question from the answers storage
        try {
          const savedAns = JSON.parse(
            localStorage.getItem(storageKeyAnswers) || "null"
          );
          if (savedAns && typeof savedAns.currentQuestion === "number") {
            setCurrentQuestion(savedAns.currentQuestion);
          }
        } catch (e) {}
        setStart(true);
        setActivate(true);
      } else {
        setStart(false);
        setActivate(false);
        setTimeUp(false);
        setIsSubmitted(false);
        setIsSubmitting(false);
        setState({});
        setAnswers({});
        setCurrentQuestion(0);
        setReadQuestion(myQuizData?.question ?? []);
      }
    } catch (e) {}
  }, [myQuizData, quizData?.randomize, storageId, roundID]);

  // do not clear countdown or examQuestions here so reloads won't reset the timer
  // clearing of countdown is handled when the exam is submitted or when time runs out

  const [currentQuestion, setCurrentQuestion] = useState(0);
  // initialize answers from local storage (if present) so we don't overwrite on mount
  const extractAnswersFromSaved = (saved: any) => {
    if (!saved) return {};
    if (saved.answers && typeof saved.answers === "object")
      return saved.answers;
    // If saved itself is an object keyed by numeric keys, treat as answers map
    if (
      typeof saved === "object" &&
      Object.keys(saved).length > 0 &&
      Object.keys(saved).every((k) => /^[0-9]+$/.test(k))
    ) {
      return saved;
    }
    return {};
  };

  const initialAnswersFromStorage = (() => {
    try {
      const studentKey = examAnswersKey(studentInfo?._id || storageId);
      const guestKey = examAnswersKey(guestSessionId);
      const savedStudent = JSON.parse(
        localStorage.getItem(studentKey) || "null"
      );
      const savedGuest = JSON.parse(localStorage.getItem(guestKey) || "null");
      // Prefer the student key if it exists, otherwise fall back to guest
      const selected =
        savedStudent ||
        savedGuest ||
        JSON.parse(
          localStorage.getItem(examAnswersKey(storageId)) || "null"
        );
      return extractAnswersFromSaved(selected);
    } catch (e) {}
    return {};
  })();
  const [answers, setAnswers] = useState(initialAnswersFromStorage);
  const [_score, setScore] = useState(0);

  const handleAnswerSelect = (optionIndex) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: optionIndex }));
  };

  // Storage key for saving answers + state per student and exam
  const storageKeyAnswers = examAnswersKey(storageId);

  // Load saved answers/state from localStorage when component mounts or readQuestion updates
  useEffect(() => {
    try {
      const studentKey = examAnswersKey(studentInfo?._id || storageId);
      const guestKey = examAnswersKey(guestSessionId);
      const saved =
        JSON.parse(localStorage.getItem(studentKey) || "null") ||
        JSON.parse(localStorage.getItem(guestKey) || "null") ||
        JSON.parse(localStorage.getItem(storageKeyAnswers) || "null");
      if (saved) {
        // support both wrapper {answers, state, currentQuestion} and older flat answer object
        const extracted = extractAnswersFromSaved(saved);
        if (extracted) setAnswers(extracted);
        if (saved.state) setState(saved.state);
        if (typeof saved.currentQuestion === "number")
          setCurrentQuestion(saved.currentQuestion);
      }
      // if the user was previously a guest and now we have a studentId, migrate stored guest answers to student key
      try {
        if (studentInfo?._id) {
          const guestKey = examAnswersKey(guestSessionId);
          const studentKey = examAnswersKey(studentInfo?._id || "");
          const guestSaved = JSON.parse(
            localStorage.getItem(guestKey) || "null"
          );
          const studentSaved = JSON.parse(
            localStorage.getItem(studentKey) || "null"
          );
          if (guestSaved && !studentSaved) {
            localStorage.setItem(studentKey, JSON.stringify(guestSaved));
            // optionally remove guest key: localStorage.removeItem(guestKey);
          }
        }
      } catch (e) {}
    } catch (e) {
      // ignore
    }
  }, [storageKeyAnswers, readQuestion]);

  // Persist answers and state to localStorage whenever they change
  const didMountRef = useRef(false);

  // useEffect(() => {
  //   try {
  //     // avoid overwriting previously saved answers on mount
  //     if (!didMountRef.current) {
  //       didMountRef.current = true;
  //       return;
  //     }
  //     localStorage.setItem(
  //       storageKeyAnswers,
  //       JSON.stringify({ answers, state, currentQuestion })
  //     );
  //   } catch (e) {}
  // }, [answers, state, storageKeyAnswers, currentQuestion]);

  // Persist readQuestion order and started flag when start button is pressed
  // const startExam = () => {
  //   try {
  //     const key = examQuestionsKey(storageId);
  //     const existing = localStorage.getItem(key);
  //     const startedKeyVal = examStartedKey(storageId);
  //     const startedFlag = localStorage.getItem(startedKeyVal);

  //     // Determine whether we should resume an existing attempt (started + answers present)
  //     const savedAnswers = localStorage.getItem(storageKeyAnswers);
  //     const resumeExistingAttempt = startedFlag === "true" && !!savedAnswers;
  //     // If starting a new attempt (not resuming), clear any old answers to avoid accidental carry-over
  //     if (!resumeExistingAttempt) {
  //       try {
  //         localStorage.removeItem(storageKeyAnswers);
  //         setAnswers({});
  //         setState({});
  //         setCurrentQuestion(0);
  //       } catch (e) {}
  //     }
  //     // If we are resuming an existing attempt, rehydrate; otherwise create a new randomized order
  //     if (!resumeExistingAttempt) {
  //       const sourceQuestions = myQuizData?.question ?? [];
  //       // If `randomize` === true, do a seeded shuffle to ensure per-user uniqueness
  //       // We derive a deterministic seed from the examID and studentID (or guest session)
  //       const seedSource = `${examID}_${storageId}`;
  //       const seed = hashStringToNumber(seedSource);
  //       // Force shuffle on Start unless you want to respect the teacher flag.
  //       // If you want teachers to control randomize, set this to false.
  //       const forceShuffleOnStart = true;
  //       const shouldShuffle =
  //         forceShuffleOnStart || (quizData?.randomize ?? true);
  //       const questionsToStore = (
  //         shouldShuffle
  //           ? seededShuffle([...sourceQuestions], seed)
  //           : sourceQuestions
  //       ).map((q: any) => ({
  //         ...q,
  //         question: stripLeadingNumberFromText(q?.question),
  //         options: q?.options
  //           ? q.options.map(stripLeadingOptionLetter)
  //           : q?.options,
  //       }));
  //       // store under student key if available, otherwise guest key
  //       localStorage.setItem(key, JSON.stringify(questionsToStore));
  //       setReadQuestion(questionsToStore);
  //     } else {
  //       try {
  //         setReadQuestion(JSON.parse(existing));
  //       } catch (e) {}
  //     }
  //     // If there's a saved answers payload, restore currentQuestion
  //     try {
  //       const savedAns = JSON.parse(
  //         localStorage.getItem(storageKeyAnswers) || "null"
  //       );
  //       if (savedAns && typeof savedAns.currentQuestion === "number") {
  //         setCurrentQuestion(savedAns.currentQuestion);
  //       }
  //     } catch (e) {}
  //     // mark exam as started so reloads will rehydrate the same state
  //     localStorage.setItem(startedKeyVal, "true");
  //   } catch (e) {}
  //   setStart(true);
  //   setActivate(true);
  // };

  useEffect(() => {
    // Only save if exam has started
    if (!start) return;

    try {
      const dataToSave = {
        answers,
        state,
        currentQuestion,
        timestamp: Date.now(),
      };
      localStorage.setItem(storageKeyAnswers, JSON.stringify(dataToSave));

      // Also save to student-specific key if logged in
      if (studentInfo?._id) {
        const studentKey = examAnswersKey(studentInfo._id);
        localStorage.setItem(studentKey, JSON.stringify(dataToSave));
      }
    } catch (e) {
      console.error("Error saving answers:", e);
    }
  }, [
    answers,
    state,
    currentQuestion,
    start,
    storageKeyAnswers,
    examID,
    studentInfo?._id,
  ]);

  const startExam = () => {
    try {
      const key = examQuestionsKey(storageId);
      const existing = localStorage.getItem(key);
      const startedKeyVal = examStartedKey(storageId);
      const startedFlag = localStorage.getItem(startedKeyVal);

      // Determine whether we should resume an existing attempt
      const savedAnswers = localStorage.getItem(storageKeyAnswers);
      const resumeExistingAttempt = startedFlag === "true" && !!savedAnswers;

      if (resumeExistingAttempt) {
        // RESUME: rehydrate saved questions and answers
        try {
          if (existing) {
            setReadQuestion(JSON.parse(existing));
          }
          const savedAns = JSON.parse(savedAnswers);
          if (savedAns) {
            if (savedAns.answers) setAnswers(savedAns.answers);
            if (savedAns.state) setState(savedAns.state);
            if (typeof savedAns.currentQuestion === "number") {
              setCurrentQuestion(savedAns.currentQuestion);
            }
          }
        } catch (e) {
          console.error("Error resuming exam:", e);
        }
      } else {
        // NEW ATTEMPT: clear old data and create fresh randomized questions
        try {
          localStorage.removeItem(storageKeyAnswers);
          setAnswers({});
          setState({});
          setCurrentQuestion(0);
        } catch (e) {}

        const sourceQuestions = myQuizData?.question ?? [];
        const seedSource = `${examID}_${storageId}`;
        const seed = hashStringToNumber(seedSource);
        const forceShuffleOnStart = true;
        const shouldShuffle =
          forceShuffleOnStart || (quizData?.randomize ?? true);

        const questionsToStore = (
          shouldShuffle
            ? seededShuffle([...sourceQuestions], seed)
            : sourceQuestions
        ).map((q: any) => ({
          ...q,
          question: stripLeadingNumberFromText(q?.question),
          options: q?.options
            ? q.options.map(stripLeadingOptionLetter)
            : q?.options,
        }));

        localStorage.setItem(key, JSON.stringify(questionsToStore));
        setReadQuestion(questionsToStore);
      }

      // Mark exam as started
      localStorage.setItem(startedKeyVal, "true");
    } catch (e) {
      console.error("Error starting exam:", e);
    }

    setStart(true);
    setActivate(true);
  };

  // NOTE: guestSessionId is now computed at mount-time via useState to ensure stability

  const handleNext = () => {
    setCurrentQuestion((prev) => {
      const maxIndex = Math.max((readQuestion?.length || 1) - 1, 0);
      return Math.min(prev + 1, maxIndex);
    });
  };

  const handlePrevious = () => {
    setCurrentQuestion((prev) => Math.max(0, prev - 1));
  };

  const getAnsweredCount = () => {
    return Object.keys(answers)?.length;
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
    const questionId = question?._id || question?.id || null;
    const textHash =
      typeof question.question === "string"
        ? question.question
            .split("")
            .reduce((acc, c) => acc + c.charCodeAt(0), 0)
        : 0;
    const seed =
      (questionId
        ? String(questionId)
            .split("")
            .reduce((a, c) => a + c.charCodeAt(0), 0)
        : questionIndex * 1000) + textHash;

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

  // Deterministic seeded shuffle for questions (unique per user/session)
  function hashStringToNumber(str: string) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 33) ^ str.charCodeAt(i);
    }
    return Math.abs(hash >>> 0);
  }

  function mulberry32(seed: number) {
    return function () {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function seededShuffle<T>(arr: T[], seed: number) {
    const rand = mulberry32(seed);
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function stripLeadingNumberFromText(text?: string) {
    if (!text) return "";
    return String(text)
      .replace(/^\s*\d+\.\s*/, "")
      .trim();
  }

  function stripLeadingOptionLetter(text?: string) {
    if (!text) return "";
    return String(text)
      .replace(/^[A-Da-d]\.\s*/, "")
      .trim();
  }

  return (
    <div className="assessment-protected flex h-[calc(100dvh-8rem)] w-full min-w-0 flex-col select-none overflow-hidden lg:h-auto lg:overflow-visible">
      <Toaster position="top-center" reverseOrder={true} />
      <div className="shrink-0">
        <LittleHeader
          name={
            quizData
              ? `${quizData?.term || ""} ${quizData?.subjectTitle} ${
                  quizData?.status
                } Screen`
              : "Loading Screen's Info"
          }
        />
      </div>

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
      ) : !isWithinSchedule ? (
        <div className="m-6 rounded-lg border p-6 text-center">
          This assessment is only available during its scheduled window.
        </div>
      ) : (
        <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col gap-4 overflow-hidden lg:flex-none lg:overflow-visible">
          {/* This Part watch out */}
          {!start && (
            <div className="flex min-h-[320px] w-full flex-col items-center justify-center gap-5 px-4 text-center">
              {quizData?.subjectTitle ? (
                <div className="flex items-center justify-center flex-col">
                  <MdPlayCircle
                    className="h-28 w-28 cursor-pointer text-red-500 transition-all duration-300 hover:text-red-600 sm:h-48 sm:w-48"
                    onClick={() => {
                      enterAssessmentMode();
                      if (!document.startViewTransition) {
                        startExam();
                      } else {
                        document.startViewTransition(() => {
                          startExam();
                        });
                      }
                    }}
                  />
                  <p className="font-medium text-base sm:text-[18px]">
                    Push Play to start your{" "}
                    <span className="font-bold capitalize">
                      {quizData?.status}
                    </span>
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-center flex-col">
                  <MdPlayCircle
                    className="h-28 w-28 cursor-not-allowed text-red-400 opacity-80 transition-all duration-300 hover:text-red-500 sm:h-48 sm:w-48"
                  />
                  <p className="font-medium text-base sm:text-[18px]">
                    Please wait... Data loading{" "}
                    <span className="font-bold capitalize">
                      {quizData?.status}
                    </span>
                  </p>
                </div>
              )}
            </div>
          )}
          {/* Timer */}
          {activate && timerInSeconds > 0 && (
            <div className="relative z-20 flex w-full shrink-0 justify-end lg:sticky lg:top-[58px]">
              <div className="flex w-full max-w-full flex-row items-center justify-between gap-2 rounded-lg border bg-white/95 p-2 shadow-sm backdrop-blur-sm lg:w-auto lg:max-w-[210px] lg:flex-col lg:items-end lg:p-3">
                <h1 className="mb-0 flex shrink-0 items-center justify-start gap-2 whitespace-nowrap text-xs font-semibold text-blue-950 lg:mb-1 lg:text-base">
                  Time Remaining
                </h1>
                <div className="w-auto lg:w-full">
                  <CountdownTimer
                    initialSeconds={timerInSeconds}
                    compact
                    onTimeUp={() => {
                      setTimeUp(true);
                      try {
                        // auto-submit when timer ends
                        handleSubmit();
                      } catch (e) {}
                    }}
                    storageKey={countdownKey}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Quiz Content */}
          <div className="min-h-0 w-full min-w-0 flex-1 overflow-y-auto overscroll-contain lg:flex-none lg:overflow-visible">
            <div className="flex w-full min-w-0 justify-center">
            {start && (
              <div className="flex w-full min-w-0 justify-center">
                <div className="w-full min-w-0 max-w-[700px] rounded-lg bg-white p-4 shadow-xl sm:p-8">
                  <div className="mb-6">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                      <h1 className="text-sm font-bold text-gray-800">
                        CBT Examination Progress
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
                    <div className="flex max-w-full gap-2 overflow-x-auto pb-2">
                      {readQuestion.map((q, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentQuestion(index)}
                          className={`h-11 w-11 shrink-0 rounded-lg font-semibold transition-all ${
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
                          aria-label={`Go to question ${index + 1}`}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-blue-950">
                        Question {currentQuestion + 1} of {readQuestion?.length}
                      </span>
                      {answers[currentQuestion] !== undefined && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          Answered
                        </span>
                      )}
                    </div>
                    <div className="mb-6 break-words text-2xl font-medium text-gray-800 [overflow-wrap:anywhere] sm:text-4xl">
                      <span className="min-h-[160px] text-lg text-gray-800">
                        <MathRenderer
                          text={ 
                          //  false
                           readQuestion[currentQuestion]?.question?.includes(
                                "https"
                              )
                           ? readQuestion[currentQuestion]?.question
                            .slice(
                              0,
                              readQuestion[currentQuestion]?.question?.indexOf(
                                "https"
                              )
                            )
                            .trim() 
                            :
                            readQuestion[currentQuestion]?.question
                           
                          
                          }
                        />
                      </span>
                    </div>
                    {readQuestion[currentQuestion]?.question.includes(
                      "https"
                    ) && (
                      <img
                        src={`https://${
                          readQuestion[currentQuestion]?.question.split(
                            "https://"
                          )[1]
                        }`}
                        alt="Question illustration"
                        className="h-auto max-w-full object-contain"
                      />
                    )}
                    {/* {readQuestion[currentQuestion]?.images && (
                      <div>
                        <br />
                        {readQuestion[currentQuestion]?.images?.map(
                          (img: string, i: number) => (
                            <img src={img} key={i} className="h-60" />
                          )
                        )}
                        <br />
                      </div>
                    )} */}

                    {/* Options */}
                    <div className="mt-8" />
                    <div
                      // className="space-y-3"
                      className="grid grid-cols-1 sm:grid-cols-1 gap-4"
                    >
                      {getShuffledOptions(
                        readQuestion[currentQuestion],
                        currentQuestion
                      ).map(({ option, originalIndex }, displayIndex) => (
                        <button
                          key={displayIndex}
                          onClick={() => {
                            // Use originalIndex to maintain correct answer tracking
                            handleAnswerSelect(originalIndex);
                            setState((prev) => ({
                              ...prev,
                              [currentQuestion]: option,
                            }));
                          }}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                            answers[currentQuestion] === originalIndex
                              ? "border-blue-950 bg-blue-50"
                              : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex min-w-0 items-start">
                            <div
                              className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 mr-3 ${
                                answers[currentQuestion] === originalIndex
                                  ? "border-blue-950 bg-blue-950"
                                  : "border-gray-300"
                              }`}
                            >
                              {answers[currentQuestion] === originalIndex && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              )}
                            </div>
                            <span className="min-w-0 break-words text-gray-700 [overflow-wrap:anywhere]">
                              {<MathRenderer text={option} />}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handlePrevious}
                      disabled={currentQuestion === 0}
                      className={`flex min-h-11 items-center justify-center rounded-lg px-2 py-2 text-sm transition-colors sm:px-4 ${
                        currentQuestion === 0
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      <ChevronLeft className="w-5 h-5 mr-1" />
                      Previous
                    </button>

                    {currentQuestion === readQuestion?.length - 1 ? (
                      <button
                        onClick={() => {
                          const allAnswered =
                            getAnsweredCount() === readQuestion?.length;
                          if (allAnswered) {
                            handleSubmit();
                          } else {
                            setShowSubmitConfirmModal(true);
                          }
                        }}
                        disabled={isSubmitting || isSubmitted}
                        className={`min-h-11 rounded-lg px-2 py-2 text-sm transition-colors sm:px-6 ${
                          getAnsweredCount() === readQuestion?.length
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-amber-500 text-white hover:bg-amber-600"
                        }`}
                      >
                        {loading ? (
                          <p className="flex gap-2 items-center justify-center">
                            <FaSpinner className="text-white animate-spin " />{" "}
                            <span>Submitting</span>{" "}
                          </p>
                        ) : (
                          "Submit Examination"
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={handleNext}
                        className="flex min-h-11 items-center justify-center rounded-lg bg-blue-950 px-2 py-2 text-sm text-white transition-colors hover:bg-blue-900 sm:px-4"
                      >
                        Next
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </button>
                    )}
                  </div>

                  {currentQuestion === readQuestion?.length - 1 &&
                    getAnsweredCount() !== readQuestion?.length && (
                      <p className="text-center text-sm text-red-500 font-semibold uppercase mt-4">
                        Please Note that, one or more <br />
                        questions are unanswered.
                      </p>
                    )}
                </div>
              </div>
            )}
            </div>
          </div>
        </div>
      )}
      {/* Submit confirmation modal - shown when some questions are unanswered */}
      {showSubmitConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mx-4 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-white p-4 shadow-xl sm:p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Confirm Submission
            </h3>
            <p className="text-gray-600 mb-6">
              You have {readQuestion?.length - getAnsweredCount()} unanswered
              question(s). Are you sure you want to submit the exam?
            </p>
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-4">
              <Button
                className="w-full rounded-md bg-gray-300 px-6 py-2 text-gray-700 transition-colors duration-300 hover:bg-gray-400 !text-[14px] sm:w-auto"
                name="Cancel"
                onClick={() => setShowSubmitConfirmModal(false)}
              />
              <Button
                className="w-full rounded-md bg-green-600 px-6 py-2 text-white transition-colors duration-300 hover:bg-green-700 !text-[14px] sm:w-auto"
                name={
                  loading ? (
                    <span className="flex gap-2 items-center justify-center">
                      <FaSpinner className="animate-spin text-white " />{" "}
                      Sending...
                    </span>
                  ) : (
                    "Confirm & Submit"
                  )
                }
                disabled={isSubmitting || isSubmitted}
                onClick={() => {
                  setShowSubmitConfirmModal(false);
                  handleSubmit();
                }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ExaminationTestScreen;
