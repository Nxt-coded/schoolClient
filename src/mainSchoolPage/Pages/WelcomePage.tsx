import { useParams } from "react-router-dom";
import pix from "../../assets/icon1.png";
import pix1 from "../../assets/icon2.png";
import pix2 from "../../assets/icon3.png";
import pix3 from "../../assets/icon4.png";
import { useSchoolDataByName } from "../../pages/hook/useSchoolAuth";

export function capitalizeWords(str: string) {
  return str.replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
}

const WelcomePage = () => {
  const { schoolName } = useParams();

  const { schoolInfo } = useSchoolDataByName(capitalizeWords(schoolName));
  return (
    <div className="w-full min-h-[85vh] flex justify-center items-center text-blue-950">
      <div className="h-full w-[95%]">
        <div className="w-full flex justify-center items-center mb-14 flex-col">
          <div className="text-[25px] mt-[40px] uppercase font-[600] xl:text-[35px] mb-5 ">
            Welcome to{" "}
            <span className="text-blue-950 font-[600]">
              {schoolInfo?.schoolName}
            </span>
          </div>
          <p className="text-center md:w-[50%] mb-[20px] text-[15px]">
            Nunc consectetur ex nunc, id porttitor leo semper eget. Vivamus
            interdum, mauris quis cursus sodales, urn
          </p>
        </div>

        <div className="text-center grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="border rounded-[10px] min-h-[25vh] p-6 bg-slate-100">
            <img src={pix} alt="" />
            <div className="font-[600] text-start mt-[10px]">
              Awesome Teachers
            </div>
            <p className="mt-10 text-[15px] text-start">
              Nunc consectetur ex nunc, id porttitor leo semper eget. Vivamus
              interdum, mauris quis cursus sodales.
            </p>
          </div>
          <div className="border rounded-[10px] min-h-[25vh] p-6 bg-slate-100">
            <img src={pix1} alt="" />
            <div className="font-[600] text-start mt-[10px]">
              Global Certificate
            </div>
            <p className="mt-10 text-[15px] text-start">
              Nunc consectetur ex nunc, id porttitor leo semper eget. Vivamus
              interdum, mauris quis cursus sodales, urn Lorem. .
            </p>
          </div>
          <div className="border rounded-[10px] min-h-[25vh] p-6 bg-slate-100">
            <img src={pix2} alt="" />
            <div className="font-[600] text-start mt-[10px]">Best Program</div>
            <p className="mt-10 text-[15px] text-start">
              Nunc consectetur ex nunc, id porttitor leo semper eget. Vivamus
              interdum, mauris quis cursus sodales, urn Lorem.
            </p>
          </div>
          <div className="border rounded-[10px] min-h-[25vh] p-6 bg-slate-100">
            <img src={pix3} alt="" />
            <div className="font-[600] text-start mt-[10px]">
              Student Support Service
            </div>
            <p className="mt-10 text-[15px] text-start">
              Nunc consectetur ex nunc, id porttitor leo semper eget. Vivamus
              interdum, mauris quis cursus sodales, urn Lorem.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
