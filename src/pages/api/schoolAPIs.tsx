import axios, { AxiosResponse } from "axios";
import { enqueue, QueueEntry } from "@/lib/offlineQueue";

// working locally

// const URL2: string = import.meta.env.VITE_URL;
// export const URL: string = import.meta.env.VITE_MAIN_URL;

// const URL2: string = "http://localhost:2244";
// export const URL: string = "http://localhost:2244/api";

// ?working

export const URL: string = "https://startschoolnextbe.onrender.com/api";
const URL2: string = "https://startschoolnextbe.onrender.com";

// ?New Try
// export const URL: string = "https://start-school-be.vercel.app/api";
// const URL2: string = "https://start-school-be.vercel.app";

export const updateSchoolResumptionTeamInfo = async (
  schoolID: string,
  data: {
    NumberOfDays: string;
    SchoolTeamResumption: string;
    SchoolTeamCloses: string;
  },
): Promise<any> => {
  try {
    // const URL = "http://localhost:2244/api";
    return await axios
      .patch(`${URL}/change-school-team-info/${schoolID}`, data)
      .then((res: AxiosResponse) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const removeAllPerformance = async (
  performanceID: string,
): Promise<any> => {
  try {
    // const URL = "http://localhost:2244/api";
    return await axios
      .delete(`${URL}/delete-all-performances/${performanceID}`)
      .then((res: AxiosResponse) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const removeSelectedPerformance = async (
  quizID: string,
  studentIDs: string[],
): Promise<any> => {
  try {
    // const URL = "http://localhost:2244/api";
    return await axios
      .delete(`${URL}/delete-selected-students/${quizID}`, {
        data: { studentIDs },
      })
      .then((res: AxiosResponse) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const removePerformance = async (
  performanceID: string,
): Promise<any> => {
  try {
    return await axios
      .delete(`${URL}/delete-performance/${performanceID}`)
      .then((res: AxiosResponse) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const removeOptions = async (
  schoolID: string,
  refID: string,
): Promise<any> => {
  try {
    return await axios
      .patch(`${URL}/remove-payment-option/${schoolID}/${refID}`)
      .then((res: AxiosResponse) => {
        console.log("data: ", res);
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const createStudentHistory = async (
  schoolID: string,
  studentID: string,
  data: any,
): Promise<any> => {
  try {
    return await axios
      .post(`${URL}/create-result-history/${schoolID}/${studentID}`, data)
      .then((res: AxiosResponse) => {
        console.log("data: ", res);
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewStudentHistory = async (studentID: string): Promise<any> => {
  try {
    // const URL = "http://localhost:2244/api";
    return await axios
      .get(`${URL}/view-student-result-history/${studentID}`)
      .then((res: AxiosResponse) => {
        return res?.data?.data?.historicalResult;
      });
  } catch (error) {
    return error;
  }
};

export const deleteStudentHistory = async (
  studentID: string,
  resultID: string,
): Promise<any> => {
  try {
    return await axios
      .delete(`${URL}/delete-student-result-history/${studentID}/${resultID}`)
      .then((res: AxiosResponse) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const deleteSchool = async (schoolID: string): Promise<any> => {
  try {
    return await axios
      .delete(`${URL}/delete-school/${schoolID}`)
      .then((res: AxiosResponse) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const downlaodSchoolData = async (schoolID: string): Promise<any> => {
  try {
    // const URL = "http://localhost:2244/api";
    return await axios
      .get(`${URL}/export-data-file/${schoolID}`)
      .then((res: AxiosResponse) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const analyticPayment = async (termID: string) => {
  try {
    return await axios
      .get(`${URL}/view-school-term/${termID}`)
      .then((res: any) => {
        console.log("analyticPayment: ", res);
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const updateSchoolPaymentOptions = async (
  schoolID: string,
  data: any,
) => {
  try {
    return await axios
      .patch(`${URL}/add-more-payment-option/${schoolID}`, data)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const updateSchoolAdminCode = async (schoolID: string, data: any) => {
  try {
    return await axios
      .patch(`${URL}/update-school-admin-code/${schoolID}`, { adminCode: data })
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const timeTableSetups = async (schoolID: string, data: any) => {
  try {
    return await axios
      .patch(`${URL}/create-school-time-table/${schoolID}`, data)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const bulkUploadofStudent = async (schoolID: string, data: any) => {
  try {
    const config: any = {
      "Content-Type": "multipart/form-data",
    };
    return await axios
      .post(`${URL}/create-bulk-student/${schoolID}`, data, config)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const bulkUploadofSubject = async (schoolID: string, data: any) => {
  try {
    // const URL = "http://localhost:2244/api"

    const config: any = {
      "Content-Type": "multipart/form-data",
    };
    const res = await axios.post(
      `${URL}/create-bulk-subject/${schoolID}`,
      data,
      config,
    );
    return res;
  } catch (error: any) {
    console.error("bulkUploadofSubject error:", error);
    throw error;
  }
};

export const bulkUploadofSubjectWithQueue = async (
  schoolID: string,
  formData: FormData,
) => {
  if (typeof window !== "undefined" && !navigator.onLine) {
    const fdEntries: Array<any> = [];
    formData.forEach((value, key) => {
      if (value instanceof File) {
        fdEntries.push({
          key,
          value,
          isFile: true,
          name: (value as File).name,
          type: (value as File).type,
        });
      } else {
        fdEntries.push({ key, value, isFile: false });
      }
    });

    // const URL = "http://localhost:2244/api"

    const entry: QueueEntry = {
      url: `${URL}/create-bulk-subject/${schoolID}`,
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      bodyType: "formdata",
      body: fdEntries,
    };

    const id = await enqueue(entry);
    return { queued: true, id };
  }

  return await bulkUploadofSubject(schoolID, formData);
};

export const bulkUploadofClassroom = async (schoolID: string, data: any) => {
  try {
    const config: any = {
      "Content-Type": "multipart/form-data",
    };
    return await axios
      .post(`${URL}/create-bulk-classroom/${schoolID}`, data, config)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

// offline-aware wrapper: if offline, enqueue the request to be retried when online

export const bulkUploadofClassroomWithQueue = async (
  schoolID: string,
  formData: FormData,
) => {
  if (typeof window !== "undefined" && !navigator.onLine) {
    // convert FormData to serializable object: store entries as array of [key, {type, value}]
    const fdEntries: Array<any> = [];
    formData.forEach((value, key) => {
      if (value instanceof File) {
        // read file as blob (we can store file as blob since idb supports it)
        fdEntries.push({
          key,
          value,
          isFile: true,
          name: (value as File).name,
          type: (value as File).type,
        });
      } else {
        fdEntries.push({ key, value, isFile: false });
      }
    });

    const entry: QueueEntry = {
      url: `${URL}/create-bulk-classroom/${schoolID}`,
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      bodyType: "formdata",
      body: fdEntries,
    };

    const id = await enqueue(entry);
    return { queued: true, id };
  }

  // if online, fallback to normal request
  return await bulkUploadofClassroom(schoolID, formData);
};

export const bulkUploadofTeachers = async (schoolID: string, data: any) => {
  try {
    const config: any = {
      "Content-Type": "multipart/form-data",
    };
    return await axios
      .post(`${URL}/create-school-teacher-bulk/${schoolID}`, data, config)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const bulkUploadSchemeOfWork = async (data: any) => {
  try {
    const config: any = {
      "Content-Type": "multipart/form-data",
    };
    return await axios
      .post(`${URL}/upload-schemes`, data, config)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const fetchSchemeOfWork = async (
  selectedClass,
  selectedSubject,
  selectTerm,
) => {
  try {
    const response = await axios.get(
      `${URL}/schemes/${selectedClass}/${selectedSubject}/${selectTerm}`,
    );

    return response.data;
  } catch (error) {
    return null;
  }
};

export const allSchools = async () => {
  try {
    return await axios.get(`${URL}/view-all-school`).then((res: any) => {
      return res;
    });
  } catch (error: any) {
    return error;
  }
};

export const googleAuth = async () => {
  try {
    return await axios.get(`${URL}/api/auth/google`).then((res: any) => {
      return res;
    });
  } catch (error: any) {
    return error;
  }
};

export const googleData = async () => {
  try {
    return await axios
      .get(`${URL}/auth/google-data`, { withCredentials: true })
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

// Expenditures Api
export const setTermBudet = async (schoolID: string, budget: number) => {
  try {
    return await axios
      .patch(`${URL}/set-budget/${schoolID}`, { budget })
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const viewTermlyBudget = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/read-term-budget/${schoolID}`)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const viewTermlyExpense = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/read-expense/${schoolID}`)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const createExpense = async (schoolID: string, data: {}) => {
  try {
    return await axios
      .post(`${URL}/create-expense/${schoolID}`, data)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

// School Fees Installmental Api starts here
export const recordFeesPayment = async (
  schoolID: string,
  studentID: string,
  feePaid: number,
  feePaidDate: string,
  paidByWho: string,
  paymentMode: string,
) => {
  try {
    return await axios
      .post(`${URL}/record-payment/${schoolID}/${studentID}`, {
        feePaid,
        feePaidDate,
        paidByWho,
        paymentMode,
      })
      .then((res: any) => {
        return res.data;
      });
  } catch (error: any) {
    console.error();
    return error;
  }
};

export const updateSchoolStamp = async (schoolID: string, data: any) => {
  try {
    return await axios
      .patch(`${URL}/upload-school-stamp/${schoolID}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const updateSchoolSignature = async (schoolID: string, data: any) => {
  try {
    return await axios
      .patch(`${URL}/upload-school-signature/${schoolID}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const updateClassName = async (
  schoolID: string,
  classID: string,
  data: string,
) => {
  try {
    return await axios
      .patch(`${URL}/update-classname/${schoolID}/${classID}`, {
        className: data,
      })
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const updateRecordFee = async (recordID: string) => {
  try {
    return await axios
      .patch(`${URL}/second-payment/${recordID}`)
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const getRecords = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/getall-fee-records/${schoolID}`)
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const getOneRecord = async (studentID: string) => {
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

export const deleteRecord = async (
  schoolID: string,
  studentID: string,
  recordID: string,
) => {
  try {
    return await axios
      .delete(`${URL}/delete-fee-record/${schoolID}/${studentID}/${recordID}`)
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

// School Fees Records Expenditures api ends here

export const getSchool = async () => {
  try {
    return await axios.get(`${URL}/get-school`).then((res: any) => {
      return res;
    });
  } catch (error: any) {
    return error;
  }
};

export const updateRegisterationStatus = async (data: {}) => {
  try {
    return await axios
      .post(`${URL}/school-request-registration`, data)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const approveRegisterationStatus = async (email: string) => {
  try {
    return await axios
      .patch(`${URL}/approved-school-registration`, { email })
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const approveRegisterationStatusUpdate = async (id: string) => {
  try {
    return await axios
      .patch(`${URL}/approved-school-registration/${id}`)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const deleteStudent = async (schoolID: string, studentID: string) => {
  try {
    return await axios
      .delete(`${URL}/delete-student/${schoolID}/${studentID}`)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const outGoneStudent = async (schoolID: string, studentID: string) => {
  try {
    // const URL = "localhost:2244/api";
    return await axios
      .post(`${URL}/create-out-gone-student/${schoolID}/${studentID}`, null)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const viewOutGoneStudent = async (schoolID: string) => {
  try {
    // const URL = "localhost:2244/api";
    return await axios
      .get(`${URL}/view-out-gone-student/${schoolID}`, null)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const updateStudentBulkInfo = async (studentID: string, data: any) => {
  try {
    return await axios
      .patch(`${URL}/update-main-student-bulk-info/${studentID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const deleteAllStudent = async (schoolID: string) => {
  try {
    return await axios
      .delete(`${URL}/delete-all-students/${schoolID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const deleteStaff = async (schoolID: string, staffID: string) => {
  try {
    return await axios
      .delete(`${URL}/delete-staff/${schoolID}/${staffID}`)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const updateStudentRestrictMode = async (
  schoolID: string,
  studentID: string,
  toggle: boolean,
) => {
  try {
    // const URL = "http://localhost:2244/api";
    return await axios
      .patch(`${URL}/restrict-view/${schoolID}/${studentID}`, { toggle })
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const deleteTimeTableSubject = async (
  schoolID: string,
  tableID: string,
) => {
  try {
    return await axios
      .delete(`${URL}/delete-time-table/${schoolID}/${tableID}`)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const updateTimeTableSubject = async (
  schoolID: string,
  classID: string,
  tableID: string,
  data: any,
) => {
  try {
    return await axios
      .patch(`${URL}/update-time-table/${schoolID}/${classID}/${tableID}`, {
        subject: data,
      })
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const makePayment = async (schoolID: string, email: string) => {
  try {
    return await axios
      .post(`${URL}/make-payment/${schoolID}`, { email })
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const createReceipt = async (schoolID: string, data: {}) => {
  try {
    return await axios
      .post(`${URL}/payment-receipt/${schoolID}`, data)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const verifyPay = async (ref: string) => {
  try {
    return await axios.get(`${URL}/verify-payment/${ref}`).then((res: any) => {
      return res?.data?.data;
    });
  } catch (error: any) {
    return error;
  }
};

export const viewTermDetail = async (termID: string) => {
  try {
    return await axios
      .get(`${URL}/view-school-term-detail/${termID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error: any) {
    return error;
  }
};

export const updatePayInfo = async (termID: string, data: {}) => {
  try {
    return await axios
      .patch(`${URL}/school-term-payment-updated/${termID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error: any) {
    return error;
  }
};

export const getStarted = async () => {
  try {
    return await axios.get(`${URL2}`).then((res: any) => {
      return res?.data;
    });
  } catch (error: any) {
    return error;
  }
};

export const getSchoolCookie = async () => {
  try {
    return await axios
      .get(
        `${URL}/read-school-cookie`,
        // { withCredentials: true }
      )
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const getSchoolLandingPage = async (schoolName: string) => {
  try {
    return await axios.get(`${URL2}/${schoolName}`).then((res: any) => {
      return res?.data;
    });
  } catch (error: any) {
    return error;
  }
};

export const openServerAPI = async () => {
  try {
    return await axios.get(`${URL2}`).then((res: any) => {
      return res?.message;
    });
  } catch (error) {
    return error;
  }
};

export const registerSchool = async (data: any) => {
  try {
    return await axios
      .post(`${URL}/register-school`, { email: data })
      .then((res: any) => {
        return res?.data;
      });
  } catch (error: any) {
    return error;
  }
};

export const loginSchool = async (data: {}) => {
  try {
    return await axios
      .post(
        `${URL}/login-school`,
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

export const verifySchool = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/verify-school/${schoolID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const readSchool = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/view-school/${schoolID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const logout = async () => {
  try {
    return await axios
      .delete(
        `${URL}/logout-school`,
        // { withCredentials: true }
      )
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const changeSchoolTags = async (schoolID: string, data: any) => {
  try {
    return await axios
      .patch(`${URL}/change-school-tag/${schoolID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const changeSchoolName = async (schoolID: string, data: any) => {
  try {
    return await axios
      .patch(`${URL}/change-school-name/${schoolID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const changeSchoolLocation = async (schoolID: string, data: any) => {
  try {
    return await axios
      .patch(`${URL}/change-school-location/${schoolID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const changeSchoolStarted = async (schoolID: string) => {
  try {
    return await axios
      .patch(`${URL}/change-school-started/${schoolID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewSchoolByName = async (schoolName: string) => {
  try {
    return await axios
      .get(`${URL}/get-school-by-name/${schoolName}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const createSchoolTeacher = async (schoolID: string, data: {}) => {
  try {
    return await axios
      .post(`${URL}/create-school-teacher/${schoolID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewSchoolTeacher = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/view-school-teacher/${schoolID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

// subject API

export const createSchoolSubject = async (schoolID: string, data: any) => {
  try {
    // const URL = "http://localhost:2244/api";
    return await axios
      .post(`${URL}/create-subject/${schoolID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const createSchoolClassroom = async (schoolID: string, data: any) => {
  try {
    // const URL = "http://localhost:2244/api";
    return await axios
      .post(`${URL}/create-classroom/${schoolID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const getSchoolClassroom = async (schoolID: string) => {
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

export const updateClassroomTeacher = async (
  schoolID: string,
  classID: string,
  data: {},
) => {
  try {
    return await axios
      .patch(`${URL}/update-classrooms-teacher/${schoolID}/${classID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const getClassroom = async (classID: string) => {
  try {
    return await axios
      .get(`${URL}/view-classroom-info/${classID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const getSchoolAnncoement = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/view-announcement/${schoolID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const getSchoolClassromm = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/view-announcement/${schoolID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const getSchoolEvent = async (schoolID: string) => {
  try {
    return await axios.get(`${URL}/view-event/${schoolID}`).then((res: any) => {
      return res?.data;
    });
  } catch (error) {
    return error;
  }
};

export const createSchoolEvent = async (schoolID: string, data: {}) => {
  try {
    return await axios
      .post(`${URL}/create-event/${schoolID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const createSchoolAnnouncement = async (schoolID: string, data: {}) => {
  try {
    return await axios
      .post(`${URL}/create-announcement/${schoolID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const createSchoolStudent = async (schoolID: string, data: {}) => {
  try {
    return await axios
      .post(`${URL}/create-student/${schoolID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewSchoolSubjects = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/view-subjects/${schoolID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const getClassSubjects = async (classID: string) => {
  try {
    return await axios
      .get(`${URL}/view-classroom-info/${classID}/`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const getClassTimeTable = async (classID: string) => {
  try {
    return await axios
      .get(`${URL}/view-time-table/${classID}/`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const getSchoolStudents = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/read-student/${schoolID}/`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const getSchoolStudentDetail = async (studentID: string) => {
  try {
    return await axios
      .get(`${URL}/read-student-info/${studentID}/`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const createTimeTable = async (
  schoolID: string,
  classID: string,
  data: {},
) => {
  try {
    return await axios
      .post(`${URL}/create-time-table/${schoolID}/${classID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const updateSchoolSubjectTeacher = async (
  schoolID: string,
  subjectID: string,
  teacherID: string,
) => {
  try {
    return await axios
      .patch(`${URL}/update-subject-teacher/${schoolID}/${subjectID}`, {
        subjectTeacherID: teacherID,
      })
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const topSchoolStudent = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/view-school-top-student/${schoolID}`)
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

export const studentAttendance = async (studentID: string) => {
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

export const readNoted = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/admin-view-lesson-note/${schoolID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const approveNoted = async (schoolID: string, lessonID: string) => {
  try {
    return await axios
      .patch(`${URL}/approve-lesson-note/${schoolID}/${lessonID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const createStore = async (schoolID: string, data: {}) => {
  try {
    const config: any = {
      "content-type": "multipart/form-data",
    };
    return await axios
      .post(`${URL}/create-store/${schoolID}/`, data, config)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewStore = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/view-store/${schoolID}/`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const deleteArticle = async (
  schoolID: string,
  studentID: string,
  articleID: string,
) => {
  try {
    return await axios
      .delete(
        `${URL}/delete-school-article/${schoolID}/${studentID}/${articleID}`,
      )
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const createGallaryRestrict = async (schoolID: string, data: {}) => {
  try {
    const config: any = {
      "content-type": "multipart/form-data",
    };
    return await axios
      .post(`${URL}/create-restrict-gallary/${schoolID}/`, data, config)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const createGallary = async (schoolID: string, data: {}) => {
  try {
    const config: any = {
      "content-type": "multipart/form-data",
    };
    return await axios
      .post(`${URL}/create-gallary/${schoolID}/`, data, config)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewGallary = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/view-gallary/${schoolID}/`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};
export const deleteGallary = async (schoolID: string, gallaryID: string) => {
  try {
    return await axios
      .delete(`${URL}/delete-gallary/${schoolID}/${gallaryID}`)
      .then((res: any) => {
        console.log("del: ", res);
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewSchoolSession = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/view-school-session/${schoolID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewSchoolSessionTerm = async (sessionID: any) => {
  try {
    return await axios
      .get(`${URL}/view-present-school-session/${sessionID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const verifyPayment1st = async (schoolID: string, studentID: string) => {
  try {
    return await axios
      .patch(`${URL}/update-student-fees-1st/${schoolID}/${studentID}`)
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

export const verifyPayment2nd = async (schoolID: string, studentID: string) => {
  try {
    return await axios
      .patch(`${URL}/update-student-fees-2nd/${schoolID}/${studentID}`)
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

export const verifyPayment3rd = async (schoolID: string, studentID: string) => {
  try {
    return await axios
      .patch(`${URL}/update-student-fees-3rd/${schoolID}/${studentID}`)
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

export const migrateStudent = async (schoolID: string, data: {}) => {
  try {
    // const URL = "http://localhost:2244/api";
    return await axios
      .patch(`${URL}/migrate-sss1holders/${schoolID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error: any) {
    return error;
  }
};

export const deleteClassroom = async (schoolID: string, classID: string) => {
  try {
    // const URL = "http://localhost:2244/api";
    return await axios
      .delete(`${URL}/delete-classrooms/${schoolID}/${classID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error: any) {
    return error;
  }
};

export const createNewSession = async (schoolID: string, data: {}) => {
  try {
    // const URL = "http://localhost:2244/api";
    return await axios
      .post(`${URL}/create-new-school-session/${schoolID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error: any) {
    return error;
  }
};

export const viewComplains = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/view-school-complain/${schoolID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const markSeenComplains = async (
  schoolID: string,
  complainID: string,
) => {
  try {
    return await axios
      .patch(`${URL}/mark-seen/${schoolID}/${complainID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const markResolveComplains = async (
  schoolID: string,
  complainID: string,
) => {
  try {
    return await axios
      .patch(`${URL}/mark-resolve/${schoolID}/${complainID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const updateAvatar = async (schoolID: string, data: any) => {
  try {
    const config: any = {
      "Content-Type": "multipart/form-data",
    };
    return await axios
      .patch(`${URL}/upload-school-avatar/${schoolID}`, data, config)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const createNewSessionTerm = async (sessionID: string, data: {}) => {
  try {
    return await axios
      .post(`${URL}/create-school-term/${sessionID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error: any) {
    return error;
  }
};

export const viewPresentSession = async (sessionID: string) => {
  try {
    return await axios
      .get(`${URL}/view-present-school-session/${sessionID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error: any) {
    return error;
  }
};

export const viewPresentSessionTerm = async (termID: string) => {
  try {
    return await axios
      .get(`${URL}/view-school-session/${termID}`)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const createSessionTermHistory = async (termID: string) => {
  try {
    return await axios
      .get(`${URL}/view-school-session/${termID}`)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const viewSessionTermHistory = async (termID: string) => {
  try {
    return await axios
      .get(`${URL}/view-school-term/${termID}`)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const updateAccount = async (data: {}) => {
  try {
    return await axios
      .post(`${URL}/update-payment-info`, data)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const updateSchoolFeeAccountInfo = async (data: {}) => {
  try {
    return await axios
      .post(`${URL}/update-schoolfee-payment-info`, data)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const updateAccountInfo = async (schoolID: string, bankDetails: {}) => {
  try {
    return await axios
      .patch(`${URL}/update-account-info/${schoolID}`, bankDetails)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const storePayment = async (data: {}) => {
  try {
    return await axios
      .post(`${URL}/make-store-payment/`, data)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const verifyPayment = async (refID: string) => {
  try {
    return await axios
      .get(`${URL}/verify-payment/${refID}`)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const purchasedStoreInfo = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/view-school-purchase/${schoolID}`)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const updatePurchasedStore = async (purchaseID: string) => {
  try {
    return await axios
      .post(`${URL}/update-school-purchase/${purchaseID}`, { delievered: true })
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const readSchoolFee = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/view-school-schoolfee-detail/${schoolID}`)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const updateSchoolFee = async (schoolFeeID: string) => {
  try {
    // const URL = "http://localhost:2244/api";
    return await axios
      .post(`${URL}/update-school-school-fee/${schoolFeeID}`, {
        confirm: true,
      })
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const adminReport = async (
  schoolID: string,
  studentID: string,
  adminComment: string,
) => {
  try {
    // const URL = "http://localhost:2244/api";
    return await axios
      .patch(`${URL}/admin-report-card/${schoolID}/${studentID}`, {
        adminComment,
      })
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const adminMidReport = async (
  schoolID: string,
  studentID: string,
  adminComment: string,
) => {
  try {
    return await axios
      .patch(`${URL}/admin-mid-report-card/${schoolID}/${studentID}`, {
        adminComment,
      })
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const approveMainReport = async (classID: string, data: string) => {
  try {
    return await axios
      .post(`${URL}/create-history-session/${classID}/`, {
        text: data,
      })
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const deletSubject = async (schoolID: string, subjectID: string) => {
  try {
    return await axios
      .delete(`${URL}/delete-subject/${schoolID}/${subjectID}/`)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const removeTeacherSubject = async (
  schoolID: string,
  teacherID: string,
  subjectID: string,
) => {
  try {
    // const URL = "http://localhost:2244/api";
    return await axios
      .patch(
        `${URL}/remove-teacher-subject/${schoolID}/${teacherID}/${subjectID}/`,
      )
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const changeStudentClass = async (studentID: string, data: any) => {
  try {
    return await axios
      .patch(`${URL}/change-student-class/${studentID}`, data)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const changeSchoolPhone = async (schoolID: string, data: any) => {
  try {
    return await axios
      .patch(`${URL}/change-school-phone/${schoolID}`, { phone: data })
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const changeSchoolPersonalName = async (schoolID: string, data: any) => {
  try {
    return await axios
      .patch(`${URL}/change-school-personal-name/${schoolID}`, data)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const createDailyExpense = async (schoolID: string, data: any) => {
  try {
    return await axios
      .post(`${URL}/create-term-daily-expense/${schoolID}`, data)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const readDailyExpense = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/read-term-daily-expense/${schoolID}`)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};
export const updateSchoolSMS = async (schoolID: string, sendSMS: boolean) => {
  try {
    return await axios
      .patch(`${URL}/update-school-sms/${schoolID}`, { sendSMS })
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const makeSMSPayment = async (schoolID: string, data: any) => {
  try {
    return await axios
      .post(`${URL}/make-sms-payment/${schoolID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error: any) {
    return error;
  }
};

export const verifySMSPayment = async (schoolID: string, ref: string) => {
  try {
    return await axios
      .get(`${URL}/verify-sms-payment/${schoolID}/${ref}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error: any) {
    return error;
  }
};
export const testSchoolSMS = async (
  phone: string,
  channel: string = "generic",
  customMsg?: string,
) => {
  try {
    // const URL = "http://localhost:2244/api";
    let endpoint = `${URL}/test-sms/${phone}?action=send&channel=${channel}`;
    if (customMsg) {
      endpoint += `&customMsg=${encodeURIComponent(customMsg)}`;
    }
    return await axios.get(endpoint).then((res: any) => {
      return res;
    });
  } catch (error: any) {
    return error;
  }
};

export const updateClassTeacherGradingToggle = async (
  schoolID: string,
  allowClassTeacherGrading: boolean,
) => {
  try {
    // const URL = "http://localhost:2244/api"
    return await axios
      .patch(`${URL}/update-class-teacher-grading/${schoolID}`, {
        allowClassTeacherGrading,
      })
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const changeSchoolEnrollmentID = async (
  schoolID: string,
  data: { currentEnrollmentID: string; newEnrollmentID: string },
) => {
  try {
    return await axios
      .patch(`${URL}/change-enrollment-id/${schoolID}`, data)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
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
  } catch (error: any) {
    return error;
  }
};
