import Button from "../../components/reUse/Button";
import { Link, useParams } from "react-router-dom";
import { useSchoolDataByName } from "../../pages/hook/useSchoolAuth";

const SchoolPageHeader = () => {
  const { schoolName } = useParams();

  function capitalizeWords(str: string) {
    return str.replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    });
  }
  const { schoolInfo } = useSchoolDataByName(capitalizeWords(schoolName));

  return (
    <div className="z-40 bg-white fixed flex w-full justify-between items-center px-10 h-[90px] border-b">
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
      </div>
      <div>
        <Link to="/auth">
          <Button name={"Get Started"} className="bg-blue-950" />
        </Link>
      </div>
    </div>
  );
};

export default SchoolPageHeader;
