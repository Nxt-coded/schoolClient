import LittleHeader from "../../../components/static/LittleHeader";
import pix from "../../../assets/pix.jpg";
import { FaCheckDouble } from "react-icons/fa6";
import { FC, useEffect } from "react";

import {
  updatePurchasedStore,
  verifyPayment,
} from "../../../pages/api/schoolAPIs";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { displayCart, emptyCart, paymentRef } from "../../../global/reduxState";
import { mutate } from "swr";
import {
  usePurchasedStoreInfo,
  useSchool,
  useSchoolData,
} from "../../hook/useSchoolAuth";

const RecentPurcentScreen = () => {
  const dispatch = useDispatch();
  //   const data = Array.from({ length: 7 });

  const cart = useSelector((state: any) => state.cart);

  const { data } = useSchoolData();
  const { schoolPurchased: purchasedStore } = usePurchasedStoreInfo(data?._id);

  return (
    <div>
      <div
        className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden"
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
                {i <= 5 && (
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
              You haven't reported any complains yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentPurcentScreen;
