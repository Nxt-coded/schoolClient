import CardBarChart from "../allCharts/CardBarChart";
import CardLineChart from "../allCharts/CardLineChart";
import CardPageVisits from "../allCharts/CardPageVisits ";
import CardSocialTraffic from "../allCharts/CardSocialTraffic ";

const TotalSchools = () => {
  document.title = "TotalSchools";
  return (
    <div className="text-blue-950 flex flex-col h-full">
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div>
    </div>
  );
};

export default TotalSchools;
