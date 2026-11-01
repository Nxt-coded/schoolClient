import { FC } from "react";
import pix from "../../../assets/logo.png";

interface iSchool {
  schoolName: string;
  schoolAddress: string;
  studentDetails: any;
  subjects: any;
}

const ReportCardTemplate: FC<iSchool> = ({
  schoolName,
  schoolAddress,
  studentDetails,
  subjects,
}) => {
  return (
    <div className="text-[12px] mx-auto bg-white p-8 shadow-md rounded-lg flex justify-center items-center">
      <div className="w-full min-h-[100vh] shadow lg:p-5">
        <div className="h-[200px] w-full flex justify-center items-center gap-3 overflow-y-auto">
          <div className="h-[200px] w-[100%] border-b-2 border-b-gray-400 flex items-center gap-3 p-3 px-4">
            <div className="lg:w-[14%] w-[25%] lg:h-[100px] h-[70px] flex justify-center items-center border-none">
              <img
                src={pix}
                alt=""
                className="h-[100%] w-[100%] object-contain"
              />
            </div>
            <div className="w-[70%] h-[100px]">
              <h1 className="font-medium text-center lg:text-[27px] text-[14px] ">
                {schoolName}
              </h1>
              <p className="text-center text-[14px]">{schoolAddress}</p>
            </div>
          </div>
        </div>
        <div className="p-4 flex justify-center items-center">
          <div className="w-[90%] grid grid-cols-2 gap-9">
            <div>
              <p className="font-semibold">Name:</p>
              <p>{studentDetails.name}</p>
            </div>
            <div>
              <p className="font-semibold">Class:</p>
              <p>{studentDetails.class}</p>
            </div>
            <div>
              <p className="font-semibold">Roll Number:</p>
              <p>{studentDetails.rollNumber}</p>
            </div>
            <div>
              <p className="font-semibold">Attendance:</p>
              <p>{studentDetails.rollNumber}</p>
            </div>
          </div>
        </div>
        <div
          className="w-full flex justify-center items-center mt-7 p-4 flex-col 
        "
        >
          <div className="overflow-y-auto w-full">
            <table className="w-[100%] border-collapse border border-gray-300 overflow-y-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 w-10 pl-2 text-left">
                    S/N
                  </th>
                  <th className="border border-gray-300 w-28 pl-2 text-left">
                    Subject
                  </th>
                  <th className="border border-gray-300 lg:w-36 w-full pl-2 text-left">
                    class test 1
                  </th>
                  <th className="border border-gray-300 w-36 pl-2 text-left">
                    Unit Test 2
                  </th>
                  <th className="border border-gray-300 w-64 py-2 pl-2 text-left">
                    continous Assessment
                    <table className="w-full mt-1">
                      <thead>
                        <tr className="h-full w-full font-medium">
                          <th className="w-20 border">1</th>
                          <th className="w-20 border">2</th>
                          <th className="w-20 border">3</th>
                          <th className="w-20 border">4</th>
                          <th className="w-20 border  ">M</th>
                        </tr>
                      </thead>
                    </table>
                  </th>
                  <th className="border border-gray-300 w-36 pl-2 text-left">
                    Exam No
                  </th>
                  <th className="border border-gray-300 w-20 pl-3 text-left">
                    total mark
                  </th>
                  <th className="border border-gray-300 w-20 pl-3 text-left">
                    Grade
                  </th>
                  <th className="border border-gray-300 w-20 pl-2 text-left">
                    position
                  </th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject: any, index: any) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-100" : ""}
                  >
                    <td className="border border-gray-300 lg:px-6 px-8 py-3 text-[12px] lg:text-[15px]">
                      {subject.number}
                    </td>
                    <td className="border border-gray-300 lg:px-6 px-8 py-3 text-[12px] lg:text-[15px]">
                      {subject.name}
                    </td>
                    <td className="border border-gray-300 lg:px-6 px-8 py-3 text-[12px] lg:text-[15px]">
                      {subject.classtest1}
                    </td>
                    <td className="border border-gray-300 lg:px-6 px-8 py-3 text-[12px] lg:text-[15px]">
                      {subject.unittest2}
                    </td>
                    <thead>
                      <tbody>
                        {/* <tr> */}
                        <td className="border lg:w-20 w-24 lg:pl-2 lg:h-12 px-3 h-24">
                          10
                        </td>
                        <td className="border w-20 lg:pl-2 px-3 h-12">10</td>
                        <td className="border w-20 lg:pl-2 px-3 h-12">10</td>
                        <td className="border w-20 lg:pl-2 px-3 h-12">10</td>
                        <td className="border w-20 lg:pl-2 px-3 h-12">40</td>
                        {/* </tr> */}
                      </tbody>
                    </thead>
                    <td className="border border-gray-300 lg:px-6 py-3 px-10">
                      <p className="text-[12px]">{subject.examno}</p>
                    </td>
                    <td className="border border-gray-300 px-6 py-3">
                      {subject.totalmark}
                    </td>
                    <td className="border border-gray-300 px-6 py-3">
                      {subject.grade}
                    </td>
                    <td className="border border-gray-300 px-6 py-3">
                      {subject.position}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <table className="w-[100%] border-collapse border border-gray-300 overflow-y-auto">
            <thead>
              <tr>
                <th className="border border-gray-300 w-[170px] py-3 pl-5 text-left">
                  Total mark
                </th>
                <th className="border border-gray-300 text-center w-30 py-3 px-3 text-[13px] lg:text-[18px]">
                  351.0/420.0
                </th>
                <th className="border border-gray-300 w-[146px] py-3 text-left pl-6">
                  A+
                </th>
              </tr>
              <tr>
                <th className="border border-gray-300 text-center w-30 py-3">
                  Total percentage
                </th>
                <th className="border-gray-300 w-50 py-3 text-center pl-6">
                  99%
                </th>
              </tr>
            </thead>
          </table>
          <table className="w-[100%] border-collapse border border-gray-300 bg-gray-400 overflow-y-auto">
            <thead>
              <tr>
                <th className="border border-gray-300 w-50 py-3 text-center pl-6 font-bold">
                  Co-Schorlastic Areas
                </th>
                <th className="border border-gray-300 w-32 py-3 text-center pl-6 font-bold">
                  Grade
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="border bg-white border-gray-300 text-left w-50 py-3 pl-6 font-bold">
                  Readings
                </th>
                <th className="border border-gray-300 w-32 py-3 text-center pl-6 font-bold">
                  A
                </th>
              </tr>
              <tr>
                <th className="border bg-white border-gray-300 text-left w-50 py-3 pl-6 font-bold">
                  Writing
                </th>
                <th className="border border-gray-300 w-32 py-3 text-center pl-6 font-bold">
                  B
                </th>
              </tr>
              <tr>
                <th className="border bg-white border-gray-300 text-left w-50 py-3 pl-6 font-bold">
                  Speaking
                </th>
                <th className="border border-gray-300 w-32 py-3 text-center pl-6 font-bold">
                  C
                </th>
              </tr>
            </tbody>
          </table>
          <div className="p-4 bg-gray-200 w-full min-h-[300px] text-center font-bold text-[20px]">
            Students's Chart
          </div>
          <div className="p-4 w-full lg:h-[180px] h-[170px] bg-gray-400 mt-3">
            <div className="w-full h-10 bg-gray-500">
              <h1 className="font-bold text-white pl-6 pt-2">
                Class Teacher Comment's
              </h1>
              <div className="p-4">
                <p className="lg:text-[13px] text-[11px] lg:pb-0 font-medium">
                  Alex enjoy participating in class discussions and in a group
                  activaties. He is able to read familiar words. He completes
                  his works and assignment on time. He is able to grasp the
                  concept taught in class with reputation and guidance. He
                  presents neat works and is making a steady progress in writing
                  simple sentences with appropraites punctuation marks 👍🚀
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 w-full h-[150px] bg-gray-400 mt-3">
            <div className="w-full h-10 bg-gray-500">
              <h1 className="font-bold text-white pl-6 pt-2">
                Grade's Boundaries
              </h1>
              <div className="p-4">
                <p className="text-[14px] font-medium pt-5">
                  A :100-90, A: 90-80, B: 80-70, C: 70-60, D: 60-50, E: 50-40,
                  U: 40-0
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCardTemplate;
