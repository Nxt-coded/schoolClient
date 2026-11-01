import useSWR, { mutate } from "swr";
import {
  allSchools,
  classAttendance,
  getClassSubjects,
  getClassTimeTable,
  getClassroom,
  getRecords,
  getSchoolAnncoement,
  getSchoolClassroom,
  getSchoolCookie,
  getSchoolEvent,
  getSchoolStudentDetail,
  getSchoolStudents,
  purchasedStoreInfo,
  readDailyExpense,
  readNoted,
  readSchool,
  readSchoolFee,
  registerSchool,
  studentAttendance,
  topSchoolStudent,
  updateClassroomTeacher,
  // verifyPayment1st,
  viewComplains,
  viewGallary,
  viewPresentSession,
  viewSchoolByName,
  viewSchoolSession,
  // viewSchoolSessionTerm,
  viewSchoolSubjects,
  viewSchoolTeacher,
  viewSessionTermHistory,
  viewStore,
  viewTermDetail,
  analyticPayment,
  viewStudentHistory,
  viewOutGoneStudent,
} from "../api/schoolAPIs";
import {
  viewSchoolClassroom,
  viewTeacherDetail,
} from "../../pagesForTeachers/api/teachersAPI";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export const useSchoolRegister = (reader: any) => {
  const { mutate } = useSWR("api/register-school", () => {
    registerSchool(reader);
  });

  return { mutate };
};

