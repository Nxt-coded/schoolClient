import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useClassStudent, useTeacherInfo } from "../hooks/useTeacher";
import { useEffect, useState } from "react";
import { readClassInfo } from "../api/teachersAPI";

ChartJS.register(ArcElement, Tooltip, Legend);
const Chart = () => {
  const { teacherInfo } = useTeacherInfo();

  const [state, setState] = useState<any>({});

  useEffect(() => {
    readClassInfo(teacherInfo?.classesAssigned).then((res) => {
      setState(res.data);
    });
  }, []);

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
    labels: [`Male: ${male}, Female: ${female}`],
    datasets: [
      {
        label: "My Class Male Chart vs. Female Chart",
        data: [male, female],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full flex justify-center">
      <div className="sm:w-[300px] w-[200px]">
        <Doughnut data={data} />
      </div>
    </div>
  );
};

export default Chart;
