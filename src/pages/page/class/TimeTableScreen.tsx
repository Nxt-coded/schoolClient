import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { useClassTimeTable } from "../../hook/useSchoolAuth";
import lodash from "lodash";

interface iProps {
  props?: any;
}

const daysData = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const TimeTableScreen: FC<iProps> = ({ props }) => {
  const { classID } = useParams();
  const { timetbale } = useClassTimeTable(classID!);

  const normalizedTimetable = timetbale?.data?.timeTable?.map((entry: any) => ({
    ...entry,
    day: entry.day.trim(),
  }));

  const groupedData = daysData.reduce((acc, day) => {
    acc[day] = lodash.orderBy(
      normalizedTimetable?.filter((entry: any) => entry.day === day) || [],
      ["time"],
      ["asc"]
    );
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="w-full">
      <div className="w-full bg-slate-100 h-[420px] border rounded-md p-2 overflow-x-auto gap-4">
        {/* Header */}
        <div className="flex w-[2600px] gap-4 bg-white py-3 px-1">
          <div className="w-[200px] h-6 border-r">Days</div>

          <div className="w-[300px] h-6 border-r">07:45AM - 08:10AM</div>
          <div className="w-[300px] h-6 border-r">08:10AM - 08:50AM</div>
          <div className="w-[300px] h-6 border-r">08:50AM - 09:30AM</div>
          <div className="w-[300px] h-6 border-r">09:30AM - 10:10AM</div>
          <div className="w-[300px] h-6 border-r">10:10AM - 10:20AM</div>
          <div className="w-[300px] h-6 border-r">10:20AM - 11:00AM</div>
          <div className="w-[300px] h-6 border-r">11:00AM - 11:40AM</div>
          <div className="w-[300px] h-6 border-r">11:40AM - 12:00PM</div>
          <div className="w-[300px] h-6 border-r">12:00PM - 12:40PM</div>
          <div className="w-[300px] h-6 border-r">12:40PM - 01:20PM</div>
          <div className="w-[300px] h-6 border-r">01:20PM - 02:00PM</div>
        </div>

        <div className="flex w-[2600px] gap-0 px-1 py-3 mt-2">
          <div className="w-[200px] h-6 border-r">
            {daysData.map((day, i) => (
              <div
                key={i}
                className={`py-2 pl-2 h-[3.75rem] ${
                  i % 2 === 0 ? "bg-white" : "bg-slate-50"
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          <div className="">
            {daysData.map((day, i) => (
              <div
                key={i}
                className={`flex flex-col py-2 ${
                  i % 2 === 0 ? "bg-white" : "bg-slate-50"
                }`}
              >
                <div className="flex">
                  {groupedData[day].map((entry, e) => (
                    <div key={e} className="flex">
                      <div className="w-[220px] h-11 border-r px-4">
                        {entry.subject} <br />
                        {entry.time}
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
  );
};

export default TimeTableScreen;
