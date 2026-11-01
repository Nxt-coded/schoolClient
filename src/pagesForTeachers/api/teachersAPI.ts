import axios from "axios";

// Working Locally

// const URL: string =
//   import.meta.env.VITE_MAIN_URL || import.meta.env.VITE_PRODUCTION_URL;
// const URL: string =
//   import.meta.env.VITE_MAIN_URL || import.meta.env.VITE_PRODUCTION_URL;

// const URL: string = "http://localhost:2244/api";
const URL: string = "https://startschoolnextbe.onrender.com/api";
// const URL: string = "https://start-school-be.vercel.app/api";

export const viewMidTestAPI = async (subjectID: string) => {
  try {
    return await axios
      .get(`${URL}/view-subject-mid-test/${subjectID}`)
      .then((res: any) => {
        return res.data;
      });
  } catch (error) {
    return error;
  }
};

// Working Online

// const URL: string = "https://startschoolnextbe.onrender.com/api"
// const URL = "http://localhost:2244/api

export const getStudentPerformance = async (studentID: string) => {
  try {
    return await axios
      .get(`${URL}/view-student-quiz-performance/${studentID}`)
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const getExam = async (subjectID: string) => {
  return await axios.get(`${URL}/view-exam/${subjectID}`).then((res) => {
    return res.data;
  });
};

export const getStudentSubjectPerformance = async (subjectID: string) => {
  try {
    return await axios
      .get(`${URL}/view-subject-quiz-performance/${subjectID}`)
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const getOneStudentExamSubjectPerformance = async (
  subjectID: string,
  quizID: string,
) => {
  try {
    return await axios
      .get(`${URL}/view-onesubject-exam-performance/${subjectID}/${quizID}`)
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const getExamSubjectPerformance = async (subjectID: string) => {
  try {
    return await axios
      .get(`${URL}/view-exam-performance/${subjectID}/`)
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const getMidTestPerformanceResut = async (
  subjectID: string,
  quizID: string,
) => {
  try {
    // const URL = "http://localhost:2244/api";
    return await axios
      .get(
        `${URL}/view-one-subject-mid-test-performance/${subjectID}/${quizID}`,
      )
      .then((res) => {
        console.log("show me: ", res);
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const getMidTestPerformance = async (quizID: string) => {
  try {
    // const URL = "http://localhost:2244/api";
    return await axios
      .get(`${URL}/view-mid-test-performance/${quizID}`)
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const getOneStudentSubjectPerformance = async (
  subjectID: string,
  quizID: string,
) => {
  try {
    return await axios
      .get(`${URL}/view-onesubject-quiz-performance/${subjectID}/${quizID}`)
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const getStudentTestRecord = async (quizID: string) => {
  try {
    return await axios.get(`${URL}/quiz/${quizID}/record`).then((res) => {
      return res?.data?.data;
    });
  } catch (error: any) {
    console.error();
    return error;
  }
};

export const deleteQuiz = async (quizID: any) => {
  try {
    return await axios
      .delete(`${URL}/delete-quiz/${quizID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const viewTeacherDetail: any = async (teacherID: string) => {
  try {
    return await axios
      .get(`${URL}/view-teacher-detail/${teacherID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const updaetTeacherSalary = async (teacherID: string, data: {}) => {
  try {
    return await axios
      .patch(`${URL}/update-teacher-salery/${teacherID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const loginTeacherToken = async (data: {}) => {
  try {
    return await axios
      .post(`${URL}/login-teacher-token/`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const loginTeacher = async (data: {}) => {
  try {
    return await axios
      .post(`${URL}/login-teacher/`, data, { withCredentials: true })
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const readTeacherCookie = async () => {
  try {
    return await axios
      .get(`${URL}/read-teacher-cookie/`, { withCredentials: true })
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const readClassInfo = async (className: string) => {
  try {
    return await axios
      .post(`${URL}/view-classroom-info-name/`, { className })
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const readClassInfoTimeTable = async (classID: string) => {
  try {
    return await axios
      .get(`${URL}/view-classroom-info-timetable/${classID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const readClassInfoSubject = async (classID: string) => {
  try {
    // const URL = "http://localhost:2244/api";
    return await axios
      .get(`${URL}/view-classroom-info-subject/${classID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewSchoolClassroom = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/view-classrooms/${schoolID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const readClassInfoStudent = async (classID: string) => {
  try {
    return await axios
      .get(`${URL}/view-classroom-info-student/${classID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const updateTeacherSignature = async (teacherID: string, data: any) => {
  try {
    return await axios
      .patch(`${URL}/upload-staff-signature/${teacherID}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const readTeacherSchedule = async (teacherID: string) => {
  try {
    return await axios
      .get(`${URL}/view-teacher-schedule/${teacherID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const readSubjectDetail = async (subjectID: string) => {
  try {
    return await axios
      .get(`${URL}/view-subjects-info/${subjectID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const createQuiz = async (
  classID: string,
  subjectID: string,
  totalQuestions: number,
  data: {},
) => {
  try {
    return await axios
      .post(`${URL}/create-subject-quiz/${classID}/${subjectID}`, {
        totalQuestions,
        quiz: data,
      })
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const startExamination = async (examID: string) => {
  try {
    return await axios
      .patch(`${URL}/start-subject-exam/${examID}`, {
        started: true,
      })
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const stopExamination = async (examID: string) => {
  try {
    return await axios
      .patch(`${URL}/start-subject-exam/${examID}`, {
        started: false,
      })
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const startMidTest = async (midTestID: string) => {
  try {
    // const URL = "http://localhost:2244/api";
    return await axios
      .patch(`${URL}/start-subject-mid-test/${midTestID}`, {
        started: true,
      })
      .then((res: any) => {
        console.log(res);
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const randomizeStartMidTest = async (midTestID: string) => {
  try {
    return await axios
      .patch(`${URL}/randomize-subject-mid-test/${midTestID}`, {
        started: true,
      })
      .then((res: any) => {
        console.log(res);
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const randomizeStopMidTest = async (midTestID: string) => {
  try {
    return await axios
      .patch(`${URL}/randomize-subject-mid-test/${midTestID}`, {
        started: false,
      })
      .then((res: any) => {
        console.log(res);
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const randomizeStartExam = async (examID: string) => {
  try {
    return await axios
      .patch(`${URL}/randomize-subject-exam/${examID}`, {
        started: true,
      })
      .then((res: any) => {
        console.log(res);
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const randomizeStopExam = async (examID: string) => {
  try {
    return await axios
      .patch(`${URL}/randomize-subject-exam/${examID}`, {
        started: false,
      })
      .then((res: any) => {
        console.log(res);
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const stopMidTest = async (midTestID: string) => {
  try {
    console.log("readL : ", midTestID);
    return await axios
      .patch(`${URL}/start-subject-mid-test/${midTestID}`, {
        started: false,
      })
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewExamination = async (subjectID: string) => {
  try {
    return await axios
      .get(`${URL}/view-subject-exam/${subjectID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewMidTest = async (subjectID: string) => {
  try {
    // const URL = "http://localhost:2244/api";
    return await axios
      .get(`${URL}/view-subject-mid-test/${subjectID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const createExaminationData = async (
  classID: string,
  subjectID: string,
  data: any,
) => {
  try {
    const config: any = {
      "content-type": "multipart/form-data",
    };

    // const URL = "http://localhost:2244/api";
    // const URL = "https://startschoolnextbe.onrender.com/api";

    // const URL = "https://start-school-be.vercel.app/api";

    return await axios
      .post(
        `${URL}/create-subject-examination-post/${classID}/${subjectID}`,
        data,
        config,
      )
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const createMidTestData = async (
  classID: string,
  subjectID: string,
  data: any,
) => {
  try {
    const config: any = {
      "content-type": "multipart/form-data",
    };
    // const URL = "http://localhost:2244/api";

    return await axios
      .post(
        `${URL}/create-subject-mid-test/${classID}/${subjectID}`,
        data,
        config,
      )
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const createQuizData = async (
  classID: string,
  subjectID: string,
  data: any,
) => {
  try {
    const config: any = {
      "content-type": "multipart/form-data",
    };
    // const URL = "http://localhost:2244/api";

    return await axios
      .post(
        `${URL}/create-subject-quiz-file/${classID}/${subjectID}`,
        data,
        config,
      )
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const updateMidTestData = async (midTestID: string, data: {}) => {
  try {
    return await axios
      .patch(`${URL}/update-subject-mid-test/${midTestID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const updateExaminationData = async (midTestID: string, data: {}) => {
  try {
    // const URL = "http://localhost:2244/api";
    return await axios
      .patch(`${URL}/update-subject-exam/${midTestID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const deleteExamination = async (subjectID: string, examID: string) => {
  try {
    // const URL="http://localhost:2244/api"
    return await axios
      .delete(`${URL}/delete-exam/${subjectID}/${examID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const deleteMidTestData = async (
  subjectID: string,
  midTestID: string,
) => {
  try {
    // const URL = "http://localhost:2244/api";
    return await axios
      .delete(`${URL}/delete-mid/${subjectID}/${midTestID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const readExam = async (quizID: string) => {
  try {
    return await axios.get(`${URL}/view-exam/${quizID}`).then((res: any) => {
      return res?.data;
    });
  } catch (error) {
    return error;
  }
};

export const readSubjectQuiz = async (subjectID: string) => {
  try {
    return await axios
      .get(`${URL}/view-subject-quiz/${subjectID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const readQuiz = async (quizID: string) => {
  try {
    return await axios.get(`${URL}/view-quiz/${quizID}`).then((res: any) => {
      return res?.data;
    });
  } catch (error) {
    return error;
  }
};

export const markAttendancePresent = async (
  teacherID: string,
  studentID: string,
) => {
  try {
    return await axios
      .post(`${URL}/present/${teacherID}/${studentID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const markAttendanceAbsent = async (
  teacherID: string,
  studentID: string,
) => {
  try {
    return await axios
      .post(`${URL}/absent/${teacherID}/${studentID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const classAttendance = async (classID: string) => {
  try {
    return await axios
      .get(`${URL}/viewing-class-attendance/${classID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const createAssignment = async (
  classID: string,
  subjectID: string,
  data: {},
) => {
  try {
    return await axios
      .post(`${URL}/create-subject-assignment/${classID}/${subjectID}/`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const classAssignment = async (subjectID: string) => {
  try {
    return await axios
      .get(`${URL}/view-class-assignment/${subjectID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const createTeacherLessonNote = async (
  schoolID: string,
  teacherID: string,
  data: {},
) => {
  try {
    return await axios
      .post(`${URL}/create-lesson-note/${schoolID}/${teacherID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const adminlessonNoteReply = async (
  schoolID: string,
  lessonNotedID: string,
  data: {},
) => {
  try {
    return await axios
      .patch(`${URL}/reply-lesson-note/${schoolID}/${lessonNotedID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const lessonNote = async (lessonID: string) => {
  try {
    return await axios
      .get(`${URL}/view-lesson-note-detail/${lessonID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const remark = async (
  teacherID: string,
  studentID: string,
  data: any,
) => {
  try {
    // const URL = "http://localhost:2244/api";
    return await axios
      .post(`${URL}/create-remark/${teacherID}/${studentID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const studentOfTheWeek = async (teacherID: string, data: any) => {
  try {
    return await axios
      .patch(`${URL}/student-week/${teacherID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const setTopStudents = async (teacherID: string, data: any) => {
  try {
    // const URL = "http://localhost:2244/api"
    return await axios
      .patch(`${URL}/set-top-students/${teacherID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const makeComplains = async (teacherID: string, data: any) => {
  try {
    return await axios
      .post(`${URL}/create-complain/${teacherID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewComplains = async (teacherID: string) => {
  try {
    return await axios
      .get(`${URL}/view-teacher-complain/${teacherID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

// Teacher Profile Settings

export const updateTeacherFullName = async (
  schoolID: string,
  staffID: string,
  staffName: string,
) => {
  try {
    return await axios
      .patch(`${URL}/update-staffName/${schoolID}/${staffID}`, { staffName })
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

//Update Socials

export const updateStaffFacebook = async (
  schoolID: string,
  staffID: string,
  facebookAcct: string,
) => {
  try {
    return await axios
      .patch(`${URL}/update-staff-facebook/${schoolID}/${staffID}`, {
        facebookAcct,
      })
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const updateStaffXAcct = async (
  schoolID: string,
  staffID: string,
  xAcct: string,
) => {
  try {
    return await axios
      .patch(`${URL}/update-staff-x/${schoolID}/${staffID}`, { xAcct })
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const updateStaffInstagramAcct = async (
  schoolID: string,
  staffID: string,
  instagramAcct: string,
) => {
  try {
    return await axios
      .patch(`${URL}/update-staff-instagram/${schoolID}/${staffID}`, {
        instagramAcct,
      })
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const updateStaffLinkinAcct = async (
  schoolID: string,
  staffID: string,
  linkedinAcct: string,
) => {
  try {
    return await axios
      .patch(`${URL}/update-staff-linkedin/${schoolID}/${staffID}`, {
        linkedinAcct,
      })
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};
//Update Socials Ends Here!

export const updateTeacherPhoneNum = async (
  schoolID: string,
  staffID: string,
  phone: string,
) => {
  try {
    return await axios.patch(
      `${URL}/update-phoneNumber/${schoolID}/${staffID}`,
      { phone },
    );
  } catch (error) {
    console.error();
    return error;
  }
};

export const updateTeacherGender = async (
  schoolID: string,
  staffID: string,
  gender: string,
) => {
  try {
    return await axios.patch(
      `${URL}/update-staffgender/${schoolID}/${staffID}`,
      { gender },
    );
  } catch (error) {
    console.error();
    return error;
  }
};
export const updateTeacherAddress = async (
  schoolID: string,
  staffID: string,
  staffAddress: string,
) => {
  try {
    return await axios.patch(
      `${URL}/update-staff-address/${schoolID}/${staffID}`,
      { staffAddress },
    );
  } catch (error) {
    console.error();
    return error;
  }
};

export const updateTeacherAvatar = async (teacherID: string, data: any) => {
  try {
    const config: any = {
      "Content-Type": "multipart/form-data",
    };
    return await axios
      .patch(`${URL}/upload-staff-avatar/${teacherID}`, data, config)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const createGradeScore = async (studentID: string, data: {}) => {
  try {
    // const URL: string = "http://localhost:2244/api";
    return await axios
      .post(`${URL}/create-report-card/${studentID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const createMidGradeScore = async (
  // teacherID: string,
  studentID: string,
  data: {},
) => {
  try {
    return await axios
      .post(`${URL}/create-mid-report-card/${studentID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const removeGradeScore = async (studentID: string, subject: string) => {
  try {
    return await axios
      .patch(`${URL}/remove-report-card/${studentID}`, { subject })
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const createMidGradeScoreRecord = async (performanceID: string) => {
  try {
    return await axios
      .patch(`${URL}/updated-subject-quiz-performance-record/${performanceID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const removeMidGradeScoreRecordPerformance = async (
  performanceID: string,
) => {
  try {
    return await axios
      .patch(`${URL}/quit-subject-quiz-performance-record/${performanceID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const removeMidGradeScoreRecord = async (
  studentID: string,
  subject: string,
) => {
  try {
    return await axios
      .patch(`${URL}/remove-mid-report-card/${studentID}`, { subject })
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewStudentGrade = async (studentID: string) => {
  try {
    return await axios
      .get(`${URL}/student-report-card/${studentID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewStudentMidGrade = async (studentID: string) => {
  try {
    return await axios
      .get(`${URL}/student-mid-report-card/${studentID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

/**
 * Bulk-fetch all students' report cards for a class in one request.
 * Dramatically faster than calling viewStudentGrade per student.
 */
export const getClassReportCards = async (classID: string) => {
  try {
    return await axios
      .get(`${URL}/class-report-cards/${classID}`)
      .then((res: any) => res?.data);
  } catch (error) {
    return error;
  }
};

export const reportCardRemark = async (
  teacherID: string,
  studentID: string,
  data: any,
) => {
  try {
    return await axios
      .patch(`${URL}/teacher-report-card/${teacherID}/${studentID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const midReportCardRemark = async (
  teacherID: string,
  studentID: string,
  data: any,
) => {
  try {
    return await axios
      .patch(`${URL}/teacher-mid-report-card/${teacherID}/${studentID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const udatedStudentBulkInfo = async (studentID: string, data: any) => {
  try {
    return await axios
      .patch(`${URL}/update-student-bulk-info/${studentID}`, data)

      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const psychoReportCardRemark = async (
  teacherID: string,
  studentID: string,
  data: any,
) => {
  try {
    // const URL = "http://localhost:2244/api";
    return await axios
      .patch(`${URL}/update-psycho-report/${teacherID}/${studentID}`, data)

      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewClassAcademicHistory = async (classID: string) => {
  try {
    return await axios
      .get(`${URL}/view-class-result-history/${classID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const createPurchases = async (staffID: string, data: {}) => {
  try {
    return await axios
      .post(`${URL}/teacher-purchase/${staffID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewPurchases = async (staffID: string) => {
  try {
    return await axios
      .get(`${URL}/view-teacher-purchase/${staffID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewTeacherLessonNote = async (staffID: string) => {
  try {
    return await axios
      .get(`${URL}/view-teacher-lesson-note/${staffID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const editTeacherLessonNote = async (
  staffID: string,
  lessonNodeID: string,
  data: any,
) => {
  try {
    return await axios
      .patch(`${URL}/update-lesson-note/${staffID}/${lessonNodeID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const assignClassMonitor = async (
  staffID: string,
  studentID: string,
) => {
  try {
    return await axios
      .patch(`${URL}/assign-class-monitor/${staffID}/${studentID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const updateStaffBulkInfo = async (staffID: string, data: any) => {
  try {
    return await axios
      .patch(`${URL}/update-staff-bulk-info/${staffID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

