import React, { Suspense } from "react";
import { useEffect, useState } from "react";

import { getSchoolCookie, readSchool } from "../pages/api/schoolAPIs";
import { Outlet } from "react-router-dom";

const FirstScreen = React.lazy(() => import("../pages/home/start/FirstScreen"));
// import FirstScreen from "../pages/home/start/FirstScreen";

import {
  readTeacherCookie,
  viewTeacherDetail,
} from "../pagesForTeachers/api/teachersAPI";

import { useSelector } from "react-redux";
import LoadingScreen from "../components/static/LoadingScreen";

const MakeShift = () => {
  const userStatus = useSelector((state: any) => state.userStatus);
  const [state, setState] = useState<any>({} || "" || 0);
  const user = useSelector((state: any) => state.user);

  console.log(user);

  useEffect(() => {
    let timer = setTimeout(() => {
      if (userStatus === "school-admin") {
        // getSchoolCookie().then((res: any) => {
        return readSchool(user.id).then((resp) => {
          if (resp.status === 200) {
            return setState(resp.data);
          } else if (resp?.response?.status === 404) {
            return setState(resp?.response?.status);
          }
          // });
        });
      } else if (userStatus === "school-teacher") {
        // readTeacherCookie().then((res: any) => {
        return viewTeacherDetail(user.id).then((resp: any) => {
          if (resp.status === 200) {
            return setState(resp.data);
          } else if (resp?.response?.status === 404) {
            return setState(resp?.response?.status);
          }
        });
        // });
      }

      clearTimeout(timer);
    }, 1000);
  }, []);
  return (
    <div>
      {Object.keys(state)?.length === 0 ? (
        <LoadingScreen />
      ) : (
        <div>
          {state?.started ? (
            <div>
              <Outlet />
            </div>
          ) : (
            <Suspense fallback={<LoadingScreen />}>
              <FirstScreen />
            </Suspense>
          )}
        </div>
      )}
    </div>
  );
};

export default MakeShift;
