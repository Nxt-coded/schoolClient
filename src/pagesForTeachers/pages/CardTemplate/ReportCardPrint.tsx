import React from "react";
import ReportCardTemplate from "./ReportCardTemplate";

const ReportCardPrint = () => {
  const schoolName = "El-elenora International School";
  const schoolAddress = "No, 104 muyibi street olodi Apapa Lagos";
  const studentDetails = {
    name: "John Doe",
    class: "10th Grade",
    rollNumber: "101",
    passport: "https://via.placeholder.com/150",
  };
  const subjects = [
    {
      name: "Math",
      number: 1,
      score: 95,
      grade: "A",
      totalmark: "60/100",
      classtest1: "10/20",
      unittest2: "25/40",
      unittest3: "20/40",
      examno: "30/60",
      position: "1st",
    },
    {
      name: "Science",
      number: 2,
      score: 90,
      grade: "A",
      totalmark: "40/100",
      classtest1: "10/20",
      unittest2: "25/40",
      unittest3: "20/40",
      examno: "30/60",
      position: "2nd",
    },
    {
      name: "Math",
      number: 3,
      score: 95,
      grade: "A",
      totalmark: "80/100",
      classtest1: "10/20",
      unittest2: "25/40",
      unittest3: "20/40",
      examno: "30/60",
      position: "3rd",
    },
    {
      name: "Science",
      number: 4,
      score: 90,
      grade: "A",
      totalmark: "30/100",
      classtest1: "10/20",
      unittest2: "25/40",
      unittest3: "20/40",
      examno: "30/60",
      position: "4th",
    },
  ];

  return (
    <div className="">
      <ReportCardTemplate
        schoolName={schoolName}
        schoolAddress={schoolAddress}
        studentDetails={studentDetails}
        subjects={subjects}
      />
    </div>
  );
};

export default ReportCardPrint;
