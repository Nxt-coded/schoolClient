import { useNavigate, useParams } from "react-router-dom";
import LittleHeader from "../../../components/layout/LittleHeader";
import { useLessonNote } from "../../../pagesForTeachers/hooks/useTeacher";
import Button from "../../../components/reUse/Button";
import { useRef, useState } from "react";
import { rateNote } from "../../api/studentAPI";
import { useStudentInfo } from "../../hooks/useStudentHook";
import { FcApproval, FcCancel } from "react-icons/fc";

const ViewClassNoteDetail = () => {
  const navigate = useNavigate();
  const { noteID } = useParams();
  const { studentInfo } = useStudentInfo();
  const { lessonNoteData } = useLessonNote(noteID!);
  const [state, setState] = useState<number>(0);

  const check = lessonNoteData?.rateData?.some((el: any) => {
    return el.id === studentInfo?._id;
  });

  const lessonNoteRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContent = lessonNoteRef.current;
    const windowPrint = window.open("", "", "width=800,height=600");
    if (windowPrint && printContent) {
      windowPrint.document.write(`
        <html>
          <head>
            <title>Print Lesson Note</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                font-weight: 100;
              }
              .print-content {
                display: block;
                width: 100%;
              }
            </style>
          </head>
          <body>
            <div class="print-content">${printContent.innerHTML}</div>
          </body>
        </html>
      `);
      windowPrint.document.close();
      windowPrint.focus();
      windowPrint.print();
      windowPrint.close();
    }
  };

  const numberMap = () => {
    return lessonNoteData?.week === "1"
      ? "One"
      : lessonNoteData?.week === "2"
      ? "Two"
      : lessonNoteData?.week === "3"
      ? "Three"
      : lessonNoteData?.week === "4"
      ? "Four"
      : lessonNoteData?.week === "5"
      ? "Five"
      : lessonNoteData?.week === "6"
      ? "Six"
      : lessonNoteData?.week === "7"
      ? "Seven"
      : lessonNoteData?.week === "8"
      ? "Eight"
      : lessonNoteData?.week === "9"
      ? "Nine"
      : lessonNoteData?.week === "10"
      ? "Ten"
      : lessonNoteData?.week === "11"
      ? "Eleven"
      : lessonNoteData?.week === "12"
      ? "Twelve"
      : lessonNoteData?.week === "13"
      ? "Thirteen"
      : "";
  };
  return (
    <div>
      <LittleHeader name={`${""} Lesson Note Details`} />
      <div className="mb-[30px]">
        <button
          onClick={handlePrint}
          className="border border-blue-950 hover:scale-105 text-blue-950 bg-white py-2 px-3"
        >
          Print
        </button>
      </div>
      <div className="flex justify-center items-center flex-col ">
        {/* Lesson note starts */}
        <div
          className="bg-white shadow-lg rounded-md min-h-[100vh] w-[95%] md:w-[97%] xl:w-[80%] "
          ref={lessonNoteRef}
        >
          <div className="w-full h-[40px] bg-blue-950 rounded-tl-md rounded-tr-md" />
          <div className="p-5">
            <div className="pt-[20px]">
              <div className="mb-5 flex items-center">
                <div className="w-full text-center">
                  <h1 className="text-[18px] md:text-[25px] font-semibold text-blue-950">
                    {lessonNoteData?.subject}{" "}
                    <span>({lessonNoteData?.classes})</span>
                  </h1>
                  <h1 className="text-[25px] md:text-[35px] font-semibold text-blue-950">
                    {lessonNoteData?.topic}
                  </h1>
                </div>
              </div>
              <div className=" text-blue-950">
                <div className="font-medium">
                  <div className="flex mb-2 items-center">
                    <h2 className="w-[150px]">By:</h2>
                    <h2 className="font-semibold">{lessonNoteData?.teacher}</h2>
                  </div>
                  <div className="flex mb-2 items-center">
                    <h2 className="w-[150px]">Sub Topic:</h2>
                    <h2 className="font-semibold">
                      {lessonNoteData?.subTopic}
                    </h2>
                  </div>
                  <div className="flex mb-2 items-center">
                    <h2 className="w-[150px]">Week:</h2>
                    <h2 className="font-semibold">
                      {lessonNoteData?.week} <span>({numberMap()})</span>
                    </h2>
                  </div>
                </div>
              </div>
              <div className="my-5 border-b w-full" />
              <div className="grid grid-cols-1 text-blue-950 bg-gray-50 md:grid-cols-1 xl:grid-cols-2 gap-3">
                <div className="flex p-2 mb-2 justify-start items-center">
                  <h2 className="w-[150px]">Instructional Material:</h2>
                  <div className="font-semibold break-words">
                    {lessonNoteData?.instructionalMaterial}
                  </div>
                </div>
                <div className="flex mb-2 p-2 justify-start items-center">
                  <h2 className="w-[150px]">Reference Material:</h2>
                  <h2 className="font-semibold">
                    {lessonNoteData?.referenceMaterial}
                  </h2>
                </div>
              </div>
              <div className="my-5 border-b w-full" />
              <h3
                className="mb-3 w-full font-medium leading-9 text-blue-950"
                dangerouslySetInnerHTML={{
                  __html: `${lessonNoteData?.content}`,
                }}
              />

              <div className="my-5 border-b w-full" />
              <div className="pt-[20px] text-blue-950 grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div className="min-h-[150px] p-2 rounded-md bg-blue-50">
                  <h1 className="font-semibold mb-2">Evaluation:</h1>
                  <h2>{lessonNoteData?.evaluation}</h2>
                </div>
                <div className="min-h-[150px] p-3 rounded-md bg-blue-50">
                  <h1 className="font-semibold mb-2">Summary:</h1>
                  <h2>{lessonNoteData?.summary}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Lesson note ends */}

        <div className="mt-10" />
      </div>

      <div className="mt-5" />
      <div className="w-full flex justify-center items-center gap-2">
        <select
          className="select select-bordered w-full max-w-xs"
          value={state}
          onChange={(e: any) => {
            setState(e.target.value);
          }}
        >
          <option disabled selected defaultValue={"Rate this Lesson"}>
            Rate this Lesson
          </option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        {check ? (
          <Button name={"You've Rated"} className="bg-[gray] text-white" />
        ) : (
          <Button
            name={"Rate Now"}
            className="bg-blue-950 text-white"
            onClick={() => {
              rateNote(studentInfo?._id, noteID!, state)
                .then((res) => {})
                .then(() => {
                  navigate("/lesson");
                });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ViewClassNoteDetail;
