import { useParams } from "react-router-dom";
import LittleHeader from "../../../components/layout/LittleHeader";
import { useEffect, useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import QuizLoad from "../../static/QuizLoad";
import Button from "../../../components/reUse/Button";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { getOneHistory } from "../../api/studentAPI";
import { BsX } from "react-icons/bs";

const Correction = () => {
  const { subject, year, cbtID } = useParams();
  const [sevenData, setSevenData] = useState<any>(null);
  const [chosenAnswers, setChosentAnswers] = useState([]);
  const [state, setState] = useState(0);
  let correctAnswer: Array<string> = [];

  const getNumberOfQuestions = (): number => {
    return sevenData?.data?.length > 60 ? 60 : sevenData?.data?.length;
  };

  for (let i = 0; i < getNumberOfQuestions(); i++) {
    correctAnswer.push(sevenData?.data[i]?.answer);
  }

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

    getOneHistory(cbtID).then((res: any) => {
      setChosentAnswers(Object.entries(res?.data?.chosenAnswers));
    });
  }, [subject, year]);

  if (!sevenData || !sevenData.data || sevenData.data.length === 0) {
    return <QuizLoad />;
  }

  const questions: any[] = Object.entries(sevenData.data[state]?.option || {});

  return (
    <div>
      <LittleHeader name={`${subject} Correction`} />

      <div className="w-full grid grid-cols-8 text-blue-950">
        <div className="col-span-8 ">
          <div className="flex flex-col items-start">
            <div className="px-4 py-2 rounded-lg bg-gray-100 text-blue-950">
              Question {state + 1} -{" "}
              {chosenAnswers.some(
                (chosen) =>
                  chosen[0] === state.toString() &&
                  chosen[1] === correctAnswer[state]
              ) ? (
                <span className="text-green-500">Correct</span>
              ) : (
                <span className="text-red-500">Incorrect</span>
              )}
            </div>
          </div>

          <div className="text-blue-950 my-5">
            {typeof sevenData?.data[state]?.question !== "undefined" ? (
              <>
                <span className="font-bold">Instruction: </span>{" "}
                {sevenData?.data[state]?.section}
                <div
                  dangerouslySetInnerHTML={{
                    __html: sevenData?.data[state]?.question,
                  }}
                />{" "}
              </>
            ) : (
              ""
            )}
          </div>

          <div className="space-y-4">
            {questions &&
              questions.map((el: any) => (
                <div className="flex items-center gap-6" key={el[0]}>
                  <div className="text-[20px] capitalize font-bold">
                    {el[0]!}
                  </div>
                  <div className="flex gap-4">
                    {el[1]!}{" "}
                    {correctAnswer[state] === el[0] ? (
                      <GiCheckMark className="text-green-500" size={20} />
                    ) : (
                      <BsX className="text-red-500" size={20} />
                    )}
                  </div>
                </div>
              ))}
          </div>

          <div className="w-full bg-gray-100 min-h-[100px] mt-10 rounded-lg p-4">
            <h3 className="text-[20px] font-bold">Explanation</h3>
            <p className="mt-3">
              {sevenData?.data[state]?.solution
                ? sevenData?.data[state]?.solution
                : `The answer is ${sevenData?.data[
                    state
                  ]?.answer.toUpperCase()}`}
            </p>
          </div>

          <div className="w-full flex mt-10 justify-between">
            <Button
              className="text-blue-950"
              name="Previous"
              icon={<GrFormPrevious />}
              onClick={() =>
                setState((num: number) => (num > 0 ? num - 1 : num))
              }
            />
            <Button
              className="text-blue-950 flex-row-reverse gap-5"
              name="Next"
              icon={<GrFormNext />}
              onClick={() =>
                setState((num: number) => (num < 59 ? num + 1 : num))
              }
            />
          </div>

          <div className="mt-10">
            <h5 className="text-[16px]  font-bold">
              {getNumberOfQuestions()} of {getNumberOfQuestions()} Attempted
            </h5>

            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-10 2xl:grid-cols-11 gap-4 mt-4 justify-center text-center">
              {correctAnswer.map((el: any, i: number) => (
                <div
                  onClick={() => setState(i)}
                  className={`rounded-lg border-[2px] cursor-pointer p-2 py-2 ${
                    chosenAnswers.some(
                      (chosen) =>
                        chosen[0] === i.toString() &&
                        chosen[1] === correctAnswer[i]
                    )
                      ? "bg-green-400 border-green-700"
                      : "bg-[#ff0000a5] text-white border-red-900"
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Correction;
