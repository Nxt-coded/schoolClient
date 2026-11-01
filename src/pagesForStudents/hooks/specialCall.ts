import { useStudentGrade } from "../../pagesForTeachers/hooks/useTeacher";

export function useProcessStudentGrades(
  students: any,
  classInfo: any,
  schoolInfo: any
) {
  return students.map((i) => {
    const { gradeData: details } = useStudentGrade(i);

    const reportData = details?.reportCard?.find((el) => {
      return (
        el.classInfo ===
        `${classInfo} session: ${schoolInfo[0]?.year}(${schoolInfo[0]?.presentTerm})`
      );
    });

    if (reportData?.result) {
      return reportData.result.map((el) => ({
        [`${el?.subject}`]:
          el?.test2 + el?.test1 + el?.test3 + el?.test4 + el?.exam,
      }));
    }

    return [];
  });
}
