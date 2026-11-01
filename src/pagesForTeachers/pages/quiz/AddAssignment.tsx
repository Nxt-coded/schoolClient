import { FC, useEffect, useState } from "react";
import Button from "../../../components/reUse/Button";
import { MdCheck, MdClose } from "react-icons/md";
import toast from "react-hot-toast";
import { createAssignment, readClassInfo } from "../../api/teachersAPI";
import { useSujectInfo } from "../../hooks/useTeacher";
import Input from "../../components/reUse/Input";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { mutate } from "swr";

interface iProps {
  props?: any;
}

const ClassModelAssignment: FC<iProps> = ({ props }) => {
  const [subject, setSubject] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [period, setPeriod] = useState<string>("");

  const { subjectInfo } = useSujectInfo(props!);
  const [state, setState] = useState<any>({});

  useEffect(() => {
    readClassInfo(subjectInfo?.designated).then((res: any) => {
      setState(res.data);
    });
  }, []);

  const [startDateTime, setStartDateTime] = useState<any>(new Date());

  // api/view-subject-assignment/${subjectID}

  const onCreateAssignment = () => {
    createAssignment(state?._id, props!, {
      assignmentDetails: period,
      assignmentTopic: subject,
      assignmentDeadline: moment(startDateTime).format("LLL"),
    })
      .then((res) => {
        if (res?.status === 201) {
          mutate(`api/view-subject-assignment/${subjectInfo?._id}`);
          toast.success("Added Successfully...!");
        } else {
          toast.error(`${res?.response?.data?.message}`);
        }
      })
      .then(() => {
        setSubject("");
        setDay("");
        setPeriod("");
      });
  };

  return (
    <div>
      {/* <Toaster position="top-center" reverseOrder={true} /> */}
      <div className=" text-[13px] font-medium">
        <label
          htmlFor="assign_subject_timetable"
          className=" transition-all duration-300  cursor-pointer "
        >
          + Student of the Week
        </label>
        <div className="" />
        {/* Put this part before </body> tag */}
        <input
          type="checkbox"
          id="assign_subject_timetable"
          className="modal-toggle"
        />
        <div
          className="modal  rounded-md text-blue-950 text-left"
          role="dialog"
        >
          <div className="modal-box bg-white rounded-md">
            <div className="flex items-center justify-between my-4 ">
              <p className="font-bold">Add Assignment to Subject</p>

              <label
                htmlFor="assign_subject_timetable"
                className="hover:bg-blue-50 transition-all duration-300  cursor-pointer rounded-full flex items-center justify-center w-6 h-6 font-bold "
              >
                <MdClose />
              </label>
            </div>
            <hr />
            <div className="mt-2 leading-tight text-[13px] font-medium">
              Please note that by assigning this subject to this class, it
              automtically becomes one of the class's compulsory subject.
              <br />
              <br />
              <div className="flex gap-2  items-center">
                <p> Assignment Topic: {subject}</p>
                {subject && (
                  <div className="flex items-center font-bold">
                    <span>selected</span>
                    <MdCheck className="text-green-500 text-[25px] mb-1 " />
                  </div>
                )}
              </div>
              <div className="flex gap-2  items-center">
                <p>
                  {" "}
                  Assignment Deadline: {moment(startDateTime).format("LLL")}
                </p>
                {moment(startDateTime).format("LLL") && (
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
                  Assignment Detail <span className="text-red-500">*</span>
                </label>

                {/* // readSubject */}
                <textarea
                  className="border w-full bg-gray-100 resize-none h-[200px] mb-5 rounded-md mt-2 p-2 outline-none"
                  value={period}
                  onChange={(e) => {
                    setPeriod(e.target.value);
                  }}
                  placeholder="Assignment Details"
                />
                <div className="flex w-full gap-2 mb-10">
                  <div className="w-full">
                    <label className="font-medium text-[12px]">
                      Assignment Title <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="Assignment Title"
                      value={subject}
                      onChange={(e) => {
                        setSubject(e.target.value);
                      }}
                      className="w-full ml-0"
                    />
                  </div>

                  <div className="w-full">
                    <div className="w-full ml-2  mt-0">
                      <label className="font-medium  text-[12px] mb-0">
                        Assignment Deadline{" "}
                        <span className="text-red-500">*</span>
                      </label>

                      <DatePicker
                        className="text-[12px] bg-gray-100 font-medium h-12 px-2 mt-2 border rounded-md w-[220px]  "
                        placeholderText="add date here"
                        selected={startDateTime!}
                        onChange={(date: any) => setStartDateTime(date)}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-end transition-all duration-300">
              {subject !== "" && period !== "" ? (
                <label
                  htmlFor="assign_subject_timetable"
                  className="bg-blue-950 text-white py-4 px-8 rounded-md cursor-pointer "
                  onClick={onCreateAssignment}
                >
                  Confirm and Publish
                </label>
              ) : (
                <Button
                  name="Can't Proceed"
                  className="bg-[lightgray] text-blue-950 mx-0 cursor-not-allowed"
                />
              )}
            </div>
          </div>

          <label className="modal-backdrop" htmlFor="assign_subject_timetable">
            Close
          </label>
        </div>
      </div>
    </div>
  );
};

export default ClassModelAssignment;
