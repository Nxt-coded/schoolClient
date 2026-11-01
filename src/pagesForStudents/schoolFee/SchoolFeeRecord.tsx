import pix from "../../assets/pix.jpg";
import { FaCheckDouble } from "react-icons/fa6";
import { FC, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { mutate } from "swr";
import LittleHeader from "../../components/layout/LittleHeader";
import { useStudentInfo, useStudentSchoolFee } from "../hooks/useStudentHook";

const SchoolFeesHistoryScreen = () => {
  const dispatch = useDispatch();
  const { studentInfo } = useStudentInfo();
  const { studentFees: schoolFeeRecord } = useStudentSchoolFee(
    studentInfo?._id
  );

  //   useEffect(() => {
  //     if (ref !== "") {
  //       verifyPayment(ref).then((res) => {
  //         if (res?.data?.data?.data?.gateway_response === "Successful") {
  //           if (cart.length > 0) {
  //             purchasedEndPoint(studentInfo?._id, {
  //               date: moment(res?.data?.data?.data?.createdAt).format("lll"),
  //               cart,
  //               reference: res?.data?.data?.data?.reference,
  //               amount: res?.data?.data?.data?.amount / 100,
  //               id: res?.data?.data?.data?.id,
  //               delievered: false,
  //             }).then(() => {
  //               mutate(`api/view-purchase/${studentInfo?._id}`);
  //               dispatch(paymentRef(null));
  //               dispatch(emptyCart());
  //               dispatch(displayCart(false));
  //             });
  //           }
  //         }
  //       });
  //     }
  //   }, []);

  return (
    <div>
      <LittleHeader name={"School Fees History"} />

      <div className="mb-28" />

      <div className="mb-28" />

      <div
        className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden "
        // style={{ color: "var(--secondary)" }}
      >
        <div className="text-[gray] w-[900px] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4">
          <div className="w-[180px] border-r">Date Purchased</div>

          <div className="w-[250px] border-r ">Items Purchased</div>
          <div className="w-[130px] border-r">School Fee Paid</div>

          <div className="w-[150px] border-r ml-1">Payment Receipt Code</div>

          <div className="w-[150px] border-r">confirm</div>
          <div className="w-[80px] border-r">Remark</div>
        </div>

        {/* Here */}
        {schoolFeeRecord?.data?.length > 0 ? (
          <div className=" w-[900px] overflow-hidden ">
            {schoolFeeRecord?.data?.map((props: any, i: number) => (
              <div>
                <div
                  key={props}
                  className={`w-full flex items-center gap-2 text-[12px] font-medium  min-h-16 px-4 my-2  overflow-hidden ${
                    i % 2 === 0 ? "bg-slate-50" : "bg-white"
                  }`}
                >
                  <div className="w-[180px] border-r">{props?.date}</div>

                  <div className={`w-[250px] border-r `}>
                    <div key={i} className="">
                      <div className="flex items-center gap-3 my-2">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={props?.avatar ? props?.avatar : pix}
                              alt="Avatar"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{props.studentName}</div>
                          <div className="text-[12px] opacity-50 ">
                            {props.studentClass} - {props?.term}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-[130px] border-r ml-1">
                    ₦{(props?.amount).toLocaleString()}
                  </div>

                  {/* name */}

                  <div className="w-[145px] border-r ml-1">
                    {props?.reference}
                  </div>

                  <div className="w-[150px] border-r pl-1 ">
                    <div
                    // onClick={() => {
                    //   setState(props?._id);
                    // }}
                    >
                      <label
                        htmlFor="my_modal_6"
                        className={`btn text-[12px] font-medium text-white 
                          ${props.confirm ? "bg-blue-950" : "bg-red-600"}
                          ${
                            props.confirm
                              ? "hover:bg-blue-900"
                              : "hover:bg-red-500"
                          }
                          w-[95%] capitalize
                          `}
                      >
                        {props.confirm ? "confirm" : "not yet confirm"}
                      </label>

                      {/* Put this part before </body> tag */}
                      <input
                        type="checkbox"
                        id="my_modal_6"
                        className="modal-toggle"
                      />
                      <div className="modal" role="dialog">
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">
                            Confirm this payment
                          </h3>
                          <p className="py-4">
                            Are you sure you want to confirm this payment?
                            {props?._id}
                          </p>
                          <div className="modal-action">
                            <label
                              htmlFor="my_modal_6"
                              className="btn px-8 bg-green-500 text-white hover:bg-green-600 "
                            >
                              Yes
                            </label>
                            <label
                              htmlFor="my_modal_6"
                              className="btn px-8 bg-red-500 text-white hover:bg-red-600 "
                            >
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-[80px] border-r pl-6 ">
                    <input
                      id="my_modal_6"
                      checked={props?.confirm}
                      type="checkbox"
                      className={`checkbox ${
                        props?.confirm ? "checkbox-success" : "checkbox-error"
                      }`}
                    />
                  </div>
                </div>
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

export default SchoolFeesHistoryScreen;
