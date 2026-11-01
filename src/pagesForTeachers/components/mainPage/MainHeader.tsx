import { FC } from "react";
import { Link } from "react-router-dom";
import Button from "../reUse/Button";

interface iProps {
  props?: any;
}
const MainHeader: FC<iProps> = ({ props }) => {
  console.log("reading this: ", props);
  return (
    <div
      className="fixed border-b w-full h-[70px] flex justify-center items-center
    
    "
      style={{
        background: "rgba(255, 255, 255, 0.2)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5px)",
        // border: "1px solid rgba(73, 154, 255, 0.3)",
      }}
    >
      <div className="w-[90%] flex justify-between">
        <div className="flex items-center gap-2">
          <div className="w-[80px] h-[40px] object-contain flex justify-center items-center border rounded-md ">
            SCH.
          </div>
          <div className="font-bold text-[18px]">{props?.schoolName}</div>
        </div>
        <Link to="/auth/login">
          <Button
            name="Get Started"
            className="bg-blue-950 text-[12px] py-4 px-8 hover:bg-blue-900 transition-all duration-300 "
          />
        </Link>
      </div>
    </div>
  );
};

export default MainHeader;
