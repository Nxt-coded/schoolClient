import { FC, useState } from "react";
import lodash from "lodash";
import {
  useClassSubjects,
  useClassTimeTable,
  useSchool,
  useSchoolData,
} from "../../../pages/hook/useSchoolAuth";
import { BsThreeDots } from "react-icons/bs";
import { useParams } from "react-router-dom";
import {
  deleteTimeTableSubject,
  updateTimeTableSubject,
} from "../../../pages/api/schoolAPIs";
import toast from "react-hot-toast";
import { mutate } from "swr";
import { MdDelete } from "react-icons/md";
import Tooltip from "../../components/static/Tooltip";

interface iProps {
  props?: any;
}

const daysData = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const TimeTableScreen: FC<iProps> = ({ props }) => {
  const { timetbale } = useClassTimeTable(props!);

  const dataTime: any = Object.values(
    lodash.groupBy(timetbale?.data?.timeTable, "day")
  )?.map((subArray: any) =>
    subArray.sort(
      (a: any, b: any) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )
  );
  const { data } = useSchoolData();

  const [state, setState] = useState<number | null>(null);
  const [subject, setSubject] = useState<string>("");
  const { classID } = useParams();
  const { readSubject } = useClassSubjects(classID!);

  return (
    <div className="w-full ">
      <div className=" h-screen">
        <div className=" w-full h-[415px] bg-slate-100  border rounded-md p-2 overflow-x-auto gap-4">
          {/* Header */}
          <div
            className={`flex w-[${
              data?.timeTableStructure?.length * 300
            }px] gap-4 bg-white py-3 px-1`}
            style={{
              width: `${data?.timeTableStructure?.length * 300}px`,
            }}
          >
            <div className="w-[210px] h-6 border-r ">days</div>
            {/* <div className="w-[280px] h-6 border-r">07:45AM - 08:00AM</div> */}
            {data?.timeTableStructure?.map((el: string, i: number) => (
              <div key={i} className="w-[300px] h-6 border-r">
                {el}
              </div>
            ))}
          </div>

          <div className="flex gap-0  py-3 mt-2 ">
            <div className="w-[200px] h-6 border-r ">
              {daysData?.map((props: string, i: number) => (
                <div
                  key={i}
                  className={`py-2 pl-2 h-[3.75rem] w-[188px] flex items-center ${
                    i % 2 === 0 ? "bg-white" : "bg-slate-50"
                  }`}
                >
                  {" "}
                  {props}
                </div>
              ))}
            </div>

            <div
              className="gap-1 px-1 "
              style={{
                width: `${data?.timeTableStructure?.length * 300}px`,
              }}
            >
              {dataTime?.map((props: any, i: number) => (
                <div
                  key={i}
                  className={`
                flex flex-col py-2 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}
                `}
                >
                  <div className="flex   ">
                    {/* <div className="w-[270px] h-6 border-r">
                      07:45AM - 08:00AM
                    </div> */}
                    {props?.map((props: any, e: number) => (
                      <div key={e} className="flex">
                        <div className="relative w-[285px] h-11 border-r px-4 flex items-center justify-between  ">
                          {props.subject}{" "}
                          <div
                            className=" cursor-pointer text-slate-400 hover:text-slate-900 transition-all duration-300"
                            onClick={() => {
                              setState(e);
                            }}
                          >
                            <BsThreeDots />
                          </div>
                          {state === e && (
                            <div
                              className="absolute w-[280px] mx-1 min-h-[180px] p-4 backdrop-blur-sm top-10 left-0 rounded-md border
                             bg-white/30 shadow-lg ring-1 ring-black/5
                            "
                            >
                              <div className="flex items-center justify-between mb-5">
                                <p className="text-[13px] font-semibold">
                                  Change Subject
                                </p>
                                <Tooltip tip="Delete this Subject">
                                  <MdDelete
                                    className="text-red-600 cursor-pointer text-[22px]"
                                    onClick={() => {
                                      deleteTimeTableSubject(
                                        data?._id,
                                        props?._id
                                      ).then((res) => {
                                        console.log(res);
                                        if (res.status === 201) {
                                          toast.success(
                                            "subject deleted successfully"
                                          );
                                          setState(null);
                                          mutate(
                                            `api/view-time-table/${classID}`
                                          );
                                        } else {
                                          toast.error(
                                            "Please try again, something went wrong!"
                                          );

                                          setState(null);
                                        }
                                      });
                                    }}
                                  />
                                </Tooltip>
                              </div>

                              <select
                                className="select select-bordered w-full mt-2 mb-8"
                                onChange={(e: any) => {
                                  setSubject(e.target.value);
                                }}
                              >
                                <option disabled selected>
                                  Choose Period
                                </option>
                                <option value={"Short Break"}>
                                  Short Break
                                </option>
                                <option value={"Long Break"}>Long Break</option>
                                <option value={"Free Period"}>
                                  Free Period
                                </option>
                                <option value={"Assembly"}>Assembly</option>
                                {readSubject?.map((props: any, i: number) => (
                                  <option
                                    key={i}
                                    value={props.subjectTitle}
                                    className="py-4 my-8"
                                  >
                                    {props?.subjectTitle}
                                  </option>
                                ))}
                              </select>

                              <div className="flex gap-2 items-center">
                                <button
                                  className="w-full px-4 py-2 text-white font-medium rounded-md bg-red-500 hover:bg-red-600 transition-all duration-300"
                                  onClick={() => {
                                    setState(null);
                                  }}
                                >
                                  Close
                                </button>
                                <button
                                  className="w-full px-4 py-2 text-white font-medium rounded-md bg-blue-950 hover:bg-blue-900 transition-all duration-300"
                                  onClick={() => {
                                    updateTimeTableSubject(
                                      data?._id,
                                      classID,
                                      props?._id,
                                      subject
                                    ).then((res) => {
                                      if (res.status === 201) {
                                        toast.success(
                                          "subject updated successfully"
                                        );
                                        setState(null);
                                        mutate(
                                          `api/view-time-table/${classID}`
                                        );
                                      } else {
                                        toast.error(
                                          "Please try again, something went wrong!"
                                        );

                                        setState(null);
                                      }
                                    });
                                  }}
                                >
                                  update
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTableScreen;
