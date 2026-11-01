import img from "../../assets/banner-img.png";
import img2 from "../../assets/beam.png";
import TypeWriter from "typewriter-effect";

import { IoSearch } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useSchoolDataByName } from "../../pages/hook/useSchoolAuth";

const HomeScreen = () => {
  const { schoolName } = useParams();
  const { schoolInfo } = useSchoolDataByName(schoolName!);

  return (
    <div
      className="h-[81vh] w-full flex justify-center items-center pt-[80px]"
      style={{
        backgroundImage: `url(${img2})`,
      }}
    >
      <div className="w-[95%] h-full justify-center flex items-center">
        <div className="w-[100%] pl-5 xl:w-[50%] h-full flex  justify-center items-start flex-col md:w-[50%]">
          <div className="ml-0 pl-0  md:text-[55px] xl:text-[70px] font-semibold leading-tight text-blue-950 text-[45px]">
            The Smarter Way to Learn.....
            <TypeWriter
              options={{
                strings: ["Anything", "AnyWhere", "AnyTime"],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
          <p className="text-[18px] md:text-[18px] text-start mt-10">
            {schoolInfo?.info ? (
              schoolInfo?.info
            ) : (
              <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
              </div>
            )}
          </p>
        </div>
        <div className="w-[50%] h-full xl:flex justify-center items-center md:w-[50%] hidden md:block">
          <img src={img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
