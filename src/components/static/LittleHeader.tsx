import { FC } from "react";
import { Link } from "react-router-dom";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useSchoolData } from "../../pages/hook/useSchoolAuth";

interface iProps {
  name?: string;
  url?: string;
}

const LittleHeader: FC<iProps> = ({ name, url }) => {
  const { data } = useSchoolData();

  return (
    <div>
      {" "}
      <div
        className={`flex items-center ${
          data?.categoryType === "Secondary" ? "text-blue-950" : "text-red-950"
        }`}
      >
        <Link to="/dashboard" className="flex items-center font-[600]">
          Account <FaAngleDoubleRight size={13} className="mx-4 " />{" "}
        </Link>
        <div className="capitalize lg:text-[17px] text-[12px] font-[500]">
          {name}
        </div>
      </div>
      <Link to={url}>
        <div
          className={`${
            data?.categoryType === "Secondary"
              ? "text-blue-800"
              : "text-green-800"
          } mt-5 font-[500] text-[30px] capitalize`}
        >
          {name}
        </div>
      </Link>
    </div>
  );
};

export default LittleHeader;
