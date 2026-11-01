import pix from "../../../assets/pix.jpg";
import {
  useReadOneClassInfo,
  useStudentInfo,
} from "../../hooks/useStudentHook";
import { useClassStudent } from "../../../pagesForTeachers/hooks/useTeacher";
import lodash from "lodash";
import { FC } from "react";
import {
  useClassAttendance,
  useStudentAttendance,
} from "../../../pages/hook/useSchoolAuth";

interface iProps {
  props?: any;
}

const Att: FC<iProps> = ({ props }) => {
  const { mainStudentAttendance } = useStudentAttendance(props);

  const rate = mainStudentAttendance?.data?.attendance?.filter((el: any) => {
    return el.present === true;
  }).length;

  return (
    <div className="ml-2">
      {(rate / mainStudentAttendance?.data?.attendance?.length) * 100}%
    </div>
  );
};

const StudentPerformance = () => {
  const { studentInfo } = useStudentInfo();
  const { oneClass } = useReadOneClassInfo(studentInfo?.presentClassID);
  const { classStudents } = useClassStudent(oneClass?._id);

  const rate =
    oneClass?.topStudents?.length > 0
      ? oneClass?.topStudents
      : lodash.orderBy(classStudents?.students, ["totalPerformance"], ["desc"]);

  return (
    <div className="">
      <div className="carousel carousel-center h-[400px] rounded-box *:bg-slate-100 gap-2">
        {rate?.map((props: any, i: number) => (
          <div key={props?._id} className="carousel-item">
            {i < 3 && (
              <div>
                <img
                  src={props?.avatar ? props?.avatar : pix}
                  alt="Pizza"
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
                        {props?.totalPerformance ? props?.totalPerformance : 0}
                      </span>
                    </p>
                    &middot;
                    <p className="flex">
                      Attendance Rate:{" "}
                      <span className="mr-0 capitalize font-bold">
                        <Att props={props?._id} />
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
