import { FC } from "react";
import { useSujectInfo } from "../hooks/useTeacher";
import { useReadOneClassInfo } from "../../pagesForStudents/hooks/useStudentHook";

interface ClassNameProps {
  classID: string;
}

const ClassName: FC<ClassNameProps> = ({ classID }) => {
  const { oneClass } = useReadOneClassInfo(classID);

  if (!oneClass?.className) return null;

  return (
    <p className="mb-4 text-sm font-medium text-slate-600">
      Classroom:{" "}
      <span className="font-semibold text-blue-950">{oneClass.className}</span>
    </p>
  );
};

const SubjectClassLabel: FC<{ subjectID?: string }> = ({ subjectID }) => {
  const { subjectInfo } = useSujectInfo(subjectID || "");
  const classID = subjectInfo?.designated;

  if (!classID) return null;

  return <ClassName classID={classID} />;
};

export default SubjectClassLabel;
