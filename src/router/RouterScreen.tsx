import { useEffect, useState } from "react";
import { getSchoolCookie, readSchool } from "../pages/api/schoolAPIs";
import { RouterProvider } from "react-router-dom";
import { adminRouter } from "./adminRouter";
import { mainRouter } from "./mainRouter";
import { teacherRouter } from "./teacherRouter";
import { studentRouter } from "./studentRouter";
import { viewTeacherDetail } from "../pagesForTeachers/api/teachersAPI";
import { useSelector } from "react-redux";
import { viewStduentDetail } from "../pagesForStudents/api/studentAPI";
import ScrollToTop from "../components/static/ScrollToTop";
``;
const RouterScreen = () => {
  const userStatus = useSelector((state: any) => state.userStatus);
  const user = useSelector((state: any) => state.user);

  const [state, setState] = useState<any>({} || "" || 0);
  const [loadingState, setLoadingState] = useState<boolean>(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      if (userStatus === "school-admin") {
        // getSchoolCookie().then((res: any) => {
        return readSchool(user?.id).then((resp) => {
          if (resp?.status === 200) {
            return setState(resp?.data);
          } else if (resp?.response?.status === 404) {
            return setState(resp?.response?.status);
          }
          // });
        });
      } else if (userStatus === "school-teacher") {
        // readTeacherCookie().then((res: any) => {
        return viewTeacherDetail(user?.id).then((resp: any) => {
          if (resp?.status === 200) {
            return setState(resp?.data);
          } else if (resp?.response?.status === 404) {
            return setState(resp?.response?.status);
          }
          // });
        });
      } else if (userStatus === "school-student") {
        // readStudentCookie().then((res: any) => {
        // console.log(res);
        return viewStduentDetail(user?.id).then((resp: any) => {
          if (resp.status === 200) {
            return setState(resp?.data);
          } else if (resp?.response?.status === 404) {
            return setState(resp?.response?.status);
          }
          // });
        });
      }

      clearTimeout(timer);
    });

    const timing = setTimeout(() => {
      if (!state?.status) {
        setLoadingState(true);
      }
      clearTimeout(timing);
    }, 10);
  }, [userStatus, user]);

  return (
    <div>
      {state?.status === "school-admin" ? (
        <div>
          <RouterProvider router={adminRouter} />
        </div>
      ) : state?.status === "school-teacher" ? (
        <div>
          <RouterProvider router={teacherRouter} />
        </div>
      ) : state?.status === "school-student" ? (
        <div>
          <RouterProvider router={studentRouter} />
        </div>
      ) : (
        <div>
          {loadingState && (
            <div>
              {!state?.status && <RouterProvider router={mainRouter} />}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RouterScreen;
