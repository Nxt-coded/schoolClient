import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { verifySMSPayment } from "../../api/schoolAPIs";
import { useSchoolCookie } from "../../hook/useSchoolAuth";
import { CheckCircle2, XCircle, ArrowRight, Home, Settings } from "lucide-react";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import { mutate } from "swr";

const SMSPaymentSuccess: FC = () => {
  const { dataID } = useSchoolCookie();
  const { search } = useLocation();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<"success" | "error" | "pending">("pending");
  const [paymentData, setPaymentData] = useState<any>(null);

  const reference = new URLSearchParams(search).get("reference");

  useEffect(() => {
    if (reference && dataID) {
      setLoading(true);
      verifySMSPayment(dataID, reference)
        .then((res) => {
          if (res.status === 200) {
            setStatus("success");
            setPaymentData(res.data);
            mutate(`api/view-school/${dataID}/seconded-data`);
            toast.success("SMS Activation Successful!");
          } else {
            setStatus("error");
            toast.error("Payment verification failed");
          }
        })
        .catch((err) => {
          console.error(err);
          setStatus("error");
          toast.error("An error occurred during verification");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
        setStatus("error");
        setLoading(false);
    }
  }, [reference, dataID]);

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50">
        <ClipLoader color="#1e3a8a" size={50} />
        <p className="mt-4 text-gray-600 font-medium animate-pulse">Verifying your payment...</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex items-center justify-center p-4 bg-gray-50">
      <div className="bg-white rounded-[2rem] shadow-xl w-full max-w-lg overflow-hidden border border-gray-100 flex flex-col">
        {/* Top Header Section */}
        <div className={`p-8 text-center ${status === "success" ? "bg-green-50" : "bg-red-50"}`}>
          <div className="flex justify-center mb-6">
            {status === "success" ? (
              <div className="h-20 w-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-200">
                <CheckCircle2 size={48} className="text-white" />
              </div>
            ) : (
              <div className="h-20 w-20 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-200">
                <XCircle size={48} className="text-white" />
              </div>
            )}
          </div>
          <h1 className={`text-3xl font-black ${status === "success" ? "text-green-700" : "text-red-700"}`}>
            {status === "success" ? "Payment Successful!" : "Payment Failed"}
          </h1>
          <p className="mt-2 text-gray-500 font-medium">
            {status === "success" 
              ? "Your SMS notifications have been activated for this term." 
              : "We couldn't verify your payment. Please contact support if this is an error."}
          </p>
        </div>

        {/* Details Section */}
        <div className="p-8 flex-1">
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-50">
              <span className="text-gray-500 text-sm font-medium">Reference ID</span>
              <span className="text-gray-900 text-sm font-bold">{reference || "N/A"}</span>
            </div>
            {status === "success" && (
              <>
                <div className="flex justify-between items-center py-3 border-b border-gray-50">
                  <span className="text-gray-500 text-sm font-medium">Amount Paid</span>
                  <span className="text-green-600 text-sm font-black italic">₦{(paymentData?.amount / 100)?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-50">
                  <span className="text-gray-500 text-sm font-medium">Status</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase tracking-wider">Active</span>
                </div>
              </>
            )}
          </div>

          <div className="mt-10 space-y-3">
            <Link
              to="/settings"
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all duration-300 hover:gap-4 ${
                status === "success" 
                ? "bg-blue-950 text-white shadow-lg shadow-blue-200 hover:bg-blue-900" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Settings size={18} />
              Go to Settings
              <ArrowRight size={18} />
            </Link>
            
            <Link
              to="/dashboard"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <Home size={18} />
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className={`h-2 w-full ${status === "success" ? "bg-green-500" : "bg-red-500"}`} />
      </div>
    </div>
  );
};

export default SMSPaymentSuccess;
