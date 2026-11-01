import React, { FC } from "react";
import { AiOutlineZoomIn } from "react-icons/ai";

interface iGalleryProps {
  img?: string;
}
const GalleryProps: FC<iGalleryProps> = ({ img }) => {
  return (
    <div>
      <div className="w-[420px] m-2 group md:w-full bg-white flex justify-start items-center flex-col rounded-md ">
        <div className="w-full h-[250px] md:h-[300px] lg:w-[380px] relative group">
          <img
            src={img}
            alt=""
            className="object-cover rounded-tl-md rounded-tr-md w-full h-full"
          />
          <div className="hoverglass group-hover:absolute group-hover:top-0 group-hover:left-0 group-hover:w-full group-hover:h-full group-hover:flex hidden  group-hover:justify-center group-hover:items-center group-hover:text-[30px]">
            <AiOutlineZoomIn className="text-[45px] text-blue-950" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryProps;
