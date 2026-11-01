// document.title = "View Students";

document.title = "View Students";
import Button from "../../../components/reUse/Button";
import LittleHeader from "../../../components/static/LittleHeader";

import {
  useClassSubject,
  useStudentGrade,
  useTeacherInfo,
} from "../../../pagesForTeachers/hooks/useTeacher";

import toast, { Toaster } from "react-hot-toast";
import {
  useReadMyClassInfoData,
  useStudentInfo,
} from "../../../pagesForStudents/hooks/useStudentHook";
import { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import {
  useSchoolAnnouncement,
  useSchoolData,
  useSchool,
} from "../../../pages/hook/useSchoolAuth";

const OtherPayments = () => {
  const { studentInfo } = useStudentInfo();
  const { data } = useSchool(studentInfo?.schoolIDs);

  const { state } = useReadMyClassInfoData(studentInfo?.classAssigned);
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentName, setPaymentName] = useState<string>("");

  const [payment, setPayment] = useState<string>("");

  const handlePayment = () => {
    setLoading(true);

    const x = setTimeout(() => {
      setLoading(false);
      clearTimeout(x);
    }, 2000);
  };

  let xx = data?.paymentOptions?.filter(
    (el: any) => el?.paymentDetails === paymentName
  )[0]?.paymentAmount;

  useEffect(() => {
    // setPaymentAmount(xx);
    console.log("reading: ", payment);
  }, [payment]);

  console.log("reading: ", payment);
  return (
    <div className="text-blue-950">
      <Toaster position="top-center" reverseOrder={true} />
      {/* header */}
      <div className="mb-0" />
      <LittleHeader name={"Making Other Payments"} />

      <div className="mt-10" />

      <main className="">
        <div className="flex flex-col mb-4">
          <label htmlFor="" className="mb-1 text-[13px] font-semibold">
            Payment Name
          </label>
          <select
            className="select select-bordered w-full max-w-xs"
            value={paymentName}
            onChange={(e) => {
              setPaymentName(e.target.value);
            }}
          >
            <option disabled selected>
              Who shot first?
            </option>
            {data?.paymentOptions?.map((el: any) => (
              <option value={el.paymentDetails}>{el.paymentDetails}</option>
            ))}
          </select>
        </div>
        <p></p>
        <div className="flex flex-col mb-4">
          <label htmlFor="" className="mb-1 text-[13px] font-semibold">
            Payment Amount
          </label>
          <div className="border h-[45px] rounded-md max-w-[325px] outline-none text-[14px] pl-2 flex items-center font-semibold">
            ₦{parseFloat(xx !== undefined ? xx : 0).toLocaleString()}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col mb-4">
            <label htmlFor="" className="mb-1 text-[13px] font-semibold">
              Payment To Pay
            </label>
            <input
              className="border h-[45px] rounded-md max-w-[325px] outline-none text-[14px] pl-2"
              placeholder="Amount"
              defaultValue={parseFloat(xx)}
              value={!payment ? parseFloat(xx) : payment}
              onChange={(e) => {
                if (payment === "") {
                  setPayment(xx);
                }
                setPayment(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="" className="mb-1 text-[13px] font-semibold">
              Payment Balance
            </label>
            <div className="border h-[45px] rounded-md max-w-[325px] outline-none text-[14px] pl-2 flex items-center font-semibold tracking-wider italic">
              ₦
              {payment
                ? (parseFloat(xx) - parseFloat(payment)).toLocaleString()
                : (0).toLocaleString()}
            </div>
          </div>
        </div>
        <Button
          icon={loading && <FaSpinner size={15} className="animate-spin" />}
          name={loading ? "Loading..." : "Proceed to Pay"}
          className="bg-blue-950 py-3 ml-0 mt-10"
          onClick={handlePayment}
        />
      </main>
    </div>
  );
};

export default OtherPayments;
