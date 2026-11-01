import useSWR from "swr";
import { viewExamination, viewMidTestAPI } from "../api/teachersAPI";

export const useMidTest = (subjectID: string) => {
  const { data: midTestData, error, mutate } = useSWR(
    `api/view-subject-mid-test/${subjectID}`,
    () => viewMidTestAPI(subjectID)
  );

  return {
    midTest: midTestData?.midTest,
    midTestLoading: !error && !midTestData,
    midTestError: error,
    mutate,
  };
};

export const useExaminationQuiz = (subjectID: string) => {
  const {
    data,
    error,
    mutate,
  } = useSWR(`api/view-subject-exam/${subjectID}`, () =>
    viewExamination(subjectID)
  );

  return {
    data,
    midTestLoading: !error && !data,
    midTestError: error,
    mutate,
  };
};
