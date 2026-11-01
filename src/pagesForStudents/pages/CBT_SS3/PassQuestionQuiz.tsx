import React from "react";
import LittleHeader from "../../../components/layout/LittleHeader";
import { Link } from "react-router-dom";

const PassQuestionQuiz = () => {
  const data = [
    "English",
    "Mathematics",
    "Commerce",
    "Accounting",
    "Literature",
    "Chemistry",
    "Government",
    "Physics",
    "Economics",
    "History",
    "Civic Education",
    "Insurance",
    "Geography",
    "Current Affairs",
    "CRK",
    "IRK",
  ];

  return (
    <div>
      <LittleHeader name="Subject Selection" />

      <div className="w-full flex justify-end mb-5">
        <Link to="/history/cbt" className="text-white bg-blue-950 font-medium px-4 py-2 rounded-md text-[12px] uppercase hover:text-blue-900 transition-all duration-300 ">
          View Performance Records
        </Link>
      </div>

      <div className="grid grid-cols-1  gap-4">
        <div className="min-h-[200px] p-[50px] grid grid-cols-1 border rounded-md">
          <div className=" flex justify-center items-center flex-col">
            <div className="py-[20px]">Kindly Select A Subject Here</div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-4">
              {data.map((el) => (
                <Link
                  to={el === "Civic Education" ? "civic" : el.toLowerCase()}
                  className="h-[100px] w-full border rounded-md flex justify-center items-center"
                >
                  {el}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassQuestionQuiz;
