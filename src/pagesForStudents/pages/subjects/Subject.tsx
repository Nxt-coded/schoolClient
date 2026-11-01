import { Link } from "react-router-dom";

import { FC } from "react";
import pix from "../../../assets/pix.jpg";

import LittleHeader from "../../../components/layout/LittleHeader";
import Button from "../../../components/reUse/Button";
import {
  useReadOneClassInfo,
  useStudentInfo,
} from "../../hooks/useStudentHook";
import { useSujectInfo } from "../../../pagesForTeachers/hooks/useTeacher";
import { useClassSubjects } from "../../../pages/hook/useSchoolAuth";

document.title = "view teacher subject";

interface iProp {
  props?: any;
  quiz?: boolean;
  midTest?: boolean;
  exam?: boolean;
  teach?: boolean;
}

const SubjectRecord: FC<iProp> = ({ exam, props, quiz, teach, midTest }) => {
  const { subjectInfo } = useSujectInfo(props);

  return (
    <div>
      {quiz && (
        <div>
          {subjectInfo?.quiz?.length > 0 ? (
            <span>Yes ({subjectInfo?.quiz?.length})</span>
          ) : (
            "No"
          )}
        </div>
      )}
      {midTest && <div>{subjectInfo?.midTest?.length > 0 ? "Yes" : "No"}</div>}
      {exam && <div>{subjectInfo?.examination?.length > 0 ? "Yes" : "No"}</div>}

      {teach && <div>{subjectInfo?.subjectTeacherName}</div>}
    </div>
  );
};

const MyClassroom: FC = () => {
  const { studentInfo } = useStudentInfo();

  const { oneClass } = useReadOneClassInfo(studentInfo?.presentClassID);
  const { readSubject } = useClassSubjects(studentInfo?.presentClassID);

  return (
    <div className="w-full overflow-x-hidden">
      <LittleHeader name="Class Teacher Subject" />
      <div className="flex gap-2">
        <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <img
              src={studentInfo?.avatar ? studentInfo?.avatar : pix}
              alt="Avatar"
            />
          </div>
        </div>
        <div className="text-[12px] gap-2">
          <p>
            {studentInfo?.studentFirstName} {studentInfo?.studentLastName}
          </p>
          <p>{studentInfo?.classAssigned}</p>
        </div>
      </div>
      <div>
        <div className="font-bold mt-5">Student class Subjects</div>
        <div className="text-[12px] opacity-50">Subject teacher takes</div>
      </div>

      <div className=" w-[95%] ">
        <div className="py-6 px-2 border rounded-md min-w-[600px] overflow-y-hidden mt-9">
          <div className="w-[1500px] text-[gray] flex gap-9 text-[12px] font-medium uppercase mb-10 px-4">
            <div className="w-[150px] border-r">Class Subject</div>
            <div className="w-[150px] border-r">Subject Teacher</div>
            <div className="w-[100px] border-r">Quiz Ready?</div>
            <div className="w-[100px] border-r">Mid-Test Ready?</div>
            <div className="w-[100px] border-r">Examination Ready?</div>

            <div className="w-[250px] border-r">Description</div>
            <div className="w-[200px] border-r">View Details</div>
          </div>

          {readSubject?.map((props: any, i: number) => {
            return (
              <div
                key={props.id}
                className="w-[1400px] flex items-center gap-9 text-[12px] font-medium  h-16 px-4 my-2 overflow-hidden"
              >
                <div className="w-[150px] border-r text-black">
                  {props.subjectTitle}
                </div>
                <div className="w-[150px] border-r text-black font-bold">
                  <SubjectRecord props={props._id} teach />
                </div>
                <div className="w-[100px] border-r border-l text-black font-bold">
                  <SubjectRecord props={props._id} quiz />
                </div>
                <div className="w-[100px] border-r text-black font-bold">
                  <SubjectRecord props={props._id} midTest />
                </div>
                <div className="w-[100px] border-r text-black font-bold">
                  <SubjectRecord props={props._id} exam />
                </div>
                <div className="w-[250px] border-r text-black">
                  no caption yet
                </div>
                <Link to={`/subjects/${props._id}`}>
                  <Button
                    name={`View ${props?.subjectTitle}`}
                    className="py-4 px-0 bg-black text-white hover:bg-neutral-800 transition-all duration-300 w-[200px]"
                  />
                </Link>
              </div>
            );
          })}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default MyClassroom;
