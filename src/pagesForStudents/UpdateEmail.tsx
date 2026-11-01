import { FC, useEffect, useState } from "react";
import { MdCheck, MdClose } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

import "react-datepicker/dist/react-datepicker.css";
import { mutate } from "swr";
import { useReadMyClassInfoData, useStudentInfo } from "./hooks/useStudentHook";
import { useClassSubject } from "../pagesForTeachers/hooks/useTeacher";
import { updateStudentParentNumber } from "./api/studentAPI";
import Input from "../components/reUse/Input";
import Button from "../components/reUse/Button";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";

interface iProps {
  props?: any;
}

const UpdateEmail: FC<iProps> = ({ props }) => {
  const navigate = useNavigate();
  const [stated, setStated] = useState<boolean>(false);
  const [parentPhoneNumber, setParentPhoneNumber] = useState<string>("");

  const { studentInfo } = useStudentInfo();

  const { state } = useReadMyClassInfoData(studentInfo?.classAssigned);
  const { subjectData } = useClassSubject(state?._id);

  const onCreateAssignment = () => {
    setStated(true);

    updateStudentParentNumber(
      studentInfo?.schoolIDs,
      studentInfo?._id,
      parentPhoneNumber
    ).then((res: any) => {
      if (res?.status === 201) {
        toast.success("Parent's phone number added/updated successfully");
        mutate(`api/view-student-info/${studentInfo?._id}`);

        setTimeout(() => {
          setStated(false);
          setViewState(true);
        }, 1000);
      } else if (res?.status === 404 || !res?.status) {
        toast.error("Couldn't update parent's phone number");
      }
    });
  };

  const [viewState, setViewState] = useState<Boolean>(false);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={true} />
      <div className=" text-[13px] font-medium">
        <div />
        <input
          type="checkbox"
          checked={studentInfo?.parentPhoneNumber ? false : true}
          id="update_email"
          className="modal-toggle"
          value={parentPhoneNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setParentPhoneNumber(e.target.value);
          }}
        />
        <div className="modal bgw text-blue-950 text-left">
          <div className="modal-box bg-gray-100 rounded-md">
            <div className="flex items-center justify-between my-4 ">
              <p className="font-bold">Input Parent's Phone Number</p>

              <label
                htmlFor="update_email"
                className="hover:bg-blue-50 transition-all duration-300  cursor-pointer rounded-full flex items-center justify-center w-6 h-6 font-bold "
              >
                <MdClose />
              </label>
            </div>
            <hr />
            <div className="mt-2 leading-tight text-[13px] font-medium">
              Provide the phone number of your parent or guardian associated
              with this student.
              <br />
              <br />
              <div className="flex gap-2  items-center">
                <p>
                  Parent's Phone Number:{" "}
                  <span className="font-medium">{parentPhoneNumber}</span>
                </p>
                {parentPhoneNumber.length > 0 && (
                  <div className="flex items-center font-bold">
                    <span>Phone Number provided</span>
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
                      Parent's Phone Number{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <Input
                      className="w-[95%]"
                      value={parentPhoneNumber}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setParentPhoneNumber(e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-end transition-all duration-300">
              {parentPhoneNumber !== "" ? (
                <label
                  htmlFor="update_email"
                  className="bg-blue-950 text-white py-4 px-8 rounded-md flex items-center gap-2 cursor-pointer "
                  onClick={
                    !viewState
                      ? onCreateAssignment
                      : () => {
                          mutate(
                            `api/view-student-info/${studentInfo?._id}`
                          ).then(() => {
                            navigate(`/dashboard`);
                          });
                        }
                  }
                >
                  {viewState ? "View Dashboard" : <div>Proceed</div>}
                  {stated && <ClipLoader size={20} color="white" />}
                </label>
              ) : (
                <Button
                  name="Can't Proceed"
                  className="bg-[lightgray] text-blue-950 mx-0 cursor-not-allowed"
                />
              )}
            </div>
          </div>
        </div>

        <label className="modal-backdrop" htmlFor="update_email">
          Close
        </label>
      </div>
    </div>
  );
};

export default UpdateEmail;
