import { useState, useEffect } from "react";
import LittleHeader from "../../components/layout/LittleHeader";
import Button from "../../components/reUse/Button";
import Input from "../../components/reUse/Input";

import { useDispatch, useSelector } from "react-redux";
import { addTestInstruction } from "../../../global/reduxState";
import PreviewExamination from "./PreviewExamination";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import SubjectClassLabel from "../../components/SubjectClassLabel";

const CreateExamination = () => {
  const { subjectID } = useParams();
  const dispatch = useDispatch();
  const testQuestion = useSelector((state: any) => state.test);
  const [toggle, setToggle] = useState<boolean>(false);

  const [instruction, setInstruction] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [mark, setMark] = useState<string>("");

  const [fileData, setFileData] = useState();

  const uploadQuestion = (e: any) => {
    setFileData(e.target.files[0]);
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["bold", "italic", "underline", "strike"],
        ["link", "image"],
        [{ align: [] }],
      ],
      // handlers: {
      //   image: imageHandler, // Hook the custom image handler
      // },
    },
  };
  const [editorValue, setEditorValue] = useState("");
  const [customMinutes, setCustomMinutes] = useState<string>("");
  const [isCustomDuration, setIsCustomDuration] = useState<boolean>(false);

  return (
    <div>
      <LittleHeader name="Create Examination Question Screen" />
      <SubjectClassLabel subjectID={subjectID} />
      <Toaster />

      <div className="mt-10" />

      <div className="grid grid-cols-1 relative">
        <div className="order-first mb-10 border col-span-2 min-h-[200px] top-20 p-4 rounded-lg flex flex-col">
          <div className="flex items-center gap-3">
            <label
              htmlFor="question"
              className="py-3 px-8 bg-neutral-950 text-[13px] uppercase font-semibold text-white rounded-sm cursor-pointer hover:bg-neutral-800 duration-300 transition-all"
            >
              Upload Question
            </label>
            <input
              className="hidden"
              id="question"
              type="file"
              onChange={uploadQuestion}
            />

            <label
              htmlFor="upload_instruction_modal"
              className="w-5 h-5 rounded-full flex items-center justify-center bg-blue-950 text-white cursor-pointer"
              aria-label="Upload instructions"
            >
              ?
            </label>
            {/* Modal: Upload Instructions */}
            <input
              type="checkbox"
              id="upload_instruction_modal"
              className="modal-toggle"
            />
            <div
              className="modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="upload_instruction_modal_title"
            >
              <div className="modal-box rounded-md">
                <h3
                  id="upload_instruction_modal_title"
                  className="font-bold text-lg"
                >
                  Follow these instructions when preparing the question file
                </h3>
                <div className="py-4 text-sm text-gray-700">
                  <p className="mb-2">
                    Upload a <strong>.docx</strong> file. Keep it under{" "}
                    <strong>5 MB</strong>. Type each question and option as
                    plain text in this format:
                  </p>
                  <div className="mb-4 rounded bg-gray-100 p-3 font-mono text-xs leading-6">
                    <p>1. Which of the following is correct</p>
                    <p>A. First option</p>
                    <p>B. Second option</p>
                    <p>C. Third option</p>
                    <p>D. Fourth option</p>
                    <p>Answer: Second option</p>
                  </div>
                  <p className="mb-2 font-semibold">Important rules</p>
                  <ul className="mb-4 list-disc space-y-1 pl-5">
                    <li>
                      Start every question at the far left with its number,
                      followed by a period and a space: <code>1. </code>.
                      Do not indent it with spaces or tabs.
                    </li>
                    <li>
                      Type the number yourself. Do not use Word bullets,
                      automatic numbered lists, or bullet symbols for question
                      numbers.
                    </li>
                    <li>
                      Put each question, option, and answer on its own line.
                      Leave a blank line between questions if you want.
                    </li>
                    <li>
                      Write question options with a letter, period, and space:
                      <code> A. option text</code>. Use labels A through E;
                      do not write options as <code>A)</code> or use bullets.
                    </li>
                    <li>
                      Include at least two non-empty options for every
                      question.
                    </li>
                    <li>
                      Add a non-empty answer on its own line starting exactly
                      with <code>Answer:</code>. Use the full text of the
                      correct option, as in the example.
                    </li>
                    <li>
                      Do not end the question text with a period or comma, and
                      do not include parentheses <code>( )</code> in question
                      text.
                    </li>
                    <li>
                      Do not add explanations or extra lines after an answer;
                      they may be read as part of the next option.
                    </li>
                  </ul>
                  <p className="mb-2">
                    Make sure every question starts with a number (for example,
                    <code> 1. </code>), has question text, at least two
                    options, and an answer. Upload a <strong>.docx</strong>{" "}
                    file—not <strong>.doc</strong>, PDF, or CSV.
                  </p>
                  <p className="text-xs text-gray-500">
                    Greek letters, subscripts, superscripts, fractions, and
                    basic math notation are supported in DOCX files.
                  </p>
                </div>
                <div className="modal-action">
                  <label
                    htmlFor="upload_instruction_modal"
                    className="btn px-8 bg-blue-950 text-white hover:bg-blue-900"
                  >
                    OK
                  </label>
                </div>
              </div>
            </div>

            {/* end */}
          </div>

          <div className="mt-10" />

          <div className="h-full flex flex-col">
            <p className="my-2 font-medium capitalize border-b">
              Set Examination Instruction
            </p>
            <div>
              <div className="mt-5 flex flex-col">
                <label className="text-[16px] mb-2">Enter Instruction</label>
                {/* <textarea
                  placeholder="Enter Instructions"
                  className="ml-0 w-full lg:max-w-[80%] border bg-gray-100 text-[16px] h-[200px] rounded-md resize-none outline-none p-2"
                  value={instruction}
                  onChange={(e) => {
                    setInstruction(e.target.value);
                  }}
                /> */}
                <ReactQuill
                  value={instruction}
                  onChange={(value) => {
                    setInstruction(value);
                    // setEditorValue(value);
                  }}
                  modules={modules}
                  theme="snow"
                  className="ml-0 w-full lg:max-w-[80%] border bg-gray-100 text-[12px] min-h-[200px] rounded-md resize-none outline-none p-2"
                />
              </div>
              <div className="mt-5 flex flex-col">
                <label className="mt-5 mb-2 text-[16px]">
                  <strong className="font-[500]">Section B: </strong>for Theory
                  Questions
                </label>

                <ReactQuill
                  value={editorValue}
                  onChange={(value) => {
                    setEditorValue(value);
                  }}
                  modules={modules}
                  theme="snow"
                  className="ml-0 w-full lg:max-w-[80%] border bg-gray-100 text-[12px] min-h-[100px] rounded-md resize-none outline-none p-2"
                />
              </div>
              <div className="mt-10 w-full flex gap-2">
                <div className="flex flex-col">
                  <label className="text-[12px]">Time/Duration(Hours)</label>
                  <select
                    className="border border-blue-950 w-full h-[50px] rounded-md  mt-2 px-2 relative transition-all duration-300 mb-6 select select-bordered max-w-xs "
                    name="hour"
                    id="hour"
                    defaultValue={testQuestion[0]?.instruction?.duration}
                    value={isCustomDuration ? "custom" : duration}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      const val = e.target.value;
                      if (val === "custom") {
                        setIsCustomDuration(true);
                        // If there's already a customMinutes value, set duration accordingly
                        if (customMinutes !== "") {
                          const hrs = Number(customMinutes) / 60;
                          setDuration(hrs.toFixed(3));
                        }
                      } else {
                        setIsCustomDuration(false);
                        setCustomMinutes("");
                        setDuration(val);
                      }
                    }}
                  >
                    <option value="" disabled>
                      Choose Timer
                    </option>

                    <option value="0.084">5 Minutes</option>
                    <option value="0.167">10 Minutes</option>
                    <option value="0.333">20 Minutes</option>
                    <option value="0.500">30 Minutes</option>
                    <option value="0.667">40 Minutes</option>
                    <option value="0.833">50 Minutes</option>
                    <option value="1.000">60 Minutes</option>
                    <option value="1.500">90 Minutes</option>
                    <option value="custom">Custom minutes...</option>
                  </select>
                </div>
                <div className="-mt-">
                  {isCustomDuration && (
                    <div className="flex flex-col ml-3">
                      {/* <p className=" text-xs text-gray-500 mt-1">
                                      Duration saved
                                    </p> */}
                      <label className="text-[12px] mb-[2px]">
                        Custom Timer
                      </label>
                      <input
                        className="border w-[180px] text-[14px] h-[50px] rounded-md outline-none px-2 mt-2"
                        placeholder="Enter minutes (e.g. 7)"
                        value={customMinutes}
                        onChange={(e) => {
                          const v = e.target.value;
                          // allow only digits
                          if (v === "" || /^\d+$/.test(v)) {
                            setCustomMinutes(v);
                            if (v === "") {
                              setDuration("");
                            } else {
                              const mins = Number(v);
                              const hrs = mins / 60;
                              // store as string formatted to 3 decimals
                              setDuration(hrs.toFixed(3));
                            }
                          }
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="-mt-1 ml-6">
                  <label className="text-[12px] ">
                    Enter Mark Per Question
                  </label>
                  <Input
                    placeholder="Enter Marks"
                    className="ml-0 w-full"
                    defaultValue={testQuestion[0]?.instruction?.mark}
                    value={mark}
                    onChange={(e) => {
                      setMark(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex">
              <Button
                name={fileData ? "Ready To Publish" : "Yet to Upload"}
                className={`text-white ${
                  fileData ? "bg-red-500" : "bg-neutral-950"
                } uppercase text-[12px] ml-0 px-8 py-4`}
                onClick={() => {
                  setToggle(true);
                  let data: any = { duration, instruction, mark };

                  console.log("started: ", data);
                  dispatch(addTestInstruction(data!));
                }}
              />
            </div>
            <div className="flex-1" />
          </div>
        </div>
        <div className=" col-span-3 ">
          <PreviewExamination
            duration={duration}
            mark={mark}
            file={fileData}
            instruction={instruction}
            editorValue={editorValue}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateExamination;
// const [editorValue, setEditorValue] = useState("");
