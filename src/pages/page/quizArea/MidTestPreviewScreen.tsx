import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@/components/reUse/Button";
import LittleHeader from "@/components/layout/LittleHeader";
import {
  useExamination,
  useMidTest,
  useQuiz,
} from "../../../pagesForTeachers/hooks/useTeacher";
import toast, { Toaster } from "react-hot-toast";

import CountdownTimer from "../../../components/static/CountdownTimer";
import { MdOutlineTimer } from "react-icons/md";
import { useStudentPerfomance } from "../../../pagesForTeachers/hooks/useQuizHook";

const MidTestPreviewScreen = () => {
  const navigate = useNavigate();
  const { quizID, subjectID } = useParams();
  const { quizData } = useQuiz(quizID!);

  //   const { examination } = useExamination(subjectID!);
  const { midTest: examination } = useMidTest(subjectID!);

  const [state, setState] = useState<any>({});
  const [start, setStart] = useState<boolean>(false);
  const [activate, setActivate] = useState<boolean>(false);
  const [timeUp, setTimeUp] = useState<boolean>(false);

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

  const markPerQuest = quizData?.quiz[0]?.instruction?.mark;
  const getQuizData = quizData?.quiz[1];

  const totalquest = getQuizData?.question?.length;

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

  const myQuizData = quizData?.quiz[1];

  const timer = parseInt(quizData?.quiz[0]?.instruction?.duration);
  const timerInSeconds = timer * 3600;


  return (
    <div>
      <Toaster position="top-center" reverseOrder={true} />
      <LittleHeader
        name={`${examination?.subjectTitle} Mid Test Preview Screen`}
      />

      <div className="relative">
        {/* Timer */}
        <div className="sticky flex top-[70px] justify-end items-center">
          <div className="sticky min-w-[230px] p-3 bg-blue-50 border shadow-sm rounded-lg flex justify-center items-end flex-col">
            <h1 className="mb-1 text-blue-950 font-semibold flex items-center justify-start gap-2">
              Test Count Down Timer <MdOutlineTimer />
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
            {examination?.quiz?.question?.map(
              (question: any, index: number) => (
                <div key={index}>
                  <p className="text-[14px] font-bold mt-10">
                    Question {index + 1}.
                  </p>
                  <div className="ml-4">
                    <div className="text-[18px]" dangerouslySetInnerHTML={{ __html: question?.question }} />

                    {question?.images && (
                      <div>
                        <br />
                        {question?.images?.map((img: string, i: number) => (
                          <img src={img} />
                        ))}
                        <br />
                      </div>
                    )}
                    <div className="ml-8">
                      <p className="text-[12px] mt-5">
                        Choose your options carefully
                      </p>
                      <p className="text-[12px] mb-5 font-semibold">
                        Correct Answer: {question?.answer}
                      </p>
                      {question?.options?.map((el: any, i: number) => (
                        <div>
                          {el !== "" && (
                            <div
                              key={i}
                              className="flex items-center gap-2 ml-4"
                            >
                              <input
                                className="radio radio-sm"
                                type="radio"
                                onChange={() => handleStateChange(index, el)}
                                checked={state[index] === el}
                              />
                              <label dangerouslySetInnerHTML={{ __html: typeof el === "string"
                                  ? el
                                  : JSON.stringify(el) }} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            )}

            <div className="border-r mt-10 w-full h-[10px] bg-red-30">
              <hr />
            </div>
            <div className="text-[16px] italic font-semibold">Section B </div>

            <div
              className="mt-5"
              dangerouslySetInnerHTML={{
                __html: `${examination?.quiz?.theory}`,
              }}
            />
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

export default MidTestPreviewScreen;
