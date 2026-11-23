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
      <div className="flex min-w-0 flex-wrap items-center gap-y-1 text-blue-950">
        <Link to="/dashboard" className="flex shrink-0 items-center">
          Account <MdDoubleArrow size={13} className="mx-2 sm:mx-4" />{" "}
        </Link>
        <div className="min-w-0 break-words capitalize lg:text-[17px] text-[12px] font-[500]">
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
      <div className="mt-4 mb-4 break-words font-[500] text-[17px] capitalize text-blue-800 sm:mt-5 sm:mb-10 lg:text-[30px]">
        {name}
      </div>
    </div>
  );
};

export default LittleHeader;
