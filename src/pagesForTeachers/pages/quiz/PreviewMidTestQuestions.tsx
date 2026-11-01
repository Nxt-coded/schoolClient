import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/reUse/Button";
import {
  createExaminationData,
  createMidTestData,
  createQuizData,
  readClassInfo,
} from "../../api/teachersAPI";
import { displayEmptyTest } from "../../../global/reduxState";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, FC } from "react";
import { useSujectQuiz } from "../../hooks/useTeacher";
import { useMidTest } from "../../hooks/useMidTest";
import { FaSpinner } from "react-icons/fa";
import { useReadMyClassInfoData } from "../../../pagesForStudents/hooks/useStudentHook";
import SubjectClassLabel from "../../components/SubjectClassLabel";

const PreviewMidTestScreen: FC<any> = ({
  instruction,
  duration,
  mark,
  file,
  editorValue,
}) => {
  const navigate = useNavigate();
  const { subjectID } = useParams();
  const { subjectQuiz } = useSujectQuiz(subjectID!);
  const { midTest, midTestLoading, mutate } = useMidTest(subjectID!);

  const [state, setState] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    readClassInfo(subjectQuiz?.designated).then((res: any) => {
      setState(res.data);
    });
  }, []);
  console.log("classes: ", state);

  return (
    <div>
      <SubjectClassLabel subjectID={subjectID} />
      <Button
        name={
          loading ? (
            <div className="gap-3 flex items-center justify-center">
              <FaSpinner className="animate-spin text-[15px]" />{" "}
              <span>Loading...</span>
            </div>
          ) : (
            "Publish Question"
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

          createMidTestData(subjectQuiz?.classDetails!, subjectID!, formData)
            .then((res: any) => {
              if (res.status === 201) {
                // This will trigger an immediate revalidation of the mid test data
                mutate();
                navigate(`/subjects/${subjectID}`);
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

export default PreviewMidTestScreen;
