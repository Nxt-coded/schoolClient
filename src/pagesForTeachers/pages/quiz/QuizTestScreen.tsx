import { useState } from "react";
import LittleHeader from "../../components/layout/LittleHeader";
import Button from "../../components/reUse/Button";
import { useParams } from "react-router-dom";
import { useQuiz, useSujectQuiz } from "../../hooks/useTeacher";
import { MdPlayArrow, MdPlayCircle } from "react-icons/md";

interface TestDetails {
  question: string;
  answer: string;
  options: { [key: string]: string }[];
}

interface iTestProps {
  id: number;
  subjectTest: string;
  time: string;
  testDetails: TestDetails[];
  gradeScore: number;
}

const testData: iTestProps = {
  id: 2,
  subjectTest: "Maths Test1",
  time: "2hrs",

  testDetails: [
    {
      question: "Who is the President of Nigeria",
      answer: "Buhari",
      options: [
        { a: "Obasenjo" },
        { b: "Buhari" },
        { c: "Goodluck" },
        { d: "Peter" },
      ],
    },
    {
      question: "Who is the President of Nigeria",
      answer: "Buhari",
      options: [
        { a: "James" },
        { b: "Buhari" },
        { c: "Goodluck" },
        { d: "Peter" },
      ],
    },
    {
      question: "Who is the President of Nigeria",
      answer: "Buhari",
      options: [
        { a: "Obasenjo" },
        { b: "Buhari" },
        { c: "Goodluck" },
        { d: "Peter" },
      ],
    },
    {
      question: "Who is the President of Nigeria",
      answer: "Buhari",
      options: [
        { a: "Obasenjo" },
        { b: "Buhari" },
        { c: "Goodluck" },
        { d: "Peter" },
      ],
    },
    {
      question: "Who is the President of Nigeria",
      answer: "Buhari",
      options: [
        { a: "Obasenjo" },
        { b: "Buhari" },
        { c: "Goodluck" },
        { d: "Peter" },
      ],
    },
    {
      question: "Who is the President of Nigeria",
      answer: "Buhari",
      options: [
        { a: "Obasenjo" },
        { b: "Buhari" },
        { c: "Goodluck" },
        { d: "Peter" },
      ],
    },
  ],
  gradeScore: 5,
};

const QuizTestScreen = () => {
  const { quizID } = useParams();
  const [state, setState] = useState<any>({});
  const { quizData } = useQuiz(quizID!);
  const [start, setStart] = useState<boolean>(false);

  const handleStateChange = (questionValue: any, optionValue: any) => {
    setState((el: any) => ({
      ...el,
      [questionValue]: optionValue,
    }));
  };

  const handleSubmit = () => {
    let correctAnswer: Array<string> = [];
    let score: number = 0;

    for (let i = 0; i < quizData?.quiz[1]?.question?.length; i++) {
      correctAnswer.push(quizData?.quiz[1]?.question[i].answer);
      if (correctAnswer[i] === Object.values(state)[i]) {
        score++;
      }
    }
  };

  return (
    <div>
      <LittleHeader name={`${quizData?.subjectTitle} Test Screen`} />
      <div className="relative">
        {!start && (
          <div className="absolute top-20 left-1/3 z-10 ">
            <MdPlayCircle
              size={200}
              className="cursor-pointer"
              onClick={() => {
                if (!document.startViewTransition) {
                  setStart(true);
                } else {
                  document.startViewTransition(() => {
                    setStart(true);
                  });
                }
              }}
            />
            <p className="font-bold">Push Play to start your Test</p>
          </div>
        )}
        <div className="bg-slate-50 justify-center flex min-h-[100vh]">
          {start ? (
            <div className=" bg-white w-full px-5">
              {quizData?.quiz[1]?.question?.map((props: any, index: number) => (
                <div>
                  <p className="text-[14px] font-bold mt-10">
                    Question {index + 1}.
                  </p>
                  <div className="ml-4 ">
                    <p className="text-[18px]">{props.question}</p>

                    <div className="ml-8">
                      <p className="text-[12px] mt-5">
                        Choose your Options carefully
                      </p>
                      {props.options.map((props: any, i: number) => {
                        const choiceValue = Object.values(props)[0];
                        const choice: any = Object.keys(props)[0];

                        let val: string = "";

                        if (typeof props === "string") {
                          val = props.split(",")[choice];
                        }

                        return (
                          <div key={i} className="flex items-center gap-2 ml-4">
                            <input
                              className="radio radio-sm"
                              type="radio"
                              onChange={() => {
                                handleStateChange(index, val);
                              }}
                              id={`${index} - ${choice}`}
                              value={`${val}`}
                              checked={state[index] === val}
                            />
                            <label htmlFor={`${index} - ${choice}`}>
                              {val}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}

              <div>
                <Button
                  className="bg-blue-950 px-12 mt-14 py-4 "
                  name={"Submit"}
                  onClick={handleSubmit}
                />
              </div>
            </div>
          ) : (
            <div className="relative blur-sm bg-white w-full px-5">
              {quizData?.quiz[1]?.question?.map((props: any, index: number) => (
                <div>
                  <p className="text-[14px] font-bold mt-10">
                    Question {index + 1}.
                  </p>
                  <div className="ml-4 ">
                    <p className="text-[18px]">{props.question}</p>

                    <div className="ml-8">
                      <p className="text-[12px] mt-5">
                        Choose your Options carefully
                      </p>
                      {props.options.map((props: any, i: number) => {
                        const choiceValue = Object.values(props)[0];
                        const choice: any = Object.keys(props)[0];

                        let val: string = "";

                        if (typeof props === "string") {
                          val = props.split(",")[choice];
                        }

                        return (
                          <div key={i} className="flex items-center gap-2 ml-4">
                            <input
                              className="radio radio-sm"
                              type="radio"
                              onChange={() => {
                                handleStateChange(index, val);
                              }}
                              id={`${index} - ${choice}`}
                              value={`${val}`}
                              checked={state[index] === val}
                            />
                            <label htmlFor={`${index} - ${choice}`}>
                              {val}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}

              <div>
                <Button
                  className="bg-blue-950 px-12 mt-14 py-4 "
                  name={"Submit"}
                  onClick={handleSubmit}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizTestScreen;
