import { UnLazyImage } from "@unlazy/react";
import pix from "../../../assets/pix.jpg";
import {
  useSchool,
  useSchoolData,
  useSchoolTeacher,
} from "../../hook/useSchoolAuth";
import lodash from "lodash";
import { useEffect } from "react";
import { mutate } from "swr";
const TopRatedTeacher = () => {
  const { schoolTeacher } = useSchoolTeacher();
  const { data } = useSchoolData();

  let rate = lodash.orderBy(schoolTeacher?.staff, "staffRating");

  const rate1 = lodash.sortBy(schoolTeacher?.staff, [
    (el: any) => {
      return el.staffRating;
    },
  ]);

  useEffect(() => {
    mutate(`api/view-school-teacher/${data?._id}`);
  }, [schoolTeacher]);

  return (
    <div className="carousel carousel-end rounded-box w-96 gap-2 *:bg-slate-100">
      {rate?.map((props: any, i: number) => (
        <div key={props?._id} className="carousel-item w-1/2">
          {i < 3 && (
            <div className="w-full h-[300px]">
              {/* <img src={pix}/> */}

              <UnLazyImage
                alt={props?.title}
                thumbhash="1QcSHQRnh493V4dIh4eXh1h4kJUI"
                src={props?.avatar ? props?.avatar : pix}
                autoSizes
                className="w-full h-[70%] object-cover"
              />
              <div className="p-2 text-[12px]">
                <p>
                  Name:{" "}
                  <span className="capitalize font-bold">
                    {props.staffName}
                  </span>
                </p>
                <p className="flex flex-wrap">
                  Class:{" "}
                  <span className="capitalize ml-2 flex items-center gap-2 font-bold text-[10px]">
                    {props?.classesAssigned?.map((props: any) => (
                      <div className="flex  items-center gap-2">
                        {props?.className}
                      </div>
                    ))}
                  </span>
                </p>
                <div className="flex items-center text-[10px] gap-3 mt-4 leading-tight">
                  {/* <p>
                    Grade Ratio:{" "}
                    <span className="capitalize font-bold">name</span>
                  </p> */}

                  <p>
                    Att. Ratio:{" "}
                    <span className="ml-1 capitalize font-bold">
                      {props?.staffRating}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TopRatedTeacher;
