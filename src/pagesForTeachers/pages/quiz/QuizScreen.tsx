import React, { useState } from "react";
import LittleHeader from "../../components/layout/LittleHeader";
import Input from "../../components/reUse/Input";

const QuizScreen = () => {
  const [state, setState] = useState([
    {
      question: "",
      answer: "",
      options: [{ opt: "" }],
    },
  ]);

  const handleAddQusestion = () => {
    setState([
      ...state,
      {
        question: "",
        answer: "",
        options: [{ opt: "" }],
      },
    ]);
  };

  const handleRemoveQusestion = (i: number) => {
    const items = [...state];
    items.splice(i, 1);
    setState(items);
  };

  const handleInputQusestion = (e: any, i: number) => {
    const { value }: any = e.target;
    const items = [...state];
    items[i].question = value;
    setState(items);
  };

  const handleInputAnswer = (e: any, i: number) => {
    const { value }: any = e.target;
    const items = [...state];
    items[i].answer = value;
    setState(items);
  };

  const handleAddOption = (i: number) => {
    const items = [...state];

    items[i].options.push({ opt: "" });
    setState(items);
  };

  const handleRemoveOption = (i: number, x: number) => {
    const items = [...state];

    items[i].options.splice(x, 1);
    setState(items);
  };

  const handleInputOption = (e: any, i: number, x: number) => {
    const { value }: any = e.target;
    const items = [...state];
    items[i].options[x].opt = value;
    setState(items);
  };
  return (
    <div className="text-blue-950">
      <LittleHeader name="Setting Question" />
      <p className="mb-5">Set Instructions</p>
      <div className="flex gap-4">
        <div>
          <label className="font-medium text-[12px] ">Set time</label>
          <Input placeholder="set time" className="mx-0" />
        </div>
        <div>
          <label className="font-medium text-[12px] ">Set Rules</label>
          <Input placeholder="set Rules" className="mx-0" />
        </div>
      </div>

      <div className="flex w-full justify-center bg-slate-100 min-h-[100vh]">
        <div className="w-full p-5 bg-white border rounded-lg ">
          <p className="text-center font-bold">Set Question</p>

          <div>
            {state?.map((props: any, i: number) => (
              <div key={i}>
                <div className="flex items-center gap-5 mb-4">
                  <p>question {i + 1}</p>
                  <button
                    className="text-red-500 font-bold"
                    onClick={() => {
                      handleRemoveQusestion(i);
                    }}
                  >
                    Click to Remove this Question
                  </button>
                </div>

                <textarea
                  className="border w-full rounded-lg p-2 resize-none h-[200px]"
                  placeholder="Enter Question Here"
                  value={props.question}
                  onChange={(e) => {
                    handleInputQusestion(e, i);
                  }}
                />
                <div className="w-full flex justify-end ">
                  <input
                    className="input input-info text-[12px] w-[300px] h-10"
                    placeholder="Enter Answer"
                    value={props.answer}
                    onChange={(e) => {
                      handleInputAnswer(e, i);
                    }}
                  />
                </div>

                <div>
                  <p className="text-[12px] font-bold mb-2">Options</p>

                  {props.options.map((props: any, x: number) => (
                    <div>
                      <input
                        className="input input-error h-10 text-[12px] w-[300px]"
                        placeholder="Enter Answer"
                        value={props.opt}
                        onChange={(e) => {
                          handleInputOption(e, i, x);
                        }}
                      />
                      <button
                        className="btn btn-error ml-2 py-2 text-white mt-5 px-2 text-[12px]"
                        onClick={() => {
                          handleRemoveOption(i, x);
                        }}
                      >
                        remove this Option
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  className="btn btn-accent text-white mt-5"
                  onClick={() => {
                    handleAddOption(i);
                  }}
                >
                  Add More Option
                </button>
                <div className="my-10 border-b" />
              </div>
            ))}
          </div>
          <button
            className="btn btn-neutral"
            onClick={() => {
              handleAddQusestion();
            }}
          >
            Add More Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
