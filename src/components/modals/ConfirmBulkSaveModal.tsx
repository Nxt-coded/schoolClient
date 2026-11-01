import { FC } from "react";
import { CheckCircle2, Save, X } from "lucide-react";
import { ClipLoader } from "react-spinners";

interface ConfirmBulkSaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  loading?: boolean;
  count?: number;
}

export const ConfirmBulkSaveModal: FC<ConfirmBulkSaveModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Add All Scores?",
  message = "Are you sure you want to add scores for all students with input? This will update their records in the database.",
  loading = false,
  count = 0,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 animate-in fade-in zoom-in duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="relative p-6 text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
            disabled={loading}
          >
            <X size={20} />
          </button>

          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-50 mb-6">
            <Save className="h-8 w-8 text-blue-950" />
          </div>

          <h3
            className="text-xl font-bold text-gray-900 mb-2"
            id="modal-title"
          >
            {title}
          </h3>

          <p className="text-sm text-gray-500 mb-4 px-4 text-wrap">
            {message}
          </p>

          {count > 0 && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-950 rounded-full text-xs font-bold mb-8">
              <CheckCircle2 size={14} />
              <span>{count} students ready for update</span>
            </div>
          )}

          <div className="flex gap-3 justify-center">
            <button
              type="button"
              className="px-5 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-200 w-full"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-5 py-2.5 rounded-xl border border-transparent bg-blue-950 text-white text-sm font-semibold hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 transition-all duration-200 shadow-lg hover:shadow-blue-500/30 w-full flex items-center justify-center gap-2"
              onClick={onConfirm}
              disabled={loading}
            >
              {loading ? (
                <>
                  <ClipLoader color="white" size={16} />
                  <span>Processing...</span>
                </>
              ) : (
                "Confirm & Add"
              )}
            </button>
          </div>
        </div>
        
        {/* Decorational bottom line */}
        <div className="h-1.5 w-full bg-blue-950 shadow-inner"></div>
      </div>
    </div>
  );
};
