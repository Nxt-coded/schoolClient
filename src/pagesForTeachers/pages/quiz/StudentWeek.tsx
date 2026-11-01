import { FC, useState } from "react";
import Button from "../../../components/reUse/Button";
import { PiStudentFill } from "react-icons/pi";
import { MdCheck, MdClose } from "react-icons/md";
import toast from "react-hot-toast";
import { studentOfTheWeek } from "../../api/teachersAPI";
import { useClassStudent, useTeacherInfo } from "../../hooks/useTeacher";

import "react-datepicker/dist/react-datepicker.css";

interface iProps {
  oneClass?: any;
}

const StudentOfTheWeek: FC<iProps> = ({ oneClass }) => {
  const [subject, setSubject] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [period, setPeriod] = useState<string>("");

  const { teacherInfo } = useTeacherInfo();
  // const { oneClass } = useReadOneClassInfo(teacherInfo?.presentClassID);

  const { classStudents } = useClassStudent(oneClass?._id);

  // api/view-subject-assignment/${subjectID}

  const onCreateAssignment = () => {
    studentOfTheWeek(teacherInfo?._id, {
      remark: period,
      studentName: subject,
    })
      .then((res) => {
        if (res?.status === 201) {
          //   mutate(`api/view-subject-assignment/${subjectInfo?._id}`);
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
      <div className=" text-[13px] font-medium ">
        <label
          htmlFor="assign_subject_timetable"
          className=" transition-all duration-300 cursor-pointer "
        >
          <div className="flex items-center gap-2">
            <div className="text-[20px]">
              <PiStudentFill />
            </div>
            <div className="whitespace-nowrap">Student of the week</div>
          </div>
        </label>
        <div className="" />
        {/* Put this part before </body> tag */}
        <input
          type="checkbox"
          id="assign_subject_timetable"
          className="modal-toggle"
        />
        <div
          className="modal rounded-md  text-blue-950 text-left"
          role="dialog"
        >
          <div className="modal-box rounded-md bg-white">
            <div className="flex items-center justify-between my-4 ">
              <p className="font-bold">Give student of the week</p>

              <label
                htmlFor="assign_subject_timetable"
                className="hover:bg-blue-50 transition-all duration-300  cursor-pointer rounded-full flex items-center justify-center w-6 h-6 font-bold "
              >
                <MdClose />
              </label>
            </div>
            <hr />
            <div className="mt-2 leading-tight text-[13px] font-medium">
              Please note that by doing this... you are crediting the Student
              below as the Student of the Week!
              <br />
              <br />
              <div className="flex gap-2  items-center">
                <p>
                  {" "}
                  Student of the Week:{" "}
                  <span className="font-medium">{subject}</span>
                </p>
                {subject && (
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
                  Remark Detail <span className="text-red-500">*</span>
                </label>

                {/* // readSubject */}
                <textarea
                  className="border w-full bg-gray-100 resize-none h-[200px] mb-5 rounded-md mt-2 p-2 outline-none"
                  value={period}
                  onChange={(e) => {
                    setPeriod(e.target.value);
                  }}
                  placeholder="Remark Detail"
                />
                <div className="flex w-full gap-2 mb-10">
                  <div className="w-full">
                    <label className="font-medium text-[12px]">
                      Student of the Week{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <select
                      className="select select-bordered bg-gray-100 w-full mt-2"
                      value={subject}
                      onChange={(e) => {
                        setSubject(e.target.value);
                      }}
                    >
                      <option>Choose Student of the Week</option>
                      {classStudents?.students?.map((props: any) => {
                        return (
                          <option
                            key={props?._id}
                            value={` ${props?.studentFirstName} ${props?.studentLastName}`}
                          >
                            {props?.studentFirstName} {props?.studentLastName}
                          </option>
                        );
                      })}
                    </select>
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
                  Publish This Student
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

export default StudentOfTheWeek;
