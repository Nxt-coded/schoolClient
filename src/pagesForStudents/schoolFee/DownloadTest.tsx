import React, { useRef, useEffect, useState } from "react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GrDownload } from "react-icons/gr";
import moment from "moment";
import { MdCheckCircleOutline, MdOutlinePayment } from "react-icons/md";
import { useStudentInfo } from "../hooks/useStudentHook";
import {
  createReceipt,
  updatePayInfo,
  verifyPay,
} from "../../pages/api/schoolAPIs";
import { schoolPaymentEndPoint } from "../api/studentAPI";

const ConfirmPaymentRecipt: React.FC = () => {
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const [object, setObject] = useState<any>({});

  const preprocessContent = () => {
    const content = contentRef.current;
    if (!content) return;

    // Traverse the DOM and replace "oklch" color functions with a fallback color
    const elementsWithUnsupportedColors = content.querySelectorAll("*");
    elementsWithUnsupportedColors.forEach((element: any) => {
      const computedStyles = window.getComputedStyle(element);
      if (computedStyles.color.includes("oklch")) {
        element.style.color = "#000000"; // Replace with a fallback color
      }
    });
  };

  useEffect(() => {
    preprocessContent();
  }, []);

  const { search } = useLocation();
  const { studentInfo } = useStudentInfo();
  let [state, setState] = useState("");

  useEffect(() => {
    const reference = search.split("reference=")[1];

    if (!reference) {
      return;
    }

    setState(reference);

    const verifyPayment = async () => {
      try {
        const res = await verifyPay(reference);

        if (res?.status === true && res?.data) {
          setObject(res.data);

          if (studentInfo?._id) {
            await schoolPaymentEndPoint(studentInfo._id, {
              date: moment(res.data.createdAt).format("lll"),
              amount: res.data.amount / 100,
              reference: res.data.reference,
              purchasedID: res.data.id,
            });
          }
        } else {
          console.error("Payment verification failed:", res);
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
      }
    };

    verifyPayment();
  }, [search, studentInfo?._id]);

  const downloadPDF = () => {
    const input = contentRef.current;

    if (!input) {
      return;
    }

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf: any = new jsPDF();
        pdf.addImage(imgData, "PNG", 30, 10);
        pdf.save(`receipt-${moment(Date.now()).format("llll")}.pdf`);
      })
      .catch((error) => {
        return error;
      });
  };

  return (
    <div>
      <div className="h-screen w-full flex justify-center items-center flex-col bg-gray-100">
        <div
          className="min-h-[72%] w-[88%] md:w-[60%] lg:w-[50%]  bg-white border p-[30px] md:p-[50px] rounded-[3px] "
          ref={contentRef}
        >
          <div className="w-full mb-[30px] flex justify-center items-center">
            {/* <iframe
              src="https://lottie.host/embed/a0fbd354-5df1-43ec-a15c-040fa47c2706/N3coVG0nTi.json"
              style={{ height: "80px" }}
            ></iframe> */}

            <MdCheckCircleOutline size={100} className="text-green-500" />
          </div>

          <div className="w-full flex justify-center items-center flex-col">
            <div className="w-full mb-[25px] flex justify-between items-center">
              <div>
                <h1 className="text-[25px] md:text-[28px] lg:text-[34px] font-bold">
                  School Fee Reciept
                </h1>
                <h4 className="font-medium italic">
                  Your school fee
                  <br />
                  <span className="text-green-500">payment confirmed</span>
                </h4>
              </div>
              <div>
                <MdOutlinePayment className="text-[25px]" />
              </div>
              {/* studentInfo */}
            </div>
            <div className="w-full mb-[10px] flex items-center flex-col">
              <div className="w-full mb-2 flex justify-between items-center">
                <div>Name</div>
                <div className="font-bold text-end">
                  {studentInfo?.studentFirstName} {studentInfo?.studentLastName}
                </div>
              </div>
              <div className="w-full mb-2 flex justify-between items-center">
                <div>Reference number</div>
                <div className="font-bold text-end">{object?.reference}</div>
              </div>
              <div className="w-full mb-2 flex justify-between items-center">
                <div>Payment Channel</div>
                <div className="font-bold text-end  capitalize">
                  {object?.channel}
                </div>
              </div>
              <div className="w-full flex justify-between items-center">
                <div>Currency</div>
                <div className="font-bold text-end capitalize">
                  {object?.currency}
                </div>
              </div>
            </div>
            <div className="w-full border my-[10px]"></div>
            <div className="w-full mb-[10px] flex justify-end items-center">
              {/* <div>
              <div>Paid at</div>
              <div className="font-bold">2016-09-29(moment)</div>
            </div> */}
              <div>
                <div className="text-end">Paid at</div>
                <div className="font-bold text-end">
                  {moment(object?.createdAt).format("lll")}
                </div>
              </div>
            </div>
            <div className="w-full border my-[10px]"></div>
            <div className="w-full my-[10px] flex items-center flex-col">
              <div className="w-full mb-2 flex justify-between items-center">
                <div>Email</div>
                <div className="font-bold text-end">{studentInfo?.email}</div>
              </div>
              <div className="w-full flex justify-between items-center">
                <div>School Name</div>
                <div className="font-bold text-end">
                  {studentInfo?.schoolName}
                </div>
              </div>
              <div className="w-full mt-[40px] flex justify-between items-center">
                <div className="font-bold text-[22px] uppercase ">Amount</div>
                <div className="font-bold text-[22px] text-green-500 text-end">
                  ₦{(object?.amount / 100).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="w-full mt-[20px] flex justify-center items-center gap-10">
          <div
            className="py-3 px-6 bg-blue-950 text-white flex items-center gap-2 rounded-md cursor-pointer"
            onClick={downloadPDF}
          >
            <div>Download Reciept</div>
            <GrDownload className="mb-1" />
          </div>
          <Link
            to="/dashboard"
            className="i underline text-blue-950 text-[18px] text-"
            onClick={() => {
              if (search.split("reference=")[1] !== "" || null) {
                verifyPay(search.split("reference=")[1]).then((res) => {
                  if (res.status) {
                    schoolPaymentEndPoint(studentInfo?._id, {
                      date: moment(res?.data?.createdAt).format("lll"),
                      amount: res?.data?.amount / 100,
                      reference: res?.data?.reference,
                      purchasedID: res?.data.id,
                    });
                  }
                });
              }
            }}
          >
            <div>Back to dashboard</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPaymentRecipt;
