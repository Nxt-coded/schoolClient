import axios from "axios";

// Working Locally
// const URL: string = import.meta.env.VITE_MAIN_URL;

// Working Online
// const URL: string = "https://startschoolnextbe.onrender.com/api";
// const URL: string = import.meta.env.VITE_MAIN_URL;
// const URL: string = "http://localhost:2244/api";

const URL: string = "https://startschoolnextbe.onrender.com/api";
// const URL: string = "https://start-school-be.vercel.app/api";

// const URLII: string = "https://server.justnext.com.ng/api";

export const getSubjects = async () => {
  try {
    return await axios.get(`${URL}/teach-subject/`).then((res) => {
      return res?.data;
    });
  } catch (error) {
    console.error();

    return error;
  }
};

export const getSubjectsTopic = async (id: string) => {
  try {
    return await axios
      .get(`${URL}/get-teach-subject-topic/${id}`)
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();

    return error;
  }
};

export const getOneSubjectsTopic = async (id: string) => {
  try {
    return await axios
      .get(`${URL}/get-one-teach-subject-topic/${id}`)
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();

    return error;
  }
};

export const getOneSubjectsTopicQuiz = async (id: string) => {
  try {
    return await axios
      .get(`${URL}/get-teach-subject-topic-quiz/${id}`)
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();

    return error;
  }
};
