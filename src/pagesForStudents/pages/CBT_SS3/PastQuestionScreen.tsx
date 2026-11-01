import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/reUse/Button";
import LittleHeader from "../../../components/layout/LittleHeader";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import { createPastQuestionHistory } from "../../api/studentAPI";
import { useStudentInfo } from "../../hooks/useStudentHook";
import { MdPlayCircle } from "react-icons/md";

const PastQuestionScreen = () => {
  const { studentInfo } = useStudentInfo();

  var { subject } = useParams();
  var { year } = useParams();

  const [start, setStart] = useState(false);
  const [sevenData, setSevenData] = useState(null);

  let now: any = new Date().getHours();
  let duration: any = new Date().setHours(now + 1);
  duration = moment(duration).format("LLLL");

  const [minute, setMinute] = useState(59);
  const [second, setSecond] = useState(59);

  let intervalId: any;

  const startTest = () => {
    intervalId = setInterval(() => {
      setSecond((prevSecond) => {
        if (prevSecond > 0) {
          return prevSecond - 1;
        } else {
          if (minute > 0) {
            setMinute((prevMinute) => prevMinute - 1);
            return 59;
          } else {
            clearInterval(intervalId);
            handleSubmit();
            return 0;
          }
        }
      });
    }, 1000);

    setStart(true);
  };

  useEffect(() => {
    const importSevenData = async () => {
      try {
        const { default: seven } = await import(
          `./subjects/${subject}/${year}.json`
        );
        setSevenData(seven);
      } catch (error) {
        return error;
      }
    };

    importSevenData();
  }, [subject, year]);

  const navigate = useNavigate();
  const [state, setState] = useState<any>({});

  const handleStateChange = (questionValue: any, optionValue: any) => {
    setState((el: any) => ({
      ...el,
      [questionValue]: optionValue,
    }));
  };

  const handleSubmit = () => {
    let correctAnswer: Array<string> = [];
    let score: number = 0;
    let percentage: number = 0;
    let remark: string = "";
    let grade: string = "";

    for (let i = 0; i < sevenData?.data.length; i++) {
      correctAnswer.push(sevenData?.data[i].answer);
      if (correctAnswer[i] === Object.values(state)[i]) {
        score++;
      }
    }
    percentage = Math.ceil((score / sevenData?.data.length) * 100);
    if (percentage >= 0 && percentage <= 45) {
      remark = "Very very poor Performance!";
    } else if (percentage >= 46 && percentage <= 55) {
      remark = "A Poor Performance!";
    } else if (percentage >= 56 && percentage <= 65) {
      remark = "A Good Performance, can still do Better!";
    } else if (percentage >= 66 && percentage <= 75) {
      remark = "Congratulation.... A Good Performance, Keep it Up!";
    } else if (percentage >= 76 && percentage <= 85) {
      remark = "Congratulation.... An Very Good Performance, Keep it Up!";
    } else if (percentage >= 86 && percentage <= 100) {
      remark = "Congratulation.... An Excellent Performance, Keep it Up!";
    }

    if (percentage >= 0 && percentage <= 45) {
      grade = "F";
    } else if (percentage >= 46 && percentage <= 55) {
      grade = "E";
    } else if (percentage >= 56 && percentage <= 65) {
      grade = "D";
    } else if (percentage >= 66 && percentage <= 75) {
      grade = "C";
    } else if (percentage >= 76 && percentage <= 85) {
      grade = "B";
    } else if (percentage >= 86 && percentage <= 100) {
      grade = "A";
    }

    createPastQuestionHistory(studentInfo?._id, {
      subject,
      year,
      percent: percentage,
      score,
      chosenAnswers: state,
    }).then((res) => {
      if (res.status === 201) {
        toast.success(`Remark: ${remark}`);
        setTimeout(() => {
          navigate(`/${subject}/${year}/${res?.data?._id}`);
        }, 2000);
      } else {
        toast.error("Something went wrong");
      }
    });

    clearInterval(intervalId);
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={true} />

      <div className="relative w-full h-full">
        <>
          <LittleHeader name={`${subject.toUpperCase()} ${year} Test Screen`} />

          <div className="relative">
            <div className="fixed rounded-full md:w-[70px] md:h-[70px] flex justify-center items-center w-[70px] h-[70px] border-[8px] top-56 right-4 ">
              {`${minute}:${second < 10 ? "0" : ""}${second}`}
            </div>

            <div className="bg-white justify-center flex min-h-[100vh]">
              <div className=" bg-white w-[90%] px-5">
                {sevenData?.data
                  ?.sort((a, b) => {
                    return a.questionNumber - b.questionNumber;
                  })
                  ?.map((props: any, index: number) => (
                    <div>
                      <p className="text-[14px] font-bold mt-10">
                        Question Number {index + 1}:
                      </p>
                      <i className="text-blue-950">
                        {props?.section && (
                          <>
                            <p className="text-[13px]">
                              <span className="font-semibold uppercase">
                                {props?.examtype}
                              </span>{" "}
                              Question:
                            </p>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: props?.section,
                              }}
                            />
                          </>
                        )}
                      </i>
                      <div className="ml-4 ">
                        <p
                          className="text-[18px]"
                          dangerouslySetInnerHTML={{
                            __html: props?.question,
                          }}
                        ></p>

                        <div className="ml-8">
                          <p className="text-[12px] mt-5">
                            Choose your Options carefully
                          </p>
                          {Object.entries(props.option).map(
                            (props: any, i: number) => {
                              const choice: any = props[0];

                              let val: string = props[1];

                              return (
                                <>
                                  <div
                                    key={i}
                                    className="flex items-center gap-2 ml-4"
                                  >
                                    <input
                                      className="radio radio-sm"
                                      type="radio"
                                      onChange={() => {
                                        handleStateChange(index, choice);
                                      }}
                                      id={`${index} - ${choice}`}
                                      value={`${choice}`}
                                      checked={state[index] === choice}
                                    />
                                    <label htmlFor={`${index} - ${choice}`}>
                                      {val}
                                    </label>
                                  </div>
                                </>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                  .splice(0, 60)}

                <div>
                  <Button
                    className="bg-blue-950 px-12 mt-14 py-4 "
                    name={"Submit"}
                    onClick={() => {
                      handleSubmit();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </>

        {!start && (
          <div className="fixed top-0 left-0 z-10 backdrop-blur-sm  w-full h-full flex flex-col items-center justify-start pt-32 pl-0 md:pl-52">
            <LittleHeader name={`Commence ${subject} ${year} Test`} />
            <MdPlayCircle
              size={200}
              className="cursor-pointer text-red-500 hover:text-red-600 transition-all duration-300"
              onClick={() => {
                if (!document.startViewTransition) {
                  setStart(true);
                  startTest();
                } else {
                  document.startViewTransition(() => {
                    setStart(true);
                    startTest();
                  });
                }
              }}
            />
            <p className="font-bold w-[70%] text-center mt-5 ">
              {/* Push Play to start your Test */}
              Please click on the Play Button to begin test, duration is 1hr
              <br />
              <br />
              <span className="text-[25px]">All the Best</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PastQuestionScreen;
