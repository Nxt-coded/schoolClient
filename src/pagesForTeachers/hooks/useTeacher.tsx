import useSWR, { Cache, mutate } from "swr";
import {
  classAssignment,
  classAttendance,
  lessonNote,
  readClassInfoStudent,
  readClassInfoSubject,
  readQuiz,
  readSubjectDetail,
  readSubjectQuiz,
  readTeacherCookie,
  readTeacherSchedule,
  viewClassAcademicHistory,
  viewComplains,
  viewExamination,
  viewPurchases,
  viewStudentGrade,
  viewTeacherDetail,
  viewTeacherLessonNote,
  getStudentSubjectPerformance,
  readExam,
  getExam,
  viewMidTest,
  getMidTestPerformance,
  getMidTestPerformanceResut,
  viewStudentMidGrade,
} from "../api/teachersAPI";
import {
  getSchoolAnncoement,
  getSchoolEvent,
} from "../../pages/api/schoolAPIs";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";

export const useTeacherCookie = () => {
  const x = `api/read-teacher-cookie/`;
  const hasCache = sessionStorage.getItem(x) !== "false";

  useEffect(() => {
    sessionStorage.setItem(x, "false");

    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  const user = useSelector((state: any) => state.user);
  const { data: dataID } = useSWR(
    `api/read-teacher-cookie/`,
    () => {
      return readTeacherCookie().then((res: any) => {
        return res.data;
      });
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      revalidateOnMount: true,
    }
  );

  const handleUpdate = async (newData: any) => {
    mutate(newData, false);
  };

  return { dataID: user?.id };
};

export const useTeacherDetail = (teacherID: string) => {
  const x = `api/view-teacher-detail/${teacherID}`;

  const hasCache = sessionStorage.getItem(x) !== "false";

  useEffect(() => {
    sessionStorage.setItem(x, "false");

    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const { data: teacherDetail, mutate } = useSWR(
    `api/view-teacher-detail/${teacherID}`,
    () => {
      return viewTeacherDetail(teacherID!).then((res: any) => {
        return res.data;
      });
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      revalidateOnMount: true,
    }
  );

  const handleUpdate = async (newData: any) => {
    mutate(newData, false);
  };

  return { teacherDetail, mutate: handleUpdate };
};

export const useTeacherInfo = () => {
  const { dataID } = useTeacherCookie();

  const x = `api/view-teacher-detail/${dataID}`;

  const hasCache = sessionStorage.getItem(x) !== "false";

  useEffect(() => {
    sessionStorage.setItem(x, "false");

    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const { data: teacherInfo } = useSWR(
    x,

    () => {
      return viewTeacherDetail(dataID!).then((res: any) => {
        return res.data;
      });
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      revalidateOnMount: true,
    }
  );

  const handleUpdate = async (newData: any) => {
    mutate(newData, false);
  };

  return { teacherInfo };
};

export const useClassSubject = (classID: string) => {
  const x = `api/view-teacher-detail/${classID}`;

  const hasCache = sessionStorage.getItem(x) !== "false";

  useEffect(() => {
    sessionStorage.setItem(x, "false");

    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const { data: subjectData, mutate } = useSWR(
    x,
    () => {
      return readClassInfoSubject(classID!).then((res: any) => {
        return res.data;
      });
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      revalidateOnMount: true,
    }
  );

  const handleUpdate = async (newData: any) => {
    mutate(newData, false);
  };

  return { subjectData, mutate: handleUpdate };
};

export const useClassTimeTable = (classID: string) => {
  const x = `api/view-teacher-detail-timetable/${classID}`;

  const hasCache = sessionStorage.getItem(x) !== "false";

  useEffect(() => {
    sessionStorage.setItem(x, "false");

    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const { data: timetableData, mutate } = useSWR(
    x,
    () => {
      return readClassInfoSubject(classID!).then((res: any) => {
        return res.data;
      });
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      revalidateOnMount: true,
    }
  );

  const handleUpdate = async (newData: any) => {
    mutate(newData, false);
  };

  return { timetableData, mutate: handleUpdate };
};

export const useTeacherSchedule = (teacherID: string) => {
  const x = `api/view-teacher-schedule/${teacherID}`;

  const hasCache = sessionStorage.getItem(x) !== "false";

  useEffect(() => {
    sessionStorage.setItem(x, "false");

    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const { data: teacherSchedule, mutate } = useSWR(
    x,
    () => {
      return readTeacherSchedule(teacherID!).then((res: any) => {
        return res.data;
      });
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      revalidateOnMount: true,
    }
  );

  const handleUpdate = async (newData: any) => {
    mutate(newData, false);
  };

  return { teacherSchedule };
};

export const useTeacherStudent = (classID: string) => {
  const x = `api/view-teacher-schedule/${classID}`;

  const hasCache = sessionStorage.getItem(x) !== "false";

  useEffect(() => {
    sessionStorage.setItem(x, "false");

    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const { data: teacherSchedule, mutate } = useSWR(
    x,
    () => {
      return readTeacherSchedule(classID!).then((res: any) => {
        return res.data;
      });
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      revalidateOnMount: true,
    }
  );

  const handleUpdate = async (newData: any) => {
    mutate(newData, false);
  };

  return { teacherSchedule, mutate: handleUpdate };
};

export const useClassStudent = (classID: string) => {
  const { data: classStudents, mutate } = useSWR(
    `api/view-all-class-students/${classID}`,
    () => {
      return readClassInfoStudent(classID!).then((res: any) => {
        return res.data;
      });
    }
  );

  return { classStudents, mutate };
};

export const useSujectInfo = (subjectID: string) => {
  const x = `api/view-subject-info/${subjectID}`;

  const hasCache = sessionStorage.getItem(x) !== "false";

  useEffect(() => {
    sessionStorage.setItem(x, "false");

    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const { data: subjectInfo, mutate } = useSWR(
    x,
    () => {
      return readSubjectDetail(subjectID!).then((res: any) => {
        return res.data;
      });
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      revalidateOnMount: true,
    }
  );

  const handleUpdate = async (newData: any) => {
    mutate(newData, false);
  };

  return { subjectInfo, mutate: handleUpdate };
};

export const useSujectQuiz = (subjectID: string) => {
  const x = `api/view-subject-quiz/${subjectID}`;

  const hasCache = sessionStorage.getItem(x) !== "false";

  useEffect(() => {
    sessionStorage.setItem(x, "false");

    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const { data: subjectQuiz, mutate } = useSWR(
    x,
    () => {
      return readSubjectQuiz(subjectID!).then((res: any) => {
        return res.data;
      });
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      revalidateOnMount: true,
    }
  );

  const handleUpdate = async (newData: any) => {
    mutate(newData, false);
  };

  return { subjectQuiz, mutate: handleUpdate };
};

export const useExam = (quizID: string) => {
  const x = `api/view-exam/${quizID}`;

  const hasCache = sessionStorage.getItem(x) !== "false";

  useEffect(() => {
    sessionStorage.setItem(x, "false");

    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const { data: examData, mutate } = useSWR(
    x,
    () => {
      return getExam(quizID!).then((res: any) => {
        return res.data;
      });
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      revalidateOnMount: true,
    }
  );

  const handleUpdate = async (newData: any) => {
    mutate(newData, false);
  };

  return { examData, mutate: handleUpdate };
};

export const useQuiz = (quizID: string) => {
  const x = `api/view-quiz/${quizID}`;

  const hasCache = sessionStorage.getItem(x) !== "false";

  useEffect(() => {
    sessionStorage.setItem(x, "false");

    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const { data: quizData, mutate } = useSWR(
    x,
    () => {
      return readQuiz(quizID!).then((res: any) => {
        return res.data;
      });
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      revalidateOnMount: true,
    }
  );

  const handleUpdate = async (newData: any) => {
    mutate(newData, false);
  };

  return { quizData, mutate: handleUpdate };
};

export const useAttendance = (classID: string) => {
  const x = `api/view-class-attendance/${classID}`;

  const hasCache = sessionStorage.getItem(x) !== "false";

  useEffect(() => {
    sessionStorage.setItem(x, "false");

    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const { data: attendance, mutate } = useSWR(
    x,
    () => {
      return classAttendance(classID!).then((res: any) => {
        return res.data;
      });
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      revalidateOnMount: true,
    }
  );

  const handleUpdate = async (newData: any) => {
    mutate(newData, false);
  };

  return { attendance, mutate: handleUpdate };
};

export const useSchoolAnnouncement = (schoolID: string) => {
  const x = `api/view-announcement/${schoolID}`;

  const hasCache = sessionStorage.getItem(x) !== "false";

  useEffect(() => {
    sessionStorage.setItem(x, "false");

    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const { data: schoolAnnouncement, mutate } = useSWR(
    x,
    () => {
      return getSchoolAnncoement(schoolID!).then((res) => {
        return res.data;
      });
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      revalidateOnMount: true,
    }
  );

  const handleUpdate = async (newData: any) => {
    mutate(newData, false);
  };

  return { schoolAnnouncement, mutate: handleUpdate };
};

export const useSchoolEvent = (schoolID: string) => {
  const x = `api/view-event/${schoolID}`;

  const hasCache = sessionStorage.getItem(x) !== "false";

  useEffect(() => {
    sessionStorage.setItem(x, "false");

    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const { data: schoolEvent, mutate } = useSWR(
    x,
    () => {
      return getSchoolEvent(schoolID!).then((res) => {
        return res.data;
      });
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      revalidateOnMount: true,
    }
  );

  const handleUpdate = async (newData: any) => {
    mutate(newData, false);
  };

  return { schoolEvent, mutate: handleUpdate };
};

export const useSubjectAssignment = (subjectID: string) => {
  const x = `api/view-subject-assignment/${subjectID}`;

  const hasCache = sessionStorage.getItem(x) !== "false";

  useEffect(() => {
    sessionStorage.setItem(x, "false");

    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const { data: subjectAssignment, mutate } = useSWR(
    x,
    () => {
      return classAssignment(subjectID!).then((res) => {
        return res.data;
      });
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      revalidateOnMount: true,
    }
  );

  const handleUpdate = async (newData: any) => {
    mutate(newData, false);
  };

  return { subjectAssignment, mutate: handleUpdate };
};

export const useLessonNote = (lessonID: string) => {
  const x = `api/view-lesson-note-detail/${lessonID}`;

  const hasCache = sessionStorage.getItem(x) !== "false";

  useEffect(() => {
    sessionStorage.setItem(x, "false");

    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const { data: lessonNoteData, mutate } = useSWR(
    x,
    () => {
      return lessonNote(lessonID!).then((res) => {
        return res?.data;
      });
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      revalidateOnMount: true,
    }
  );

  const handleUpdate = async (newData: any) => {
    mutate(newData, false);
  };

  mutate(`api/view-lesson-note-detail/${lessonID}`);
  return { lessonNoteData, mutate: handleUpdate };
};

export const useComplain = (teacherID: string) => {
  const x = `api/view-teacher-complain/${teacherID}`;

  const hasCache = sessionStorage.getItem(x) !== "false";

  useEffect(() => {
    sessionStorage.setItem(x, "false");

    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const { data: complainData, mutate } = useSWR(
    x,
    () => {
      return viewComplains(teacherID!).then((res) => {
        return res.data.complain;
      });
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      revalidateOnMount: true,
    }
  );

  const handleUpdate = async (newData: any) => {
    mutate(newData, false);
  };

  return { complainData, mutate: handleUpdate };
};

export const useSubjectPerformance = (subjectID: string) => {
  const x = `api/view-subject-quiz-performance/${subjectID}`;

  const hasCache = sessionStorage.getItem(x) !== "false";

  useEffect(() => {
    sessionStorage.setItem(x, "false");

    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const { data: perform, mutate } = useSWR(
    x,
    () => {
      return getStudentSubjectPerformance(subjectID!).then((res) => {
        return res;
      });
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      revalidateOnMount: true,
    }
  );

  const handleUpdate = async (newData: any) => {
    mutate(newData, false);
  };

  return { perform, mutate: handleUpdate };
};

export const useExamination = (subjectID: string) => {
  const x = `api/view-subject-exam/${subjectID}`;

  const hasCache = sessionStorage.getItem(x) !== "false";

  useEffect(() => {
    sessionStorage.setItem(x, "false");

    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const { data: examination, mutate } = useSWR(
    x,
    () => {
      return viewExamination(subjectID!).then((res) => {
        return res.exam;
      });
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      revalidateOnMount: true,
    }
  );

  const handleUpdate = async (newData: any) => {
    mutate(newData, false);
  };

  return { examination, mutate: handleUpdate };
};

export const useMidTest = (subjectID: string) => {
  const x = `api/view-subject-mid-test/${subjectID}`;

  const hasCache = sessionStorage.getItem(x) !== "false";

  useEffect(() => {
    sessionStorage.setItem(x, "false");

    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const { data: midTest, mutate: midTestMutate } = useSWR(
    x,
    () => {
      return viewMidTest(subjectID!).then((res) => {
        return res?.midTest;
      });
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      revalidateOnMount: true,
    }
  );

  const handleUpdate = async (newData: any) => {
    midTestMutate(newData, false);
  };

  return { midTest, midTestMutate: handleUpdate };
};

export const useStudentGrade = (studentID: string) => {
  const x = `api/student-report-card/${studentID}`;

  const hasCache = sessionStorage.getItem(x) !== "false";

  useEffect(() => {
    sessionStorage.setItem(x, "false");

    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const { data: gradeData, mutate } = useSWR(
    x,
    () => {
      return viewStudentGrade(studentID!).then((res) => {
        return res.data;
      });
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      revalidateOnMount: true, // Always fetch fresh grade data on mount
    }
  );

  const handleUpdate = async (newData: any) => {
    mutate(newData, false);
  };

  return { gradeData, mutate: handleUpdate };
};

export const useStudentMidGrade = (studentID: string) => {
  const x = `api/student-mid-report-card/${studentID}`;

  const hasCache = sessionStorage.getItem(x) !== "false";

  useEffect(() => {
    sessionStorage.setItem(x, "false");

    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const { data: gradeMidData, mutate } = useSWR(
    x,
    () => {
      return viewStudentMidGrade(studentID!).then((res) => {
        return res.data;
      });
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      revalidateOnMount: true,
    }
  );

  const handleUpdate = async (newData: any) => {
    mutate(newData, false);
  };

  return { gradeMidData, mutate: handleUpdate };
};

export const useMidTestResultPerformance = (quizID: string) => {
  const x = `api/view-mid-test-performance/${quizID}`;

  const hasCache = sessionStorage.getItem(x) !== "false";

  useEffect(() => {
    sessionStorage.setItem(x, "false");

    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const { data: midTestPerformance, mutate } = useSWR(
    x,
    () => {
      return getMidTestPerformance(quizID!).then((res) => {
        return res.data;
      });
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      revalidateOnMount: true,
    }
  );

  const handleUpdate = async (newData: any) => {
    mutate(newData, false);
  };

  return { midTestPerformance, mutate: handleUpdate };
};

export const useMidTestResultPerformanceData = (
  subjectID: string,
  quizID: string
) => {
  const x = `api/view-mid-test-performance/${subjectID}/${quizID}`;

  const hasCache = sessionStorage.getItem(x) !== "false";

  useEffect(() => {
    sessionStorage.setItem(x, "false");

    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const { data: midTestPerformanceResult, mutate } = useSWR(
    x,
    () => {
      return getMidTestPerformanceResut(subjectID, quizID!).then((res) => {
        return res.data;
      });
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      revalidateOnMount: true,
    }
  );

  const handleUpdate = async (newData: any) => {
    mutate(newData, false);
  };

  return { midTestPerformanceResult, mutate: handleUpdate };
};

export const useClassAcademicHistory = (classID: string) => {
  const x = `api/view-class-result-history/${classID}`;

  const hasCache = sessionStorage.getItem(x) !== "false";

  useEffect(() => {
    sessionStorage.setItem(x, "false");

    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const { data: classAcademicHistory, mutate } = useSWR(
    x,
    () => {
      return viewClassAcademicHistory(classID!).then((res) => {
        return res.data;
      });
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      revalidateOnMount: true,
    }
  );

  const handleUpdate = async (newData: any) => {
    mutate(newData, false);
  };

  return { classAcademicHistory, mutate: handleUpdate };
};

export const usePurchasedData = (staffID: string) => {
  const x = `api/view-teacher-purchase/${staffID}`;

  const hasCache = sessionStorage.getItem(x) !== "false";

  useEffect(() => {
    sessionStorage.setItem(x, "false");

    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const { data: purchasedData, mutate } = useSWR(
    x,
    () => {
      return viewPurchases(staffID!).then((res) => {
        return res.data;
      });
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      revalidateOnMount: true,
    }
  );

  const handleUpdate = async (newData: any) => {
    mutate(newData, false);
  };

  return { purchasedData, mutate: handleUpdate };
};

export const useTeacherNote = (staffID: string) => {
  const x = `api/view-teacher-lesson-note/${staffID}`;

  const hasCache = sessionStorage.getItem(x) !== "false";

  useEffect(() => {
    sessionStorage.setItem(x, "false");

    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const { data: teacherNote } = useSWR(
    x,
    () => {
      return viewTeacherLessonNote(staffID!).then((res) => {
        return res.data;
      });
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      revalidateOnMount: true,
    }
  );

  return { teacherNote };
};
