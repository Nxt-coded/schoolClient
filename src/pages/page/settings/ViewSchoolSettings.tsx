import { MdDesignServices } from "react-icons/md";
import { RiPagesLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const ViewSchoolSettings = () => {
  document.title = "School's Profile settings";
  const pathData = [
    {
      icon: <MdDesignServices size={45} />,
      title: "School Theme",
      detail:
        "Provide basic info that would be used for your school's landing page and layout.",
      url: "view-settings/theme-settings",
      size: 35,
    },
    {
      icon: <RiPagesLine size={45} />,

      title: "Gallery",
      detail: "Upload your images to school Galley",
      url: "view-settings/gallery-settings",
      size: 35,
    },
  ];
  return (
    <div className="w-full grid lg:grid-cols-2">
      {pathData.map((props: any, i: number) => (
        <Link to={`${props.url}`} key={i} className="text-black">
          <div className="m-2 min-w-[200px] mb-4 border rounded-md p-3 min-h-[200px] text-blue-950 shadow-md flex flex-col hover:shadow-lg">
            <div className="flex-1  text-blue-950">{props.icon}</div>

            <div className="font-[500] mb-2 text-[20px]">{props.title}</div>
            <div className="text-[15px] leading-4 font-[300]">
              {props.detail}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ViewSchoolSettings;
