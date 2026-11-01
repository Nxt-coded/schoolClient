import { FC } from "react";
import { MdDoubleArrow } from "react-icons/md";

import { Link, useNavigate } from "react-router-dom";

interface iProps {
  name?: string;
  back?: boolean;
}

const LittleHeader: FC<iProps> = ({ name, back }) => {
  const navigate = useNavigate();
  return (
    <div>
      {" "}
      <div className="flex items-center text-blue-950 ">
        <Link to="/dashboard" className="flex items-center">
          Account <MdDoubleArrow size={13} className="mx-4 " />{" "}
        </Link>
        <div className="capitalize lg:text-[17px] text-[12px] font-[500]">
          {name}
        </div>
        {back && (
          <div className="flex items-center">
            <MdDoubleArrow size={13} className="mx-4 " />
            <div
              className="underline font-bold cursor-pointer"
              onClick={() => {
                navigate(-1);
              }}
            >
              Go Back
            </div>
          </div>
        )}
      </div>
      <div className="text-blue-800 mt-5 font-[500] lg:text-[30px] text-[17px] mb-10 capitalize">
        {name}
      </div>
    </div>
  );
};

export default LittleHeader;
