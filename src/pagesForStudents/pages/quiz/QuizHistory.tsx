import { Link } from "react-router-dom";
import LittleHeader from "../../../components/layout/LittleHeader";
import {
  usePastQuestionHistory,
  useStudentInfo,
} from "../../hooks/useStudentHook";
document.title = "Quiz History";

const QuizHistory = () => {
  const { studentInfo } = useStudentInfo();

  const { pastQuestionData } = usePastQuestionHistory(studentInfo?._id);

  return (
    <div>
      <LittleHeader name="Quiz History" />

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Subject</th>
              <th>Year</th>
              <th>Percent</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {pastQuestionData?.map((el: any, i: number) => (
              <tr>
                <th>{i + 1}</th>
                <td>
                  <Link to={`/${el.subject}/${el?.year}/${el._id}`}>
                    {el.subject.toLocaleUpperCase()}
                  </Link>
                </td>
                <td>{el.year}</td>
                <td>{el.percent}%</td>
                <td>{el.score}/60</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuizHistory;
