import pix from "../../../assets/pix.jpg";
import { FaCheckDouble } from "react-icons/fa6";
import LittleHeader from "../../../components/layout/LittleHeader";
import {
  useAssignment,
  useReadOneClassInfo,
  useStudentInfo,
} from "../../hooks/useStudentHook";
import { useEffect, useState } from "react";
import { readClassInfo } from "../../api/studentAPI";

const AssignmentScreen = () => {
  const { studentInfo } = useStudentInfo();
  // const { subjectQuiz } = useSujectQuiz(subjectID!);

  const { oneClass } = useReadOneClassInfo(studentInfo?.presentClassID);

  const [state, setState] = useState<any>({});

  useEffect(() => {
    readClassInfo(oneClass?.className).then((res: any) => {
      setState(res.data);
    });
  }, []);

  const { classAssignments } = useAssignment(state?._id);

  return (
    <div className="text-blue-950 relative">
      <LittleHeader
        name={`Viewing ${studentInfo?.classAssigned} Assignments`}
      />

      <div className="mt-10" />

      <div className="mb-16 flex justify-between items-center ">
        <p>View Assignment</p>
      </div>

      {classAssignments?.assignment?.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
          {classAssignments?.assignment?.map((props: any, i: number) => (
            <div key={i}>
              <div className="border p-4 rounded-md h-[270px] flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 text-[300px] opacity-5 font-bold">
                  {i + 1}
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-bold mt-0 text-[20px] "></p>
                </div>

                <div className="flex">
                  <p className="px-4 py-1 rounded-md text-[12px] border bg-blue-50 ">
                    {props?.subjectTitle} Assignment
                  </p>
                </div>

                <div className="flex-1" />

                <div className="text-[12px] my-4">
                  <p className="font-medium mb-2">Top Performing Student</p>
                  <div className="flex gap-2">
                    <img
                      src={pix}
                      className="w-[50px] h-[50px] border rounded-xl object-cover"
                    />
                    <div>
                      <p className="font-bold capitalize ">name</p>
                      <p>point</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-[13px]">
                  <div>
                    Questions:{" "}
                    <span className="font-bold">{props?.assignmentTopic}</span>
                  </div>
                </div>
                <div className="flex justify-between text-[13px]">
                  <div>
                    Submission Deadline:{" "}
                    <span className="font-bold">
                      {props?.assignmentDeadline}
                    </span>
                  </div>
                </div>
                <div className="text-[12px] mt-2 font-bold">
                  Instrunction:{" "}
                  <span className="font-normal">
                    {`${props?.assignmentDetails}`.slice(
                      0,
                      Math.ceil(Math.random() * (100 - 70)) + 70
                    )}
                    ...
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center px-4 py-1 mt-3">
          <FaCheckDouble size={13} />
          <p className="mt-3 text-[12px] font-medium">No QUIZ set yet</p>
        </div>
      )}
    </div>
  );
};

export default AssignmentScreen;
