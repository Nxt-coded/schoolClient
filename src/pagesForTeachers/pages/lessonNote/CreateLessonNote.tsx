import { useState } from "react";
import { inputData } from "./InputData";
import lodash from "lodash";
import LittleHeader from "../../components/layout/LittleHeader";
import InputWithLabel from "./InputWithLabel";
import { createTeacherLessonNote } from "../../api/teachersAPI";
import { useTeacherInfo } from "../../hooks/useTeacher";
import TextArea from "./TextArea";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Editor from "./NoteCreated";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditorInspector from "@ckeditor/ckeditor5-inspector";

document.title = "Create Lesson Note ";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],

  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],

  ["clean"],
];

const modules = {
  toolbar: toolbarOptions,
};

const CreateLesson = () => {
  const navigate = useNavigate();
  const { teacherInfo } = useTeacherInfo();

  const [loading, setLoading]: any = useState(false);
  const [value, setValue]: any = useState("");
  const [areaOne, setAreaOne]: any = useState("");
  const [areaTwo, setAreaTwo]: any = useState("");

  const [iValue, setiValue]: any = useState([""]);

  const handleSubmit = () => {
    setLoading(true);
    const convertedData = lodash.reduce(
      iValue,
      (result: any, { label, value }) => {
        result[label] = value;
        return result;
      },
      {}
    );
    const convertedData1 = lodash.reduce(
      areaOne,
      (result: any, { label, value }) => {
        result[label] = value;
        return result;
      },
      {}
    );
    const convertedData2 = lodash.reduce(
      areaTwo,
      (result: any, { label, value }) => {
        result[label] = value;
        return result;
      },
      {}
    );

    const gatheredData = {
      ...convertedData,
      ...convertedData1,
      ...convertedData2,
      content: value,
    };

    createTeacherLessonNote(
      teacherInfo?.schoolIDs,
      teacherInfo?._id,
      gatheredData
    ).then((res) => {
      if (res.status === 201) {
        setLoading(false);
        navigate("/lesson-note");
      } else {
        setLoading(false);
      }
    });
  };

  // const [editorState, setEditorState] = useState(() =>
  //   EditorState.createEmpty()
  // );

  return (
    <div>
      <p>Started</p>
      <LittleHeader name={`${document.title} `} />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 text-blue-950 mt-10">
        {inputData.map((el, i: number) => (
          <InputWithLabel
            label={el.label}
            placeholder={el.placeholder}
            value={iValue[i] ? iValue[i].value : ""}
            onChange={(e: any) => {
              const newValue = e.target.value;
              setiValue((prevValues: any) => {
                const updatedValues = [...prevValues];
                updatedValues[i] = { label: el.name, value: newValue };
                return updatedValues;
              });
            }}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[
          { placeholder: "Previous Knowledge", name: "previousKnowledge" },
          { placeholder: "Specific Objectives", name: "specificObjectives" },
        ].map((el, i: number) => (
          <TextArea
            value={areaOne[i] ? areaOne[i].value : ""}
            placeholder={el.placeholder}
            label={el.placeholder}
            onChange={(e: any) => {
              const newValue = e.target.value;
              setAreaOne((prevValues: any) => {
                const updatedValues = [...prevValues];
                updatedValues[i] = { label: el.name, value: newValue };
                return updatedValues;
              });
            }}
          />
        ))}
      </div>
      <p className="text-[12px] mt-3">Lesson Note</p>
      <div className="w-full my-1  min-h-[300px] border">
        <CKEditor
          editor={ClassicEditor}
          onChange={(event, editor) => {
            const data = editor.getData();
            setValue(data);
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16">
        {[
          { placeholder: "Evaluation", name: "evaluation" },
          { placeholder: "Summary", name: "summary" },
          { placeholder: "Presentation", name: "presentation" },
          { placeholder: "Assignment", name: "assignment" },
        ].map((el, i: number) => (
          <TextArea
            value={areaTwo[i] ? areaTwo[i].value : ""}
            placeholder={el.placeholder}
            label={el.placeholder}
            onChange={(e: any) => {
              const newValue = e.target.value;
              setAreaTwo((prevValues: any) => {
                const updatedValues = [...prevValues];
                updatedValues[i] = { label: el.name, value: newValue };
                return updatedValues;
              });
            }}
          />
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="btn text-white bg-blue-950 mt-3 px-12 hover:bg-blue-900 border-none"
      >
        {loading ? (
          <div>
            <ClipLoader size={10} color="white" />
            <span>Processing...</span>
          </div>
        ) : (
          "Submit "
        )}
      </button>
    </div>
  );
};

export default CreateLesson;
