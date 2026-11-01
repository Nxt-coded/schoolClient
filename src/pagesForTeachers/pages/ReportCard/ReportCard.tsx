document.title = "Weekly Report";

import { Toaster } from "react-hot-toast";
import Input from "../../components/reUse/Input";
import Button from "../../components/reUse/Button";
import LittleHeader from "../../components/static/LittleHeader";
import { NavLink } from "react-router-dom";

const ReportCard = () => {
  return (
    <div>
      <LittleHeader name="Make A Student's Report Card" />
      <div className="w-full flex justify-center pt-10">
        <Toaster position="top-center" reverseOrder={true} />

        <div className="py-6 px-2 border rounded-md w-full overflow-y-hidden ">
          <div className="text-[gray] w-full flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4">
            <div className="w-[150px] border-r pl-3">Subject</div>
            <div className="w-[120px] border-r pl-3">1st Test</div>
            <div className="w-[120px] border-r pl-3">2nd Test</div>

            <div className="w-[120px] border-r pl-3">3rd Test</div>

            <div className="w-[120px] border-r pl-3">Examination</div>
            <div className="w-[250px] border-r ml-5">Comment</div>
            <div className="w-[200px] border-r ml-5">Upload result</div>
          </div>

          <div className="text-[gray] w-full flex gap-2 text-[12px] font-medium uppercase mb-10 px-4">
            <div className="w-[150px] border-r">
              <Input className="w-[100px] m-0 h-[40px]" />
            </div>
            <div className="w-[120px] border-r pl-3">
              <Input className="w-[70px] m-0 h-[40px]" />
            </div>
            <div className="w-[120px] border-r pl-3">
              <Input className="w-[70px] m-0 h-[40px]" />
            </div>

            <div className="w-[120px] border-r pl-3">
              <Input className="w-[70px] m-0 h-[40px]" />
            </div>

            <div className="w-[120px] border-r pl-3">
              <Input className="w-[70px] m-0 h-[40px]" />
            </div>
            <div className="w-[250px] border-r ml-5">
              <textarea className="w-[170px] m-0 h-[70px] bg-white resize-none border-2 border-gray-100 outline-blue-400 outline-1 p-1" />
            </div>
            <div className="w-[200px] border-r ml-5">
              <NavLink to="/table-tag">
                <Button
                  name={"Upload result"}
                  className="bg-black text-white m-0 "
                />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
