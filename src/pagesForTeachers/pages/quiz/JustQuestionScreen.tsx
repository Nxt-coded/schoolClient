import { useState } from "react";
import Button from "../../components/reUse/Button";
import Input from "../../components/reUse/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  addTestQuestion,
  displayEmptyTest,
  updateTestQuestion,
} from "../../../global/reduxState";

const JustQuestionScreen = () => {
  const dispatch = useDispatch();
  const testQuestion = useSelector((state: any) => state.test);
  // const questions = useSelector((state: any) => state.test.test[1].question);

  const [questionSet, setQuestionSet] = useState<Array<{}>>([]);
  const [quest, setQuest] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [options, setOptions] = useState<Array<{}>>([{}]);
  const [editingId, setEditingId] = useState(null);

  const handleAddOption = (i: number) => {
    setOptions([...options, { [parseInt(`${i + 1}`)]: "" }]);
  };

  const handleRemoveOption = (i: number) => {
    const items = [...options];
    items.splice(i, 1);
    setOptions(items);
  };

  const handleRemoveInput = (e: any, i: number) => {
    const { value }: any = e.target;
    const items = [...options];
    items[i] = value;
    setOptions(items);
  };

  const onHandleQuestionSet = (data: any) => {
    dispatch(addTestQuestion(data));
  };

  return (
    <div className="h-full flex flex-col">
      <div>
        {/* <p>Enter Question</p> */}
        <textarea
          className="border outline-none bg-gray-100  rounded-md w-full resize-none h-[200px] p-2 "
          placeholder="Enter Question"
          value={quest}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setQuest(e.target.value);
          }}
        />
      </div>

      <p className="my-1 mx-0 text-[12px] font-medium ">
        <input
          placeholder="Enter the Answer"
          className="px-2 mx-0 w-full border outline-none h-[45px] pl-2 rounded-md text-[15px]"
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
        />
      </p>

      <div>
        {options?.map((props: any, i: number) => (
          <div key={i} className="flex gap-2 items-center my-3">
            <Input
              placeholder="Enter Options"
              className="m-0  outline-none h-[45px] pl-2 rounded-md"
              value={props}
              name={props}
              onChange={(e) => {
                handleRemoveInput(e, i);
              }}
            />
            {i < 3 && (
              <div
                className="text-white text-[12px] bg-green-500 h-12  rounded-md flex items-center px-4 leading-tight text-center min-w-14 justify-center font-bold cursor-pointer"
                onClick={() => handleAddOption(i)}
              >
                Add More
              </div>
            )}
            <div
              className="text-white text-[12px] bg-red-500 h-12  rounded-md flex items-center px-4 leading-tight text-center min-w-14 justify-center font-bold cursor-pointer"
              onClick={() => {
                handleRemoveOption(i);
              }}
            >
              Remove
            </div>
          </div>
        ))}
      </div>

      {/* <div className="flex-1" /> */}

      {/* <Button
        name={"Empty"}
        className="text-white bg-red-500 uppercase text-[12px]px-8 py-4"
        onClick={() => {
          dispatch(displayEmptyTest());
        }}
      /> */}
      {quest !== "" ? (
        <Button
          name={"add to Preview"}
          className="text-white  bg-blue-950 uppercase text-[12px] px-8 py-4"
          onClick={() => {
            onHandleQuestionSet({ question: quest, answer, options });
            setQuest("");
            setAnswer("");
            setOptions([
              {
                1: "",
              },
            ]);
          }}
        />
      ) : (
        <Button
          name={"Add Questions to Preview"}
          className="text-black border  bg-slate-400 uppercase text-[12px]px-8 py-4"
          onClick={() => {
            // setToggle(true);
          }}
        />
      )}
    </div>
  );
};

export default JustQuestionScreen;
