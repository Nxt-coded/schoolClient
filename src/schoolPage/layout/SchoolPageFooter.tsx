import Button from "../../components/reUse/Button";
import { Link, useParams } from "react-router-dom";
import { useSchoolDataByName } from "../../pages/hook/useSchoolAuth";
import { FaFacebook, FaX } from "react-icons/fa6";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import moment from "moment";

const SchoolPageFooter = () => {
  const { schoolName } = useParams();

  function capitalizeWords(str: string) {
    return str.replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    });
  }
  const { schoolInfo } = useSchoolDataByName(capitalizeWords(schoolName));

  console.log(schoolInfo);

  return (
    <div className="h-[150px] bg-blue-950 flex flex-col z-50 relative">
      <div className="flex-1" />
      <div className="flex w-full justify-between items-center px-10 h-[90px] ">
        <div>
          <Link to="/">
            {schoolInfo?.avatar ? (
              <img
                className="w-10 h-10 rounded-full object-cover "
                src={schoolInfo?.avatar}
              />
            ) : (
              <div>Logo</div>
            )}
          </Link>
          <div className="mt-2 text-[12px] text-white">
            Copyrights ©{" "}
            <span className="font-medium">{moment(Date.now()).year()}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a
            className="cursor-pointer text-[20px] text-blue-950 w-[40px] h-[40px] rounded-full bg-slate-100 flex justify-center items-center hover:bg-slate-200 transition-all duration-300 "
            href={`${schoolInfo?.schoolName}`}
          >
            <FaFacebookSquare />
          </a>
          <a className="cursor-pointer text-[20px] text-blue-950 w-[40px] h-[40px] rounded-full bg-slate-100 flex justify-center items-center hover:bg-slate-200 transition-all duration-300 ">
            <FaX />
          </a>
          <a className="cursor-pointer text-[20px] text-blue-950 w-[40px] h-[40px] rounded-full bg-slate-100 flex justify-center items-center hover:bg-slate-200 transition-all duration-300 ">
            <FaInstagramSquare />
          </a>
        </div>
      </div>
    </div>
  );
};
export default SchoolPageFooter;
