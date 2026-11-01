import { useState } from "react";
import LittleHeader from "../../components/layout/LittleHeader";
import Button from "../../components/reUse/Button";
import Input from "../../components/reUse/Input";
import JustQuestionScreen from "./JustQuestionScreen";
import PreviewTest from "./PreviewTest";
import { useDispatch, useSelector } from "react-redux";
import { addTestInstruction } from "../../../global/reduxState";
import { useParams } from "react-router-dom";
import SubjectClassLabel from "../../components/SubjectClassLabel";

const CreateQuiz = () => {
  const { subjectID } = useParams();
  const dispatch = useDispatch();
  const testQuestion = useSelector((state: any) => state.test);
  const [toggle, setToggle] = useState<boolean>(false);

  const [instruction, setInstruction] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [mark, setMark] = useState<string>("");

  return (
    <div>
      <LittleHeader name="Create Test Screen" />
      <SubjectClassLabel subjectID={subjectID} />

      <div className="mt-10" />

      <div
        className="grid grid-cols-1  lg:grid-cols-5 relative
      
      "
      >
        <div className=" col-span-3 min-h-[60vh] ">
          <PreviewTest />
        </div>

        <div className="order-first mb-10 lg:sticky lg:order-last border col-span-2 min-h-[590px] top-20 p-4 rounded-lg flex flex-col ">
          <div className="flex">
            <Button
              name={"Set Instruction"}
              className="text-white bg-blue-950 py-3"
              onClick={() => {
                setToggle(!toggle);
              }}
            />
            <Button
              name={"Set Questions"}
              className="text-white bg-blue-950 p-3"
              onClick={() => {
                setToggle(!toggle);
              }}
            />
          </div>

          <div className="mt-10" />

          {toggle ? (
            <JustQuestionScreen />
          ) : (
            <div className="min-h-[100px] pb-4 flex flex-col ">
              <p className="my-2 font-medium capitalize border-b">
                Set Test Instruction
              </p>
              <div>
                <div className="mt-5">
                  <label className="text-[12px]">Enter Instruction</label>
                  <textarea
                    placeholder="Enter Instructions"
                    className="ml-0 w-full border bg-gray-100 text-[12px] min-h-[100px] rounded-md resize-none outline-none p-2"
                    value={instruction}
                    onChange={(e) => {
                      setInstruction(e.target.value);
                    }}
                  />
                </div>
                <div className="mt-1 w-full flex gap-2">
                  <div className="flex-1">
                    <label className="text-[12px]">
                      Enter Time/Duration(Hours)
                    </label>

                    <select
                      name="hour"
                      id="hour"
                      className="ml-2 border border-blue-950 
                      px-2 rounded-md py-3 flex-1 w-[90%] mt-2 mr-2 "
                      value={duration}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setDuration(e.target.value);
                      }}
                    >
                      <option value="0" selected>
                        choosen
                      </option>
                      <option value="0.167">10 Minutes</option>
                      <option value="0.333">20 Minutes</option>
                      <option value="0.500">30 Minutes</option>
                      <option value="0.667">40 Minutes</option>
                      <option value="0.833">50 Minutes</option>
                      <option value="1">60 Minutes</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="text-[12px]">
                      Enter Mark Per Question
                    </label>
                    <Input
                      placeholder="Enter Marks"
                      className="ml-0 w-full"
                      value={mark}
                      onChange={(e) => {
                        setMark(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* <div className="flex-1" /> */}
              {testQuestion[0]?.binstruction?.instruction ? (
                <Button
                  name={"add to Preview"}
                  className="text-white bg-blue-950 uppercase text-[12px]px-8 py-4"
                  onClick={() => {
                    setToggle(true);
                    let data: any = { duration, instruction, mark };
                    dispatch(addTestInstruction(data!));
                  }}
                />
              ) : (
                <Button
                  name={"add Instructions first"}
                  className="text-white bg-red-500 uppercase text-[12px]px-8 py-4"
                  onClick={() => {
                    setToggle(true);
                    let data: any = { duration, instruction, mark };
                    dispatch(addTestInstruction(data!));
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
