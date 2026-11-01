import axios from "axios";

// Working Locally
// const URL: string = import.meta.env.VITE_MAIN_URL;

// Working Online
// const URL: string = "https://startschoolnextbe.onrender.com/api";
// const URL: string = import.meta.env.VITE_MAIN_URL;
// export const URL: string = "http://localhost:2244/api";

// const URL: string = "https://startschoolnextbe.onrender.comapi";
export const URL: string = "https://startschoolnextbe.onrender.com/api";
// export const URL: string = "https://start-school-be.vercel.app/api";

// const URL: string = "https://server.justnext.com.ng/api";

export const clockInWithID = async (schoolID: string, enrollmentID: string) => {
  try {
    return await axios
      .patch(`${URL}/student-clock-in-with-id/${schoolID}`, { enrollmentID })
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const clockOutWidthID = async (
  schoolID: string,
  enrollmentID: string,
) => {
  try {
    return await axios
      .patch(`${URL}/student-clock-out-with-id/${schoolID}`, { enrollmentID })
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const findStudentWidthID = async (enrollmentID: string) => {
  try {
    return await axios
      .post(`${URL}/find-student`, { enrollmentID })
      .then((res) => {
        return { data: res?.data, status: res.status };
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const clockIn = async (schoolID: string, studentID: string) => {
  try {
    return await axios
      .patch(`${URL}/student-clock-in/${schoolID}/${studentID}`)
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const clockOut = async (schoolID: string, studentID: string) => {
  try {
    return await axios
      .patch(`${URL}/student-clock-out/${schoolID}/${studentID}`)
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const getQuizRecord = async (studentID: string) => {
  try {
    return await axios
      .get(`${URL}/view-quiz-record/${studentID}`)
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const viewStduentDetail = async (studentID: string) => {
  try {
    return await axios
      .get(`${URL}/read-student-info/${studentID}`)
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const loginStudent = async (data: {}) => {
  try {
    return await axios
      .post(
        `${URL}/login-student/`,
        data,
        // { withCredentials: true }
      )
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const loginStudentToken = async (data: {}) => {
  try {
    return await axios
      .post(
        `${URL}/login-student-token/`,
        data,
        // { withCredentials: true }
      )
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const getStudentPayRecord = async (studentID: string) => {
  try {
    return await axios
      .get(`${URL}/getone-fee-records/${studentID}`)
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
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

export const readOneClassInfo = async (classID: string) => {
  try {
    return await axios
      .get(`${URL}/view-one-classroom-info/${classID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewPerformanceTest = async (studentID: string) => {
  try {
    return await axios
      .get(`${URL}/view-student-quiz-performance/${studentID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const performanceExamination = async (
  studentID: string,
  quizID: string,
  subjectID: string,
  data: {},
) => {
  try {
    // const URL="http://localhost:2244/api"
    return await axios
      .post(
        `${URL}/create-subject-exam-performance/${studentID}/${quizID}/${subjectID}`,
        data,
      )
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const performanceMidTest = async (
  studentID: string,
  quizID: string,
  subjectID: string,
  data: {},
) => {
  try {
    return await axios
      .post(
        `${URL}/create-subject-mid-test-performance/${studentID}/${quizID}/${subjectID}`,
        data,
      )
      .then((res: any) => {
        return res?.data;
      });
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

export const viewStudentPerformanceMidTest = async (studentID: string) => {
  try {
    // const URL = "http://localhost:2244/api";
    return await axios
      .get(`${URL}/view-student-mid-test-performance/${studentID}/`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

export const viewMidTestStduent = async (subjectID: string) => {
  try {
    return await axios
      .get(`${URL}/view-subject-mid-test/${subjectID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const performanceTest = async (
  studentID: string,
  quizID: string,
  subjectID: string,
  data: {},
) => {
  try {
    // const URL = "http://localhost:2244/api";
    return await axios
      .post(
        `${URL}/create-subject-quiz-performance/${studentID}/${quizID}/${subjectID}`,
        data,
      )
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const readStudentCookie = async () => {
  try {
    return await axios
      .get(`${URL}/read-student-cookie/`, { withCredentials: true })
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewStudentAttendance = async (studentID: string) => {
  try {
    return await axios
      .get(`${URL}/viewing-student-attendance/${studentID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const classAssignment = async (classID: string) => {
  try {
    return await axios
      .get(`${URL}/view-class-assignment/${classID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const lessonNotes = async (schoolID: string, staffID: string) => {
  try {
    return await axios
      .get(`${URL}/view-lesson-note/${schoolID}/${staffID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const classLessonNotes = async (classID: string) => {
  try {
    return await axios
      .get(`${URL}/view-class-lesson-note/${classID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const rateNote = async (
  studentID: string,
  lessonID: string,
  data: {},
) => {
  try {
    return await axios
      .patch(`${URL}/rate-lesson-note/${studentID}/${lessonID}`, { rate: data })
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const createStudentArticle = async (
  schoolID: string,
  studentID: string,
  data: {},
) => {
  try {
    return await axios
      .post(`${URL}/create-article/${schoolID}/${studentID}`, data)
      .then((res: any) => {
        return res?.data;
      })
      .catch((error) => {
        return error;
      });
  } catch (error) {
    return error;
  }
};

export const createPastQuestionHistory = async (
  studentID: string,
  data: {},
) => {
  try {
    return await axios
      .post(`${URL}/create-question-history/${studentID}`, data)
      .then((res: any) => {
        return res?.data;
      })
      .catch((error) => {
        return error;
      });
  } catch (error) {
    return error;
  }
};

export const getOneStudentHistory = async (studentID: string) => {
  try {
    return await axios
      .get(`${URL}/view-question-history/${studentID}`)
      .then((res: any) => {
        return res?.data;
      })
      .catch((error) => {
        return error;
      });
  } catch (error) {
    return error;
  }
};

export const getOneArticle = async (articleID: string) => {
  try {
    return await axios
      .get(`${URL}/view-article/${articleID}`)
      .then((res: any) => {
        return res?.data;
      })
      .catch((error) => {
        return error;
      });
  } catch (error) {
    return error;
  }
};

export const getSchoolArticle = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/view-school-article/${schoolID}`)
      .then((res: any) => {
        return res?.data;
      })
      .catch((error) => {
        return error;
      });
  } catch (error) {
    return error;
  }
};

//Update Student Profile

export const updateProfile = async (studntID: string, data: {}) => {
  try {
    return await axios
      .patch(`${URL}/update-student/${studntID}`, data)
      .then((res: any) => {
        return res?.data;
      })
      .catch((error) => {
        return error;
      });
  } catch (error) {
    return error;
  }
};

export const updateStudentFirstName = async (
  schoolID: string,
  studentID: string,
  studentFirstName: string,
  studentLastName: string,
) => {
  try {
    return axios
      .patch(`${URL}/update-student-firstname/${schoolID}/${studentID}`, {
        studentFirstName,
        studentLastName,
      })
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const updateStudentLastName = async (
  schoolID: string,
  studentID: string,
  studentLastName: string,
  studentFirstName: string,
) => {
  try {
    return axios
      .patch(`${URL}/update-student-lastname/${schoolID}/${studentID}`, {
        studentLastName,
        studentFirstName,
      })
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const updateStudentAddress = async (
  schoolID: string,
  studentID: string,
  studentAddress: string,
) => {
  try {
    return axios
      .patch(`${URL}/update-student-address/${schoolID}/${studentID}`, {
        studentAddress,
      })
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const updateStudentParentNumber = async (
  schoolID: string,
  studentID: string,
  parentPhoneNumber: string,
) => {
  try {
    return axios
      .patch(`${URL}/update-parent-number/${schoolID}/${studentID}`, {
        parentPhoneNumber,
      })
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const updateStudentPhoneNumber = async (
  schoolID: string,
  studentID: string,
  phone: string,
) => {
  try {
    return axios
      .patch(`${URL}/update-student-phone/${schoolID}/${studentID}`, { phone })
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const updateStudentGender = async (
  schoolID: string,
  studentID: string,
  gender: string,
) => {
  try {
    return axios
      .patch(`${URL}/update-student-gender/${schoolID}/${studentID}`, {
        gender,
      })
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const updateParentEmail = async (
  schoolID: string,
  studentID: string,
  parentEmail: string,
) => {
  try {
    return await axios
      .patch(`${URL}/update-parent-email/${schoolID}/${studentID}`, {
        parentEmail,
      })
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};
//Update Student Profile ends Here

//Student Socials
export const updateStudentFacebook = async (
  schoolID: string,
  studentID: string,
  facebookAccount: string,
) => {
  try {
    return await axios
      .patch(`${URL}/update-student-facebook/${schoolID}/${studentID}`, {
        facebookAccount,
      })
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const updateStudentInstagram = async (
  schoolID: string,
  studentID: string,
  instagramAccount: string,
) => {
  try {
    return await axios
      .patch(`${URL}/update-student-instagram/${schoolID}/${studentID}`, {
        instagramAccount,
      })
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const updateLinkedin = async (
  schoolID: string,
  studentID: string,
  linkedinAccount: string,
) => {
  try {
    return await axios
      .patch(`${URL}/update-student-linkedin/${schoolID}/${studentID}`, {
        linkedinAccount,
      })
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const updateXAccount = async (
  schoolID: string,
  studentID: string,
  xAccount: string,
) => {
  try {
    return await axios
      .patch(`${URL}//update-student-xAccount/${schoolID}/${studentID}`, {
        xAccount,
      })
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};
//Student Socials Ends Here

export const makeComplains = async (studentID: string, data: any) => {
  try {
    return await axios
      .post(`${URL}/create-student-complain/${studentID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewComplains = async (studentID: string) => {
  try {
    return await axios
      .get(`${URL}/view-student-complain/${studentID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewClassTimetable = async (classID: string) => {
  try {
    return await axios
      .get(`${URL}/view-time-table/${classID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const updateTeacherActiveness = async (
  studentID: string,
  data: string,
) => {
  try {
    return await axios
      .patch(`${URL}/staff-active/${studentID}`, { teacherName: data })
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const updateStudentAvatar = async (studentID: string, data: string) => {
  try {
    const config: any = {
      "Content-Type": "multipart/form-data",
    };
    return await axios
      .patch(`${URL}/upload-student-avatar/${studentID}`, data, config)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const getStudentGrade = async (studentID: string) => {
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

export const getOneHistory = async (historyID: string) => {
  try {
    return await axios
      .get(`${URL}/get-one-history/${historyID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const updateStudentParentEmail = async (
  schoolID: string,
  studentID: string,
  parentEmail: string,
) => {
  try {
    return await axios
      .patch(`${URL}/update-parent-email/${schoolID}/${studentID}`, {
        parentEmail,
      })
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewPurchasedEndPoint = async (studentID: string) => {
  try {
    return await axios
      .get(`${URL}/view-purchase/${studentID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const purchasedEndPoint = async (studentID: string, data: {}) => {
  try {
    // const URL = "http://localhost:2244/api";
    return await axios
      .post(`${URL}/purchase/${studentID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const schoolPaymentEndPoint = async (studentID: string, data: {}) => {
  try {
    return await axios
      .post(`${URL}/pay-student-schoolfee/${studentID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const schoolFeePayment = async (data: {}) => {
  try {
    return await axios
      .post(`${URL}/make-schoolfee-payment/`, data)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const updateTermFee = async (
  schoolID: string,
  classID: string,
  data,
) => {
  try {
    return await axios
      .patch(`${URL}/update-term-fees/${schoolID}/${classID}`, data)
      .then((res: any) => {
        // return res;

        return res;
      })
      .catch((error) => {
        return error;
      });
  } catch (error) {
    return error;
  }
};

export const studentSchoolFeePayment = async (studentID: string) => {
  try {
    return await axios
      .get(`${URL}/view-student-schoolfee-detail/${studentID}`)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};
// Get and Record School Fee Payment Starts Here

// Get and Record School Fee Payment Starts Here
export const studentRemake = async (studentID: string) => {
  try {
    return await axios
      .get(`${URL}/view-remark/${studentID}`)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const likeArticle = async (articleID: string, readerID: string) => {
  try {
    return await axios
      .patch(`${URL}/like-article/${articleID}/${readerID}`)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const viewArticle = async (articleID: string, readerID: string) => {
  try {
    return await axios
      .patch(`${URL}/view-article/${articleID}/${readerID}`)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};
// Making other payment
export const makeOtherPayment = async (data: any) => {
  // const URL: string = "http://localhost:2244/api";
  try {
    return await axios
      .post(`${URL}/make-other-school-payment`, data)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const verifyOtherPayment = async (
  studentID: string,
  refID: string,
  paymentName: any,
) => {
  try {
    // const urli: string = "http://localhost:2244/api";
    // console.log(urli);
    return await axios
      .post(`${URL}/verify-other-payment/${studentID}/${refID}`, {
        paymentName,
      })
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const verifyOtherCashPayment = async (studentID: string, data: any) => {
  try {
    // const URL: string = "http://localhost:2244/api";
    return await axios
      .post(`${URL}/verify-other-cash-payment/${studentID}`, data)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const getStudentByEnrollmentID = async (studentID: string) => {
  try {
    return await axios
      .get(`${URL}/read-by-enrollment-id/${studentID}`)
      .then((res: any) => {
        return res.data.data;
      });
  } catch (error: any) {
    return error;
  }
};
