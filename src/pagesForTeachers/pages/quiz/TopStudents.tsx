import { FC, useState } from "react";
import Button from "../../../components/reUse/Button";
import { MdCheck, MdClose, MdGrade } from "react-icons/md";
import toast from "react-hot-toast";
import { setTopStudents } from "../../api/teachersAPI";
import { useClassStudent, useTeacherInfo } from "../../hooks/useTeacher";

interface iProps {
  oneClass?: any;
}

const TopStudents: FC<iProps> = ({ oneClass }) => {
  const [student1, setStudent1] = useState<string>("");
  const [student2, setStudent2] = useState<string>("");
  const [student3, setStudent3] = useState<string>("");

  const { teacherInfo } = useTeacherInfo();
  const { classStudents } = useClassStudent(oneClass?._id);

  const onPublish = () => {
    const selectedStudents = [student1, student2, student3].filter(
      (s) => s !== "" && s !== "Choose Student"
    );

    if (selectedStudents.length === 0) {
      toast.error("Please select at least one student");
      return;
    }

    // Map names back to student objects to store full data for display
    const topStudentsData = selectedStudents.map((name) => {
      const student = classStudents?.students?.find(
        (s: any) => `${s.studentFirstName} ${s.studentLastName}` === name
      );
      return student;
    });

    setTopStudents(teacherInfo?._id, { topStudents: topStudentsData })
      .then((res) => {
        if (res?.status === 201) {
          toast.success("Top Students Updated Successfully!");
        } else {
          toast.error(`${res?.response?.data?.message || "Failed to update"}`);
        }
      })
      .catch(() => {
        toast.error("An error occurred");
      });
  };

  return (
    <div>
      <div className=" text-[13px] font-medium">
        <label
          htmlFor="set_top_students_modal"
          className=" transition-all duration-300 cursor-pointer "
        >
          <div className="flex items-center gap-2">
            <div className="text-[20px]">
              <MdGrade />
            </div>
            <div className="whitespace-nowrap">Top Students</div>
          </div>
        </label>

        <input
          type="checkbox"
          id="set_top_students_modal"
          className="modal-toggle"
        />
        <div
          className="modal rounded-md text-blue-950 text-left"
          role="dialog"
        >
          <div className="modal-box rounded-md bg-white">
            <div className="flex items-center justify-between my-4 ">
              <p className="font-bold">Set Top 3 Students</p>
              <label
                htmlFor="set_top_students_modal"
                className="hover:bg-blue-50 transition-all duration-300 cursor-pointer rounded-full flex items-center justify-center w-6 h-6 font-bold "
              >
                <MdClose />
              </label>
            </div>
            <hr />
            <div className="mt-2 leading-tight text-[13px] font-medium text-gray-500">
              Select the best 3 performing students in your class to be featured
              on their dashboards.
            </div>

            <div className="mt-8 flex flex-col gap-4">
              {/* Student 1 */}
              <div>
                <label className="font-medium text-[12px]">
                  1st Position Student <span className="text-red-500">*</span>
                </label>
                <select
                  className="select select-bordered bg-gray-50 w-full mt-1"
                  value={student1}
                  onChange={(e) => setStudent1(e.target.value)}
                >
                  <option>Choose Student</option>
                  {classStudents?.students?.map((props: any) => (
                    <option
                      key={props?._id}
                      value={`${props?.studentFirstName} ${props?.studentLastName}`}
                    >
                      {props?.studentFirstName} {props?.studentLastName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Student 2 */}
              <div>
                <label className="font-medium text-[12px]">
                  2nd Position Student
                </label>
                <select
                  className="select select-bordered bg-gray-50 w-full mt-1"
                  value={student2}
                  onChange={(e) => setStudent2(e.target.value)}
                >
                  <option>Choose Student</option>
                  {classStudents?.students?.map((props: any) => (
                    <option
                      key={props?._id}
                      value={`${props?.studentFirstName} ${props?.studentLastName}`}
                    >
                      {props?.studentFirstName} {props?.studentLastName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Student 3 */}
              <div>
                <label className="font-medium text-[12px]">
                  3rd Position Student
                </label>
                <select
                  className="select select-bordered bg-gray-50 w-full mt-1"
                  value={student3}
                  onChange={(e) => setStudent3(e.target.value)}
                >
                  <option>Choose Student</option>
                  {classStudents?.students?.map((props: any) => (
                    <option
                      key={props?._id}
                      value={`${props?.studentFirstName} ${props?.studentLastName}`}
                    >
                      {props?.studentFirstName} {props?.studentLastName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-full flex justify-end mt-10">
              {student1 !== "" && student1 !== "Choose Student" ? (
                <label
                  htmlFor="set_top_students_modal"
                  className="bg-blue-950 text-white py-3 px-8 rounded-md cursor-pointer hover:bg-blue-900 transition-all"
                  onClick={onPublish}
                >
                  Update Top Students
                </label>
              ) : (
                <Button
                  name="Select 1st Position"
                  className="bg-gray-300 text-blue-950 mx-0 cursor-not-allowed"
                />
              )}
            </div>
          </div>

          <label className="modal-backdrop" htmlFor="set_top_students_modal">
            Close
          </label>
        </div>
      </div>
    </div>
  );
};

export default TopStudents;
