import React from "react";

const TableTag = () => {
  return (
    <>
      <div className=" my-6 ">
        <table className="w-[100%] border rounded-lg">
          <thead>
            <tr className=" bg-blue-50 font-normal text-base">
              <th className="py-2 px-4 border-b border-r">
                COGNITIVE DOMAIN <br /> <br /> Subject
              </th>
              <th className="py-2 px-2 border-b rotate-45  border-r">C.A 40</th>
              <th className="py-2 px-2 border-b rotate-45  border-r">
                EXAM 60
              </th>
              <th className="py-2 px-2 border-b  border-r">TOTAL 100</th>
              <th className="py-2 px-2 border-b  border-r rotate-45">GRADE</th>
              <th className="py-2 px-2 border-b  border-r rotate-45">
                POSITION
              </th>
              <th className="py-2 px-3 border-b  border-r rotate-45">
                REMARKS
              </th>
              <th className="py-2 px-2 border-b  border-r rotate-45">
                CLASS AVG
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b  border-r">
                Agricultural Science
              </td>
              <td className="py-2 px-4 border-b  border-r">AAA</td>
              <td className="py-2 px-4 border-b  border-r">AAA</td>
              <td className="py-2 px-4 border-b  border-r">AAA</td>
              <td className="py-2 px-4 border-b  border-r">AAA</td>
              <td className="py-2 px-4 border-b  border-r">AAA</td>
              <td className="py-2 px-4 border-b  border-r">AAA</td>
              <td className="py-2 px-4 border-b  border-r">AAA</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b  border-r"> </td>
              <td className="py-2 px-4 border-b  border-r"></td>
              <td className="py-2 px-4 border-b  border-r"></td>
              <td className="py-2 px-4 border-b  border-r"></td>
              <td className="py-2 px-4 border-b  border-r"></td>
              <td className="py-2 px-4 border-b  border-r"></td>
              <td className="py-2 px-4 border-b  border-r"></td>
              <td className="py-2 px-4 border-b  border-r"></td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b  border-r"></td>
              <td className="py-2 px-4 border-b  border-r"></td>
              <td className="py-2 px-4 border-b  border-r"></td>
              <td className="py-2 px-4 border-b  border-r"></td>
              <td className="py-2 px-4 border-b  border-r"></td>
              <td className="py-2 px-4 border-b  border-r"></td>
              <td className="py-2 px-4 border-b  border-r"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="">
        <div className=" border-b text-center bg-blue-50">
          PEFORMANCE SUMMARY
        </div>
        <table className="w-[100%] border rounded-lg">
          <tbody>
            <tr>
              <td className="py-2 px-2 border-b  border-r">Total Obtained</td>
              <td className="py-2 px-2 border-b  border-r">1044</td>
              <td className="py-2 px-2 border-b  border-r">%TAGE</td>
              <td className="py-2 px-2 border-b  border-r">76.2%</td>
              <td className="py-2 px-2">EXCELLENT</td>
            </tr>
            <tr>
              <td className="py-2 px-2 border-b  border-r">Total Obtainable</td>
              <td className="py-2 px-2 border-b  border-r">2333</td>
              <td className="py-2 px-2 border-b  border-r">GRADE</td>
              <td className="py-2 px-2 border-b  border-r">A</td>
              <td className="py-2 px-2 border-b  "></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className=" w-full border my-6 flex justify-center items-center flex-col">
        <div className=" text-center bg-blue-50 border-b w-full">
          GRADE SCALE
        </div>
        <div className=" text-center w-[90%] py-2">
          75-100% * A1(Excellent) 70-74% * B2(Very Good) 65-69% * B3(Good)
          60-64% * C4(Credit) 55-59% * C5(Credit) 50-54% * C6(Credit)
          45-49% * D7(Pass) 40-44% * E8(Pass) 0-39% * F9(Fail)
        </div>
      </div>
      <div className=" w-full">
        <span>Teacher's Remark:</span>
        <div className=" border-2 rounded-xl py-3 px-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam,
          molestiae sint. Error repudiandae ad quas eius nesciunt quae, ipsa
          illum ab porro? Iste voluptatibus, adipisci assumenda sapiente
          perferendis dignissimos illum!
        </div>
        <div className=" grid grid-cols-3 gap-2">
          <span className=" flex col-span-2">
            Teacher's Name: <div className=" border-b ml-2 flex-1">gddgv</div>
          </span>
          <span className=" flex">
            Sign: <div className=" border-b ml-2 flex-1">gddgv</div>
          </span>
        </div>
      </div>
      <div className=" w-full my-6">
        <span>Principal's Remark:</span>
        <div className=" border-2 rounded-xl py-3 px-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam,
          molestiae sint. Error repudiandae ad quas eius nesciunt quae, ipsa
          illum ab porro? Iste voluptatibus, adipisci assumenda sapiente
          perferendis dignissimos illum!
        </div>
        <div className=" grid grid-cols-3 gap-2">
          <span className=" flex col-span-2">
            Principal's Name: <div className=" border-b ml-2 flex-1">gddgv</div>
          </span>
          <span className=" flex">
            Sign: <div className=" border-b ml-2 flex-1">gddgv</div>
          </span>
        </div>
      </div>
      <div className=" grid grid-cols-3 mt-6">
        <div className=" flex col-span-2">
          Next Term Begins: <div className=" border-b flex-1 ml-1"></div>
        </div>
        <div className=" flex">
          Date: <div className=" ml-1 border-b flex-1"></div>
        </div>
      </div>
    </>
  );
};

export default TableTag;
