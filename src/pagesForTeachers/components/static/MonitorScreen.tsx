import { useState } from "react";
import { useDispatch } from "react-redux";
import { MdClose } from "react-icons/md";
import Input from "../reUse/Input";
import Button from "../reUse/Button";
import { viewMonitor } from "../../../global/reduxState";
import { useClassStudent, useTeacherInfo } from "../../hooks/useTeacher";
import { useReadOneClassInfo } from "../../../pagesForStudents/hooks/useStudentHook";
import { assignClassMonitor } from "../../api/teachersAPI";
import toast, { Toaster } from "react-hot-toast";
import { mutate } from "swr";

const MonitorScreen = () => {
  const dispatch = useDispatch();
  const [start, setStart] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { teacherInfo } = useTeacherInfo();
  const { oneClass } = useReadOneClassInfo(teacherInfo?.presentClassID);

  const { classStudents } = useClassStudent(oneClass?._id);

  const monitor = classStudents?.students?.find((el: any) => {
    return el?.monitor === true;
  });

  const handleToggleMenuFalse = () => {
    if (!document.startViewTransition) {
      dispatch(viewMonitor(false));
    } else {
      document.startViewTransition(() => {
        dispatch(viewMonitor(false));
      });
    }
  };
  //   onClick = { handleToggleMenuFalse };

  const handleMonitor = () => {
    try {
      setLoading(true);
      assignClassMonitor(teacherInfo?._id, start).then((res: any) => {
        if (res.status === 201) {
          setLoading(false);
          dispatch(viewMonitor(false));
          mutate(`api/view-all-class-students/${oneClass?._id}`);
          toast.success(`Monitor Assigned Successfully`);
        } else {
          setLoading(false);
          mutate(`api/view-all-class-students/${oneClass?._id}`);
          dispatch(viewMonitor(false));
        }
      });
    } catch (error) {
      return error;
    }
  };
  return (
    <div className="flex mt-60 justify-center ">
      <Toaster position="top-center" reverseOrder={true} />
      <div className="w-[500px] min-h-[300px] border rounded-md bg-white shadow-md p-4">
        <p className="flex items-center justify-between my-4 ">
          <p className="font-bold">Assign Class Monitor</p>

          <p
            className="hover:bg-blue-50 transition-all duration-300  cursor-pointer rounded-full flex items-center justify-center w-6 h-6 font-bold "
            onClick={handleToggleMenuFalse}
          >
            <MdClose />
          </p>
        </p>
        <hr />

        <p className="mt-2 leading-tight text-[13px] font-medium">
          Please note that this actor would make the selected student and he/she
          would carry out some special task...
        </p>

        <div className="mt-10 w-full mb-10">
          <div className="w-full ">
            <label className="font-medium text-[12px]">
              Select a Student to be the class Monitor{" "}
              <span className="text-red-500">*</span>
            </label>
            <select
              className="select select-error w-full mt-2 "
              value={start}
              onChange={(e) => {
                setStart(e.target.value);
              }}
            >
              <option disabled selected>
                Select Class Monitor to be
              </option>
              {classStudents?.students?.map((el: any) => (
                <option
                  key={el?._id}
                  value={el?._id}
                >{`${el?.studentFirstName} ${el?.studentLastName}`}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full flex justify-end transition-all duration-300">
          {start !== "" ? (
            <Button
              name="Proceed"
              className="bg-blue-950  mx-0"
              onClick={() => {
                handleMonitor();
                handleToggleMenuFalse();
              }}
            />
          ) : (
            <Button
              name="Can't Proceed"
              className="bg-[lightgray] text-blue-950 mx-0 cursor-not-allowed"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MonitorScreen;
