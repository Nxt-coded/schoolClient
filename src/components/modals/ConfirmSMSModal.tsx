import { FC } from "react";
import { BellRing, ShieldCheck, X } from "lucide-react";
import { ClipLoader } from "react-spinners";

interface ConfirmSMSModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  currentStatus: boolean;
  loading?: boolean;
  loadingText?: string;
  totalCost?: number;
}

export const ConfirmSMSModal: FC<ConfirmSMSModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  currentStatus,
  totalCost,
  loading = false,
  loadingText,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 animate-in fade-in zoom-in duration-300 border border-gray-100"
        role="dialog"
        aria-modal="true"
      >
        <div className="relative p-8 text-center">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
            disabled={loading}
          >
            <X size={20} />
          </button>

          <div className={`mx-auto flex items-center justify-center h-20 w-20 rounded-full mb-6 transition-colors duration-500 ${
            currentStatus ? "bg-red-50" : "bg-green-50"
          }`}>
            {currentStatus ? (
              <ShieldCheck className="h-10 w-10 text-red-500 animate-pulse" />
            ) : (
              <BellRing className="h-10 w-10 text-green-500 animate-bounce" />
            )}
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            {currentStatus ? "Disable SMS?" : "Enable SMS?"}
          </h3>

          <p className="text-sm text-gray-500 mb-8 leading-relaxed">
            {currentStatus 
              ? "Are you sure you want to stop sending SMS notifications to parents? This might reduce engagement."
              : `Are you sure you want to send SMS notifications to parents? This will cost ₦${totalCost?.toLocaleString()} for this term (960 Naira per student).`}
          </p>

          <div className="flex gap-4">
            <button
              type="button"
              className="flex-1 px-6 py-3.5 rounded-2xl border border-gray-200 bg-white text-gray-700 text-sm font-bold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 active:scale-95 shadow-sm"
              onClick={onClose}
              disabled={loading}
            >
              No, Keep It
            </button>
            <button
              type="button"
              className={`flex-1 px-6 py-3.5 rounded-2xl text-white text-sm font-bold transition-all duration-200 active:scale-95 shadow-lg flex items-center justify-center gap-2 ${
                currentStatus 
                ? "bg-red-500 hover:bg-red-600 shadow-red-200" 
                : "bg-green-500 hover:bg-green-600 shadow-green-200"
              }`}
              onClick={onConfirm}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <ClipLoader color="white" size={18} />
                  {loadingText && <span className="animate-pulse">{loadingText}</span>}
                </div>
              ) : (
                currentStatus ? "Yes, Disable" : `Pay ₦${totalCost?.toLocaleString()}`
              )}
            </button>
          </div>
        </div>
        
        {/* Dynamic accent bar */}
        <div className={`h-1.5 w-full transition-colors duration-500 ${
          currentStatus ? "bg-red-500" : "bg-green-500"
        }`}></div>
      </div>
    </div>
  );
};
