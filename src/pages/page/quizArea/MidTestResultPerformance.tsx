import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LittleHeader from "@/components/layout/LittleHeader";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import Button from "@/components/reUse/Button";

import { useOneExamSubjectStudentPerfomance } from "@/pagesForTeachers/hooks/useQuizHook";
import {
  useExam,
  useMidTest,
  useMidTestResultPerformance,
  useMidTestResultPerformanceData,
  useQuiz,
} from "@/pagesForTeachers/hooks/useTeacher";
import { removePerformance } from "@/pages/api/schoolAPIs";
import { FaSpinner } from "react-icons/fa6";
import { MdArrowBack } from "react-icons/md";

const MidTestResultPerformanceScreen = () => {
  const { subjectID, quizID, midQuizID } = useParams();

  const { oneStudentPerformance } = useOneExamSubjectStudentPerfomance(
    subjectID,
    midQuizID
  );

  const { midTestPerformanceResult } = useMidTestResultPerformanceData(
    subjectID,
    midQuizID
  );

  const { midTestPerformance, mutate } = useMidTestResultPerformance(midQuizID);
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [recordToDelete, setRecordToDelete] = useState<string>("");
  const { examData } = useExam(quizID);
  const { midTest: quizData } = useMidTest(subjectID);

  // const students = midTestPerformance?.performance; // use localStudents for realtime updates

    const [localStudents, setLocalStudents] = useState<any>(midTestPerformance);
    useEffect(() => {
      setLocalStudents(midTestPerformance);
    }, [midTestPerformance]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-center" reverseOrder={true} />
      <div className="ml-5 pt-2 flex justify-between items-center">
        <LittleHeader
          name={` Students ${quizData?.status
            ?.charAt(0)
            ?.toUpperCase()
            ?.concat(quizData?.status.slice(1))} Results`}
        />

        <Link
          to={`/admin-test-exam-grade/${subjectID}/${midQuizID}`}
          className="px-4 py-2 border rounded-md mr-2 capitalize bg-purple-500 text-white cursor-pointer "
        >
          approve report card
        </Link>
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
            {localStudents?.performance?.length <= 0 ? (
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
                  <div className="w-[160px] py-3 px-6 bg-blue-50 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                    Remove
                  </div>
                </div>

                <div className="w-[1500px]">
                  {localStudents?.performance?.map((record: any, i: number) => (
                    <motion.tr
                      key={record._id}
                      className="w-[1500px] items-center border-b hover:bg-gray-100 transition-colors duration-200 flex "
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

                      <div className="w-[160px] py-4 px-6 text-sm text-gray-700">
                        <Button
                          className="bg-red-600 px-8 py-2 text-white rounded-mg shadow-md hover:bg-red-500 transition-colors duration-300"
                          name="Remove"
                          onClick={() => {
                            setRecordToDelete(record._id);
                            setShowDeleteModal(true);
                          }}
                        />
                      </div>
                    </motion.tr>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Confirm Record Removal
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to remove this performance record? This
                action cannot be undone.
              </p>
              <div className="flex justify-end gap-">
                <Button
                  className="bg-gray-300 px-8 py-2 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-300 !text-[14px]"
                  name="Cancel Action"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setRecordToDelete("");
                  }}
                />
                <Button
                  className="bg-red-600 px-8 py-2 text-white rounded-md hover:bg-red-700 transition-colors duration-300 !text-[14px]"
                  name={
                    loading ? (
                      <span className="flex gap-2 items-center justify-center">
                        <FaSpinner className="animate-spin text-white " />{" "}
                        Removing...
                      </span>
                    ) : (
                      "Remove Record"
                    )
                  }
                  onClick={() => {
                    setLoading(true);
                    removePerformance(recordToDelete)
                      .then((res) => {
                        if (res.status === 200) {
                          // remove from local state immediately
                          setLocalStudents((prev: any) => {
                            if (!prev) return prev;
                            return {
                              ...prev,
                              performance: prev.performance.filter(
                                (r: any) => r._id !== recordToDelete
                              ),
                            };
                          });

                          setLoading(false);
                          setShowDeleteModal(false);
                          setRecordToDelete("");
                          // revalidate remote data
                          // if (mutate) mutate(`api/view-mid-test-performance/${quizID}`);
                        }
                      })
                      .catch((err) => {
                        console.error("Remove error:", err);
                      })
                      .finally(() => {
                        setLoading(false);
                      });
                  }}
                />
              </div>
            </motion.div>
          </div>
        )}

       <div className="mt-8 flex justify-center">
                 <Button
                   className="bg-neutral-950 px-6 py-3 text-white rounded-lg shadow-md hover:bg-neutral-800 transition-colors duration-300 !text-[16px]"
                   name="Go Back"
                   onClick={() => navigate(-1)}
       
                   icon={<MdArrowBack size={12}  className="animate-pulse text-white " />}
                 />
               </div>
      </div>
    </div>
  );
};

export default MidTestResultPerformanceScreen;
