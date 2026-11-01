import { useState, useEffect } from "react";
import Input from "@/components/reUse/Input";
import Button from "@/components/reUse/Button";
import LittleHeader from "@/components/static/LittleHeader";

import { useDispatch, useSelector } from "react-redux";
import { addTestInstruction } from "../../../global/reduxState";
import PreviewExamination from "./PreviewExamination";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Toaster } from "react-hot-toast";

const CreateExaminationScreen = () => {
  const dispatch = useDispatch();
  const testQuestion = useSelector((state: any) => state.test);
  const [toggle, setToggle] = useState<boolean>(false);

  const [instruction, setInstruction] = useState<string>("");
  // initialize duration from redux if present; allow numeric choices 1-5 or 'custom'
  const existingDuration =
    testQuestion && testQuestion[0]?.instruction?.duration;
  const initialDuration =
    existingDuration !== undefined && existingDuration !== null
      ? ["1", "2", "3", "4", "5"].includes(String(existingDuration))
        ? String(existingDuration)
        : "custom"
      : "";
  const initialCustomDuration =
    existingDuration !== undefined &&
    existingDuration !== null &&
    !["1", "2", "3", "4", "5"].includes(String(existingDuration))
      ? String(existingDuration)
      : "";

  const [duration, setDuration] = useState<string>(initialDuration);
  const [customDuration, setCustomDuration] = useState<string>(
    initialCustomDuration
  );
  const [mark, setMark] = useState<string>("");

  const [fileData, setFileData] = useState();

  const [isCustomDuration, setIsCustomDuration] = useState<boolean>(false);
  const [customMinutes, setCustomMinutes] = useState<string>("");

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
  return (
    <div>
      <LittleHeader name="Create Examination Question Screen" />
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
                  Please this is the format to follow when uploading questions
                </h3>
                <div className="py-4 text-sm text-gray-700">
                  <p className="mb-2">
                    Please upload a <strong>.docx</strong> file containing
                    questions in a clear format. The parser supports typical
                    multiple-choice formatting (numbered question blocks
                    followed by options labeled A., B., C., etc.).
                  </p>
                  <p className="mb-2">
                    Special scientific characters (Greek letters, μ, subscripts,
                    superscripts, fractions, and basic math notation) are
                    preserved using our DOCX to HTML conversion. If you include
                    images, they will be embedded as data URIs.
                  </p>
                  <br />
                  <br />
                  <p className="text-xs text-gray-500">
                    1. Which of the following best describes commercial farming.
                    <br />
                    <br />
                    A. Production of plants and animal for family consumption.
                    <br />
                    B. Large scale agricultural production for sales. <br />
                    C. Large scale agricultural production for family
                    consumption. <br />
                    D. Use of family labor for large scale agricultural
                    production. <br />
                    Answer: Large scale agricultural production for sales.
                    <br />
                    <br />
                    2. In which year did the World War II end?
                    <br />
                    <br />
                    A. 1945
                    <br />
                    B. 1949 <br />
                    C. 1941 <br />
                    D. 1942
                    <br />
                    Answer: 1945
                    <br />
                    <br />
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
                  // send numeric duration: if custom selected use customDuration, otherwise the selected value
                  const resolvedDuration =
                    duration === "custom" ? customDuration : duration;
                  let data: any = {
                    duration: resolvedDuration,
                    instruction,
                    mark,
                  };
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

export default CreateExaminationScreen;
// const [editorValue, setEditorValue] = useState("");
