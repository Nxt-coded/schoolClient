import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { displaySession, displaySessionTerm } from "../../global/reduxState";
import { MdClose } from "react-icons/md";
import Input from "../reUse/Input";
import Button from "../reUse/Button";
import {
  createNewSession,
  createNewSessionTerm,
} from "../../pages/api/schoolAPIs";
import {
  useSchoolCookie,
  useSchoolData,
  useViewSingleSession,
} from "../../pages/hook/useSchoolAuth";
import toast, { Toaster } from "react-hot-toast";
import { mutate } from "swr";
import ClipLoader from "react-spinners/ClipLoader";

const AddSessionTerm = () => {
  const termID = useSelector((state: any) => state.termID);
  const dispatch = useDispatch();
  const [start, setStart] = useState<boolean>(false);
  const [end, setEnd] = useState<string>("");
  const { dataID } = useSchoolCookie();
  const { data } = useSchoolData();

  const handleToggleMenuFalse = () => {
    if (!document.startViewTransition) {
      dispatch(displaySessionTerm(false));
    } else {
      document.startViewTransition(() => {
        dispatch(displaySessionTerm(false));
      });
    }
  };

  const { sessionData } = useViewSingleSession(termID);

  const handleSubmit = () => {
    setStart(true);
    createNewSessionTerm(termID, { term: end })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          mutate(`api/view-school-term-detail/${termID}`);
          if (!document.startViewTransition) {
            dispatch(displaySessionTerm(false));
            mutate(`api/view-school-session/${data?._id}`);
            mutate(`api/view-school/${data?._id}`);
            toast.success("Term Session created");
          } else {
            document.startViewTransition(() => {
              mutate(`api/view-school-session/${data?._id}`);
              mutate(`api/view-school/${data?._id}`);
              toast.success("Term Session created");
              dispatch(displaySessionTerm(false));
            });
          }
        } else {
          setEnd("");
          setStart(false);
          if (!document.startViewTransition) {
            dispatch(displaySessionTerm(false));
            mutate(`api/view-school-term-detail/${termID}`);
            toast.error(`${res?.response?.data?.message}`);
          } else {
            document.startViewTransition(() => {
              mutate(`api/view-school-session/${data?._id}`);
              mutate(`api/view-school/${data?._id}`);

              toast.error(`${res?.response?.data?.message}`);

              dispatch(displaySessionTerm(false));
            });
          }
        }
      })
      .then(() => {
        setEnd("");
        setStart(false);
      });
  };
  return (

    <div
      className={`flex justify-center ${
        data?.categoryType === "Secondary" ? "bg-blue-50" : "bg-red-50"
      }`}
    >

      <Toaster position="top-center" reverseOrder={true} />
      <div className="w-[320px] md:w-[500px] min-h-[300px] border rounded-md bg-[white] shadow-lg p-4">
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

        <p className="mt-2 leading-tight md:text-[13px] font-medium text-[11px]">
          Please note that each Term you create, holds records of that
          particular Term.
        </p>

        <div className="mt-10 w-full gap-2 flex items-center">
          <div className="w-full mt-1">
            <label className="font-medium md:text-[12px] text-[10px]">
              Session Year <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Session Year: 2023/2024"
              className="mx-0 h-12 md:h-10 md:w-full w-[120px] text-[11px] md:text-[16px]"
              defaultValue={sessionData?.year}
              value={sessionData?.year}
            />
          </div>

          <div className="w-full -mt-5">
            <label className="font-medium md:text-[12px] text-[10px]">
              Session Term <span className="text-red-500">*</span>
            </label>

            <select
              className="select select-info bg-white border-[#3B82F6] select-bordered md:w-full mt-2 text-[9px] md:text-[13px]"
              value={end}
              onChange={(e) => {
                setEnd(e.target.value);
              }}
            >
              <option selected>Choose Term</option>
              <option value={"1st Term"}>1st Term</option>
              <option value={"2nd Term"}>2nd Term</option>
              <option value={"3rd Term"}>3rd Term</option>
            </select>
          </div>
        </div>

        <div className="w-full flex justify-end transition-all duration-300">
          {end !== "" ? (
            <div>
              {start ? (
                <div>
                  <Button
                    icon={
                      <ClipLoader size={20} color="white" className="mb-0" />
                    }
                    name={"creating Term"}
                    className={`${
                      data?.categoryType === "Secondary"
                        ? "bg-blue-950"
                        : "bg-red-950"
                    } py-0 mx-0`}
                  />
                </div>
              ) : (
                <Button
                  name={"Proceed"}
                  className={`${
                    data?.categoryType === "Secondary"
                      ? "bg-blue-950"
                      : "bg-red-950"
                  } mx-0`}
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

export default AddSessionTerm;
