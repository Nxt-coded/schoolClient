import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LittleHeader from "../../components/layout/LittleHeader";
import {
  useOneExamSubjectStudentPerfomance,
  useOneSubjectStudentPerfomance,
  useSubjectStudentPerfomance,
} from "../../hooks/useQuizHook";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import Button from "../../components/reUse/Button";
import { useQuiz } from "../../hooks/useTeacher";
import SubjectClassLabel from "../../components/SubjectClassLabel";

const QuizSetupScreen = () => {
  const { subjectID } = useParams();
  const { quizID } = useParams();
  const { oneStudentPerformance } = useOneExamSubjectStudentPerfomance(
    subjectID,
    quizID
  );
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const { quizData } = useQuiz(quizID);
  const students = oneStudentPerformance;

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-center" reverseOrder={true} />
      <div className="ml-5 pt-2">
        <LittleHeader
          name={` Students ${quizData?.status
            .charAt(0)
            .toUpperCase()
            .concat(quizData?.status.slice(1))} Results`}
        />
        <SubjectClassLabel subjectID={subjectID} />
      </div>

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {students?.length <= 0 ? (
              <p className="text-center text-gray-600">
                No Test Results Submitted.
              </p>
            ) : (
              <div className="flex flex-col overflow-auto">
                <div className="w-[1500px] flex bg-white rounded-lg shadow-md">
                  <div className=" w-[50px] py-3 px-6 bg-blue-50 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                    S/N
                  </div>
                  <div className="py-3 w-[300px] border-r px-6 bg-blue-50 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                    Student Name
                  </div>
                  <div className="py-3 w-[150px] border-r px-6 bg-blue-50 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                    Student Attempts
                  </div>

                  <div className="w-[250px] border-r py-3 px-6 bg-blue-50 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                    Student Score
                  </div>

                  <div className="py-3 w-[150px] border-r px-6 bg-blue-50 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                    Student Grade
                  </div>
                  <div className="py-3 w-[250px] border-r  px-6 bg-blue-50 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                    Remark
                  </div>

                  <div className="py-3 px-6 w-[180px] border-r bg-blue-50 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                    Test Completed
                  </div>
                  <div className="w-[160px] py-3 px-6 bg-blue-50 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                    Date
                  </div>
                </div>

                <div className="w-[1500px]">
                  {students?.map((record: any, i: number) => (
                    <motion.tr
                      key={record._id}
                      className="w-[2000px] items-center border-b hover:bg-gray-100 transition-colors duration-200 flex "
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="w-[50px] py-4 px-6 text-sm text-gray-700">
                        {i + 1}
                      </div>
                      <div className="py-4 w-[300px] border-r px-6 text-sm text-gray-700">
                        {record?.studentName}
                      </div>
                      <div className="border-r w-[150px] py-4 px-6 text-sm text-gray-700">
                        {record.studentScore}/{record.totalQuestions}
                      </div>
                      <div className="py-4 border-r w-[250px] px-6 text-sm text-gray-700">
                        <div className="text-blue-700">
                          ({Number(record.markPerQuestion)} Mark Per Question)
                        </div>
                        {record.studentScore * Number(record.markPerQuestion)}/
                        {record.totalQuestions * Number(record.markPerQuestion)}
                      </div>

                      <div className="py-3 w-[150px] border-r px-6  text-left  font-medium  uppercase tracking-wider text-[30px]">
                        {record?.studentGrade}
                      </div>

                      <div className="py-4 px-6 text-sm w-[250px] border-r text-gray-700">
                        {record.remark}
                      </div>

                      <div className=" text-start py-4 w-[180px] border-r px-6 text-sm text-gray-700">
                        {record.quizDone ? (
                          <div className="py-4 px-6  text-sm text-green-700">
                            Completed
                          </div>
                        ) : (
                          <div className="py-4 px-6 text-sm text-red-700">
                            Not Completed
                          </div>
                        )}
                      </div>
                      <div className="w-[160px] py-4 px-6 text-sm text-gray-700">
                        {new Date(record.createdAt).toLocaleDateString()}
                      </div>
                    </motion.tr>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        <div className="mt-8 flex justify-center">
          <Button
            className="bg-blue-950 px-6 py-3 text-white rounded-full shadow-md hover:bg-blue-800 transition-colors duration-300"
            name="Go Back"
            onClick={() => navigate(-1)}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizSetupScreen;
