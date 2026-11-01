import { FaCheckCircle } from "react-icons/fa";
import { IoCard } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import Button from "../../components/reUse/Button";
import { verifyPay } from "../../pages/api/schoolAPIs";
import { schoolPaymentEndPoint } from "../api/studentAPI";
import { useStudentInfo } from "../hooks/useStudentHook";
import moment from "moment";
import { useEffect, useState } from "react";

document.title = "SchoolFee Payment";

const SchoolFeePaidScreen = () => {
  const { search } = useLocation();
  const { studentInfo } = useStudentInfo();
  let [state, setState] = useState("");

  useEffect(() => {
    let x = setTimeout(() => {
      setState(search.split("reference=")[1]);
      if (search.split("reference=")[1] !== "" || null) {
        verifyPay(search.split("reference=")[1]).then((res) => {
          if (res.status === true) {
            schoolPaymentEndPoint(studentInfo?._id, {
              date: moment(res?.data?.createdAt).format("lll"),
              amount: res?.data?.amount / 100,
              reference: res?.data?.reference,
              purchasedID: res?.data.id,
            });
          }
        });
      }

      clearTimeout(x);
    }, 100);
  }, [state]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center w-full h-screen">
        <main className="w-[200px] h-[200px] relative flex justify-center items-center">
          <div className="w-[200px] h-[200px] bg-blue-950 text-white rounded-full"></div>
          <IoCard className="absolute z-10 top-1/4  text-[100px] text-white" />
          <FaCheckCircle className="absolute z-10 bottom-10 left-4 w-[60px] p-2 h-[60px] rounded-full bg-blue-950  text-[50px] text-white" />
        </main>

        <div className="font-bold text-[30px] mt-10">Thank You!</div>
        <p className="font-bold text-[20px]">Payment done successfully</p>
        <p className="mt-5 w-[40%] text-center">
          You will be redirected to your deshboard shortly or use the button
          below to return to your dashboard
        </p>

        <Link to="/dashboard" className="mt-10">
          <Button
            name="Dashboard"
            className="bg-blue-950"
            onClick={() => {
              if (search.split("reference=")[1] !== "" || null) {
                verifyPay(search.split("reference=")[1]).then((res) => {
                  if (res.status) {
                    schoolPaymentEndPoint(studentInfo?._id, {
                      date: moment(res?.data?.createdAt).format("lll"),
                      amount: res?.data?.amount / 1000,
                      reference: res?.data?.reference,
                      purchasedID: res?.data.id,
                    });
                  }
                });
              }
            }}
          />
        </Link>
      </div>
    </div>
  );
};

export default SchoolFeePaidScreen;
