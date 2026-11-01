document.title = "Report and Complains";
import { FaCheckDouble } from "react-icons/fa6";
import LittleHeader from "../../../components/layout/LittleHeader";
import { MdVisibilityOff } from "react-icons/md";
import Tooltip from "../../../components/static/Tooltip";

const ViewCommentsAndReportScreen = () => {
  const data = Array.from({ length: 6 });
  return (
    <div>
      <LittleHeader name={"Report and Complains"} />

      <div className="mb-28" />

      {data?.length > 1 ? (
        <div className=" grid grid-cols-1   lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-3 gap-2 first-line:break-words">
          {data?.map((props: any) => (
            <div key={props} className="border px-1 rounded-md min-h-[320px]  ">
              <p className="border-b mb-1 rounded-md w-full py-1 h-[75%]">
                Content
              </p>
              <p className="my-2 mb-4">Report Date: </p>

              <div className=" px-4 flex w-full justify-between mt-4 items-center pb-2">
                <p className="flex flex-col  cursor-pointer  w-[100px] ">
                  <Tooltip tip="Importance">
                    <p>High</p>
                  </Tooltip>
                </p>

                <p className="flex  justify-center cursor-pointer  w-[100px]  ">
                  <Tooltip tip="Acknowlegde">
                    {" "}
                    <MdVisibilityOff size={22} />
                  </Tooltip>
                </p>

                <p className="flex justify-end cursor-pointer w-[100px] text-[] ">
                  {/*  */}
                  <Tooltip tip="Resolved">
                    <p>Resolved</p>
                  </Tooltip>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-4">
          <FaCheckDouble size={20} />
          <p className="mt-3 text-[12px] font-medium">
            No Complain Entery Recorded yet
          </p>
        </div>
      )}
    </div>
  );
};

export default ViewCommentsAndReportScreen;
