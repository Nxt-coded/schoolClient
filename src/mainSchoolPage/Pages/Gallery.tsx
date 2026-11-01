import React from "react";
import gallery1 from "../../assets/mainimgs/Labkids.jpg";
import gallery2 from "../../assets/mainimgs/istockphoto-950614324-612x612.jpg";
import gallery3 from "../../assets/mainimgs/Teacherandstudents.jpg";
import gallery4 from "../../assets/mainimgs/Classkids.jpg";
import gallery5 from "../../assets/mainimgs/Child1.jpg";
import gallery6 from "../../assets/mainimgs/Child2.jpg";
import GalleryProps from "./Props/GalleryProps";
import lodash from "lodash";

import { useParams } from "react-router-dom";
import {
  useGallary,
  useSchoolDataByName,
} from "../../pages/hook/useSchoolAuth";
import { capitalizeWords } from "./WelcomePage";

const Gallery = () => {
  const { schoolName } = useParams();
  const { schoolInfo } = useSchoolDataByName(capitalizeWords(schoolName));
  const { gallary } = useGallary(schoolInfo?._id);

  const data = lodash.shuffle(gallary?.data);

  return (
    <div className="flex justify-center items-center mt-14 text-blue-950">
      <div className=" flex justify-center items-center w-[90%]">
        <div className="w-[85%] flex justify-center items-center flex-col">
          <div className="text-[25px] font-bold text-blue-950">
            OUR PHOTO GALLERY
          </div>
          <div className=" text-center text-blue-950 my-10">
            Stay up to date with all our latest news and launches. Only the best
            quality makes it onto our blog!
          </div>

          <div className="w-full gap-2 grid grid-cols-1 md:grid-cols-3">
            {data?.map((props: any, i: number) => (
              <div className=" ">
                {i < 6 && (
                  <img
                    src={props?.avatar}
                    className="object-cover rounded-md sm:h-[300px] sm:w-full min-w-[200px] "
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
