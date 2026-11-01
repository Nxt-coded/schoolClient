import { FC, useState } from "react";
import Button from "../../../components/reUse/Button";
import { MdCheck, MdClose } from "react-icons/md";
import toast from "react-hot-toast";

import "react-datepicker/dist/react-datepicker.css";
import { mutate } from "swr";
import {
  useReadOneClassInfo,
  useStudentInfo,
} from "../../../pagesForStudents/hooks/useStudentHook";
import { updateTeacherActiveness } from "../../api/studentAPI";
import { useClassSubject } from "../../../pagesForTeachers/hooks/useTeacher";

interface iProps {
  props?: any;
}

const MakeActiveClass: FC<iProps> = ({ props }) => {
  const [subject, setSubject] = useState<string>("");
  const [period, setPeriod] = useState<string>("");

  const { studentInfo } = useStudentInfo();
  const { oneClass } = useReadOneClassInfo(studentInfo?.presentClassID);

  const { subjectData } = useClassSubject(oneClass?._id);

  const onCreateAssignment = () => {
    updateTeacherActiveness(studentInfo?._id, subject)
      .then((res) => {
        if (res?.status === 201) {
          mutate(`api/view-school-teacher/${studentInfo?.schoolIDs}`);
          toast.success("Added Successfully...!");
        } else {
          toast.error(`${res?.response?.data?.message}`);
        }
      })
      .then(() => {
        setSubject("");
        setPeriod("");
      });
  };


  return (
    <div>
      {/* <Toaster position="top-center" reverseOrder={true} /> */}
      <div className=" text-[13px] font-medium">
        {studentInfo?.monitor ? (
          <label
            htmlFor="mark_complains"
            className=" transition-all duration-300 cursor-pointer "
          >
            <p>+ Mark Active(on-going) Class</p>
            <p className="text-[10px] mt-1">(only class prefect can do this)</p>
          </label>
        ) : (
          <label
            // htmlFor="mark_complains"
            className=" transition-all duration-300 cursor-pointer "
          >
            <p>+ Mark Active Class</p>
            <p className="text-[10px]">(only class prefect can do this)</p>
          </label>
        )}
        <div className="" />
        {/* Put this part before </body> tag */}
        <input type="checkbox" id="mark_complains" className="modal-toggle" />
        <div
          className="modal bgw rounded-md text-blue-950 text-left"
          role="dialog"
        >
          <div className="modal-box bg-gray-100 rounded-md">
            <div className="flex items-center justify-between my-4 ">
              <p className="font-bold">Mark an ongoing class!</p>

              <label
                htmlFor="mark_complains"
                className="hover:bg-blue-50 transition-all duration-300  cursor-pointer rounded-full flex items-center justify-center w-6 h-6 font-bold "
              >
                <MdClose />
              </label>
            </div>
            <hr />
            <div className="mt-2 leading-tight text-[13px] font-medium">
              Have an insight of who is in your class at the moment of every
              period, this helps us you give a quantitative and quality
              Education...!
              <br />
              <br />
              <div className="flex gap-2  items-center">
                <p>
                  {" "}
                  Subject Teacher:{" "}
                  <span className="font-medium">{subject}</span>
                </p>
                {subject && (
                  <div className="flex items-center font-bold">
                    <span>selected</span>
                    <MdCheck className="text-green-500 text-[25px] mb-1 " />
                  </div>
                )}
              </div>
            </div>
            <div className="mt-10 w-full gap-2 flex flex-col items-center">
              <div className="w-full">
                <div className="flex w-full gap-2 mb-10">
                  <div className="w-full">
                    <label className="font-medium text-[12px]">
                      Subject Presently Having{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <select
                      className="select select-bordered w-full mt-2"
                      value={subject}
                      onChange={(e) => {
                        setSubject(e.target.value);
                      }}
                    >
                      <option
                        selected
                        disabled
                        defaultValue={"Choose Importance"}
                      >
                        Choose Subject ongoing
                      </option>
                      {subjectData?.classSubjects?.map((props: any) => (
                        <option
                          key={props?._id}
                          value={props?.subjectTeacherName}
                        >
                          {props?.subjectTitle}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-end transition-all duration-300">
              {subject !== "" ? (
                <label
                  htmlFor="mark_complains"
                  className="bg-blue-950 text-white py-4 px-8 rounded-md cursor-pointer "
                  onClick={onCreateAssignment}
                >
                  Mark Class ongoing
                </label>
              ) : (
                <Button
                  name="Can't Proceed"
                  className="bg-[lightgray] text-blue-950 mx-0 cursor-not-allowed"
                />
              )}
            </div>
          </div>

          <label className="modal-backdrop" htmlFor="mark_complains">
            Close
          </label>
        </div>
      </div>
    </div>
  );
};

export default MakeActiveClass;
