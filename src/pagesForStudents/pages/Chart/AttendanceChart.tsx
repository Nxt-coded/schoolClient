import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import {
  useReadMyClassInfo,
  useReadOneClassInfo,
  useStudentInfo,
} from "../../hooks/useStudentHook";
import { useClassStudent } from "../../../pagesForTeachers/hooks/useTeacher";

ChartJS.register(ArcElement, Tooltip, Legend);
const AttendanceChart = () => {
  const { studentInfo } = useStudentInfo();

  const { oneClass: state } = useReadOneClassInfo(studentInfo?.presentClassID);

  const { classStudents } = useClassStudent(state?._id);

  let male: number = 0;
  let female: number = 0;

  for (let i = 0; i < classStudents?.students?.length; i++) {
    if (classStudents?.students[i].gender === "Male") {
      male++;
    } else {
      female++;
    }
  }

  const data = {
    labels: [`Present: ${male}, Absent: ${female}`],
    datasets: [
      {
        label: "My Class Attendace Chart",
        data: [male, female],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full flex justify-center mt-10">
      <div className="w-full ">
        <Doughnut data={data} />
      </div>
    </div>
  );
};

export default AttendanceChart;
