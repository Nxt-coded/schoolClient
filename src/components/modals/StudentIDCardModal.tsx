import { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import pic from "@/assets/pix.jpg";
import { FaTimes, FaIdCard, FaGraduationCap } from "react-icons/fa";

interface Props {
  student: any;
  onClose: () => void;
}

const BACKEND_URL = "https://start-school-be.vercel.app/api";

const StudentIDCardModal = ({ student, onClose }: Props) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const qrValue = `${BACKEND_URL}/qr-scan/${student?.schoolIDs}/${student?._id}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-10 bg-white rounded-full p-2 shadow-xl text-gray-600 hover:text-red-500 transition-all duration-200 hover:scale-110"
        >
          <FaTimes size={16} />
        </button>

        {/* ID Card */}
        <div
          ref={cardRef}
          className="w-[340px] rounded-2xl overflow-hidden shadow-2xl select-none"
          style={{
            background: "linear-gradient(145deg, #0f172a 0%, #1e3a8a 60%, #1e40af 100%)",
          }}
        >
          {/* Header strip */}
          <div
            className="px-5 py-4 flex items-center justify-between"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center gap-2">
              <FaGraduationCap className="text-yellow-300" size={22} />
              <div>
                <p className="text-white font-bold text-[13px] tracking-wide uppercase leading-tight">
                  {student?.schoolName || "School"}
                </p>
                <p className="text-blue-200 mt-2 text-[10px] tracking-widest uppercase">
                  Student ID Card
                </p>
              </div>
            </div>
            <FaIdCard className="text-blue-300 opacity-60" size={28} />
          </div>

          {/* Body */}
          <div className="px-5 pt-4 pb-5">
            <div className="mb-4">
              {/* Info */}
              <div className="pt-1">
                <h2 className="text-white font-bold text-[17px] leading-tight capitalize">
                  {student?.studentFirstName} {student?.studentLastName}
                </h2>
                <p className="text-blue-200 text-[11px] mt-1 uppercase tracking-wider">
                  {student?.classAssigned || "Student"}
                </p>
                <div className="mt-2 space-y-1">
                  <div>
                    <p className="text-blue-300 text-[9px] uppercase tracking-widest flex">
                      Enrollment ID: <span className="ml-4 text-yellow-300 font-bold text-[14px] tracking-widest font-mono">
                      {student?.enrollmentID}
                    </span>
                    </p>
                    
                  </div>
                  {student?.gender && (
                    <p className="text-blue-200 text-[11px] capitalize">
                      {student.gender}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* QR Section */}
            <div className="flex flex-col items-center gap-2">
              <div className="bg-white rounded-xl p-3 shadow-lg">
                <QRCodeSVG
                  value={qrValue}
                  size={130}
                  bgColor="#ffffff"
                  fgColor="#0f172a"
                  level="H"
                  includeMargin={false}
                />
              </div>
              <p className="text-blue-200 text-[10px] text-center tracking-wide">
                Scan to Clock In / Clock Out
              </p>
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-center">
              {/* <p className="text-blue-300 text-[9px] tracking-widest uppercase whitespace-nowrap">
                Academic Session
              </p> */}
            </div>
          </div>
        </div>

        {/* Hint */}
        <p className="text-center text-white/50 text-[11px] mt-3">
          Click outside to close
        </p>
      </div>
    </div>
  );
};

export default StudentIDCardModal;
