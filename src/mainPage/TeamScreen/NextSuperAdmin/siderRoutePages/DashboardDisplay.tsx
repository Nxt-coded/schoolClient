import CompanyCard from "../Props/CompanyCard";
import logo from "../../../../assets/logo.png";
import { useState } from "react";

const DashboardDisplay = () => {
  document.title = "Admin Dashboard Display";
  const [totalSchools, setTotalSchools] = useState<number>(0);
  const [totalTeachers, setTotalTeachers] = useState<number>(0);
  const [totalStudents, setTotalStudents] = useState<number>(0);

  return (
    <div className="text-blue-950 flex flex-col h-full bg-gray-100">
      <div className="h-[450px] md:h-[200px] py-5 grid grid-cols-1 lg:grid-cols-3 gap-2">
        <div className="h-full rounded-md m-2 bg-blue-900">
          <p className="text-white font-bold pl-4 pt-4">Total School</p>

          <p className="text-white text-[40px] text-center pt-5">
            {totalSchools}
          </p>
        </div>
        <div className="h-full rounded-md m-2 bg-blue-400">
          <p className="text-white font-bold pl-4 pt-4">Total Teacher</p>

          <p className="text-white text-[40px] text-center pt-5">
            {/* {totalTeachers} */}1
          </p>
        </div>
        <div className="h-full rounded-md m-2 bg-blue-500">
          <p className="text-white font-bold pl-4 pt-4">Total Student</p>

          <p className="text-white text-[40px] text-center pt-5">
            {/* {totalStudents} */}1
          </p>
        </div>
      </div>

      <div className="h-[600px] lg:h-[400px] py-5 grid grid-cols-1 gap-2">
        <CompanyCard
          logo={logo}
          setTotalSchools={setTotalSchools}
          setTotalTeachers={setTotalTeachers}
          setTotalStudents={setTotalStudents}
        />
      </div>
    </div>
  );
};

export default DashboardDisplay;
