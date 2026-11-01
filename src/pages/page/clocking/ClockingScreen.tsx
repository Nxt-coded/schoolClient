import { useEffect, useRef } from "react";
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";
import LittleHeader from "@/components/static/LittleHeader";

const ClockingScreen = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        showTorchButtonIfSupported: true,
      },
      /* verbose= */ false
    );

    const onScanSuccess = (decodedText: string) => {
      console.log(`Code matched = ${decodedText}`);
      if (decodedText.includes("/api/qr-scan")) {
        scanner.clear().then(() => {
          window.location.href = decodedText;
        }).catch(err => {
          console.error("Failed to clear scanner before redirect", err);
          window.location.href = decodedText;
        });
      }
    };

    const onScanFailure = (error: any) => {
      // Quietly ignore
    };

    scanner.render(onScanSuccess, onScanFailure);

    return () => {
      scanner.clear().catch(error => console.error("Failed to clear scanner", error));
    };
  }, []);

  const handleNativeAppOpen = () => {
    // Attempt to open ZXing scanner app with a return URL to this page
    const returnUrl = encodeURIComponent(window.location.href);
    window.location.href = `zxing://scan/?ret=${returnUrl}`;
  };

  const handleFileScan = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const html5QrCode = new Html5Qrcode("reader-hidden");
    try {
      const decodedText = await html5QrCode.scanFile(file, true);
      console.log("File Scan Success:", decodedText);
      if (decodedText.includes("/api/qr-scan")) {
        window.location.href = decodedText;
      }
    } catch (err) {
      console.error("File Scan Error:", err);
      alert("Could not find a valid QR code in the photo. Please try again.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
      <LittleHeader name="Attendance Scanner" />
      
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 overflow-y-auto">
        <div className="max-w-[450px] w-full bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-100 flex flex-col mb-6">
          
          {/* Header Info */}
          <div className="p-8 text-center bg-slate-50/50">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600 text-white mb-4 shadow-lg shadow-blue-200">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Scanner Active</h2>
            <p className="text-slate-500 font-medium text-sm mt-1 mx-auto max-w-[240px]">
              Align the student QR code within the scanning frame
            </p>
          </div>
          
          {/* Scanner Viewport */}
          <div className="px-8 pb-4">
             <div className="relative group">
                <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-blue-600 rounded-tl-2xl z-10 pointer-events-none"></div>
                <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-blue-600 rounded-tr-2xl z-10 pointer-events-none"></div>
                <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-blue-600 rounded-bl-2xl z-10 pointer-events-none"></div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-blue-600 rounded-br-2xl z-10 pointer-events-none"></div>
                
                <div id="reader" className="overflow-hidden rounded-3xl border border-slate-100 bg-slate-900 shadow-inner"></div>
                <div id="reader-hidden" className="hidden"></div>
                
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/30 blur-sm animate-[scan_2s_infinite] z-20 pointer-events-none"></div>
             </div>
          </div>

          {/* Alternative native Options */}
          <div className="px-8 pb-8 pt-2 flex flex-col gap-3">
             <div className="flex items-center gap-3 my-2">
                <div className="flex-1 h-px bg-slate-100"></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Or Use Native</span>
                <div className="flex-1 h-px bg-slate-100"></div>
             </div>

             <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={handleNativeAppOpen}
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M3 4.875C3 3.84 3.84 3 4.875 3h4.5c1.035 0 1.875.84 1.875 1.875v4.5c0 1.035-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 9.375v-4.5ZM4.875 4.5a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h4.5Zm7.875.375c0-1.035.84-1.875 1.875-1.875h4.5C20.16 3 21 3.84 21 4.875v4.5c0 1.035-.84 1.875-1.875 1.875h-4.5a1.875 1.875 0 0 1-1.875-1.875v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5ZM3 14.625c0-1.035.84-1.875 1.875-1.875h4.5c1.035 0 1.875.84 1.875 1.875v4.5c0 1.035-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 19.125v-4.5ZM4.875 14.25a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Zm9.375-.375a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75v-4.5Zm.75.75v4.5h4.5v-4.5h-4.5Z" clipRule="evenodd" />
                     </svg>
                  </div>
                  <span className="text-[11px] font-bold text-slate-700">Open App</span>
                </button>

                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
                        <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.742 2.742 0 0 1 2.332-1.39ZM12 6.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5Zm4.5 1.875a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0Z" clipRule="evenodd" />
                     </svg>
                  </div>
                  <span className="text-[11px] font-bold text-slate-700">System Camera</span>
                </button>
             </div>
             
             <input 
               type="file" 
               ref={fileInputRef}
               className="hidden" 
               accept="image/*" 
               capture="environment"
               onChange={handleFileScan}
             />
          </div>
          
          {/* Footer Info */}
          <div className="p-6 mt-auto bg-slate-50/50 border-t border-slate-100 flex items-center justify-center gap-3">
             <div className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
             </div>
             <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400">
               Secure Attendance System
             </span>
          </div>
        </div>
      </div>

      <style>{`
        #reader { border: none !important; }
        #reader video { border-radius: 20px !important; object-fit: cover !important; }
        #reader__dashboard_section_csr button {
          background-color: #1e3a8a !important;
          color: white !important;
          border-radius: 12px !important;
          padding: 10px 20px !important;
          border: none !important;
          font-weight: 600 !important;
          margin: 10px 0 !important;
          cursor: pointer !important;
          box-shadow: 0 4px 12px rgba(30, 58, 138, 0.2) !important;
        }
        #reader__dashboard_section_csr select {
          padding: 8px !important;
          border-radius: 8px !important;
          border: 1px solid #e2e8f0 !important;
          background-color: white !important;
        }
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(300px); }
        }
        #reader__status_span { display: none !important; }
        #reader__camera_selection { margin-bottom: 10px !important; width: 100% !important; }
        #reader__scan_region { background: #0f172a !important; }
      `}</style>
    </div>
  );
};

export default ClockingScreen;
