import { FC, useState } from "react";
import Button from "../../../components/reUse/Button";
import { MdCheck, MdClose, MdPayment } from "react-icons/md";
import toast from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import { MdOutlineMarkChatRead } from "react-icons/md";

import { mutate } from "swr";
import {
  useReadOneClassInfo,
  useStudentInfo,
} from "../../hooks/useStudentHook";
import { useSchool, useSchoolClassRM } from "../../../pages/hook/useSchoolAuth";
import { makeComplains, makeOtherPayment } from "../../api/studentAPI";
import { FaSpinner } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { otherPayment } from "../../../global/reduxState";

interface iProps {
  props?: any;
}

const MakeOtherPayment: FC<iProps> = ({ props }) => {
  const [subject, setSubject] = useState<string>("");
  const [period, setPeriod] = useState<string>("");

  const { studentInfo } = useStudentInfo();
  const { oneClass } = useReadOneClassInfo(studentInfo?.presentClassID);

  const { data } = useSchool(studentInfo?.schoolIDs);
  // api/view-subject-assignment/${subjectID}

  const [paymentName, setPaymentName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [payment, setPayment] = useState<string>("");

  let xx = data?.data?.paymentOptions?.filter(
    (el: any) => el?.paymentDetails === paymentName
  )[0]?.paymentAmount;

  const onInitiatePayment = () => {
    setLoading(true);
    makeOtherPayment({ email: studentInfo?.email, paymentAmount: `${xx}` })
      .then((res) => {
        if (res?.data?.status === 201) {
          dispatch(otherPayment({ paymentName }));
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

  return (
    <div className="">
      {/* <Toaster position="top-center" reverseOrder={true} /> */}
      <div className=" text-[13px]  font-medium">
        <label
          htmlFor="other_payments"
          className=" transition-all duration-300 cursor-pointer "
        >
          <div className="flex">
            <div className="bg-blue-950 hover:bg-blue-900 transition-all duration-300 text-white border-none font-medium py-4 text-[13px] w-full  px-5 leading-tight flex justify-center items-center rounded-md gap-2 ">
              <MdPayment size={20} />
              <div>Other Payments</div>
            </div>
          </div>
        </label>
        <div className="" />
        {/* Put this part before </body> tag */}
        <input type="checkbox" id="other_payments" className="modal-toggle" />
        <div className="modal rounded-md text-blue-950 text-left" role="dialog">
          <div className="modal-box bg-white rounded-md">
            <div className="flex items-center justify-between my-4 ">
              <p className="font-bold">Making Payment for other things</p>

              <label
                htmlFor="other_payments"
                className="hover:bg-blue-50 transition-all duration-300  cursor-pointer rounded-full flex items-center justify-center w-6 h-6 font-bold "
              >
                <MdClose />
              </label>
            </div>
            <hr />
            <div className="mt-2 italic leading-tight text-[13px] font-medium">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum unde
              ea iusto voluptates ex repudiandae voluptas assumenda mollitia
              illo soluta error, quis voluptatibus accusantium ipsa, eum autem
              perspiciatis nihil fuga?
              <br />
            </div>
            <div className="mt-10 w-full gap-2 flex flex-col items-center">
              <div className="w-full">
                <div className="flex w-full gap-2 mb-5">
                  <div className="w-full flex flex-col">
                    <label className="font-medium text-[12px]">
                      Payment Mode <span className="text-red-500">*</span>
                    </label>

                    <select
                      className="select select-bordered w-full max-w-xs"
                      value={paymentName}
                      onChange={(e) => {
                        setPaymentName(e.target.value);
                      }}
                    >
                      <option selected>Pick what to pay for</option>
                      {data?.data?.paymentOptions?.map((el: any) => (
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
              {paymentName !== "" ? (
                <label
                  //   htmlFor="other_payments"
                  className="bg-blue-950 text-white py-4 px-8 rounded-md cursor-pointer flex"
                  onClick={onInitiatePayment}
                >
                  {loading && (
                    <FaSpinner size={20} className="mr-4 animate-spin" />
                  )}
                  {loading ? "Loading..." : "Proceed to Payment"}
                </label>
              ) : (
                <Button
                  name="Can't Proceed"
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

export default MakeOtherPayment;
