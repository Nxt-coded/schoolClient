import React, { useRef, useEffect, useState } from "react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GrDownload } from "react-icons/gr";
import moment from "moment";
import { MdCheckCircleOutline, MdOutlinePayment } from "react-icons/md";
import { useStudentInfo } from "../hooks/useStudentHook";
import { verifyPay } from "../../pages/api/schoolAPIs";
import {
  schoolPaymentEndPoint,
  verifyOtherCashPayment,
  verifyOtherPayment,
} from "../api/studentAPI";
import { otherPayment } from "@/global/reduxState";

const OtherPaymentRecipt: React.FC = () => {
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
  const dispatch = useDispatch();
  const read = useSelector((el: any) => el.otherPay);

  // useEffect(() => {
  //  console.log(studentInfo?._id);
  //   let x = setTimeout(() => {
  //     if (search !== "") {
  //       setState(search.split("reference=")[1]);
  //       if (search.split("reference=")[1] !== "" || null) {
  //         verifyOtherPayment(
  //           studentInfo?._id || read?.studentID,
  //           search.split("reference=")[1],
  //           read?.paymentName
  //         ).then((res) => {
  //           if (res.status === 200) {
  //             // dispatch(otherPayment(null));
  //             setObject(res?.data?.data?.data);
  //             console.log("read: ", res);
  //           }
  //         });
  //       }
  //     } else {
  //       console.log("Na here!");
  //       verifyOtherCashPayment(
  //         studentInfo?._id || read?.studentID,

  //         { paymentName: read?.paymentName, paymentAmount: read?.amount }
  //       ).then((res) => {
  //         if (res.status === 200) {
  //           // dispatch(otherPayment(null));
  //           setObject(res?.data?.data);
  //           console.log("read: ", res);
  //         }
  //       });
  //     }

  //     clearTimeout(x);
  //   }, 500);
  // }, [state]);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        setIsVerifying(true);
        // setVerificationError(null);

        // Extract reference from URL if it exists
        const reference = search ? search.split("reference=")[1] : null;
        const studentId = studentInfo?._id || read?.studentID;

        if (!studentId) {
          throw new Error("Student ID not found");
        }

        if (reference) {
          // Online payment verification
          if (!read?.paymentName) {
            throw new Error("Payment name is required");
          }

          const res = await verifyOtherPayment(
            studentId,
            reference,
            read.paymentName
          );

          if (res?.status === 200) {
            setObject(res?.data?.data?.data);
            dispatch(otherPayment(null)); // Clear payment data after successful verification
          } else {
            throw new Error("Payment verification failed");
          }
        } else {
          // Cash payment verification
          if (!read?.paymentName || !read?.amount) {
            throw new Error("Payment details are incomplete");
          }

          const res = await verifyOtherCashPayment(studentId, {
            paymentName: read.paymentName,
            paymentAmount: read.amount,
          });

          if (res?.status === 200) {
            setObject(res?.data?.data);
            dispatch(otherPayment(null)); // Clear payment data after successful verification
          } else {
            throw new Error("Cash payment verification failed");
          }
        }
      } catch (error: any) {
        // setVerificationError(error?.message || "Verification failed");
        console.error("Payment verification error:", error);
      } finally {
        setIsVerifying(false);
      }
    };

    // Only verify if we have either a reference or payment details
    const hasReference = !!search;
    const hasPaymentDetails = !!(read?.paymentName && read?.amount);

    if (hasReference || hasPaymentDetails) {
      verifyPayment();
    }
  }, [search, studentInfo?._id, read]);

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
                  {read?.paymentName} Reciept
                </h1>
                <h4 className="font-medium italic">
                  Your {read?.paymentName}
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
                  {read?.name
                    ? read?.name
                    : `${studentInfo?.studentFirstName} ${studentInfo?.studentLastName}`}
                </div>
              </div>
              <div className="w-full mb-2 flex justify-between items-center">
                <div>Reference number</div>
                <div className="font-bold text-end">{object?.reference}</div>
              </div>
              <div className="w-full mb-2 flex justify-between items-center">
                <div>Payment Channel</div>
                <div className="font-bold text-end  capitalize">
                  {read?.channel ? read?.channel : object?.channel}
                </div>
              </div>
              <div className="w-full flex justify-between items-center">
                <div>Currency</div>
                <div className="font-bold text-end capitalize">
                  {read?.currency ? read?.currency : object?.currency}
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
                <div className="font-bold text-end">
                  {read?.email ? read?.email : studentInfo?.email}
                </div>
              </div>
              <div className="w-full flex justify-between items-center">
                <div>School Name</div>
                <div className="font-bold text-end">
                  {read?.schoolName
                    ? read?.schoolName
                    : studentInfo?.schoolName}
                </div>
              </div>
              <div className="w-full mt-[40px] flex justify-between items-center">
                <div className="font-bold text-[22px] uppercase ">Amount</div>
                <div className="font-bold text-[22px] text-green-500 text-end">
                  ₦
                  {read?.amount
                    ? parseFloat(read?.amount).toLocaleString()
                    : (object?.amount / 100).toLocaleString()}
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
                      amount: res?.data?.amount / 1000,
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

export default OtherPaymentRecipt;
