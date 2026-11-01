import useSWR from "swr";
import {
  getExamSubjectPerformance,
  getOneStudentExamSubjectPerformance,
  getOneStudentSubjectPerformance,
  getStudentPerformance,
  getStudentSubjectPerformance,
} from "../api/teachersAPI";

export const useStudentPerfomance = (studentID: string) => {
  try {
    const { data: performance } = useSWR(
      `api/view-student-quiz-performance/${studentID}`,
      async () => {
        return getStudentPerformance(studentID).then((res) => {
          return res?.data || [];
        });
      }
    );
    return { performance };
  } catch (error) {
    console.error();
    return error;
  }
};

export const useSubjectStudentPerfomance = (subjectID: string) => {
  try {
    const { data: studentPerformance } = useSWR(
      `api/view-student-quiz-performance/${subjectID}`,
      async () => {
        return getStudentSubjectPerformance(subjectID).then((res) => {
          return res?.data || [];
        });
      }
    );
    return { studentPerformance };
  } catch (error) {
    console.error();
    return error;
  }
};

export const useOneSubjectStudentPerfomance = (
  subjectID: string,
  quizID: string
) => {
  try {
    const { data: oneStudentPerformance } = useSWR(
      `api/view-onesubject-quiz-performance/${subjectID}/${quizID}`,
      async () => {
        return getOneStudentSubjectPerformance(subjectID, quizID).then(
          (res) => {
            return res?.data || [];
          }
        );
      }
    );
    return { oneStudentPerformance };
  } catch (error) {
    console.error();
    return error;
  }
};

export const useOneExamSubjectStudentPerfomance = (
  subjectID: string,
  quizID: string
) => {
  try {
    const { data: oneStudentPerformanceExam } = useSWR(
      `api/view-onesubject-exam-performance/${subjectID}/${quizID}`,
      async () => {
        return getOneStudentExamSubjectPerformance(subjectID, quizID).then(
          (res) => {
            return res?.data || [];
          }
        );
      }
    );
    return { oneStudentPerformanceExam };
  } catch (error) {
    console.error();
    return error;
  }
};

// export const useExamSubjectPerfomance = (
//   subjectID: string,
// ) => {
//   try {
//     const { data: oneStudentPerformanceExam, isLoading } = useSWR(
//       `api/view-exam-performance/${subjectID}`,
//        async () => {
//         return getExamSubjectPerformance(subjectID).then((res) => {
//           console.log(res?.data);
//           return res?.data
//         });
//       }
//     );
//     return { oneStudentPerformanceExam, isLoading };
//   } catch (error) {
//     console.error();
//     return error;
//   }
// };

export const useExamSubjectPerfomance = (subjectID: string | undefined) => {
  try {
    const key = subjectID ? `api/view-exam-performance/${subjectID}` : null;

    const {
      data: examPerformance,
      error,
      isValidating,
      mutate
    } = useSWR(key, async () => {
      return getExamSubjectPerformance(subjectID!).then((res) => {
        return res?.data ?? [];
      });
    });

    return {
      examPerformance: examPerformance ?? [],
      isLoading: isValidating && !examPerformance && !error,
      error,mutate
    };
  } catch (error) {
    console.error(error);
    return { examPerformance: [], isLoading: false, error,  };
  }
};