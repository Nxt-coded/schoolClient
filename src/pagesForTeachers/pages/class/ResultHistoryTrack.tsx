import { Link } from "react-router-dom";
import Button from "../../components/reUse/Button";

import { FC } from "react";
import pix from "../../../assets/pix.jpg";
import {
  useClassAcademicHistory,
  useSujectInfo,
  useTeacherInfo,
} from "../../hooks/useTeacher";
import LittleHeader from "../../components/layout/LittleHeader";
import { useReadMyClassInfoData } from "../../../pagesForStudents/hooks/useStudentHook";
import lodash from "lodash";

document.title = "Viewing class History";

interface iProp {
  props?: any;
  quiz?: boolean;
  test?: boolean;
  ass?: boolean;
}

const SubjectRecord: FC<iProp> = ({ props, quiz, test, ass }) => {
  const { subjectInfo } = useSujectInfo(props);

  return (
    <div>
      {test && <div>{subjectInfo?.test ? subjectInfo?.test?.length : 0}</div>}
      {quiz && <div>{subjectInfo?.quiz ? subjectInfo?.quiz?.length : 0}</div>}
      {ass && (
        <div>
          {subjectInfo?.assignment ? subjectInfo?.assignment?.length : 0}
        </div>
      )}
    </div>
  );
};

const TermButton: FC<iProp> = ({ props, quiz, test, ass }) => {
  const { subjectInfo } = useSujectInfo(props);

  return (
    <Link
      to={`:${"session"}/:${"term"}"`}
      className="w-[170px] border-r text-black font-bold flex justify-start"
    >
      <Button
        name={`${props?.term}`}
        className="bg-blue-950 py-4 text-white text-[12px] font-normal"
      />
    </Link>
  );
};

const ResultHistryTrack: FC = () => {
  const { teacherInfo } = useTeacherInfo();

  const { state } = useReadMyClassInfoData(teacherInfo?.classesAssigned);
  const { classAcademicHistory } = useClassAcademicHistory(state?._id);

  let data = lodash.groupBy(classAcademicHistory?.classHistory, "session");

  return (
    <div className="">
      <LittleHeader name="Viewing class Academic History" />
      <div className="avatar">
        <div className="mask mask-squircle w-12 h-12">
          <img
            src={pix}
            {...(teacherInfo?.avatar ? teacherInfo?.avatar : pix)}
            alt="Avatar"
          />
        </div>
      </div>
      <div>
        <div className="font-bold">Teacher subjects</div>
        <div className="text-[12px] opacity-50 ">Subject teacher taking</div>
      </div>

      <div className=" w-full overflow-x-auto">
        <div className="py-6 px-2 border rounded-md min-w-[600px] overflow-y-hidden mt-9">
          <div className="w-[1200px] text-[gray] flex gap-9 text-[12px] font-medium uppercase mb-10 px-4">
            <div className="w-[150px] border-r">Session</div>
            <div className="w-[150px] border-r">Class Name</div>
            <div className="w-[150px] border-r">Class Teacher</div>
            <div className="w-[170px] border-r">Terms</div>
            {/* <div className="w-[170px] border-r">Second Term</div>
            <div className="w-[170px] border-r">Third Term</div> */}
            {/* <div className="w-[250px] border-r">Remark</div> */}
          </div>

          <div>
            {/* return ( */}
            <div
              // key={}
              className="w-[1200px] flex items-center gap-9 text-[12px] font-medium  h-16 px-4 my-2 overflow-hidden"
            >
              <div className="w-[150px] border-r text-black">
                {Object.values(data)?.flat()[0]?.session}
              </div>
              <div className="w-[150px] border-r text-black">
                {Object.values(data)?.flat()[0]?.className}
              </div>
              <div className="w-[150px] border-r text-black">
                {Object.values(data)?.flat()[0]?.classTeacherName}
              </div>
              {}

              {Object.values(data)
                .flat()
                ?.map((props: any) => (
                  <Link
                    to={`${props?.session.replace(
                      "/",
                      "-"
                    )}/${props?.term.replace(" ", "-")}`}
                    className="w-[170px] border-r text-black font-bold flex justify-start"
                  >
                    <Button
                      name={`${props?.term}`}
                      className="bg-blue-950 py-4 text-white text-[12px] font-normal"
                    />
                  </Link>
                ))}

              {/*                   
                  <div className="w-[170px] border-r text-black font-bold flex justify-start">
                    <Button
                      name="View 1st Term"
                      className="bg-blue-950 py-4 text-white text-[12px] font-normal"
                    />
                  </div>
                  <div className="w-[170px] border-r text-black font-bold flex justify-start">
                    <Button
                      name="View 1st Term"
                      className="bg-blue-950 py-4 text-white text-[12px] font-normal"
                    />
                  </div> */}

              {/* <div className="w-[250px] border-r text-black">
                no caption yet
              </div> */}
            </div>
            {/* ); */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultHistryTrack;
