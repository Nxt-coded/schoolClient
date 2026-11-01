import { useDispatch, useSelector } from "react-redux";
import { displayEmptyTest } from "../../../global/reduxState";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, FC } from "react";
import { mutate } from "swr";
import { FaSpinner } from "react-icons/fa";
import { useReadMyClassInfoData } from "../../../pagesForStudents/hooks/useStudentHook";

import { useSujectQuiz } from "@/pagesForTeachers/hooks/useTeacher";

import {
  createExaminationData,
  readClassInfo,
} from "@/pagesForTeachers/api/teachersAPI";
import Button from "@/pagesForTeachers/components/reUse/Button";
import toast from "react-hot-toast";

const PreviewExamination: FC<any> = ({
  instruction,
  duration,
  mark,
  file,
  editorValue,
}) => {
  const navigate = useNavigate();
  const { subjectID } = useParams();
  const { subjectQuiz } = useSujectQuiz(subjectID!);

  const [state, setState] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    readClassInfo(subjectQuiz?.designated).then((res: any) => {
      setState(res.data);
    });
  }, []);

  console.log(subjectQuiz?.subjectClassID);

  return (
    <div>
      <Button
        name={
          loading ? (
            <div className="gap-3 flex items-center justify-center">
              <FaSpinner className="animate-spin text-[15px]" />{" "}
              <span>Loading...</span>
            </div>
          ) : (
            "Publish Question "
          )
        }
        className={`text-black border mt-50 ${
          instruction && mark && duration && "bg-neutral-950"
        } uppercase text-[12px] px-10 ml-4 py-4 bg-blue-950`}
        onClick={() => {
          setLoading(true);
          const formData: any = new FormData();
          formData.append("instruction", instruction);
          formData.append("duration", duration);
          formData.append("mark", mark);
          formData.append("file", file);
          formData.append("theory", editorValue);

          createExaminationData(
            subjectQuiz?.subjectClassID!,
            subjectID!,
            formData
          )
            .then((res: any) => {
              console.log(res);
              if (res.message === "Exam created successfully!") {
                mutate(`api/view-subject-quiz/${subjectID}`);
                mutate(`api/view-subject-exam/${subjectID}`);
                navigate(`/subjects/${subjectID}`);
              } else {
                const errData = res?.response?.data;
                const errMsg = errData?.hint
                  ? `${errData.message}\n${errData.hint}`
                  : errData?.errors?.length > 0
                  ? errData.errors.map((e: string) => `- ${e}`).join("\n")
                  : errData?.message || "Failed to create examination";
                toast.error(errMsg, { duration: 6000 });
              }
            })
            .finally(() => {
              setLoading(false);
            });
        }}
      />
    </div>
  );
};

export default PreviewExamination;
