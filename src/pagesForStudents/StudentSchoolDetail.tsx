import { useReadOneClassInfo, useStudentInfo } from "./hooks/useStudentHook";
import { useSchoolStudents } from "../pages/hook/useSchoolAuth";
import { FC } from "react";

interface iPersonal {
  change?: boolean;
  studentID?: string;
}
const StudentSchoolDetail: FC<iPersonal> = ({}) => {
  const { studentInfo } = useStudentInfo();
  const { students } = useSchoolStudents(studentInfo?.schoolIDs);

  const { oneClass } = useReadOneClassInfo(studentInfo?.presentClassID);

  return (
    <div className="overflow-hidden w-full">
      <div className="ml-[40px] mt-4 grid w-full grid-cols-1 md:grid-cols-2">
        <div className="mb-8">
          <a className="text-[14px] text-gray-400 ">School Name</a>
          <div className="md:w-[87%] w-[80%] border-b border-b-gray-400 pl-5 mt-[10px]">
            {students?.data?.schoolName}
          </div>
        </div>
        <div className="mb-8 w-full">
          <a className="text-[14px] text-gray-400 ">Class teacher</a>
          <div className="md:w-[87%] w-[80%] border-b border-b-gray-400 pl-5 mt-[10px]">
            {oneClass?.classTeacherName}
          </div>
        </div>
        <div className="mb-8">
          <a className="text-[14px] text-gray-400 ">School address</a>
          <div className="md:w-[87%] w-[80%] border-b border-b-gray-400 pl-5 mt-[10px]">
            {students?.data?.address}
          </div>
        </div>
        <div className="mb-8">
          <a className="text-[14px] text-gray-400 ">My Class</a>
          <div className="md:w-[87%] w-[80%] border-b border-b-gray-400 pl-5 mt-[10px]">
            {studentInfo?.classAssigned}
          </div>
        </div>
      </div>

      <div className="mb-8 ml-[40px] w-[70%]">
        <a className="text-[14px] text-gray-400 ">School Mission</a>
        <div className="md:w-[100%] py-4 lg:w-[100%] p-1 border min-h-[156px] w-[100%] pl-5 mt-[10px] border-gray-400 rounded-md">
          {students?.data?.mission ? (
            students?.data?.mission
          ) : (
            <div className="opacity-40 text-[14px]">
              Pledging to our country, To be faithful, loyal and honest to serve
              Nigeria wth all my strength, to defend her unity and uphold her
              honor and glory. So help me God of our athers' land. Amen
            </div>
          )}
        </div>
      </div>
      <div className="mb-8 ml-[40px] w-[70%]">
        <a className="text-[14px] text-gray-400 ">School Vision</a>
        <div className="md:w-[100%] p-1 py-4 border min-h-[156px] w-[100%] pl-5 mt-[10px] border-gray-400 rounded-md">
          {students?.data?.vision ? (
            students?.data?.vision
          ) : (
            <div className="opacity-40 text-[14px]">
              Knowledege is our strength! Glory of the Lord, the sun is shining
              on the path everyday. We have a shepherd, loving and tender. He
              radiates pasture, greatness of children. We have him who care for
              his children.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentSchoolDetail;
