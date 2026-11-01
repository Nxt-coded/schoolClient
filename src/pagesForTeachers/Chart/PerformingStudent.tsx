import pix from "../../assets/pix.jpg";
import { useClassStudent, useTeacherInfo } from "../hooks/useTeacher";
import { useReadOneClassInfo } from "../../pagesForStudents/hooks/useStudentHook";
import { UnLazyImage } from "@unlazy/react";
import { FC } from "react";

interface iProps {
  oneClass?: any;
}

const StudentPerformance: FC<iProps> = ({ oneClass }) => {
  const { teacherInfo } = useTeacherInfo();

  // const { oneClass } = useReadOneClassInfo(teacherInfo?.presentClassID);

  const { classStudents } = useClassStudent(oneClass?._id);

  const rate =
    oneClass?.topStudents?.length > 0
      ? oneClass?.topStudents
      : classStudents?.students?.sort(
          (a: any, b: any) => b.totalPerformance - a.totalPerformance
        );

  return (
    <div className="">
      <div className="carousel carousel-center h-[400px] rounded-box *:bg-slate-100 gap-2">
        {rate?.map((props: any, i: number) => (
          <div key={props?._id} className="carousel-item">
            {i < 3 && (
              <div>
                <UnLazyImage
                  alt={"image"}
                  thumbhash="1QcSHQRnh493V4dIh4eXh1h4kJUI"
                  src={props?.avatar ? props.avatar : pix}
                  autoSizes
                  className="w-[280px] h-[82%] object-cover "
                />
                <div className="p-2 text-[12px]">
                  <p>
                    Name:{" "}
                    <span className="capitalize font-bold">
                      {props?.studentFirstName} {props?.studentLastName}
                    </span>
                  </p>
                  <p>
                    Class:{" "}
                    <span className="capitalize font-bold">
                      {props?.classAssigned}
                    </span>
                  </p>
                  <div className="flex items-center text-[10px] gap-3 mt-3 leading-tight">
                    <p>
                      Grade Ratio:{" "}
                      <span className="capitalize font-bold">
                        {props?.totalPerformance}
                      </span>
                    </p>
                    &middot;
                    <p>
                      Att. Ratio:{" "}
                      <span className="mr-0 capitalize font-bold">
                        {/* {props?.attendance} */}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentPerformance;
