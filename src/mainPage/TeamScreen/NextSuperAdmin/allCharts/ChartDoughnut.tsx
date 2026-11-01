import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
const Chart = () => {
  const data = {
    labels: ["Male: School, Female: Students"],
    datasets: [
      {
        label: "My Class Male vs. Female Chart",
        data: [Math.floor(Math.random() * 2000)],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full flex justify-center">
      <div className="sm:w-[500px] h-[230px] w-[200px]">
        <Doughnut data={data} />
      </div>
    </div>
  );
};

export default Chart;
