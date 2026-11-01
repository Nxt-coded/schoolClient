import pix from "../../../assets/pix.jpg";
import { FaCheckDouble } from "react-icons/fa6";
import { useEffect } from "react";

import { updatePurchasedStore } from "../../../pages/api/schoolAPIs";

import { mutate } from "swr";
import { usePurchasedStore, useStudentInfo } from "../../hooks/useStudentHook";
import { useSchool } from "../../../pages/hook/useSchoolAuth";

const RecentPurcentScreen = () => {
  const { studentInfo } = useStudentInfo();
  const { data } = useSchool(studentInfo?._id);

  const { purchasedStore: purchasedStore } = usePurchasedStore(
    studentInfo?._id
  );

  return (
    <div className="overflow-hidden">
      <div
        className="py-6 px-2 rounded-md min-w-[30px] md:min-w-[300px] overflow-y-hidden"
        style={{ color: "var(--secondary)" }}
      >
        <div className="text-[gray] w-[1100px] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4">
          <div className="w-[180px] border-r">Date Purchased</div>

          <div className="w-[250px] border-r">Items Purchased</div>
          <div className="w-[100px] border-r">Total cost paid</div>

          <div className="w-[150px] border-r">Paid Receipt</div>

          <div className="w-[80px] border-r">delievered</div>
          <div className="w-[10px] border-r"></div>

          <div className="w-[150px] border-r">Name</div>
          <div className="w-[80px] border-r">Class</div>
        </div>

        {/* Here */}
        {purchasedStore?.length > 0 ? (
          <div className=" w-[1100px] overflow-hidden ">
            {purchasedStore?.map((props: any, i: number) => (
              <div>
                {i <= 2 && (
                  <div>
                    <div>
                      <div
                        key={props}
                        className={`w-full flex items-center gap-2 text-[12px] font-medium  min-h-16 px-4 my-2  overflow-hidden ${
                          i % 2 === 0 ? "bg-slate-50" : "bg-white"
                        }`}
                      >
                        <div className="w-[180px] border-r">{props?.date}</div>
                        {/* <ReporterDetail props={props.reporterID}/> */}
                        <div className={`w-[250px] border-r `}>
                          {props?.cart?.map((el: any, i: number) => (
                            <div key={i} className="">
                              <div className="flex items-center gap-3 my-2">
                                <div className="avatar">
                                  <div className="mask mask-squircle w-12 h-12">
                                    <img
                                      src={el?.avatar ? el?.avatar : pix}
                                      alt="Avatar"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className="font-bold">{el.title}</div>
                                  <div className="text-[12px] opacity-50 ">
                                    ₦{el.cost.toLocaleString()} * {el.QTY}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="w-[100px] border-r ml-1">
                          ₦{(props?.amount).toLocaleString()}
                        </div>

                        {/* name */}

                        <div className="w-[150px] border-r ml-1">
                          {props?.reference}
                        </div>

                        <div className="w-[80px] border-r pl-6 ">
                          <label>
                            <input
                              checked={props?.delievered}
                              type="checkbox"
                              className="checkbox checkbox-error"
                              onClick={() => {
                                updatePurchasedStore(props?._id).then((res) => {
                                  if (res.status === 201) {
                                    mutate(
                                      `api/view-school-purchase/${data?._id}`
                                    );
                                    // location.reload();
                                    useEffect(() => {}, [props.delievered]);
                                  }
                                });
                              }}
                            />
                          </label>
                        </div>

                        <div className="w-[10px] border-r ml-1" />

                        <div className="w-[150px] border-r ml-1">
                          <div>
                            <div className="font-bold">
                              {props?.studentName}
                            </div>
                            <div className="text-[12px] opacity-50 ">
                              {props?.studentClass ? "student" : "Teacher"}
                            </div>
                          </div>
                        </div>

                        <div className="w-[80px] border-r ml-1">
                          {props?.studentClass}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <FaCheckDouble />
            <p className="mt-2 text-[15px]">
              You haven't had any purchase yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentPurcentScreen;
