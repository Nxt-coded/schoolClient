import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import SchoolPage from "./SchoolPage";
import { useSchoolDataByName } from "../../../pages/hook/useSchoolAuth";

const MainSchoolPage = () => {
  const { schoolName } = useParams();

  const [name, setName] = useState<string>("");
  const { schoolInfo } = useSchoolDataByName(name);

  useEffect(() => {
    if (schoolName) {
      setName(schoolName);
    }
  }, []);

  document.title = `${schoolInfo?.schoolName}`;

  console.log(schoolInfo?.schoolName);

  return (
    <div>
      {schoolInfo?.schoolName !== undefined ? (
        <SchoolPage props={schoolInfo} />
      ) : (
        <div>no page found</div>
      )}
    </div>
  );
};

export default MainSchoolPage;
