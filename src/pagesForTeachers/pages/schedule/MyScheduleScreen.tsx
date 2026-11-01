import LittleHeader from "../../components/layout/LittleHeader";
import { useTeacherInfo, useTeacherSchedule } from "../../hooks/useTeacher";
import lodash from "lodash";

const daysData = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const MyScheduleScreen = () => {
  const { teacherInfo } = useTeacherInfo();
  const { teacherSchedule: dataData } = useTeacherSchedule(teacherInfo?._id);

  const groupedData = lodash
    .chain(dataData?.schedule)
    .groupBy("day")
    .toPairs()
    .orderBy(([day]) => daysData.indexOf(day))
    .map(([day, schedules]) => [
      day,
      lodash.orderBy(schedules, (s) => new Date(`1970/01/01 ${s.time}`), "asc"),
    ])
    .fromPairs()
    .value();

  document.title = "My Schedule";

  return (
    <div className="text-blue-950">
      <LittleHeader name="My Schedule" />
      <div className="w-full">
        <div className=" w-full bg-slate-50 min-h-[calc(100vh-240px)] border rounded-md p-2 overflow-x-auto gap-4 ">
          <div className="flex w-[2600px] gap-4 px-1 py-3 mt-2 ">
            <div className="w-[200px] h-6 border-r">
              {daysData.map((day, i) => (
                <div
                  key={i}
                  className="py-2 border rounded-lg bg-white h-[170px] my-2 flex justify-center items-center"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="flex flex-col py-2">
              {daysData.map((day, i) => (
                <div key={i} className="flex flex-col my-0">
                  <div className="flex gap-4">
                    {groupedData[day]?.map((props, e) => (
                      <div key={e} className="flex">
                        <div className="h-[170px] flex justify-center items-center rounded-lg flex-col w-[200px] bg-white border mb-2">
                          <p className="font-medium">{props.subject}</p>
                          <p className="font-extralight text-[13px]">
                            {props.CR} {props.day}
                          </p>
                          <p className="font-extralight text-[13px]">
                            {props.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyScheduleScreen;
