import LittleHeader from "../../../components/static/LittleHeader";
import pix from "../../../assets/pix.jpg";
import { FaCheckDouble } from "react-icons/fa6";
import { useState } from "react";

import { updateSchoolFee } from "../../../pages/api/schoolAPIs";
import {
  useStudentInfo,
  useStudentSchoolFee,
} from "../../hooks/useStudentHook";
import { Link } from "react-router-dom";

const RecentSchoolFeesHistoryScreen = () => {
  const { studentInfo } = useStudentInfo();

  const { studentFees: schoolFeeRecord } = useStudentSchoolFee(
    studentInfo?._id
  );
  const [state, setState] = useState<string>("");

  let item: any = {};

  for (let i = 0; i < schoolFeeRecord?.length; i++) {
    item = schoolFeeRecord[0];
  }

  return (
    <div>
      <div className="mb-10" />

      <p className="text-[13px] mb-3">
        School Fees Record
        <Link to="/school-fee-history">
          <span className="font-bold ml-2">View History</span>
        </Link>
      </p>

      <div
        className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden "
        // style={{ color: "var(--secondary)" }}
      >
        <div className="text-[gray] w-[900px] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4 pb-0">
          <div className="w-[180px] border-r">Date Paid</div>

          <div className="w-[250px] border-r">Student Info </div>
          <div className="w-[130px] border-r">School Fee Paid</div>

          <div className="w-[150px] border-r ml-1">Payment Receipt Code</div>

          <div className="w-[150px] border-r">confirm</div>
          <div className="w-[80px] border-r">Remark</div>
        </div>

        {/* Here */}

        <div className=" w-[900px] overflow-hidden ">
          <div
            className={`w-full flex items-center gap-2 text-[12px] font-medium  min-h-16 px-4 my-0 overflow-hidden bg-slate-50 py-5 
                    `}
          >
            <div className="w-[180px] border-r">{item?.date}</div>

            <div className={`w-[250px] border-r `}>
              <div className="">
                <div className="flex items-center gap-3 my-2">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={studentInfo?.avatar ? studentInfo?.avatar : pix}
                        alt="Avatar"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{item?.studentName}</div>
                    <div className="text-[12px] opacity-50 ">
                      {item?.studentClass} - {item?.term}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[130px] border-r ml-1">
              ₦{item?.amount?.toLocaleString()}
            </div>

            {/* name */}

            <div className="w-[145px] border-r ml-1">{item?.reference}</div>

            <div
              className="w-[150px] border-r pl-1 "
              onClick={() => {
                setState(item?._id);
              }}
            >
              <div
              // onClick={() => {
              //   setState(item?._id);
              // }}
              >
                <label
                  htmlFor="my_modal_6"
                  className={`btn text-[12px] font-medium text-white 
                          ${item?.confirm ? "bg-blue-950" : "bg-red-600"}
                          ${
                            item?.confirm
                              ? "hover:bg-blue-900"
                              : "hover:bg-red-500"
                          }
                          w-[95%] capitalize
                          `}
                >
                  {item?.confirm ? "confirm" : "not yet confirm"}
                </label>

                {/* Put this part before </body> tag */}
                <input
                  type="checkbox"
                  id="my_modal_6"
                  className="modal-toggle"
                />
              </div>
            </div>

            <div className="w-[80px] border-r pl-6 ">
              <input
                id="my_modal_6"
                checked={item?.confirm}
                type="checkbox"
                className={`checkbox ${
                  item?.confirm ? "checkbox-success" : "checkbox-error"
                }`}
                onClick={() => {
                  updateSchoolFee(item?._id).then((res) => {});
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentSchoolFeesHistoryScreen;
