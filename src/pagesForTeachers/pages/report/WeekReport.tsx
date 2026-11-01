document.title = "View Students";
import pix from "../../../assets/pix.jpg";
import Button from "../../../components/reUse/Button";
import LittleHeader from "../../../components/static/LittleHeader";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { useStudentAttendance } from "../../../pages/hook/useSchoolAuth";
import {
  useClassStudent,
  useClassSubject,
  useSchoolAnnouncement,
  useSchoolEvent,
  useSujectInfo,
  useTeacherInfo,
} from "../../hooks/useTeacher";
import { readClassInfo, remark } from "../../api/teachersAPI";
import { mutate } from "swr";
import toast, { Toaster } from "react-hot-toast";
import { useReadOneClassInfo } from "../../../pagesForStudents/hooks/useStudentHook";
import _ from "lodash";
import { Link } from "react-router-dom";

interface iProps {
  props?: any;
  id?: string;
  data?: any;
  i?: number;
  oneClass?: any;
}

const MainStudentRow: FC<iProps> = ({ props, i, oneClass }) => {
  const { teacherInfo } = useTeacherInfo();
  const [state, setState] = useState<any>({});

  const [stateValue, setStateValue] = useState<string>("");
  const [best, setBest] = useState<string>("");
  const [worst, setWorst] = useState<string>("");
  const [classParticipation, setClassParticipation] = useState<string>("");
  const [sportParticipation, setSportParticipation] = useState<string>("");

  const [announcement, setAnnouncement] = useState<{}>({});
  const [payment, setPayment] = useState<number>(0);

  const [attendanceRatio, setAttendanceRatio] = useState<string>("");
  const [weekPerformanceRatio, setWeekPerformanceRatio] = useState<string>("");
  const [topicFocus, setTopicFucus] = useState<string>("");
  const [generalPerformace, setGeneralPerformace] = useState<string>("");

  const { subjectData } = useClassSubject(oneClass?._id);

  const performanceRecord = ["Excellent", "Good", "Poor"];
  const attendanceRecord = ["1", "2", "3", "4", "5"];

  const { schoolAnnouncement } = useSchoolAnnouncement(teacherInfo?.schoolIDs);
  const { schoolEvent } = useSchoolEvent(teacherInfo?.schoolIDs);

  let event = schoolEvent?.events;
  let annonce = schoolAnnouncement?.announcements;

  let allEvent = event?.concat(annonce);

  const mainEvent = _.sortBy(allEvent, (a: any, b: any) => {
    return a?.updatedAt - b?.updatedAt;
  });

  return (
    <div
      className={`w-full flex items-center gap-2 text-[12px] font-medium  h-16 px-4 my-2  overflow-hidden ${
        i % 2 === 0 ? "bg-slate-50" : "bg-white"
      }`}
    >
      <Remark data={props} id={props?._id} />

      <div className="w-[100px] border-r">
        <select
          className="w-[95%] select select-bordered max-w-xs rounded-md"
          value={attendanceRatio}
          onChange={(e) => {
            setAttendanceRatio(e.target.value);
          }}
        >
          <option selected className="text-gray/70d">
            Attendance Data
          </option>
          {attendanceRecord?.map((el: any, i: number) => (
            <option value={el} key={i}>
              {el}
            </option>
          ))}
        </select>
      </div>

      {/* name */}
      <div className="w-[250px] flex border-r">
        <div className="flex gap-2">
          <img
            className=" mask mask-squircle w-14 h-14 rounded-md border object-cover"
            src={props?.avatar ? props?.avatar : pix}
          />

          <div className="w-[180px] ">
            {" "}
            {props?.studentFirstName} {props?.studentLastName}
          </div>
        </div>
      </div>

      <div className="w-[150px] border-r  ">
        <select
          className="w-[95%] select select-bordered max-w-xs rounded-md"
          value={generalPerformace}
          onChange={(e) => {
            setGeneralPerformace(e.target.value);
          }}
        >
          <option selected className="text-gray/70d">
            General Performance Data
          </option>
          {attendanceRecord?.map((el: any, i: number) => (
            <option value={el} key={i}>
              {el}
            </option>
          ))}
        </select>
      </div>
      {/* here */}

      <div className="w-[150px] border-r  ">
        <select
          className="w-[95%] select select-bordered max-w-xs rounded-md"
          value={weekPerformanceRatio}
          onChange={(e) => {
            setWeekPerformanceRatio(e.target.value);
          }}
        >
          <option selected className="text-gray/70d">
            Choose Performance?
          </option>
          {performanceRecord?.map((el: any, i: number) => (
            <option value={el} key={i}>
              {el}
            </option>
          ))}
        </select>
      </div>

      <div className="w-[150px] border-r  ">
        <select
          className="w-[95%] select select-bordered max-w-xs rounded-md select-primary"
          value={best}
          onChange={(e) => {
            setBest(e.target.value);
          }}
        >
          <option selected className="text-gray/70d">
            Select a Subject?
          </option>
          {subjectData?.classSubjects?.map((el: any) => (
            <option key={el?._id} value={el?.subjectTitle}>
              {el?.subjectTitle}
            </option>
          ))}
        </select>
      </div>

      <div className="w-[150px] border-r  ">
        <select
          className="w-[95%] select select-bordered max-w-xs rounded-md select-error"
          value={worst}
          onChange={(e) => {
            setWorst(e.target.value);
          }}
        >
          <option selected className="text-gray/70d">
            Select a Subject?
          </option>
          {subjectData?.classSubjects?.map((el: any) => (
            <option value={el?.subjectTitle} key={el?._id}>
              {el?.subjectTitle}
            </option>
          ))}
        </select>
      </div>

      <div className="w-[100px] border-r  ">
        {props?.totalPerformance ? props?.totalPerformance : "0"}
      </div>

      <div className="w-[150px] border-r  ">
        <select
          className="w-[95%] select select-bordered max-w-xs rounded-md"
          value={classParticipation}
          onChange={(e) => {
            setClassParticipation(e.target.value);
          }}
        >
          <option selected className="text-gray/70d">
            Choose Performance?
          </option>
          {performanceRecord?.map((el: any, i: number) => (
            <option value={el} key={i}>
              {el}
            </option>
          ))}
        </select>
      </div>

      <div className="w-[150px] border-r  ">
        <select
          className="w-[95%] select select-bordered max-w-xs rounded-md"
          value={sportParticipation}
          onChange={(e) => {
            setSportParticipation(e.target.value);
          }}
        >
          <option selected className="text-gray/70d">
            Choose Performance?
          </option>
          {performanceRecord?.map((el: any, i: number) => (
            <option value={el} key={i}>
              {el}
            </option>
          ))}
        </select>
      </div>

      <div className="w-[250px] border-r  ">
        <textarea
          className="border w-[95%] h-[50px] p-1 text-[12pxs] outline-none resize-none rounded-md"
          placeholder="Topics to focus study on, eg: Cell, Geometry..."
          value={topicFocus}
          onChange={(e) => {
            setTopicFucus(e.target.value);
          }}
        />
      </div>

      <div className="w-[150px] border-r  ">
        {parseFloat(props?.classTermFee).toLocaleString()}
      </div>

      <div className="w-[300px] border-r capitalize ">
        {mainEvent?.length > 0 ? (
          <div>{mainEvent[0].details}</div>
        ) : (
          "No Announcement"
        )}
      </div>

      {/* here */}
      <div className="w-[300px] border-r">
        <textarea
          className="border rounded-sm w-[94%] p-1 text-[12px] h-14 resize-none mx-2"
          placeholder="Give a Remark now"
          value={stateValue}
          onChange={(e) => {
            setStateValue(e.target.value);
          }}
        />
      </div>

      <div className="w-[180px] border-r">
        <Button
          name="Submit Report"
          className="py-3 w-[85%] bg-black text-white  hover:bg-neutral-800 transition-all duration-300"
          onClick={() => {
            setPayment(parseFloat(props?.classTermFee));
            setAnnouncement(
              mainEvent?.length > 0 ? mainEvent[0] : "No Announcement"
            );

            if (stateValue !== "" && announcement) {
              remark(teacherInfo?._id, props?._id, {
                weekPerformanceRatio,
                attendanceRatio,
                best,
                worst,
                classParticipation,
                sportParticipation,
                topicFocus,
                payment,
                announcement,
                remark: stateValue,
                generalPerformace,
              }).then((res: any) => {
                if (res.status === 201) {
                  mutate(``);
                  toast.success("Report noted");
                } else {
                  toast.error(`${res?.response?.data?.message}`);
                }
              });
            } else {
              toast.error("Please give a REMARK");
            }
          }}
        />
      </div>
      <div className="w-[180px] border-r py-3 text-white  hover:bg-neutral-800 transition-all duration-300 flex items-center justify-center rounded-md bg-blue-950">
        <Link to={`/view-weekly-report/${props?._id}`}>View Report</Link>
      </div>
    </div>
  );
};

