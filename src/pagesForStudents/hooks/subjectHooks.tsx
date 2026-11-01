// ;
// 
import useSWR from "swr";
import {
  getSubjects,
  getSubjectsTopic,
  getOneSubjectsTopic,
  getOneSubjectsTopicQuiz,
} from "../api/teachAPI";

export const useReadTeachSubjects = () => {
  const x = `teach-subject/`;

  const { data, mutate } = useSWR(x, () => {
    return getSubjects().then((res) => {
      return res.data;
    });
  });

  return { data, mutate };
};

export const useReadTeachSubjectsTopic = (id: string) => {
  const x = `teach-subject-topic/${id}`;

  const { data, mutate } = useSWR(x, () => {
    return getSubjectsTopic(id).then((res) => {
      return res.data;
    });
  });

  return { data, mutate };
};

export const useOneReadTeachSubjectsTopic = (id: string) => {
  const x = `get-one-teach-subject-topic/${id}`;

  const { data, mutate } = useSWR(x, () => {
    return getOneSubjectsTopic(id).then((res) => {
      return res.data;
    });
  });

  return { data, mutate };
};

export const useOneReadTeachSubjectsTopicQuiz = (id: string) => {
  const x = `get-one-teach-subject-topic-quiz/${id}`;

  const { data, mutate } = useSWR(x, () => {
    return getOneSubjectsTopicQuiz(id).then((res: any) => {
      return res.data?.quizQuestions;
    });
  });

  return { data, mutate };
};