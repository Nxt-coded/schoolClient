import { FC } from "react";
import { MdDoubleArrow } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface iProps {
  name?: string;
  back?: boolean;
}

const LittleHeader: FC<iProps> = ({ name, back }) => {
  const navigate = useNavigate();
  return (
    <div>
      {" "}
      <div className="flex items-center text-blue-950 text-[12px] md:text-[15px]">
        Account <MdDoubleArrow size={13} className="mx-4 " />{" "}
        <div className="capitalize text-[12px] md:text-[15px]">{name}</div>
        {back && (
          <div className="flex items-center">
            <MdDoubleArrow size={13} className="mx-4 " />
            <div
              className="underline font-bold cursor-pointer md:text-[17px] text-[11px]"
              onClick={() => {
                navigate(-1);
              }}
            >
              Go Back
            </div>
          </div>
        )}
      </div>
      <div className="text-blue-800 mt-4 font-[500] text-[18px] mb-10 capitalize md:text-[30px]">
        {name}
      </div>
    </div>
  );
};

export default LittleHeader;
