import { FC, useState } from "react";
import Button from "../../../components/reUse/Button";
import { MdClose, MdPayment } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";

import { useSchoolData } from "../../../pages/hook/useSchoolAuth";
import { FaSpinner } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { otherPayment } from "../../../global/reduxState";
import { makeOtherPayment } from "../../../pagesForStudents/api/studentAPI";
import { useStudentEnrollmentID } from "../../../pagesForStudents/hooks/useStudentHook";
import { Link } from "react-router-dom";

interface iProps {
  props?: any;
}

const PrintReciptScreen: FC<iProps> = ({ props }) => {
  const { data } = useSchoolData();

  const [paymentName, setPaymentName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const [studentName, setStudentName] = useState<string>("");
  const [studentID, setStudentID] = useState<string>("");

  const { studentRecord } = useStudentEnrollmentID(studentID);

  let xx = data?.paymentOptions?.filter(
    (el: any) => el?.paymentDetails === paymentName
  )[0]?.paymentAmount;

  console.log(xx);

  const onInitiatePayment = () => {
    setLoading(true);
    makeOtherPayment({ email: data?.email, paymentAmount: parseFloat(xx) })
      .then((res) => {
        if (res?.data?.status === 201) {
          dispatch(
            otherPayment({
              paymentName,
              studentID: studentRecord?._id,
              name: `${studentRecord?.studentFirstName} ${studentRecord?.studentLastName}`,
              email: studentRecord?.email,
              schoolName: data?.schoolName,
              schoolAddress: data?.address,
              schoolBankDetail: data?.bankDetails,
            })
          );
          window.location.assign(res?.data?.data?.data?.authorization_url);
          toast.success("Added Successfully...!");
        } else {
          toast.error(`${res?.response?.data?.message}`);
        }
      })

      .finally(() => {
        setLoading(false);
      });
  };

  console.log(props);

  return (
    <div className="">
      <Toaster position="top-center" reverseOrder={true} />
      <div className=" text-[13px]  font-medium">
        <label
          htmlFor="other_payments"
          className=" transition-all duration-300 cursor-pointer "
        >
          <div className="flex">
            <div className="bg-blue-950 text-white  px-4 py-2 rounded-md cursor-pointer hover:bg-blue-900 transition-all duration-300">
              Get Receipt
            </div>
          </div>
        </label>
        <div className="" />
        <input type="checkbox" id="other_payments" className="modal-toggle" />
        <div className="modal rounded-md text-blue-950 text-left" role="dialog">
          <div className="modal-box bg-white rounded-md">
            <div className="flex items-center justify-between my-4 ">
              <p className="font-bold">
                Making Payment for other things: {props?.firstName}
              </p>

              <label
                htmlFor="other_payments"
                className="hover:bg-blue-50 transition-all duration-300  cursor-pointer rounded-full flex items-center justify-center w-6 h-6 font-bold "
              >
                <MdClose />
              </label>
            </div>
            <hr />
            <div className="mt-2 italic leading-tight text-[13px] font-medium">
              Make payments conveniently without stress using cash, cards,
              digital wallets, or bank transfers. Digital transactions simplify
              financial activities, while security measures ensure safe
              payments!45
              <br />
            </div>
            <div className="mt-10 w-full gap-2 flex flex-col items-center">
              <div className="w-full">
                <div>
                  <label className="font-medium text-[12px]">
                    Student Info <span className="text-red-500"></span>
                  </label>

                  {/* // readSubject */}
                  <div className="flex flex-col mb-4">
                    <label
                      htmlFor=""
                      className="mb-1 text-[13px] font-semibold"
                    ></label>
                    <input
                      className="border h-[45px] rounded-md max-w-[325px] outline-none text-[14px] pl-2 flex items-center font-semibold"
                      placeholder="Enter Student Name"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <label className="font-medium text-[12px] mb-2">
                      Student ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="border h-[45px] rounded-md max-w-[325px] outline-none text-[14px] pl-2 flex items-center font-semibold"
                      placeholder="Enter Student ID"
                      value={studentID}
                      onChange={(e) => setStudentID(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex w-full gap-2 mb-5">
                  <div className="w-full flex flex-col">
                    <label className="font-medium text-[12px]">
                      Payment Mode <span className="text-red-500 mb-1">*</span>
                    </label>

                    <select
                      className="select select-bordered w-full max-w-xs mt-1"
                      value={paymentName}
                      onChange={(e) => {
                        setPaymentName(e.target.value);
                      }}
                    >
                      <option selected>Pick what to pay for</option>
                      {data?.paymentOptions?.map((el: any) => (
                        <option value={el.paymentDetails}>
                          {el.paymentDetails}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <label className="font-medium text-[12px]">
                  Payment Amount <span className="text-red-500">*</span>
                </label>

                {/* // readSubject */}
                <div className="flex flex-col mb-4">
                  <label
                    htmlFor=""
                    className="mb-1 text-[13px] font-semibold"
                  ></label>
                  <div className="border h-[45px] rounded-md max-w-[325px] outline-none text-[14px] pl-2 flex items-center font-semibold">
                    ₦{parseFloat(xx !== undefined ? xx : 0).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-end transition-all duration-300 mt-10">
              {studentID !== "" ? (
                <div className="flex items-center gap-2">
                  <Link
                    to="/other-school-payment"
                    //   htmlFor="other_payments"
                    className="bg-red-500 hover:bg-red-600 transition-all duration-300 text-white py-3 px-6 rounded-md cursor-pointer flex"
                    onClick={() => {
                      dispatch(
                        otherPayment({
                          paymentName,
                          studentID: studentRecord?._id,
                          name: `${studentRecord?.studentFirstName} ${studentRecord?.studentLastName}`,
                          email: studentRecord?.email,
                          schoolName: data?.schoolName,
                          schoolAddress: data?.address,
                          schoolBankDetail: data?.bankDetails,
                          currency: "NGN",
                          channel: "cash",
                          amount: xx,
                        })
                      );
                    }}
                  >
                    {/* {loading && (
                      <FaSpinner size={20} className="mr-4 animate-spin" />
                    )} */}
                    {"Proceed with Cash"}
                  </Link>
                  <label
                    //   htmlFor="other_payments"
                    className="bg-blue-950 hover:bg-blue-900 transition-all duration-300 text-white py-3 px-6 rounded-md cursor-pointer flex"
                    onClick={onInitiatePayment}
                  >
                    {loading && (
                      <FaSpinner size={20} className="mr-4 animate-spin" />
                    )}
                    {loading ? "Loading..." : "Proceed with Card"}
                  </label>
                </div>
              ) : (
                <Button
                  name="Can't Proceed Print"
                  className="bg-[lightgray] text-blue-950 mx-0 cursor-not-allowed"
                />
              )}
            </div>
          </div>

          <label className="modal-backdrop" htmlFor="other_payments">
            Close
          </label>
        </div>
      </div>
    </div>
  );
};

export default PrintReciptScreen;
