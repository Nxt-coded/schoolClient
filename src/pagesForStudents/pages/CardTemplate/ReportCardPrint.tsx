import React from "react";
import ReportCardTemplate from "./ReportCardTemplate";
import { useStudentInfo } from "../../hooks/useStudentHook";
import {
  useSchoolData,
  useStudentAttendance,
} from "../../../pages/hook/useSchoolAuth";
import {
  useAttendance,
  useSchoolAnnouncement,
  useStudentGrade,
} from "../../../pagesForTeachers/hooks/useTeacher";

const ReportCardPrint = () => {
  const { studentInfo } = useStudentInfo();
  const { schoolAnnouncement }: any = useSchoolAnnouncement(
    studentInfo?.schoolIDs
  );
  const { mainStudentAttendance } = useStudentAttendance(studentInfo?._id);
  const { gradeData } = useStudentGrade(studentInfo?._id);

  let school: any = schoolAnnouncement;

  let grade = gradeData?.reportCard?.find((el: any) => {
    return (
      el.classInfo ===
      `${studentInfo?.classAssigned} session: ${school?.presentSession}(${school?.presentTerm})`
    );
  });

  const schoolName = school?.schoolName!;
  const schoolAddress = school?.address;

  const studentDetails = {
    name: `${studentInfo?.studentFirstName} ${studentInfo?.studentLastName} `,
    class: studentInfo?.classAssigned,
    term: school?.presentTerm,
    session: school?.presentSession,
    enrollmentID: `${studentInfo?.enrollmentID}`,
    passport: "https://via.placeholder.com/150",
    attendance:
      (mainStudentAttendance?.data?.attendance?.filter((el: any) => {
        return el.present === true;
      }).length /
        mainStudentAttendance?.data?.attendance?.length) *
      100,
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
        subjects={grade}
      />
    </div>
  );
};

export default ReportCardPrint;
