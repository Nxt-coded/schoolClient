import { useDispatch, useSelector } from "react-redux";
import { FC } from "react";
import {
  changeTermID,
  displaySession,
  displaySessionTerm,
  displaySessioned,
} from "../../global/reduxState";
import { FaCheckDouble } from "react-icons/fa6";
import {
  useSchoolData,
  useSchoolSessionData,
} from "../../pages/hook/useSchoolAuth";
import Tooltip from "./Tooltip";

const Session: FC = () => {
  // const { data } = useSchoolData();
  const dispatch = useDispatch();
  const session = useSelector((state: any) => state.sessionToggle);

  const handleToggleMenuFalse = () => {
    if (!document.startViewTransition) {
      dispatch(displaySession(true));
      dispatch(displaySessioned(false));
    } else {
      document.startViewTransition(() => {
        dispatch(displaySession(true));
        dispatch(displaySessioned(false));
      });
    }
  };

  const { data } = useSchoolData();
  const { schoolInfo } = useSchoolSessionData(data?._id);
  return (
    <div
      className={`border w-[250px] ${
        data?.categoryType === "Secondary" ? "bg-blue-50" : "bg-red-50"
      } shadow-sm min-h-42 rounded-md p-1 ${
        data?.categoryType === "Secondary" ? "text-blue-950" : "text-green-950"
      }`}
    >
      <p className="text-[14px] mt-2 font-bold ml-2">
        Academic Session created
      </p>
      <div className="flex flex-col items-between  w-full">
        {schoolInfo?.length > 0 ? (
          <div>
            {schoolInfo?.map((props: any, i: number) => (
              <div key={props._id}>
                {i < 3 && (
                  <div
                    key={`${i + props}`}
                    className="w-full"
                    onClick={() => {
                      if (!document.startViewTransition) {
                        dispatch(displaySessioned(false));
                        dispatch(displaySessionTerm(true));
                        dispatch(changeTermID(props?._id));
                      } else {
                        document.startViewTransition(() => {
                          dispatch(displaySessioned(false));
                          dispatch(displaySessionTerm(true));
                          dispatch(changeTermID(props?._id));
                        });
                      }
                    }}
                  >
                    <div
                      className={`text-[12px] w-full py- font-medium  duration-300 transition-all ${
                        data?.categoryType === "Secondary"
                          ? "hover:bg-blue-950"
                          : "hover:bg-red-950"
                      } rounded-md my-1 hover:text-white cursor-pointer flex items-center justify-between border`}
                    >
                      <Tooltip tip={"Add New Term"}>
                        {" "}
                        <div
                          className="w-full flex pl-2 mt-7 mb-2"
                          onClick={() => {
                            console.log("Let's do this: ", props._id);
                          }}
                        >
                          Session: {props?.year}
                        </div>
                      </Tooltip>

                      {/* <div className="text-[17px]"></div> */}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-4 py-1 mt-3">
            <FaCheckDouble size={13} />
            <p className="mt-3 text-[12px] font-medium">
              Session hasn't been declared
            </p>
          </div>
        )}
      </div>

      <div className="mt-4" />
      <hr />
      <div
        className={`flex w-full justify-center items-center cursor-pointer ${
          data?.categoryType === "Secondary"
            ? "text-blue-900"
            : "text-green-900"
        } transition-all duraion-300 mt-2`}
        onClick={handleToggleMenuFalse}
      >
        <p className="font-bold">+</p>
        <p className="p-2 text-center break-words text-[12px] font-bold uppercase ">
          Add New Session
        </p>
      </div>
    </div>
  );
};

export default Session;
