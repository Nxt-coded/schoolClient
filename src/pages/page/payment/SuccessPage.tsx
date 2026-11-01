import { FaCheckCircle } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa6";
import { IoCard } from "react-icons/io5";
import Button from "../../../components/reUse/Button";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  useSchool,
  useSchoolData,
  useSchoolSessionData,
  useViewTermDetail,
} from "../../hook/useSchoolAuth";
import { useEffect } from "react";
import { createReceipt, updatePayInfo, verifyPay } from "../../api/schoolAPIs";
import { useSelector } from "react-redux";

const SuccessPage = () => {
  const { termID: readTermID }: any = useParams();
  const ID = useSelector((state: any) => state.user);
  const { schoolInfo } = useSchoolSessionData(ID.id);
  const { search } = useLocation();

  console.log("read ID: ", readTermID);
  console.log("read RefID: ", search.split("reference=")[1]);

  let refID = schoolInfo;

  // let obj: any = {};

  // if (refID?.length > 0) {
  //   for (let i = 0; i < refID.length; i++) {
  //     obj = refID[0];
  //   }
  // }

  // let termID: string = "";

  // if (obj !== null) {
  //   for (let i = 0; i < obj?.term?.reverse().length; i++) {
  //     termID = obj?.term[0];
  //   }
  // }

  // console.log(termID);
  console.log(refID);

  // useEffect(() => {
  //   if (search.split("reference=")[1] !== "" || null) {
  //     verifyPay(search.split("reference=")[1]).then((res) => {
  //       console.log(res);
  //       if (res.status) {
  //         createReceipt(ID.id, {
  //           costPaid: res?.data?.amount / 100,
  //           paymentRef: search.split("reference=")[1],
  //         });
  //         updatePayInfo(readTermID, {
  //           costPaid: res?.data?.amount / 100,
  //           payRef: search.split("reference=")[1],
  //         }).then((res: any) => {
  //           console.log(res);
  //         });
  //       }
  //     });
  //   }
  // }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <main className="w-[200px] h-[200px] relative flex justify-center items-center">
        <div className="w-[200px] h-[200px] bg-blue-950 text-white rounded-full"></div>
        <IoCard className="absolute z-10 top-1/4  text-[100px] text-white" />
        <FaCheckCircle className="absolute z-10 bottom-10 left-4 w-[60px] p-2 h-[60px] rounded-full bg-blue-950  text-[50px] text-white" />
      </main>

      <div className="font-bold text-[30px] mt-10">Thank You!</div>
      <p className="font-bold text-[20px]">Payment done successfully</p>
      <p className="mt-5 w-[40%] text-center">
        You will be redirected to your deshboard shortly or use the button below
        to return to your dashboard
      </p>

      {/* <Link to="/dashboard" className="mt-10">
        <Button
          name="Dashboard"
          className="bg-blue-950"
          onClick={() => {
            if (search.split("reference=")[1] !== "" || null) {
              verifyPay(search.split("reference=")[1]).then((res) => {
                if (res.status) {
                  createReceipt(ID.id, {
                    costPaid: res?.data?.amount / 100,
                    paymentRef: search.split("reference=")[1],
                  });
                  updatePayInfo(termID, {
                    costPaid: res?.data?.amount / 100,
                    payRef: search.split("reference=")[1],
                  }).then((res: any) => {});
                }
              });
            }
          }}
        />
      </Link> */}
    </div>
  );
};

export default SuccessPage;
