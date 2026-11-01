import useSWR from "swr";
import {
  classAssignment,
  classLessonNotes,
  getOneArticle,
  getOneStudentHistory,
  getSchoolArticle,
  getStudentByEnrollmentID,
  getStudentPayRecord,
  lessonNotes,
  readClassInfo,
  readOneClassInfo,
  readStudentCookie,
  studentRemake,
  studentSchoolFeePayment,
  viewClassTimetable,
  viewComplains,
  viewMidTestStduent,
  viewPerformanceTest,
  viewPurchasedEndPoint,
  viewStduentDetail,
  viewStudentAttendance,
  viewStudentPerformanceMidTest,
} from "../api/studentAPI";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  viewTermlyBudget,
  viewTermlyExpense,
} from "../../pages/api/schoolAPIs";
// import { viewMidTest } from "@/pagesForTeachers/api/teachersAPI";

export const useStudentCookie = () => {
  const user = useSelector((state: any) => state.user);
  const { data: dataID } = useSWR(`api/read-student-cookie/`, () => {
    return readStudentCookie().then((res: any) => {
      return res.data;
    });
  });
  return { dataID: user?.id };
};

export const useMidTestStudentPerformance = (studentID: string) => {
  const x = `view-student-mid-test-performance/${studentID}/`;

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

  const { data: midTestPerformace, mutate } = useSWR(
    `view-student-mid-test-performance/${studentID}/`,
    () => {
      return viewStudentPerformanceMidTest(studentID!).then((res) => {
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

  return { midTestPerformace, mutate: handleUpdate };
};

export const useMidTestStudent = (subjectID: string) => {
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

  const { data: midTest, mutate } = useSWR(
    `api/view-subject-mid-test/${subjectID}`,
    () => {
      return viewMidTestStduent(subjectID!).then((res) => {
        return res.midTest;
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

  return { midTest, mutate: handleUpdate };
};

export const useTermBudget = (schoolID: string) => {
  const x = `api/view-term-budget/${schoolID}`;

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

  const { data: termBudget, mutate } = useSWR(
    `api/view-term-budget/${schoolID}`,
    () => {
      return viewTermlyBudget(schoolID!).then((res: any) => {
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

  return { termBudget, mutate: handleUpdate };
};

export const useTermExpenses = (schoolID: string) => {
  // const hasCache = (key: string): boolean => {
  //   const cache = JSON.parse(localStorage.getItem("app-cache") || "[]");
  //   return cache.some((entry: [string, any]) => entry[0] === key);
  // };
  const x = `api/view-expense/${schoolID}`;

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

  console.clear();
  console.log(hasCache, "hasCache");
  const { data: termlyExpense, mutate } = useSWR(
    x,
    () => {
      return viewTermlyExpense(schoolID!).then((res: any) => {
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

  return { termlyExpense };
};

export const useStudentInfo = () => {
  const { dataID } = useStudentCookie();

  const x = `api/view-student-info/${dataID}`;

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

  const { data: studentInfo, mutate } = useSWR(
    x,
    () => {
      return viewStduentDetail(dataID!).then((res: any) => {
        console.log("studentInfo-hook", res);
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

  return { studentInfo, mutate: handleUpdate };
};

export const useStudentInfoData = (studentID: string) => {
  const x = `api/view-student-info/${studentID}`;

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

  const { data: studentInfoData, mutate } = useSWR(
    x,
    () => {
      return viewStduentDetail(studentID!).then((res: any) => {
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

  return { studentInfoData, mutate: handleUpdate };
};

export const useStudentAttendant = (studentID: string) => {
  const x = `api/viewing-student-attendance/${studentID}`;

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

  const { data: studentAttendance, mutate } = useSWR(
    x,
    () => {
      return viewStudentAttendance(studentID!).then((res: any) => {
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

  return { studentAttendance, mutate: handleUpdate };
};

export const useAssignment = (classID: string) => {
  const x = `api/viewing-class-assignment/${classID}`;

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

  const { data: classAssignments, mutate } = useSWR(
    x,
    () => {
      return classAssignment(classID!).then((res: any) => {
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

  return { classAssignments, mutate: handleUpdate };
};

export const useLessonNote = (schoolID: string, staffID: string) => {
  const x = `api/view-lession-note/${staffID}`;

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

  const { data: lessonNote, mutate } = useSWR(
    x,
    () => {
      return lessonNotes(schoolID, staffID).then((res: any) => {
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

  return { lessonNote, mutate: handleUpdate };
};

export const useClassLessonNote = (classID: string) => {
  const x = `api/view-lession-note/${classID}`;

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

  const { data: classLessonNote, mutate } = useSWR(
    x,
    () => {
      return classLessonNotes(classID).then((res: any) => {
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

  return { classLessonNote, mutate: handleUpdate };
};

export const useReadMyClassInfo = () => {
  const [state, setState] = useState<any>({});
  const { studentInfo } = useStudentInfo();

  return { state };
};

export const useReadMyClassInfoData = (classAssigned: string) => {
  const [state, setState] = useState<any>({});

  return { state };
};

export const useReadOneClassInfo = (classID: string) => {
  const x = `api/view-one-classroom-info/${classID}`;

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

  const { data: oneClass, mutate } = useSWR(
    x,
    () => {
      return readOneClassInfo(classID!).then((res: any) => {
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

  return { oneClass, mutate: handleUpdate };
};

export const useOneArticle = (studentID: string) => {
  const x = `api/viewing-one-article/${studentID}`;

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

  const { data: oneArticle, mutate } = useSWR(
    x,
    () => {
      return getOneArticle(studentID!).then((res: any) => {
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

  return { oneArticle, mutate: handleUpdate };
};

export const useSchoolArticle = (schoolID: string) => {
  // const x = schoolID ?  : null;
  const x = `api/viewing-all-article/${schoolID}`;

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

  const { data: allArticle, mutate } = useSWR(
    x,
    () => {
      return getSchoolArticle(schoolID!).then((res: any) => {
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

  // const { data: allArticle, mutate } = useSWR(
  //   x,
  //   () => {
  // return getSchoolArticle(schoolID!).then((res: any) => {
  //   return res.data;
  // });
  //   },
  //   {
  //     revalidateOnFocus: false,
  //     revalidateOnReconnect: false,
  //     refreshInterval: 0,
  //     revalidateOnMount: !hasCache(x),
  //   }
  // );

  // const handleUpdate = async (newData: any) => {
  //   mutate(newData, false);
  // };

  return { allArticle, mutate: handleUpdate };
};

export const useComplain = (studentID: string) => {
  const x = `api/view-student-complain/${studentID}`;

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
      return viewComplains(studentID!).then((res) => {
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

export const usePastQuestionHistory = (studentID: string) => {
  const x = `api/view-question-history/${studentID}`;

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

  const { data: pastQuestionData, mutate } = useSWR(
    x,
    () => {
      return getOneStudentHistory(studentID!).then((res) => {
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

  return { pastQuestionData, mutate: handleUpdate };
};

export const useClassTimeTableViewer = (classID: string) => {
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

  const { data: viewTimeTable, mutate } = useSWR(
    x,
    () => {
      return viewClassTimetable(classID!).then((res) => {
        return res.data.timeTable;
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

  return { viewTimeTable, mutate: handleUpdate };
};

export const usePurchasedStore = (studentID: string) => {
  const x = `api/view-purchase/${studentID}`;

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

  const { data: purchasedStore, mutate } = useSWR(
    x,
    () => {
      return viewPurchasedEndPoint(studentID!).then((res) => {
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

  return { purchasedStore, mutate: handleUpdate };
};

export const useStudentSchoolFee = (studentID: string) => {
  const x = `api/view-student-schoolfee-detail/${studentID}`;

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

  const { data: studentFees, mutate } = useSWR(
    x,
    () => {
      return studentSchoolFeePayment(studentID!).then((res) => {
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

  return { studentFees, mutate: handleUpdate };
};

export const useViewPerformance = (studentID: string) => {
  const x = `api/view-student-quiz-performance/${studentID}`;

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

  const { data: performanceTest, mutate } = useSWR(
    x,
    () => {
      return viewPerformanceTest(studentID!).then((res) => {
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

  return { performanceTest, mutate: handleUpdate };
};

export const useViewRemark = (studentID: string) => {
  const { data: remarks } = useSWR(`api/view-remark/${studentID}`, () => {
    return studentRemake(studentID!).then((res) => {
      return res?.data;
    });
  });

  return { remarks };
};

export const useStudentFeePayment = (studentID: string) => {
  try {
    const x = `api/getone-fee-records/${studentID}`;

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

    const { data: studentFeePayment, mutate } = useSWR(
      x,
      () => {
        return getStudentPayRecord(studentID).then((res) => {
          return res?.data?.recordPayments || [];
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

    return { studentFeePayment, mutate: handleUpdate };
  } catch (error) {
    console.error();
    return error;
  }
};

export const useStudentEnrollmentID = (studentID: string) => {
  try {
    const x = `api/read-by-enrollment-id/${studentID}`;

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

    const { data: studentRecord, mutate } = useSWR(
      x,
      () => {
        return getStudentByEnrollmentID(studentID).then((res) => {
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

    return { studentRecord, mutate: handleUpdate };
  } catch (error) {
    console.error();
    return error;
  }
};