export const useSchoolTermDetails = (termID: string) => {
  const x = `api/view-school-term/${termID}`;

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

  const { data } = useSWR(
    x,
    () => {
      return analyticPayment(termID!).then((res) => {
        console.log("res data term detail: ", res.data);
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

  return { data };
};

export const useSchool = (schoolID: string) => {
  const x = `api/view-school/${schoolID}/main-data`;

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

  const { data, mutate } = useSWR(
    x,
    () => {
      return readSchool(schoolID!).then((res) => {
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

  return { data, mutate: handleUpdate };
};

// check this out
export const useSchoolCookie = () => {
  const user = useSelector((state: any) => state.user);

  const x = `api/read-school-cookie/`;

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

  const { data: dataID, mutate } = useSWR(
    `api/read-school-cookie/`,
    () => {
      return getSchoolCookie().then((res) => {
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

  return { dataID: user?.id, mutate: handleUpdate };
};

export const useSchoolData = () => {
  // const hasCache = (key: string): boolean => {
  //   const cache = JSON.parse(localStorage.getItem("app-cache") || "[]");
  //   return cache.some((entry: [string, any]) => entry[0] === key);
  // };

  const { dataID } = useSchoolCookie();
  const user = useSelector((state: any) => state.user);
  const x = `api/view-school/${user?.id}/seconded-data`;

  const hasCache =
    sessionStorage.getItem(`api/view-school/${user?.id}/seconded-data`) !==
    "false";

  useEffect(() => {
    sessionStorage.setItem(
      `api/view-school/${user?.id}/seconded-data`,
      "false"
    );

    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  const { data, isLoading } = useSWR(
    user?.id ? x : null,
    () => {
      return readSchool(user?.id!).then((res) => {
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

  return { data, isLoading };
};

export const useSchoolDataByName = (schoolName: string) => {
  const x = `api/view-school/${schoolName}/reading-from-school-name`;

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
  const { data: schoolInfo } = useSWR(
    x,
    () => {
      return viewSchoolByName(schoolName!).then((res) => {
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

  return { schoolInfo };
};

export const useSchoolClassRM = () => {
  const x = `api/view-classrooms/`;

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

  const { dataID } = useSchoolCookie();
  const { data: schoolClassroom, mutate } = useSWR(
    `api/view-classrooms/`,
    () => {
      return getSchoolClassroom(dataID!).then((res) => {
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

  return { schoolClassroom, mutate: handleUpdate };
};

export const useViewSchoolClassRM = (schoolID: string) => {
  const x = `api/view-classrooms/`;

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
  const { data: viewClasses } = useSWR(
    `api/view-classrooms/`,
    async () => {
      return await viewSchoolClassroom(schoolID!).then((res) => {
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

  return { viewClasses };
};

export const useSchoolClassRMTeacherUpdate = (classID: string, data: {}) => {
  const { dataID } = useSchoolCookie();
  const user = useSelector((state: any) => state.user);

  const x = `api/update-classrooms-teacher/${user?.id}/${classID}`;

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

  const { data: schoolClassroom, mutate } = useSWR(
    `api/update-classrooms-teacher/${user?.id}/${classID}`,
    () => {
      return updateClassroomTeacher(dataID!, classID, data).then((res) => {
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

  return { schoolClassroom, mutate: handleUpdate };
};

export const useSchoolClassRMDetail = (classID: string) => {
  const x = `api/view-classrooms/${classID}`;

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

  const { data: classroom, mutate } = useSWR(
    `api/view-classrooms/${classID}`,
    () => {
      return getClassroom(classID!).then((res) => {
        return res.data;
      });
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 3000,
      revalidateOnMount: true,
    }
  );

  const handleUpdate = async (newData: any) => {
    mutate(newData, false);
  };

  return { classroom, mutate: handleUpdate };
};

export const useSchoolAnnouncement = () => {
  // const hasCache = (key: string): boolean => {
  //   const cache = JSON.parse(localStorage.getItem("app-cache") || "[]");
  //   return cache.some((entry: [string, any]) => entry[0] === key);
  // };

  const { dataID } = useSchoolCookie();

  const x = `api/view-announcement/${dataID}`;

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

  const {
    data: schoolAnnouncement,
    mutate,
    error,
    isValidating,
  } = useSWR(
    x,
    () => {
      return getSchoolAnncoement(dataID!).then((res) => {
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

  return {
    schoolAnnouncement,
    mutate: handleUpdate,
    isLoading: !schoolAnnouncement && !error && isValidating,
    error,
  };
};

export const useSchoolEvent = () => {
  // const hasCache = (key: string): boolean => {
  //   const cache = JSON.parse(localStorage.getItem("app-cache") || "[]");
  //   return cache.some((entry: [string, any]) => entry[0] === key);
  // };
  const { dataID } = useSchoolCookie();
  const x = `api/view-event/${dataID}`;

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
      return getSchoolEvent(dataID!).then((res) => {
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

export const useSchoolTeacher = () => {
  // const hasCache = (key: string): boolean => {
  //   const cache = JSON.parse(localStorage.getItem("app-cache") || "[]");
  //   return cache.some((entry: [string, any]) => entry[0] === key);
  // };
  const { dataID } = useSchoolCookie();
  const x = `api/view-school-teacher/${dataID}`;

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

  const { data: schoolTeacher } = useSWR(
    x,
    async () => {
      return await viewSchoolTeacher(dataID!).then((res) => {
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

  return { schoolTeacher, mutate: handleUpdate };
};

export const useSchoolSubject = () => {
  // const hasCache = (key: string): boolean => {
  //   const cache = JSON.parse(localStorage.getItem("app-cache") || "[]");
  //   return cache.some((entry: [string, any]) => entry[0] === key);
  // };
  const { dataID } = useSchoolCookie();
  const x = `api/view-school-subject/${dataID}`;

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
  const { data: schoolSubject, mutate } = useSWR(
    x,
    () => {
      return viewSchoolSubjects(dataID!).then((res) => {
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

  return { schoolSubject, mutate: handleUpdate };
};

export const useSchoolTeacherDetail = (teacherID: string) => {
  const x = `api/view-school-subject-teacher/${teacherID}`;

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

  const { data: schoolSubjectTeacherDetail, mutate } = useSWR(
    `api/view-school-subject-teacher/${teacherID}`,
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

  return { schoolSubjectTeacherDetail, mutate: handleUpdate };
};

export const useClassSubjects = (classID: string) => {
  const x = `api/view-class-info/${classID}`;

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

  const { data: readSubject, mutate } = useSWR(
    `api/view-class-info/${classID}`,
    () => {
      return getClassSubjects(classID!).then((res) => {
        return res?.data?.classSubjects;
      });
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 3000,
      revalidateOnMount: true,
    }
  );

  const handleUpdate = async (newData: any) => {
    mutate(newData, false);
  };

  return { readSubject, mutate: handleUpdate };
};

export const useClassTimeTable = (classID: string) => {
  const x = `api/view-time-table/${classID}`;

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

  const { data: timetbale, mutate } = useSWR(
    `api/view-time-table/${classID}`,
    () => {
      return getClassTimeTable(classID!).then((res) => {
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

  return { timetbale, mutate: handleUpdate };
};

export const useSchoolStudents = (schoolID: string) => {
  // const hasCache = (key: string): boolean => {
  //   const cache = JSON.parse(localStorage.getItem("app-cache") || "[]");
  //   return cache.some((entry: [string, any]) => entry[0] === key);
  // };
  const x = `api/read-student/${schoolID}`;
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

  const { data: students, mutate, isLoading } = useSWR(
    x,
    () => {
      return getSchoolStudents(schoolID!).then((res) => {
        return res;
      });
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 0,
      revalidateIfStale: false,
      dedupingInterval: 60000,
    }
  );

  return { students, mutate, isLoading };
};

export const useSchoolStudentDetail = (studentID: string) => {
  const x = `api/read-student-info/${studentID}`;

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

  const { data: studentDetails, mutate } = useSWR(
    x,
    () => {
      return getSchoolStudentDetail(studentID!).then((res) => {
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

  return { studentDetails, mutate: handleUpdate };
};

export const useTopSchoolStudent = (studentID: string) => {
  // const hasCache = (key: string): boolean => {
  //   const cache = JSON.parse(localStorage.getItem("app-cache") || "[]");
  //   return cache.some((entry: [string, any]) => entry[0] === key);
  // };
  const x = `api/view-school-top-student/${studentID}`;

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
      return topSchoolStudent(studentID!).then((res) => {
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

export const useClassAttendance = (classID: string) => {
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

  const { data: mainAttendance, mutate } = useSWR(
    `api/view-class-attendance/${classID}`,
    () => {
      return classAttendance(classID!).then((res) => {
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
  return { mainAttendance, mutate: handleUpdate };
};

export const useStudentAttendance = (studentID: string) => {
  const x = `api/view-lesson-notes/${studentID}`;

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

  const { data: mainStudentAttendance } = useSWR(
    x,
    () => {
      return studentAttendance(studentID!).then((res) => {
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

  return { mainStudentAttendance };
};

export const useNotes = (schoolID: string) => {
  const x = `api/view-lesson-notes/${schoolID}`;

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

  const { data: timetbale, mutate } = useSWR(
    `api/view-lesson-notes/${schoolID}`,
    () => {
      return readNoted(schoolID!).then((res) => {
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

  return { timetbale, mutate: handleUpdate };
};

export const useStore = (schoolID: string) => {
  const x = `api/view-store/${schoolID}`;

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

  const { data: store, mutate } = useSWR(
    `api/view-store/${schoolID}`,
    () => {
      return viewStore(schoolID!).then((res) => {
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

  return { store, mutate: handleUpdate };
};

export const useGallary = (schoolID: string) => {
  const x = `api/view-gallary/${schoolID}`;

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

  const { data: gallary, mutate } = useSWR(
    `api/view-gallary/${schoolID}`,
    () => {
      return viewGallary(schoolID!).then((res) => {
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

  return { gallary, mutate: handleUpdate };
};

export const useViewStudentHistory = (studentID: string) => {
  const x = `api/view-student-historical-result/${studentID}`;

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

  const { data: studentResults, mutate } = useSWR(
    x,
    () => {
      return viewStudentHistory(studentID!).then((res) => {
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

  return { studentResults, mutate: handleUpdate };
};

export const useSchoolSessionData = (schoolID: string) => {
  // const hasCache = (key: string): boolean => {
  //   const cache = JSON.parse(localStorage.getItem("app-cache") || "[]");
  //   return cache.some((entry: [string, any]) => entry[0] === key);
  // };
  const x = `api/view-school-session/${schoolID}`;

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

  const { data: schoolInfo, isLoading: loading } = useSWR(
    x,
    () => {
      return viewSchoolSession(schoolID!).then((res: any) => {
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
  return { schoolInfo, loading };
};

export const useComplain = (schoolID: string) => {
  // const hasCache = (key: string): boolean => {
  //   const cache = JSON.parse(localStorage.getItem("app-cache") || "[]");
  //   return cache.some((entry: [string, any]) => entry[0] === key);
  // };
  const x = `api/view-school-complain/${schoolID}`;

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

  const { data: complainData } = useSWR(
    x,
    () => {
      return viewComplains(schoolID!).then((res) => {
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
  return { complainData };
};

export const useViewSingleSession = (sessionID: string) => {
  const x = `api/view-present-school-session/${sessionID}`;

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

  const { data: sessionData, mutate } = useSWR(
    `api/view-present-school-session/${sessionID}`,
    () => {
      return viewPresentSession(sessionID!).then((res) => {
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

  return { sessionData, mutate: handleUpdate };
};

export const useViewSessionTerm = (termID: string) => {
  // const hasCache = (key: string): boolean => {
  //   const cache = JSON.parse(localStorage.getItem("app-cache") || "[]");
  //   return cache.some((entry: [string, any]) => entry[0] === key);
  // };
  const x = `api/view-school-session/${termID}`;

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

  const { data: sessionTermData } = useSWR(
    x,
    () => {
      return viewSessionTermHistory(termID!).then((res) => {
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

  return { sessionTermData };
};

export const useViewTermDetail = (termID: string) => {
  // const hasCache = (key: string): boolean => {
  //   const cache = JSON.parse(localStorage.getItem("app-cache") || "[]");
  //   return cache.some((entry: [string, any]) => entry[0] === key);
  // };
  const x = `api/view-school-term-detail/${termID}`;

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

  const { data: termData } = useSWR(
    x,
    () => {
      return viewTermDetail(termID!).then((res) => {
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
  return { termData };
};

export const usePurchasedStoreInfo = (schoolID: string) => {
  // const hasCache = (key: string): boolean => {
  //   const cache = JSON.parse(localStorage.getItem("app-cache") || "[]");
  //   return cache.some((entry: [string, any]) => entry[0] === key);
  // };
  const x = `api/view-school-purchase/${schoolID}`;

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

  const { data: schoolPurchased } = useSWR(
    x,
    () => {
      return purchasedStoreInfo(schoolID!).then((res) => {
        return res?.data?.data;
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

  return { schoolPurchased };
};

export const useSchoolSchoolFees = (schoolID: string) => {
  // const hasCache = (key: string): boolean => {
  //   const cache = JSON.parse(localStorage.getItem("app-cache") || "[]");
  //   return cache.some((entry: [string, any]) => entry[0] === key);
  // };
  const x = `api/update-school-school-fee-comfirm/${schoolID}`;

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

  const { data: schoolFeeRecord, mutate } = useSWR(
    x,
    () => {
      return readSchoolFee(schoolID!).then((res) => {
        return res?.data?.data;
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

  return { schoolFeeRecord, mutate: handleUpdate };
};

export const useAllSchools = () => {
  const { data: allSchool } = useSWR(
    `api/view-all-school`,
    async () => {
      return await allSchools().then((res: any) => {
        return res?.data?.data;
      });
    },

    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      // revalidateOnMount: true,
    }
  );

  const handleUpdate = async (newData: any) => {
    mutate(newData, false);
  };

  return { allSchool };
};

export const useOutGoneSchoolStudents = (schoolID: string) => {
  const { data: outStudents } = useSWR(
    `api/view-out-gone-student/${schoolID}`,
    async () => {
      return await viewOutGoneStudent(schoolID).then((res: any) => {
        return res?.data;
      });
    },

    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      // revalidateOnMount: true,
    }
  );

  const handleUpdate = async (newData: any) => {
    mutate(newData, false);
  };

  return { outStudents };
};

// Records Get all

export const useFeeRecords = (schoolID: string) => {
  try {
    const x = `api/getall-fee-records/${schoolID}`;

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

    const { data: recordPayment, mutate } = useSWR(
      `api/getall-fee-records/${schoolID}`,
      () => {
        return getRecords(schoolID!).then(
          (res: any) => res?.data?.recordPayments || []
        );
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

    return {
      payments: recordPayment || [],
      mutate: handleUpdate,
    };
  } catch (error) {
    console.error();
    return error;
  }
};

export const useDeailyExpense = (schoolID: string) => {
  // const hasCache = (key: string): boolean => {
  //   const cache = JSON.parse(localStorage.getItem("app-cache") || "[]");
  //   return cache.some((entry: [string, any]) => entry[0] === key);
  // };
  try {
    const x = `api/read-term-daily-expense/${schoolID}`;

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

    const { data: dailyExpense } = useSWR(
      x,
      async () => {
        return await readDailyExpense(schoolID!).then((res: any) => res?.data);
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

    return { dailyExpense };
  } catch (error) {
    console.error();
    return error;
  }
};
