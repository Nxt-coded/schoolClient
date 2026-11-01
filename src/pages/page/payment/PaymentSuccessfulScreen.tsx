import { MdOutlinePayment } from "react-icons/md";
import { GrDownload } from "react-icons/gr";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSchoolData, useSchoolSessionData } from "../../hook/useSchoolAuth";
import { useEffect, useRef, useState } from "react";
import { createReceipt, updatePayInfo, verifyPay } from "../../api/schoolAPIs";
import moment from "moment";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const SuccessfulPaymentScreen = () => {
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);

  const ID = useSelector((state: any) => state.user);
  const { schoolInfo } = useSchoolSessionData(ID.id);
  const { search } = useLocation();
  const { data } = useSchoolData();

  const [object, setObject]: any = useState<{}>({});

  let refID = schoolInfo;

  let obj: any = {};

  if (refID?.length > 0) {
    for (let i = 0; i < refID.length; i++) {
      obj = refID[0];
    }
  }

  let termID: string = "";

  if (obj !== null) {
    for (let i = 0; i < obj?.term?.reverse().length; i++) {
      termID = obj?.term[0];
    }
  }

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

  useEffect(() => {
    if (search.split("reference=")[1] !== "" || null) {
      verifyPay(search.split("reference=")[1]).then((res) => {
        setObject(res.data);

        if (res.status) {
          createReceipt(ID.id, {
            costPaid: res?.data?.amount / 100,
            paymentRef: search.split("reference=")[1],
          });
          updatePayInfo(termID, {
            costPaid: res?.data?.amount / 100,
            payRef: search.split("reference=")[1],
          });
        }
      });
    }
  }, []);

  const downloadPDF = () => {
    const input = contentRef.current;

    if (!input) {
      console.error("Ref is not set");
      return;
    }

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf: any = new jsPDF();
        pdf.addImage(imgData, "PNG", 0, 0);
        pdf.save("download.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  return (
    <div className="h-screen w-full flex justify-center items-center flex-col bg-gray-100">
      <div
        className="min-h-[72%] w-[88%] md:w-[60%] lg:w-[50%]  bg-white shadow-lg p-[30px] md:p-[50px] rounded-[3px] "
        ref={contentRef}
        id="webpage-content"
      >
        <div className="w-full mb-[30px] flex justify-center items-center">
          <iframe
            src="https://lottie.host/embed/a0fbd354-5df1-43ec-a15c-040fa47c2706/N3coVG0nTi.json"
            style={{ height: "80px" }}
          ></iframe>
        </div>

        <div className="w-full flex justify-center items-center flex-col">
          <div className="w-full mb-[25px] flex justify-between items-center">
            <div>
              <h1 className="text-[25px] md:text-[28px] lg:text-[34px] font-bold">
                Customer Reciept
              </h1>
              <h4 className="font-medium italic">
                Thanks for going through this.
                <br />
                <span className="text-green-500">payment confirmed</span>
              </h4>
            </div>
            <div>
              <MdOutlinePayment className="text-[25px]" />
            </div>
          </div>
          <div className="w-full mb-[10px] flex items-center flex-col">
            <div className="w-full mb-2 flex justify-between items-center">
              <div>Name</div>
              <div className="font-bold text-end">
                {data?.name} {data?.name2}
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
              <div className="font-bold text-end">{data?.email}</div>
            </div>
            <div className="w-full flex justify-between items-center">
              <div>School Name</div>
              <div className="font-bold text-end">{data?.schoolName}</div>
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
          className="i underline text-blue-950 text-[18px] cursor-pointer"
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
                  }).then((res: any) => {
                    navigate("/dashboard");
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
  );
};

export default SuccessfulPaymentScreen;