const Remark: FC<iProps> = ({ id, data }) => {
  const { mainStudentAttendance } = useStudentAttendance(id!);

  let name2 = data?.studentFirstName;

  let result = mainStudentAttendance?.data?.attendance?.find((el: any) => {
    return el?.studentFirstName === name2;
  });

  let timer = Date.now();

  return (
    <div
      className={`w-[100px] border-r 
      ${
        result?.present
          ? "text-green-600"
          : result?.absent
          ? "text-red-600"
          : null
      }`}
    >
      {moment(result?.createdAt).format("ll") === moment(timer).format("ll") &&
      result?.present
        ? "Present"
        : result?.absent
        ? "Absent"
        : null}
    </div>
  );
};

const WeekReport = () => {
  const { teacherInfo } = useTeacherInfo();

  const [state, setState] = useState<string>(
    teacherInfo?.classesAssigned[0]?.classID
  );

  const { oneClass } = useReadOneClassInfo(state);
  const { classStudents } = useClassStudent(oneClass?._id!);

  const allStudents = classStudents?.students;
  const sortedStudents = allStudents?.sort((a: any, b: any) =>
    a.studentFirstName?.localeCompare(b.studentFirstName)
  );

  return (
    <div className="">
      <Toaster position="top-center" reverseOrder={true} />
      {/* header */}
      <div className="mb-0" />
      <LittleHeader name={"Making Weekly Report"} />

      <div className="mt-10">
        <div className="text-[12px] font-semibold">
          Weekly Report Record for
        </div>
        <select
          className="select select-bordered  w-full max-w-xs mb-10 mt-2"
          value={state}
          onChange={(e: any) => {
            setState(e.target.value);
          }}
        >
          {teacherInfo?.classesAssigned?.length > 0 ? (
            teacherInfo?.classesAssigned?.map((el: any) => (
              <option value={el?.classID}>{el?.className}</option>
            ))
          ) : (
            <option value="No class Assigned yet" disabled>
              No class Assigned yet
            </option>
          )}
        </select>
      </div>

      <div className="flex w-full justify-end"></div>
      <div className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden ">
        <div className="text-[gray] w-[2900px] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4">
          <div className="w-[100px] border-r">Today's Attendance</div>
          <div className="w-[100px] border-r">Student's Attendance Ratio</div>

          <div className="w-[250px] border-r">student Info</div>

          <div className="w-[150px] border-r">student General Performance</div>
          <div className="w-[150px] border-r">Rate this week's Performance</div>
          <div className="w-[150px] border-r">Best Performing Subject</div>
          <div className="w-[150px] border-r">Worst Performing Subject</div>
          <div className="w-[100px] border-r">Quiz Performance</div>
          <div className="w-[150px] border-r">Class Participation</div>
          <div className="w-[150px] border-r">Sport Participation</div>
          <div className="w-[250px] border-r">Topic Study</div>
          <div className="w-[150px] border-r">
            Outstanding School-fee Payment
          </div>
          <div className="w-[300px] border-r">upcoming Event</div>
          <div className="w-[300px] border-r">Give Report/Remark</div>

          <div className="w-[180px] border-r">Approve/Submit Report</div>
          <div className="w-[180px] border-r">View Student Report</div>
        </div>

        <div className=" w-[2900px] overflow-hidden">
          {sortedStudents?.length > 0 ? (
            <div>
              {sortedStudents?.map((props: any, i: number) => (
                <div key={props}>
                  <MainStudentRow props={props} i={i} oneClass={oneClass} />
                </div>
              ))}
            </div>
          ) : (
            <div>No student yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeekReport;
