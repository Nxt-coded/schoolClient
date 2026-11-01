import { FC } from "react";
import Chart from "./Chart";
import GetAnnouncement from "./GetAnnouncement";
import {
  useClassStudent,
  useTeacherInfo,
  useTeacherNote,
  useTeacherSchedule,
} from "../hooks/useTeacher";
import moment from "moment";
import lodash from "lodash";
import MainArticleHolderScreen from "../pages/article/ARticlaHolderScreen";

const day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

interface iProps {
  oneClass: any;
}

const Personal: FC<iProps> = ({ oneClass }) => {
  const { teacherInfo } = useTeacherInfo();

  const { teacherSchedule: dataData } = useTeacherSchedule(teacherInfo?._id);

  const data = Object.values(lodash.groupBy(dataData?.schedule, "day"));

  const { teacherNote } = useTeacherNote(teacherInfo?._id);

  let ratingData = teacherNote?.lessonNotes
    ?.map((el: any) => {
      return el?.rateData;
    })
    .flat()
    .map((el: any) => {
      return parseInt(el?.rate);
    });

  let rating: any = (
    ratingData?.reduce((a: number, b: number) => {
      return a + b;
    }, 0) / ratingData?.length
  ).toFixed(2);

  const { classStudents } = useClassStudent(oneClass?._id);

  const monitor = classStudents?.students?.find((el: any) => {
    return el?.monitor === true;
  });

  return (
    <div>
      <div className="mb-2 text-blue-950">
        <div className="flex gap-5 items-center mb-10">
          <p className="font-medium">
            Performance Rating:{" "}
            {teacherInfo?.staffRating ? (
              <p className="text-[20px] text-blue-900">
                {`\u2605`.repeat(rating)}{" "}
                <span className="text-[12px] font-bold">({rating})</span>
              </p>
            ) : (
              <p className="text-[12px]">No Rating Yet</p>
            )}
          </p>
          <p className="font-medium">
            {/* Class Monitor:{" "} */}
            {monitor?.monitor ? (
              <p className="text-[20px] text-blue-900">
                {`\u2605`.repeat(1)}{" "}
                <span className="text-[12px] font-bold  leading-tight">
                  {monitor?.studentFirstName} {monitor?.studentLastName}
                </span>
              </p>
            ) : (
              <p className="text-[12px]">You haven't Assigned Monitor Yet</p>
            )}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div className="border rounded-md min-h-[130px] p-2 pb-0 ">
            <p className="font-medium leading-tight">Number of Students:</p>
            <div className="mt-5" />
            <div className="flex items-end gap-2 ">
              <h1 className="text-[60px] md:text-[70px] font-medium mb-0 leading-none">
                {oneClass?.students?.length}
              </h1>{" "}
              <span className="mb-1 font-medium text-[15px] -ml-2">
                students
              </span>
            </div>
          </div>

          <div className="border rounded-md min-h-[130px] p-2 pb-0 ">
            <p className="font-medium leading-tight">Number of Subjects:</p>
            <div className="mt-5" />
            <div className="flex items-end gap-2 ">
              <h1 className="text-[60px] md:text-[70px] font-medium mb-0 leading-none">
                {oneClass?.classSubjects?.length}
              </h1>{" "}
              <span className="mb-1 font-medium text-[15px] -ml-2">
                Subjects
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t my-5" />

      <div className="w-full min-h-[130px] bg-blue-950 rounded-lg mt-1 text-white p-3">
        <p className="text-[20px] mb-2">Announcement/Event</p>
        <GetAnnouncement />
      </div>

      <div className="w-full min-h-[130px] border bg-orange-500 rounded-lg text-white p-3 mt-5  overflow-x-auto relative">
        <div className="sticky z-20 top-0 left-0">
          <p className="text-[20px] mb-2">My Today's Schedule</p>
          <p className="text-[20px] font-bold -mt-3">
            {day[moment(Date.now()).day()]}
          </p>
        </div>

        <div className="flex mt-5 w-full mr-5">
          {data?.map((props: any, i: number) => (
            <div
              key={i}
              className={`
                flex flex-col py-2 my-0 
                `}
            >
              <div className="flex gap-4 mr-5">
                {props?.map((props: any, e: number) => (
                  <div key={e} className="flex">
                    {props?.day === day[moment(Date.now()).day()] && (
                      <div className="flex gap-4">
                        <div className=" h-[170px] flex justify-center items-center rounded-lg flex-col w-[200px] text-blue-950 bg-white border">
                          <p>{props?.subject}</p>
                          <p>{props?.time}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t my-5" />
      <div className="w-full">
        <p>Chart</p>

        <Chart />

        <p className="text-[12px]">Male vs Female</p>
      </div>

      <main className="mt-5 ">
        <MainArticleHolderScreen />
      </main>
    </div>
  );
};

export default Personal;
