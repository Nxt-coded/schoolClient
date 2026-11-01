import { useState } from "react";
import { useDispatch } from "react-redux";
import { displaySession } from "../../global/reduxState";
import { MdClose } from "react-icons/md";
import Input from "../reUse/Input";
import Button from "../reUse/Button";
import {
  createNewSession,
  createNewSessionTerm,
} from "../../pages/api/schoolAPIs";
import { useSchoolCookie, useSchoolData } from "../../pages/hook/useSchoolAuth";
import toast, { Toaster } from "react-hot-toast";
import { mutate } from "swr";
import ClipLoader from "react-spinners/ClipLoader";

const AddSession = () => {
  const dispatch = useDispatch();
  const [start, setStart] = useState<string>("");
  const [startToggle, setStartToggle] = useState<boolean>(false);
  const { dataID } = useSchoolCookie();
  const { data } = useSchoolData();

  const handleToggleMenuFalse = () => {
    if (!document.startViewTransition) {
      dispatch(displaySession(false));
    } else {
      document.startViewTransition(() => {
        dispatch(displaySession(false));
      });
    }
  };

  const handleSubmit = () => {
    setStartToggle(true);

    // createNewSession(data?._id, { year: start })
    //   .then((res) => {
    //     console.log("res: ", res);
    //   })
    //   .finally(() => {
    //     setStartToggle(false);
    //   });

    createNewSession(data?._id, { year: start })
      .then((res) => {
        if (res.status === 201) {
          mutate(`api/view-school-session/${data?._id}`);
          mutate(`api/view-school/${data?._id}`);
          if (!document.startViewTransition) {
            dispatch(displaySession(false));
            createNewSessionTerm(res?.data?._id, { term: "1st Term" }).then(
              () => {
                toast.success("Term and Session created");
                toast.success("Session created");
              }
            );
          } else {
            document.startViewTransition(() => {
              toast.error("Something went wrong");
              dispatch(displaySession(false));
            });
          }
        } else {
          if (!document.startViewTransition) {
            dispatch(displaySession(false));
            mutate(`api/view-school-session/${data?._id}`);
            mutate(`api/view-school/${data?._id}`);
            console.log("read: ", res?.data?._id);
            createNewSessionTerm(res?.data?._id, { term: "1st Term" }).then(
              () => {
                mutate(`api/view-school-session/${res?.data?._id}`);
                mutate(`api/view-school/${res?.data?._id}`);
                toast.success("Term and Session created");
                toast.success("Session created");
              }
            );
          } else {
            document.startViewTransition(() => {
              mutate(`api/view-school-session/${data?._id}`);
              mutate(`api/view-school/${data?._id}`);
              console.log("read and Display: ", res);
              createNewSessionTerm(res?.data?._id, { term: "1st Term" }).then(
                () => {
                  mutate(`api/view-school-session/${res?.data?._id}`);
                  mutate(`api/view-school/${res?.data?._id}`);
                  toast.success("Session of First Term created");
                }
              );
              dispatch(displaySession(false));
            });
          }
        }
      })
      .then(() => {
        setStart("");
        setStartToggle(false);
      });
  };

  return (
    <div className="flex justify-center bg-blue-50   ">
      <Toaster position="top-center" reverseOrder={true} />
      <div className="w-[300px] sm:w[400px] md:w-[500px] min-h-[300px] border rounded-md bg-white shadow-lg p-4">
        <p className="flex items-center justify-between my-4 ">
          <p className="font-bold">Add New Session</p>

          <p
            className="hover:bg-blue-50 transition-all duration-300  cursor-pointer rounded-full flex items-center justify-center w-6 h-6 font-bold "
            onClick={handleToggleMenuFalse}
          >
            <MdClose />
          </p>
        </p>
        <hr />

        <p className="mt-2 leading-tight text-[13px] font-medium">
          Please note that each session you create, holds records of that
          particular session.
        </p>

        <div className="mt-10 w-full gap-2 flex items-center">
          <div className="w-full">
            <label className="font-medium text-[12px]">
              Session Year <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Session Year: 2023/2024"
              className="mx-0 h-10 w-full"
              value={start}
              onChange={(e: any) => {
                setStart(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="w-full flex justify-end transition-all duration-300">
          {start !== "" ? (
            <div>
              {startToggle ? (
                <div>
                  <Button
                    icon={
                      <ClipLoader size={20} color="white" className="mb-0" />
                    }
                    name={"creating Session"}
                    className={` ${
                      data?.categoryType === "Secondary"
                        ? "bg-blue-950"
                        : "bg-red-950"
                    } py-0 mx-0`}
                  />
                </div>
              ) : (
                <Button
                  name={"Proceed"}
                  className={` ${
                    data?.categoryType === "Secondary"
                      ? "bg-blue-950"
                      : "bg-red-950"
                  }`}
                  onClick={() => {
                    handleSubmit();
                  }}
                />
              )}
            </div>
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
    </div>
  );
};

export default AddSession;
