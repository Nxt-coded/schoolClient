import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import scheme from "./SubjectData.json";
import { useSchoolData } from "../../../../../pages/hook/useSchoolAuth";

const SchemeOfWorkTable = () => {
  const { data } = useSchoolData();
  const navigate = useNavigate();


  const [uploadStatus, setUploadStatus] = useState(() => {
    const savedStatus = localStorage.getItem("uploadStatus");
    return savedStatus ? JSON.parse(savedStatus) : {};
  });

  const handleRowClick = (className, subjectName, term) => {
    navigate(`/schemes/${className}/${subjectName}/${term}`);
  };

  const listOfClass = [
    { id: "0", className: "JSS 1" },
    { id: "1", className: "JSS 2" },
    { id: "2", className: "JSS 3" },
    { id: "3", className: "SSS 1" },
    { id: "4", className: "SSS 2" },
    { id: "5", className: "SSS 3" },
  ];

  const [filteredData, setFilteredData] = useState(scheme[0]?.list || []);
  const [classPick, setClassPick] = useState("JSS 1");

  const handleClassFilter = (classId) => {
    const filteredClass = scheme[classId]?.list || [];
    setFilteredData(filteredClass);
  };

  useEffect(() => {
    handleClassFilter("0");
  }, []);

  // Toggle upload status for a specific item
  const handleMarkUploaded = (item) => {
    const newStatus = { ...uploadStatus, [item.id]: !uploadStatus[item.id] };
    setUploadStatus(newStatus);
    localStorage.setItem("uploadStatus", JSON.stringify(newStatus));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 text-blue-950">
      <div className="max-w-full mx-auto bg-white shadow-md rounded-lg overflow-hidden overflow-x-auto">
        <div className="px-2 py-2">
          <div className="flex flex-wrap gap-3 md:gap-5 ">
            {listOfClass.map((el) => (
              <div
                key={el.id}
                className={`cursor-pointer text-center text-[14px] transition-all duration-300 font-semibold py-2 px-10 ${
                  data?.categoryType === "Secondary"
                    ? "text-blue-950"
                    : "text-green-950"
                } border rounded-full ${
                  el.className === classPick
                    ? "bg-gray-500 text-white"
                    : "bg-slate-50 hover:bg-blue-950 hover:text-white"
                }`}
                onClick={() => {
                  handleClassFilter(el.id);
                  setClassPick(el.className);
                }}
              >
                {el.className}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-b border-gray-200 text-blue-950">
          <h1 className="text-2xl font-bold text-blue-950">Scheme of Work</h1>
          <p className="text-sm text-gray-600">
            A schedule to manage lessons and topics
          </p>
        </div>

        <div className="p-6">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left text-sm font-semibold">No.</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Subject</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Term</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Class</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredData?.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b cursor-pointer hover:bg-gray-50"
                  onClick={() => handleRowClick(item.classType, item.subject, item.term)}
                >
                  <td className="px-4 py-2 text-sm text-gray-700">{item.id}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{item.subject}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{item.term}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{item.classType}</td>
                  <td className="px-4 py-2 text-sm">
                    <button
                      className={`py-1 px-3 rounded ${
                        uploadStatus[item.id]
                          ? "text-white bg-green-500"
                          : "text-blue-500 font-medium"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkUploaded(item);
                      }}
                    >
                      {uploadStatus[item.id] ? "Uploaded" : "Not Uploaded"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SchemeOfWorkTable;
