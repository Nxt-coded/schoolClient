import { useState } from "react";
import ReactQuill from "react-quill";
import { useStudentInfo } from "../../hooks/useStudentHook";
import { createStudentArticle } from "../../api/studentAPI";
import { useNavigate } from "react-router-dom";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditorInspector from "@ckeditor/ckeditor5-inspector";
import Button from "../../../components/reUse/Button";
import ClipLoader from "react-spinners/ClipLoader";

const CreateArticle = () => {
  const [area, setArea] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [iValue, setIValue] = useState<string>("");
  const navigate = useNavigate();

  const [image, setImage] = useState<string>("");
  const [pix, setPix] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const { studentInfo } = useStudentInfo();

  const onImage = (e: any) => {
    const file = e.target.files[0];
    const save = URL.createObjectURL(file);
    setImage(save);
    setPix(file);
  };

  const handleSubmit = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", iValue);
    formData.append("content", value);
    formData.append("desc", area);
    formData.append("avatar", pix);

    createStudentArticle(
      studentInfo?.schoolIDs,
      studentInfo?._id,
      formData
    ).then((res) => {
      setLoading(false);

      navigate(`/articles/${res?.data?._id}`);
    });
  };

  return (
    <div className=" w-full  flex justify-center items-center">
      <div className=" w-[85%] min-h-[500px]">
        {/* create space */}
        <div className=" w-full h-[40px] md:flex gap-5 text-[12px]">
          <input
            type="text"
            placeholder="Title"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className=" capitalize bg-white border-b rounded-none outline-none w-full px-4 h-full text-blue-950"
          />
          <textarea
            placeholder="Description"
            value={iValue}
            maxLength={100}
            onChange={(e) => setIValue(e.target.value)}
            className="capitalize bg-white border-b rounded-none outline-none w-full px-4 h-full text-blue-950 resize-none mt-6 md:mt-0"
          />
        </div>
        {/* create space */}
        <div className="md:flex md:gap-5">
          <div className="mt-28 md:mt-8">
            <label
              htmlFor="pix"
              className="text-[12px] bg-blue-950 text-white py-4 px-6 cursor-pointer capitalize font-bold rounded-md "
            >
              upload Cover image
            </label>
            <input id="pix" className="hidden" type="file" onChange={onImage} />
          </div>
          {image !== "" && (
            <img
              className="w-[60%] h-[100px] object-cover border rounded-md mt-16 md:mt-5 "
              alt="image"
              src={image}
            />
          )}
        </div>

        <div className=" mt-10 mb-20 min-h-[500px]">
          <p className="text-[12px] mt-3">Write Article</p>
          <div className="w-full my-1  min-h-[300px] border">
            <CKEditor
              editor={ClassicEditor}
              onChange={(event, editor) => {
                const data = editor.getData();
                setValue(data);
              }}
            />
          </div>
        </div>
        <div className=" w-full">
          <button>Submit</button>

          <Button
            className="mt-10 lg:mt-0 py-2 px-4 rounded-md bg-blue-950 text-white"
            name={loading ? "Loading" : "Publish This Article "}
            icon={
              loading && (
                <ClipLoader
                  color="white"
                  size={20}
                  className="absolute left-7 top-5"
                />
              )
            }
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateArticle;
