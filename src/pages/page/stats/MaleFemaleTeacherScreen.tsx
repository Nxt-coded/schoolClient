import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSchoolData, useSchoolStudents } from "../../hook/useSchoolAuth";
import { useEffect } from "react";
import { mutate } from "swr";

ChartJS.register(ArcElement, Tooltip, Legend);

const MaleFemaleTeacherScreen = () => {
  const { data } = useSchoolData();
  const { students } = useSchoolStudents(data?._id);

  let male: number = 0;
  let female: number = 0;

  for (let i = 0; i < students?.data?.students?.length; i++) {
    if (students?.data?.students[i].gender === "Male") {
      male++;
    } else {
      female++;
    }
  }

  const dataValue = {
    labels: [`Male: ${male}, Female: ${female}`],
    datasets: [
      {
        label: "My Class Male vs. Female Chart",
        data: [male, female],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    mutate(`api/read-student/${data?._id}`);
  }, [students]);

  return (
    <div className="w-full flex justify-center">
      <div className="sm:w-[300px] w-[200px]">
        <Doughnut data={dataValue} />
      </div>
    </div>
  );
};

export default MaleFemaleTeacherScreen;
