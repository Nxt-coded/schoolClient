import { FaCalendar, FaSpinner } from "react-icons/fa6";
import { mutate } from "swr";
import toast, { Toaster } from "react-hot-toast";
import Button from "../../../../../components/reUse/Button";
import { useState } from "react";
import { bulkUploadSchemeOfWork } from "../../../../../pages/api/schoolAPIs";

const Header = () => {
  const [file, setFile] = useState<File | null>(null);
  const [toggle, setToggle] = useState<boolean>(false);

  const handleSchemeOfWork = () => {
    if (!file) {
      toast.error("Please upload a valid file");
      return;
    }

    setToggle(true);
    const formData = new FormData();
    formData.append("file", file);

    console.log("FormData:", formData);

    bulkUploadSchemeOfWork(formData)
      .then((res: any) => {
        if (res.status === 201) {
          toast.success("Scheme of work has been successfully imported");
        } else {
          toast.error(res?.data?.message || "Failed to upload scheme");
        }
      })
      .catch((err) => {
        toast.error(
          err.res?.data?.message || "Failed to upload scheme of work"
        );
        console.error("Error:", err);
      })
      .finally(() => {
        setToggle(false);
      });
  };

  return (
    <div className="h-[60px] bg-blue-50 border-b w-full flex justify-center items-center z-10 fixed top-0 left-0 text-blue-950">
      <Toaster />
      <div className="flex items-center justify-end w-[90%]">
        <div className="mr-5 font-medium cursor-pointer flex items-center bg-slate-200 px-4 py-2 rounded-sm z-30">
          <FaCalendar />
          <span className="text-[12px] mx-1">
            Session: <span>23/24</span>
          </span>
        </div>

        <div className="flex items-center">
          <input
            id="file"
            type="file"
            accept=".json"
            hidden
            onChange={(e: any) => {
              if (e.target.files && e.target.files[0]) {
                setFile(e.target.files[0]);
              }
            }}
          />

          {file ? (
            <Button
              name={
                toggle ? (
                  <div className="flex items-center gap-2 duration-300 transition-all">
                    <FaSpinner className="animate-spin text-[18px]" />
                    <span>Uploading Data</span>
                  </div>
                ) : (
                  "Add scheme of work file"
                )
              }
              className="uppercase py- lg:text-[12px] text-[9px] font-medium bg-red-500 py-1 sm:py-4 md:py-2 lg:py-4 md:px-4 hover:bg-red-600 cursor-pointer transition-all duration-300"
              onClick={handleSchemeOfWork}
            />
          ) : (
            <label
              htmlFor="file"
              className="uppercase py- lg:text-[12px] text-[9px] font-medium bg-neutral-950 py-1 sm:py-4 md:py-2 lg:py-4 md:px-4 hover:bg-neutral-900 cursor-pointer transition-all duration-300 px-5 border rounded-md m-2 overflow-hidden flex items-center justify-center text-white  md:text-[13px]"
            >
              Upload Scheme of Work File
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
