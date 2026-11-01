import { useState } from "react";
import { MdCheck, MdClose } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { useSchoolData } from "../../pages/hook/useSchoolAuth";
import Button from "../reUse/Button";
import Input from "../reUse/Input";
import { createStore } from "../../pages/api/schoolAPIs";
import ClipLoader from "react-spinners/ClipLoader";
import { mutate } from "swr";

const StoreScreen = () => {
  const { data } = useSchoolData();
  const [subject, setSubject] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [period, setPeriod] = useState<number>(0);

  const [image, setImage] = useState("");
  const [pix, setPix] = useState("");

  const [loading, setLoading] = useState(false);

  const handleUpload = (e: any) => {
    const file = e.target.files[0];
    const save = URL.createObjectURL(file);
    setPix(save);
    setImage(file);
  };

  const onHandleAdd = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", subject);
    formData.append("cost", `${period}`);

    formData.append("description", `${day}`);
    formData.append("avatar", image);

    if (image !== "") {
      createStore(data?._id, formData)
        .then((res: any) => {
          if (res.status === 201) {
            mutate(`api/view-store/${data?._id}`);
            setLoading(false);
            toast.success("Product Uploaded");
            setPeriod(0);
            setPix("");

            setDay("");
            setSubject("");
            setImage("");
          } else {
            setLoading(false);
            toast.error(`${res?.response?.data?.message}`);
            setPeriod(0);
            setPix("");
            setDay("");
            setSubject("");
            setImage("");
          }

          setDay("");
          setSubject("");
          setImage("");
        })
        .then(() => {
          setPeriod(0);
          setPix("");
          setDay("");
          setSubject("");
        });
    } else {
      setLoading(false);
      toast.error("Image is not included");
    }
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={true} />
      <div
        className={`mt-5 text-[13px] font-medium ${
          data?.categoryType === "Secondary"
            ? "text-blue-950"
            : "text-green-950"
        } flex justify-start w-full ${
          data?.categoryType === "Secondary" ? "bg-blue-400" : "bg-green-400"
        }`}
      >
        <label
          htmlFor="assign_subject_timetable"
          //   className=" my-3 text-blue-500 transition-all duration-300 hover:text-blue-600 cursor-pointer "

          className="bg-black text-white border-none font-medium py-4 px-9 leading-tight rounded-md cursor-pointer"
        >
          Add item to Store
        </label>
        <div className="mt-5" />
        {/* Put this part before </body> tag */}
        <input
          type="checkbox"
          id="assign_subject_timetable"
          className="modal-toggle"
        />
        <div className="modal rounded-md" role="dialog">
          <div className="modal-box  rounded-md bg-white">
            <div className="flex items-center justify-between my-4 ">
              <p className="font-bold">Add New Items to Store</p>

              <label
                htmlFor="assign_subject_timetable"
                className={`${
                  data?.categoryType === "Secondary"
                    ? "hover:bg-blue-50 "
                    : "hover:bg-red-50 "
                } transition-all duration-300  cursor-pointer rounded-full flex items-center justify-center w-6 h-6 font-bold `}
              >
                <MdClose />
              </label>
            </div>
            <hr />
            <div className="mt-2 leading-tight text-[13px] font-medium text-left">
              Please note that by assigning this subject to this class, it
              automtically becomes one of the class must take suject.
              <br />
              <br />
              <div className="flex gap-2  items-center">
                <p> Product Title: {subject}</p>
                {subject && (
                  <div className="flex items-center font-bold">
                    <span>selected</span>
                    <MdCheck className="text-green-500 text-[25px] mb-1 " />
                  </div>
                )}
              </div>
              <div className="flex gap-2  items-center">
                <p> Product Cost: {period > 0 && period}</p>
                {period && (
                  <div className="flex items-center font-bold">
                    <span>selected</span>
                    <MdCheck className="text-green-500 text-[25px] mb-1 " />
                  </div>
                )}
              </div>
              <div className="flex gap-2  items-center">
                <p> Product Description: {day.slice(0, 30)}...</p>
                {day && (
                  <div className="flex items-center font-bold">
                    <span>selected</span>
                    <MdCheck className="text-green-500 text-[25px] mb-1 " />
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="mt-10 flex gap-4 w-full justify-start">
                <label
                  className={` text-white ${
                    data?.categoryType === "Secondary"
                      ? "bg-blue-950"
                      : "bg-red-950"
                  } border px-6 py-3 cursor-pointer rounded-md  mt-4`}
                  htmlFor="pix"
                >
                  Upload Image
                </label>
                {pix && (
                  <img
                    className="w-16 h-10 border rounded-md mt-4 object-cover"
                    src={pix}
                  />
                )}

                <input
                  id="pix"
                  className="hidden"
                  type="file"
                  onChange={handleUpload}
                />
              </div>
            </div>
            <div className="mt-4 w-full gap-2 flex flex-col items-center text-left">
              <div className="w-full">
                <label className="font-medium text-[12px] mt-4">
                  Product Title <span className="text-red-500">*</span>
                </label>

                {/* // readSubject */}
                <Input
                  className=" w-full mt-2 mb-8 ml-0"
                  placeholder="ProductTitle"
                  value={subject}
                  defaultValue={subject}
                  onChange={(e: any) => {
                    setSubject(e.target.value);
                  }}
                />
                <div className="flex w-full gap-2 mb-10">
                  <div className="w-full">
                    <label className="font-medium text-[12px]">
                      Product Cost <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={period}
                      type="number"
                      defaultValue={period}
                      placeholder="Product Cost"
                      className="w-full mt-2 ml-0"
                      onChange={(e: any) => {
                        setPeriod(e.target.value);
                      }}
                    />
                  </div>

                  <div className="w-full">
                    <label className="font-medium text-[12px]">
                      Product Description{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={day}
                      placeholder="Product Description"
                      className="ml-0 w-full mt-2"
                      defaultValue={day}
                      onChange={(e: any) => {
                        setDay(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-end transition-all duration-300">
              {subject !== "" && period !== 0 && day !== "" ? (
                <label
                  htmlFor="assign_subject_timetable"
                  className={`${
                    data?.categoryType === "Secondary"
                      ? "bg-blue-950"
                      : "bg-red-950"
                  } text-white py-4 px-8 rounded-md cursor-pointer transition-all duration-300`}
                  onClick={() => {
                    onHandleAdd();
                  }}
                >
                  {loading ? (
                    <div>
                      <ClipLoader size={10} color="white" />
                      <span className="ml-2">Loading....</span>
                    </div>
                  ) : (
                    "Proceed"
                  )}
                </label>
              ) : (
                <Button
                  name="Can't Proceed"
                  className={`bg-[lightgray] ${
                    data?.categoryType === "Secondary"
                      ? "text-blue-950"
                      : "text-green-950"
                  } mx-0 cursor-not-allowed`}
                />
              )}
            </div>
          </div>

          <label className="modal-backdrop" htmlFor="assign_subject_timetable">
            Close
          </label>
        </div>
      </div>
    </div>
  );
};

export default StoreScreen;
