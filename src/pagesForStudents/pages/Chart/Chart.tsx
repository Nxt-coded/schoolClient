import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {
  useReadOneClassInfo,
  useStudentInfo,
} from "../../hooks/useStudentHook";
import { useClassStudent } from "../../../pagesForTeachers/hooks/useTeacher";

ChartJS.register(ArcElement, Tooltip, Legend);
const Chart = () => {
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
      <div className="w-full ">
        <Doughnut data={data} />
      </div>
    </div>
  );
};

export default Chart;
