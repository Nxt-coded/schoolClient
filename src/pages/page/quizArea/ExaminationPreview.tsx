import { useState, useEffect } from "react";
import { isAnswerMatched } from "../../../lib/utils";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@/components/reUse/Button";
import LittleHeader from "@/components/layout/LittleHeader";

import toast, { Toaster } from "react-hot-toast";

import CountdownTimer from "../../../components/static/CountdownTimer";
import { MdOutlineTimer } from "react-icons/md";
import { useExam, useExamination, useQuiz } from "@/pagesForTeachers/hooks/useTeacher";

function MathRenderer({ text }) {
  if (!text) return null;

  const str = String(text);

  // Parse all math notations recursively
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
          // Only treat as determinant if it contains semicolon (matrix format)
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

        // Extract base (can be a single character, word, or number)
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

      // Check for subscript: base_(subscript)
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

  // Helper function to find matching closing parenthesis
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
      <span className="inline-flex items-center mx-0.5">
        <span className="text-2xl font-thin leading-none">|</span>
        <span
          className="inline-grid gap-x-3 gap-y-1 px-2"
          style={{
            gridTemplateColumns: `repeat(${colCount}, auto)`,
            gridTemplateRows: `repeat(${rows.length}, auto)`,
          }}
        >
          {cells.map((cell) => (
            <span key={cell.key} className="text-center">
              {cell.value}
            </span>
          ))}
        </span>
        <span className="text-2xl font-thin leading-none">|</span>
      </span>
    );
  }

  function renderPart(part) {
    if (part.type === "fraction") {
      return (
        <span
          className="inline-flex flex-col items-center mx-0.5 text-sm leading-tight align-middle"
          style={{ verticalAlign: "middle" }}
        >
          <span className="px-1 border-b border-current">
            <MathRenderer text={part.numerator} />
          </span>
          <span className="px-1">
            <MathRenderer text={part.denominator} />
          </span>
        </span>
      );
    }

    if (part.type === "superscript") {
      return (
        <span className="inline-flex items-start">
          <span>
            <MathRenderer text={part.base} />
          </span>
          <span
            className="text-[0.7em] ml-[0.1em]"
            style={{ marginTop: "-0.3em" }}
          >
            <MathRenderer text={part.sup} />
          </span>
        </span>
      );
    }

    if (part.type === "subscript") {
      return (
        <span className="inline-flex items-end">
          <span>
            <MathRenderer text={part.base} />
          </span>
          <span
            className="text-[0.7em] ml-[0.1em]"
            style={{ marginBottom: "-0.1em" }}
          >
            <MathRenderer text={part.sub} />
          </span>
        </span>
      );
    }

    if (part.type === "sqrt") {
      return (
        <span className="inline-flex items-center mx-0.5">
          <span className="text-lg">√</span>
          <span className="border-t border-current px-1">
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
    <span className="inline-flex items-center flex-wrap">
      {parsed.map((part, index) => (
        <main key={index} className="">
          {renderPart(part)}
        </main>
      ))}
    </span>
  );
}

const ExaminationPreviewScreen = () => {
  const navigate = useNavigate();
  const { quizID, subjectID } = useParams();
  const { quizData } = useQuiz(quizID!);
  // Load the exam directly by its ID so term-based filtering doesn't interfere
  const { examData: examination } = useExam(quizID!);

  const [state, setState] = useState<any>({});
  const [start, setStart] = useState<boolean>(false);
  const [activate, setActivate] = useState<boolean>(false);
  const [timeUp, setTimeUp] = useState<boolean>(false);

  // Pagination for questions (10 per page)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const PAGE_SIZE = 10;

  // Reset page when examination data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [examination]);

  const courseID = quizData?.subjectID;

  const handleStateChange = (questionIndex: any, optionValue: any) => {
    setState((prev: any) => ({
      ...prev,
      [questionIndex]: optionValue.toLowerCase().trim(),
    }));
  };

  const handleSubmit = () => {
    navigate(`/subjects/${subjectID}`);
  };
  // const percentage = Math.ceil((score / correctAnswers.length) * 100);

  const getQuizData = quizData?.quiz[1];

  const timer = parseInt(quizData?.quiz[0]?.instruction?.duration);
  const timerInSeconds = timer * 3600;

  // Prepare question list and pagination
  const questions: any[] =
    examination?.quiz?.question && Array.isArray(examination.quiz.question)
      ? examination.quiz.question
      : [];

  const totalQuestions = questions.length;
  const totalPages = Math.max(1, Math.ceil(totalQuestions / PAGE_SIZE));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pagedQuestions = questions.slice(startIndex, startIndex + PAGE_SIZE);

  // Navigate to a page and smoothly scroll to top (guard against SSR)
  const goToPage = (newPage: number) => {
    setCurrentPage(newPage);
    if (typeof window !== "undefined" && window?.scrollTo) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Helper to generate page buttons, using ellipses when many pages
  const getPageButtons = (total: number, current: number) => {
    const maxButtons = 7; // including first and last (with ellipses)
    if (total <= maxButtons) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const left = Math.max(2, current - 2);
    const right = Math.min(total - 1, current + 2);
    const pages: Array<number | string> = [1];

    if (left > 2) pages.push("...");

    for (let p = left; p <= right; p++) pages.push(p);

    if (right < total - 1) pages.push("...");
    pages.push(total);
    return pages;
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={true} />
      <LittleHeader
        name={examination?.subjectTitle ? `${examination.subjectTitle} Examination Preview Screen` : "Loading..."}
      />

      <div className="relative">
        {/* Timer */}
        <div className="sticky flex top-[70px] justify-end items-center">
          <div className="sticky min-w-[230px] p-3 bg-blue-50 border shadow-sm rounded-lg flex justify-center items-end flex-col">
            <h1 className="mb-1 text-blue-950 font-semibold flex items-center justify-start gap-2">
              Mid Test Count Down Timer <MdOutlineTimer />
            </h1>
            {activate && timerInSeconds ? (
              <div>
                <CountdownTimer
                  initialSeconds={timerInSeconds}
                  onTimeUp={() => setTimeUp(true)}
                />
              </div>
            ) : null}
          </div>
        </div>

        {/* Quiz Content */}
        <div className="bg-slate-50 justify-center flex min-h-[100vh]">
          <div className="bg-white w-full px-5">
            {/* {quest?.map( */}
            {pagedQuestions.map((question: any, idx: number) => {
              const index = startIndex + idx;
              return (
                <div key={index}>
                  <p className="text-[14px] font-bold mt-10">
                    Question {index + 1}.
                  </p>
                  <div className="ml-4">
                    <div className="mb-4">
                      <span className="font-semibold text-gray-700 mr-2">
                        {index + 1}.
                      </span>
                      <span className="text-lg text-gray-800">

                        <MathRenderer
                          text={question?.question.includes("https") ? question.question
                            .slice(0, question?.question.indexOf("https"))
                            .trim() : question.question
                            
                          }
                        />
                      </span>
                    </div>

                    {question?.images && (
                      <div>
                        <br />
                        {question?.images?.map((img: string, i: number) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            key={i}
                            src={img}
                            alt={`question-${index}-img-${i}`}
                          />
                        ))}
                        <br />
                      </div>
                    )}

                    {question?.question.includes("https") && (
                      <img
                        src={`https://${
                          question?.question.split("https://")[1]
                        }`}
                      />
                    )}

                    <div className="ml-8">
                      <p className="text-[12px] mt-5">
                        Choose your options carefully
                      </p>
                      <p className="text-[12px] mb-5 font-semibold">
                        Correct Answer: {question?.answer}
                      </p>

                      <div className="space-y-2 ml-6 flex flex-col max-w-[600px]">
                        {question.options.map((opt, optIdx) => {
                          const isCorrect = isAnswerMatched(opt, question.answer);
                          return (
                            <div
                              key={optIdx}
                              className={`p-3 rounded ${
                                isCorrect
                                  ? "bg-green-50 border border-green-300"
                                  : "bg-gray-50 border border-gray-200"
                              }`}
                            >
                              <span className="font-semibold mr-2 text-gray-700">
                                {String.fromCharCode(65 + optIdx)}.
                              </span>
                              <span
                                className={
                                  isCorrect
                                    ? "text-green-800 font-medium"
                                    : "text-gray-700"
                                }
                              >
                                <MathRenderer text={opt} />
                                {isCorrect && (
                                  <span className="ml-2 text-green-600">✓</span>
                                )}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Pagination controls */}
            <div className="mt-20" />
            <div className="flex items-center justify-between my-6">
              <div>
                <button
                  className="px-4 py-2 bg-gray-100 rounded mr-2 disabled:opacity-50"
                  onClick={() => goToPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage <= 1}
                >
                  Previous
                </button>
                <button
                  className="py-2 bg-blue-100 px-10 rounded disabled:opacity-50"
                  onClick={() =>
                    goToPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage >= totalPages}
                >
                  Next
                </button>
              </div>
              <div className="flex items-center gap-2">
                {getPageButtons(totalPages, currentPage).map((p, i) =>
                  typeof p === "string" ? (
                    <span key={i} className="px-2 text-gray-400">
                      {p}
                    </span>
                  ) : (
                    <button
                      key={i}
                      onClick={() => goToPage(p as number)}
                      aria-current={p === currentPage}
                      className={`px-3 py-1 rounded ${
                        p === currentPage
                          ? "bg-blue-950 text-white"
                          : "bg-gray-100 text-gray-700"
                      } hover:bg-blue-100`}
                    >
                      {p}
                    </button>
                  )
                )}
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-3">
                <div className="text-sm text-gray-600 ml-4">
                  Page {currentPage} of {totalPages}
                </div>
              </div>
            </div>

            <div className="border-r mt-10 w-full h-[10px] bg-red-30">
              <hr />
            </div>
            <div className="text-[16px] italic font-semibold">Section B </div>

            {examination?.quiz?.theory ? (
              <p
                className="mt-5 text-blue-950 text-[16px"
                dangerouslySetInnerHTML={{
                  __html: examination.quiz.theory,
                }}
              />
            ) : null}

            {/* <p>{examination?.quiz?.theory}</p> */}

            <div>
              <Button
                className="bg-blue-950 px-12 mt-14 py-4"
                name="Go Back"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExaminationPreviewScreen;
