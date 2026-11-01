import { FC } from "react";
import toast, { Toaster } from "react-hot-toast";

import "react-datepicker/dist/react-datepicker.css";

import { FaHandPaper } from "react-icons/fa";

interface iProps {
  props?: any;
}

const BlockPaymentScreen: FC<iProps> = ({ props }) => {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={true} />
      <div className=" text-[13px] font-medium">
        <div className="" />
        <input
          type="checkbox"
          //   checked={studentInfo?.parentEmail ? false : true}
          checked={true}
          id="update_email"
          className="modal-toggle"
        />
        <div className="modal bgw text-blue-950 text-left">
          <div className="modal-box bg-gray-100 rounded-md">
            <div className="flex items-center justify-between my-4 ">
              <p className="font-bold">
                <span className="text-[25px]"> Alert... </span>
                <br />
                Don't be scared, this can be resolve!{" "}
              </p>

              <label
                htmlFor="update_email"
                className="hover:bg-blue-50 transition-all duration-300  cursor-pointer rounded-full flex items-center justify-center w-6 h-6 font-bold "
              >
                {/* <MdClose /> */}
              </label>
            </div>
            <hr />

            <div className="w-full justify-center flex items-center my-5 text-[50px] ">
              <FaHandPaper />
            </div>
            <div className="mt-2 leading-tight text-[13px] font-medium">
              You are seeing this message because you school's account hasn't
              been renewed...
              <br />
              <br />
              <div className="flex gap-2  items-center">
                <p>
                  I beleive your school is on her way to resolve this!
                  {/* <span className="font-medium">{parentEmail}</span> */}
                  <br />
                  <br />
                  <br />
                  <p>
                    Please just be patient, your Dashboard will be restore when
                    activated!
                  </p>
                </p>
              </div>
            </div>
          </div>
        </div>

        <label className="modal-backdrop" htmlFor="update_email">
          Close
        </label>
      </div>
    </div>
  );
};

export default BlockPaymentScreen;
