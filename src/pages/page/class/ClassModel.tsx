import { useState } from "react";
import Button from "../../../components/reUse/Button";
import { MdCheck, MdClose } from "react-icons/md";
import { useClassSubjects, useSchoolData } from "../../hook/useSchoolAuth";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { createTimeTable } from "../../api/schoolAPIs";
import { mutate } from "swr";

const periodicData = [
  "07:45AM - 08:10AM",
  "08:10AM - 08:50AM",
  "08:50AM - 09:30AM ",
  "09:30AM - 10:10AM",
  "10:10AM - 10:20AM",
  "10:20AM - 11:00AM",
  "11:00AM - 11:40AM",
  "11:40AM - 12:00NOON ",
  "12:00NOON - 12:40PM",
  "12:40PM - 01:20PM",
  "01:20PM - 02:00PM",
];

const daysData = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const ClassModel = () => {
  const [subject, setSubject] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [period, setPeriod] = useState<string>("");

  const { data } = useSchoolData();
  const { classID } = useParams();

  const { readSubject } = useClassSubjects(classID!);

  const onCreateTimeTable = () => {
    createTimeTable(data?._id, classID!, {
      day,
      subject,
      time: period,
    }).then((res) => {
      if (res?.status === 201) {
        mutate(`api/view-time-table/${classID}`);
        toast.success("Added Successfully...!");
      } else {
        toast.error(`${res?.response?.data?.message}`);
      }
    });
  };

  return (
    <div>
      {/* <Toaster position="top-center" reverseOrder={true} /> */}
      <div className="mt-5 text-[13px] font-medium">
        <label
          htmlFor="assign_subject_timetable_for_class"
          className={` my-3 ${
            data?.categoryType === "Secondary"
              ? "text-blue-500"
              : "text-green-500"
          } transition-all duration-300 ${
            data?.categoryType === "Secondary"
              ? "hover:text-blue-500"
              : "hover:text-green-500"
          } cursor-pointer`}
        >
          + Add to TimeTable
        </label>
        <div className="mt-5" />
        {/* Put this part before </body> tag */}
        <input
          type="checkbox"
          id="assign_subject_timetable_for_class"
          className="modal-toggle"
        />
        <div className="modal rounded-md" role="dialog">
          <div className="modal-box  rounded-md">
            <div className="flex items-center justify-between my-4 ">
              <p className="font-bold">Add New Subject to TimeTable</p>

              <label
                htmlFor="assign_subject_timetable_for_class"
                className="hover:bg-blue-50 transition-all duration-300  cursor-pointer rounded-full flex items-center justify-center w-6 h-6 font-bold "
              >
                <MdClose />
              </label>
            </div>
            <hr />
            <div className="mt-2 leading-tight text-[13px] font-medium">
              Please note that by assigning this subject to this class, it
              automtically becomes one of the class must take suject.
              <br />
              <br />
              <div className="flex gap-2  items-center">
                <p> Subject: {subject}</p>
                {subject && (
                  <div className="flex items-center font-bold">
                    <span>selected</span>
                    <MdCheck className="text-green-500 text-[25px] mb-1 " />
                  </div>
                )}
              </div>
              <div className="flex gap-2  items-center">
                <p> Peroid: {period}</p>
                {period && (
                  <div className="flex items-center font-bold">
                    <span>selected</span>
                    <MdCheck className="text-green-500 text-[25px] mb-1 " />
                  </div>
                )}
              </div>
              <div className="flex gap-2  items-center">
                <p> Day: {day}</p>
                {day && (
                  <div className="flex items-center font-bold">
                    <span>selected</span>
                    <MdCheck className="text-green-500 text-[25px] mb-1 " />
                  </div>
                )}
              </div>
            </div>
            <div className="mt-10 w-full gap-2 flex flex-col items-center">
              <div className="w-full">
                <label className="font-medium text-[12px]">
                  Subject Title <span className="text-red-500">*</span>
                </label>

                {/* // readSubject */}
                <select
                  className="select select-bordered w-full mt-2 mb-8"
                  onChange={(e: any) => {
                    setSubject(e.target.value);
                  }}
                >
                  <option disabled selected>
                    Choose Period
                  </option>
                  <option value={"Short Break"}>Short Break</option>
                  <option value={"Long Break"}>Long Break</option>
                  <option value={"Free Period"}>Free Period</option>
                  <option value={"Assembly"}>Assembly</option>
                  {readSubject?.map((props: any, i: number) => (
                    <option
                      key={i}
                      value={props.subjectTitle}
                      className="py-4 my-8"
                    >
                      {props?.subjectTitle}
                    </option>
                  ))}
                </select>
                <div className="flex w-full gap-2 mb-10">
                  <div className="w-full">
                    <label className="font-medium text-[12px]">
                      Period Time <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="select select-bordered w-full mt-2"
                      onChange={(e: any) => {
                        setPeriod(e.target.value);
                      }}
                    >
                      <option
                        value={"Choose Period"}
                        disabled
                        selected
                        defaultValue={"Choose Period"}
                      >
                        Choose Period
                      </option>
                      {data?.timeTableStructure?.map(
                        (props: any, i: number) => (
                          <option key={i} value={props}>
                            {props}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div className="w-full">
                    <label className="font-medium text-[12px]">
                      Day of the Week <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="select select-bordered w-full mt-2"
                      onChange={(e: any) => {
                        setDay(e.target.value);
                      }}
                    >
                      <option value={"Choose Day"} disabled selected>
                        Choose Day
                      </option>
                      {daysData.map((props: any, i: number) => (
                        <option key={i} value={props}>
                          {props}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-end transition-all duration-300">
              {subject !== "" && period !== "" && day !== "" ? (
                <label
                  htmlFor="assign_subject_timetable_for_class"
                  className={`${
                    data?.categoryType === "Secondary"
                      ? "bg-blue-950"
                      : "bg-red-950"
                  } text-white py-4 px-8 rounded-md cursor-pointer`}
                  onClick={onCreateTimeTable}
                >
                  Proceed
                </label>
              ) : (
                <Button
                  name="Can't Proceed"
                  className={`bg-[lightgray] ${
                    data?.categoryType === "Secondary"
                      ? "text-blue-950"
                      : "text-green-950"
                  } mx-0 cursor-not-allowed`}
                />
              )}
            </div>
          </div>

          <label
            className="modal-backdrop"
            htmlFor="assign_subject_timetable_for_class"
          >
            Close
          </label>
        </div>
      </div>
    </div>
  );
};

export default ClassModel;
