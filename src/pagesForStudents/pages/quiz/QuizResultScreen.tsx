// src/pages/Student/QuizResultScreen.tsx

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isAnswerMatched } from "../../../lib/utils";
import Button from "../../../components/reUse/Button";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useStudentInfo } from "../../hooks/useStudentHook";

import {
  CheckCircle,
  XCircle,
  Clock,
  Award,
  TrendingUp,
  BookOpen,
} from "lucide-react";

const QuizResultScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { correctAnswers, studentAnswers, score, total } = location.state;
  const [animate, setAnimate] = useState(false);
  const { studentInfo } = useStudentInfo();

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  const BackOn = () => {
    navigate(-2);
  };

  // const examData = {
  //   score: 85,
  //   totalQuestions: 50,
  //   correctAnswers: 43,
  //   wrongAnswers: 7,
  //   timeSpent: "45:23",
  //   passingScore: 70,
  //   grade: "A",
  //   subjects: [
  //     { name: "Mathematics", score: 90, questions: 15 },
  //     { name: "English", score: 88, questions: 15 },
  //     { name: "Science", score: 78, questions: 10 },
  //     { name: "General Knowledge", score: 85, questions: 10 },
  //   ],
  // };

  const passed = (score / total) * 100 >= 65;
  const [animateScore, setAnimateScore] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  console.log(correctAnswers, studentAnswers, score, total);

  useEffect(() => {
    const timer = setTimeout(() => setShowDetails(true), 500);
    const scoreTimer = setInterval(() => {
      setAnimateScore(() => {
        clearInterval(scoreTimer);
        return (score / total) * 100;
      });
    }, 20);

    return () => {
      clearTimeout(timer);
      clearInterval(scoreTimer);
    };
  }, [score]);

  return (
    <div
      className={`min-h-screen flex flex-col bg-gray-100 transition-opacity duration-700 ${
        animate ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Header */}
      {/* <header className="bg-blue-950 text-white p-4 shadow-lg rounded-md">
        <h1 className="text-2xl font-bold text-center">My Test Results</h1>
      </header> */}

      {/* new */}

      <div className="w-full lg:max-w-4xl mx-auto pt-10">
        {/* Header Section */}
        <div className="text-center mb-8 animate-fade-in">
          <div
            className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${
              passed ? "bg-green-100" : "bg-red-100"
            } shadow-lg transform transition-all duration-500 hover:scale-110`}
          >
            {passed ? (
              <CheckCircle className="w-12 h-12 text-green-600" />
            ) : (
              <XCircle className="w-12 h-12 text-red-600" />
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            {passed ? "Congratulations!" : "Keep Trying!"}
          </h1>
          <p className="text-gray-600 text-lg">
            {passed
              ? "You passed the exam with flying colors!"
              : "You can retake the exam to improve your score"}
          </p>
        </div>

        {/* Score Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6 transform transition-all duration-500 hover:shadow-3xl">
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke={passed ? "#10b981" : "#ef4444"}
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${
                    2 * Math.PI * 88 * (1 - animateScore / 100)
                  }`}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div>
                  <div className="text-5xl font-bold text-gray-800">
                    {animateScore}%
                  </div>
                  <div className="text-2xl font-semibold text-gray-600">
                    Grade
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          {showDetails && (
            <div className="grid grid-cols-2 md:grid-cols-2 w-full gap-4 animate-fade-in">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 text-center transform transition-all hover:scale-105">
                <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-900">{score}</div>
                <div className="text-sm text-blue-700">Correct</div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-4 text-center transform transition-all hover:scale-105">
                <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-red-900">
                  {total - score}
                </div>
                <div className="text-sm text-red-700">Wrong</div>
              </div>

              {/* <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 text-center transform transition-all hover:scale-105">
                <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-900">
                  {examData.timeSpent}
                </div>
                <div className="text-sm text-purple-700">Time</div>
              </div> */}

              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-4 text-center transform transition-all hover:scale-105 col-span-2 ">
                <BookOpen className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-amber-900">{total}</div>
                <div className="text-sm text-amber-700">Questions</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <main className="flex flex-col mt-8 transition-all duration-300 items-center px-4">
        <p className="text-lg mt-4 font-medium text-gray-700">
          You scored{" "}
          <span className="text-green-600 font-bold text-2xl">{score}</span> out
          of <span className="text-blue-600 font-bold text-2xl">{total}</span>
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {correctAnswers.map((correctAnswer: any, index: any) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-md border-l-4 ${
                isAnswerMatched(studentAnswers[index], correctAnswer)
                  ? "border-green-500 bg-green-50"
                  : "border-red-500 bg-red-50"
              } transition-transform duration-500 hover:scale-105`}
            >
              <div className="flex justify-between items-center">
                <h2 className="lg:text-xl text-[18px] font-semibold text-blue-950 underline">
                  Question {index + 1}
                </h2>
                {isAnswerMatched(studentAnswers[index], correctAnswer) ? (
                  <FaCheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <FaTimesCircle className="h-6 w-6 text-red-500" />
                )}
              </div>
              <p
                className={`mt-1 text-[14px] font-medium ${
                  isAnswerMatched(studentAnswers[index], correctAnswer)
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                <span className="text-gray-600">Your Answer:</span>{" "}
                {studentAnswers[index] || "No answer selected"}
              </p>
              <p className="mt-2 text-[16px] md:text-[18px]">
                <span className="font-semibold text-gray-600">
                  Correct Answer:
                </span>{" "}
                <span className="font-semibold text-green-600">
                  {correctAnswer}
                </span>
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Button */}
      <footer className="flex justify-center mt-auto mb-8">
        <Button
          className="bg-blue-950 mt-8 px-8 py-3 text-white rounded-full shadow-md hover:bg-blue-800 transition-colors duration-300"
          name="🔙 view quiz"
          onClick={BackOn}
        />
      </footer>
    </div>
  );
};

export default QuizResultScreen;
