import { useState } from "react";
import LittleHeader from "../../../components/layout/LittleHeader";
import Expenditure from "./expenditure";
import FeePayments from "./FeePayments";

const AllExpenditures = () => {
  const [activeSection, setActiveSection] = useState("Expenditures");

  return (
    <div>
      <LittleHeader name={"Viewing all Expenditures"} />

      <div>
        <div className="flex justify-start items-center gap-[20px] border-b transition-all duration-300">
          <div
            onClick={() => setActiveSection("Expenditures")}
            className={`h-full cursor-pointer transition-all duration-300 ${
              activeSection === "Expenditures"
                ? "border-b-[2px] border-blue-950 font-medium text-blue-950"
                : "border-transparent"
            }`}
          >
            <h1 className="mb-2">Expenditures</h1>
          </div>
          <div
            onClick={() => setActiveSection("RecordPayments")}
            className={`h-full cursor-pointer transition-all duration-300 ${
              activeSection === "RecordPayments"
                ? "border-b-[2px] border-blue-950 font-medium text-blue-950"
                : "border-transparent"
            }`}
          >
            <h1 className="mb-2">Record Installmental Payments</h1>
          </div>
        </div>

        {/* EXPENDITURES AND FEES RECORDS DIVS */}

        {activeSection === "Expenditures" && (
          <div className="mt-5 min-h-[70vh] smooth">
            <Expenditure />
          </div>
        )}

        {activeSection === "RecordPayments" && (
          <div className="mt-5 min-h-[70vh] smooth">
            <FeePayments />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllExpenditures;
