import { FC } from "react";
import { MdDoubleArrow } from "react-icons/md";

interface iProps {
  name?: string;
}

const LittleHeader: FC<iProps> = ({ name }) => {
  return (
    <div>
      {" "}
      <div className="flex items-center text-blue-950">
        Account <MdDoubleArrow size={13} className="mx-4 " />{" "}
        <div className="capitalize">{name}</div>
      </div>
      <div className="text-blue-800 mt-5 font-[500] text-[30px] capitalize">
        {name}
      </div>
    </div>
  );
};

export default LittleHeader;
